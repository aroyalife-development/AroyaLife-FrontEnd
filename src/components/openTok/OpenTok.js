import React, { Component } from "react";
import Spinner from "react-spinner";
import classNames from "classnames";

import AccCore from "opentok-accelerator-core";
import "opentok-solutions-css";
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  Modal,
  Input,
  Label,
  Form,
  FormGroup,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col
} from "reactstrap";
import config from "./config.json";
import "./App.css";
import axios from "axios";
import { environment } from "../../environments.js";

let callState = false;
let otCore;

let userType;

/**
 * Build classes for container elements based on state
 * @param {Object} state
 */
const containerClasses = state => {
  const { active, meta, localAudioEnabled, localVideoEnabled } = state;
  const sharingScreen = meta ? !!meta.publisher.screen : false;
  const viewingSharedScreen = meta ? meta.subscriber.screen : false;
  const activeCameraSubscribers = meta ? meta.subscriber.camera : 0;
  const activeCameraSubscribersGt2 = activeCameraSubscribers > 2;
  const activeCameraSubscribersOdd = activeCameraSubscribers % 2;
  const screenshareActive = viewingSharedScreen || sharingScreen;
  return {
    controlClass: classNames("openTok-control-container", { hidden: !active }),
    localTransferClass: classNames("ots-video-control circle circle-transfer", {
      hidden: !active,
      muted: !localAudioEnabled
    }),
    localPrescriptionClass: classNames(
      "ots-video-control circle circle-prescription",
      { hidden: !active, muted: !localAudioEnabled }
    ),
    localAudioClass: classNames("ots-video-control circle audio", {
      hidden: !active,
      muted: !localAudioEnabled
    }),
    localVideoClass: classNames("ots-video-control circle video", {
      hidden: !active,
      muted: !localVideoEnabled
    }),
    localCallClass: classNames("ots-video-control circle end-call", {
      hidden: !active
    }),
    cameraPublisherClass: classNames("video-container", {
      hidden: !active,
      small: !!activeCameraSubscribers || screenshareActive,
      left: screenshareActive
    }),
    screenPublisherClass: classNames("video-container", {
      hidden: !active || !sharingScreen
    }),
    cameraSubscriberClass: classNames(
      "video-container",
      { hidden: !active || !activeCameraSubscribers },
      { "active-gt2": activeCameraSubscribersGt2 && !screenshareActive },
      { "active-odd": activeCameraSubscribersOdd && !screenshareActive },
      { small: screenshareActive }
    ),
    screenSubscriberClass: classNames("video-container", {
      hidden: !viewingSharedScreen || !active
    })
  };
};

const connectingMask = () => (
  <div className="openTok-mask">
    <Spinner />
    <div className="message with-spinner">Connecting</div>
  </div>
);
const startCallMask = start => (
  <div className="openTok-mask">
    <button className="message button clickable" onClick={start} id="callBTN">
      Click to Start Call
    </button>
  </div>
);

class OpenTok extends Component {
  constructor(props) {
    super(props);
    console.log("-------------------------------------------- constructor");
    this.state = {
      connected: false,
      active: false,
      publishers: null,
      subscribers: null,
      meta: null,
      localAudioEnabled: true,
      localVideoEnabled: true
    };
    this.startCall = this.startCall.bind(this);
    this.endCall = this.endCall.bind(this);
    this.toggleLocalAudio = this.toggleLocalAudio.bind(this);
    this.toggleLocalVideo = this.toggleLocalVideo.bind(this);

    this.credentials = null;

    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));

    this.userType = null;
    if (this.currentUser) {
      this.userType = this.currentUser.role.name;
    }
    this.userCallType = "SENDER";
    this.socket = window.socket;
  }

  componentWillMount() {
    console.log("-------------------------------------------- Will Mount");
    // this.setState({ connected: true });
  }

  async componentDidMount() {
    console.log("-------------------------------------------- Did Mount");

    this.credentials = JSON.parse(localStorage.getItem("credentials"));
    console.log(this.credentials);

    let currentAppointment = JSON.parse(
      localStorage.getItem("currentAppointment")
    );

    if (
      this.credentials &&
      this.credentials.sessionId &&
      currentAppointment &&
      currentAppointment.id
    ) {
      if (this.userType === "Patient") {
        console.log("Patient");
      } else if (this.userType === "Provider") {
        console.log("PROVIDER");
      }

      await axios
        .get(environment.baseUrl + "appointment/" + currentAppointment.id)
        .then(response => {
          currentAppointment = response.data.content;

          localStorage.setItem(
            "currentAppointment",
            JSON.stringify(currentAppointment)
          );

          if (this.credentials.token && this.credentials.apiKey) {
            this.userCallType = "RECEIVER";
            console.log("this.userCallType - ", this.userCallType);

            this.createOpenTokConnection();
          } else {
            axios
              .post(environment.baseUrl + "appointment/initCall", {
                sender: {
                  id: currentAppointment.patient.user.id
                },
                receiver: {
                  id: currentAppointment.provider.user.id
                },
                appointment: {
                  id: currentAppointment.id,
                  sessionId: this.credentials.sessionId
                },
                connData: {
                  role: "publisher",
                  metaData: "name=test01"
                }
              })
              .then(response => {
                console.log("before emit start call!");
                console.log("response - ", response.data.content);

                this.credentials.token = response.data.content.connectToken;
                this.credentials.apiKey = response.data.content.apiKey;
                this.userCallType = "SENDER";
                console.log("this.userCallType - ", this.userCallType);
                this.createOpenTokConnection();
              })
              .catch(error => {
                console.log("------------------- error - ", error);
              });
          }
        })
        .catch(error => {
          console.log("------------------- error - ", error);
        });
    } else {
      console.log("NO CREDENTIALS or currentAppointment");
      let path = "appointments";
      this.props.history.push(path);
      setTimeout(() => this.props.history.push(path), 3000);
    }
  }

  createOpenTokConnection() {
    console.log("------------------- this.credentials - ", this.credentials);
    const otCoreOptions = {
      credentials: {
        apiKey: this.credentials.apiKey,
        sessionId: this.credentials.sessionId,
        token: this.credentials.token
      },
      // A container can either be a query selector or an HTML Element
      streamContainers(pubSub, type, data, stream) {
        return {
          publisher: {
            camera: "#cameraPublisherContainer",
            screen: "#screenPublisherContainer"
          },
          subscriber: {
            camera: "#cameraSubscriberContainer",
            screen: "#screenSubscriberContainer"
          }
        }[pubSub][type];
      },
      controlsContainer: "#controls",
      packages: [],
      // packages: ['textChat', 'screenSharing', 'annotation'],
      communication: {
        callProperties: null // Using default
      },
      textChat: {},
      screenSharing: {
        extensionID: "plocfffmbcclpdifaikiikgplfnepkpo",
        annotation: true,
        externalWindow: false,
        dev: true,
        screenProperties: {
          insertMode: "append",
          width: "100%",
          height: "100%",
          showControls: false,
          style: {
            buttonDisplayMode: "off"
          },
          videoSource: "window",
          fitMode: "contain" // Using default
        }
      },
      annotation: {
        absoluteParent: {
          publisher: ".openTok-video-container",
          subscriber: ".openTok-video-container"
        }
      }
    };

    otCore = new AccCore(otCoreOptions);
    otCore
      .connect()
      .then(
        // () => this.setState({ connected: true })
        )
      .catch(error => console.log(error));

    const events = [
      "archiveStarted",
      "archiveStopped",
      "connectionCreated",
      "connectionDestroyed",
      "sessionConnected",
      "sessionDisconnected",
      "sessionReconnected",
      "sessionReconnecting",
      "signal",
      "streamCreated",
      "streamDestroyed",
      // "streamPropertyChanged",

      "connected",
      "startScreenShare",
      "endScreenShare",
      "error",

      "startCall",
      // "endCall",
      "callPropertyChanged",
      "subscribeToCamera",
      "subscribeToScreen",
      "subscribeToSip",
      "unsubscribeFromCamera",
      "unsubscribeFromSip",
      "unsubscribeFromScreen",
      "startViewingSharedScreen",
      "endViewingSharedScreen",

      // "showTextChat",
      // "hideTextChat",
      "messageSent",
      "errorSendingMessage",
      "messageReceived",

      "startScreenSharing",
      "endScreenSharing",
      "screenSharingError",

      "startAnnotation",
      "linkAnnotation",
      "resizeCanvas",
      "annotationWindowClosed",
      "endAnnotation",

      "startArchive",
      "stopArchive",
      "archiveReady",
      "archiveError"
    ];

    // events.forEach(event => otCore.on(event, ({ publishers, subscribers, meta }) => {
    //   this.setState({ publishers, subscribers, meta });
    //   console.log(event);
    // }));

    let i = 0;

    events.forEach(eventName =>
      otCore.on(eventName, ({ publishers, subscribers, meta }) => {
        console.log({ publishers, subscribers, meta });
        console.log(this.state);

        switch (eventName) {
          // ---------------------- Session Events ----------------------
          case "archiveStarted":
            console.log(eventName + " - " + i);
            i++;
            break;
          case "archiveStopped":
            console.log(eventName + " - " + i);
            i++;
            break;
          case "connectionCreated":
            console.log(eventName + " - " + i);
            this.setState({ connected: true })
            i++;
            break;
          case "connectionDestroyed":
            console.log(eventName + " - " + i);
            i++;
            break;
          case "sessionConnected":
            console.log(eventName + " - " + i);
            i++;
            break;
          case "sessionDisconnected":
            console.log(eventName + " - " + i);
            i++;
            break;
          case "sessionReconnected":
            console.log(eventName + " - " + i);
            i++;
            break;
          case "sessionReconnecting":
            console.log(eventName + " - " + i);
            i++;
            break;
          // case "signal":
          //   console.log(eventName + " - " + i);
          //   i++;
          //   break;
          case "streamCreated":
            console.log(eventName + " - " + i);
            i++;
            break;
          case "streamDestroyed":
            console.log(eventName + " - " + i);
            this.endCall();
            i++;
            break;
          case "streamPropertyChanged":
            console.log(eventName + " - " + i);
            i++;
            break;

          // ------------------------ Core Events -----------------------
          case "connected":
            console.log(eventName + " - " + i);
            i++;
            break;
          case "startScreenShare":
            this.setState({ publishers, subscribers, meta });
            console.log(eventName + " - " + i);
            i++;
            break;
          case "endScreenShare":
            this.setState({ publishers, subscribers, meta });
            console.log(eventName + " - " + i);
            i++;
            break;
          case "error":
            console.log(eventName + " - " + i);
            i++;
            break;

          // -------------------- Communication Events ------------------
          case "startCall":
            console.log(eventName + " - " + i);
            i++;
            break;
          // case "endCall":
          //   console.log(eventName + " - " + i);
          //   i++;
          //   break;
          case "callPropertyChanged":
            console.log(eventName + " - " + i);
            i++;
            break;
          case "subscribeToCamera":
            this.setState({ publishers, subscribers, meta });
            console.log(eventName + " - " + i);
            i++;
            break;
          case "subscribeToScreen":
            this.setState({ publishers, subscribers, meta });
            console.log(eventName + " - " + i);
            i++;
            break;
          case "subscribeToSip":
            console.log(eventName + " - " + i);
            i++;
            break;
          case "unsubscribeFromCamera":
            this.setState({ publishers, subscribers, meta });
            console.log(eventName + " - " + i);
            i++;
            break;
          case "unsubscribeFromSip":
            console.log(eventName + " - " + i);
            i++;
            break;
          case "unsubscribeFromScreen":
            this.setState({ publishers, subscribers, meta });
            console.log(eventName + " - " + i);
            i++;
            break;
          case "startViewingSharedScreen":
            console.log(eventName + " - " + i);
            i++;
            break;
          case "endViewingSharedScreen":
            console.log(eventName + " - " + i);
            i++;
            break;

          // ----------------------- TextChat Events --------------------
          // case "showTextChat":
          //   console.log(eventName + " - " + i);
          //   i++;
          //   break;
          // case "hideTextChat":
          //   console.log(eventName + " - " + i);
          //   i++;
          //   break;
          case "messageSent":
            console.log(eventName + " - " + i);
            i++;
            break;
          case "errorSendingMessage":
            console.log(eventName + " - " + i);
            i++;
            break;
          case "messageReceived":
            console.log(eventName + " - " + i);
            i++;
            break;

          // -------------------- ScreenSharing Events ------------------
          // screenSharing
          case "startScreenSharing":
            console.log(eventName + " - " + i);
            i++;
            break;
          case "endScreenSharing":
            console.log(eventName + " - " + i);
            i++;
            break;
          case "screenSharingError":
            console.log(eventName + " - " + i);
            i++;
            break;

          default:
            break;
        }
      })
    );

    otCore.on("endCall", event => {
      console.log(event);
      console.log(this.state);
      console.log("endCall" + " - " + i);
      i++;
    });

    otCore.on("signal", event => {
      console.log(event);
      console.log(this.state);
      console.log("signal" + " - " + i);
      console.log("JSON.parse(event).data", JSON.parse(event.data));

      // if (callState && JSON.parse(event.data) === "endCall") {
      //   // this.endCall();
      // } else if (!callState && JSON.parse(event.data) === "startCall") {
      //   this.startCall();
      // }
      i++;
    });
  }

  // shouldComponentUpdate() {
  //   console.log(
  //     "-------------------------------------------- Should Component Update"
  //   );
  //   return true;
  // }

  // componentDidUpdate() {
  //   console.log(
  //     "-------------------------------------------- Should Component Update"
  //   );
  // }

  // componentWillUnmount() {
  //   console.log("-------------------------------------------- Will Unmount");
  //   this.endCall();
  // }

  startCall() {
    console.log("In Start Call");
    console.log("callState", callState);

    const currentAppointment = JSON.parse(
      localStorage.getItem("currentAppointment")
    );

    if (!callState) {
      callState = true;
      this.props.changeCallStatus(callState);
      otCore
        .startCall()
        .then(({ publishers, subscribers, meta }) => {
          this.setState({ publishers, subscribers, meta, active: true });
        })
        .catch(error => console.log(error));
      if (this.userCallType === "SENDER") {
        this.socket.emit("startCall", {
          id: this.socket.id,
          appointment: { id: currentAppointment.id },
          sender: currentAppointment.patient.user.id,
          receiver: currentAppointment.provider.user.id,
          credentials: this.credentials
        });
      }
    }
  }

  endCall() {
    console.log("In End Call");
    console.log("callState", callState);
    if (callState) {
      console.log("InSide");
      callState = false;
      this.props.changeCallStatus(callState);
      otCore.endCall();
      this.setState({ active: false });
    }
  }

  toggleLocalAudio() {
    otCore.toggleLocalAudio(!this.state.localAudioEnabled);
    this.setState({ localAudioEnabled: !this.state.localAudioEnabled });
  }

  toggleLocalVideo() {
    otCore.toggleLocalVideo(!this.state.localVideoEnabled);
    this.setState({ localVideoEnabled: !this.state.localVideoEnabled });
  }

  render() {
    const { connected, active, stream } = this.state;
    const {
      localPrescriptionClass,
      localTransferClass,
      localAudioClass,
      localVideoClass,
      localCallClass,
      controlClass,
      cameraPublisherClass,
      screenPublisherClass,
      cameraSubscriberClass,
      screenSubscriberClass
    } = containerClasses(this.state);

    // console.log("--------------------- 12 - ", window.connected);
    // console.log("--------------------- 12 - ", window.otCore);
    // console.log("--------------------- 12 - ", this.state);
    // console.log("--------------------- 12 - ", connected);
    // console.log("--------------------- 12 - ", active);

    return (
      <div className="openTok">
        <div className="openTok-main">
          <div className="openTok-video-container">
            {!connected && connectingMask()}
            {connected && !active && startCallMask(this.startCall)}
            <div
              id="cameraPublisherContainer"
              className={cameraPublisherClass}
            />
            <div
              id="screenPublisherContainer"
              className={screenPublisherClass}
            />
            <div
              id="cameraSubscriberContainer"
              className={cameraSubscriberClass}
            />
            <div
              id="screenSubscriberContainer"
              className={screenSubscriberClass}
            />
          </div>
          <div id="controls" className={controlClass}>
            <div
              title="Transfer"
              className={localTransferClass}
              onClick={this.props.transferHandler}
            >
              <i className="mdi mdi-transfer" />
            </div>
            <div
              title="Prescription"
              className={localPrescriptionClass}
              onClick={this.props.prescriptionHandler}
            >
              <i className="mdi mdi-medical-bag" />
            </div>
            <div
              title="Audio"
              className={localAudioClass}
              onClick={this.toggleLocalAudio}
            />
            <div
              title="Video"
              className={localVideoClass}
              onClick={this.toggleLocalVideo}
            />
            <div
              title="End Call"
              className={localCallClass}
              onClick={this.endCall}
            />
          </div>
          {/* <div id="chat" className="openTok-chat-container" /> */}
        </div>
      </div>
    );
  }
}

export default OpenTok;
