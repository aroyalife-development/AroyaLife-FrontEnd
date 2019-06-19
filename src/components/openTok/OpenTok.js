import React, { Component } from "react";
import Spinner from "react-spinner";
import classNames from "classnames";

import AccCore from "opentok-accelerator-core";
import "opentok-solutions-css";

// import logo from './logo.svg';
import config from "./config.json";
import "./App.css";

let otCore;
const otCoreOptions = {
  credentials: {
    apiKey: config.apiKey,
    sessionId: config.sessionId,
    token: config.token
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
  packages: ["textChat"],
  // packages: ['textChat', 'screenSharing', 'annotation'],
  communication: {
    callProperties: null // Using default
  },
  textChat: {
    name: ["David", "Paul", "Emma", "George", "Amanda"][
      (Math.random() * 5) | 0
    ], // eslint-disable-line no-bitwise
    waitingMessage: "Messages will be delivered when other users arrive",
    container: "#chat"
  },
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
    <button className="message button clickable" onClick={start}>
      Click to Start Call{" "}
    </button>
  </div>
);

class OpenTok extends Component {
  constructor(props) {
    super(props);
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
  }

  componentDidMount() {
    otCore = new AccCore(otCoreOptions);
    otCore
      .connect()
      .then(() => this.setState({ connected: true }))
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

      "showTextChat",
      "hideTextChat",
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
    events.forEach(event =>
      otCore.on(event, ({ publishers, subscribers, meta }) => {
        this.setState({ publishers, subscribers, meta });
        console.log({ publishers, subscribers, meta });

        console.log(this.state);

        // console.log(event);

        switch (event) {
          // session
          case "archiveStarted":
            console.log(event + " - " + i);
            i++;
            break;
          case "archiveStopped":
            console.log(event + " - " + i);
            i++;
            break;
          case "connectionCreated":
            console.log(event + " - " + i);
            i++;
            break;
          case "connectionDestroyed":
            console.log(event + " - " + i);
            i++;
            break;
          case "sessionConnected":
            console.log(event + " - " + i);
            i++;
            break;
          case "sessionDisconnected":
            console.log(event + " - " + i);
            i++;
            break;
          case "sessionReconnected":
            console.log(event + " - " + i);
            i++;
            break;
          case "sessionReconnecting":
            console.log(event + " - " + i);
            i++;
            break;
          case "signal":
            console.log(event + " - " + i);
            i++;
            break;
          case "streamCreated":
            console.log(event + " - " + i);
            i++;
            break;
          case "streamDestroyed":
            console.log(event + " - " + i);
            i++;
            break;
          case "streamPropertyChanged":
            console.log(event + " - " + i);
            i++;
            break;

          // core
          case "connected":
            console.log(event + " - " + i);
            i++;
            break;
          case "startScreenShare":
            console.log(event + " - " + i);
            i++;
            break;
          case "endScreenShare":
            console.log(event + " - " + i);
            i++;
            break;
          case "error":
            console.log(event + " - " + i);
            i++;
            break;

          // communication
          case "startCall":
            console.log(event + " - " + i);
            i++;
            break;
          case "endCall":
            console.log(event + " - " + i);
            i++;
            break;
          case "callPropertyChanged":
            console.log(event + " - " + i);
            i++;
            break;
          case "subscribeToCamera":
            console.log(event + " - " + i);
            i++;
            break;
          case "subscribeToScreen":
            console.log(event + " - " + i);
            i++;
            break;
          case "subscribeToSip":
            console.log(event + " - " + i);
            i++;
            break;
          case "unsubscribeFromCamera":
            console.log(event + " - " + i);
            i++;
            break;
          case "unsubscribeFromSip":
            console.log(event + " - " + i);
            i++;
            break;
          case "unsubscribeFromScreen":
            console.log(event + " - " + i);
            i++;
            break;
          case "startViewingSharedScreen":
            console.log(event + " - " + i);
            i++;
            break;
          case "endViewingSharedScreen":
            console.log(event + " - " + i);
            i++;
            break;

          // textChat
          case "showTextChat":
            console.log(event + " - " + i);
            i++;
            break;
          case "hideTextChat":
            console.log(event + " - " + i);
            i++;
            break;
          case "messageSent":
            console.log(event + " - " + i);
            i++;
            break;
          case "errorSendingMessage":
            console.log(event + " - " + i);
            i++;
            break;
          case "messageReceived":
            console.log(event + " - " + i);
            i++;
            break;

          // screenSharing
          case "startScreenSharing":
            console.log(event + " - " + i);
            i++;
            break;
          case "endScreenSharing":
            console.log(event + " - " + i);
            i++;
            break;
          case "screenSharingError":
            console.log(event + " - " + i);
            i++;
            break;

          // annotation
          case "startAnnotation":
            console.log(event + " - " + i);
            i++;
            break;
          case "linkAnnotation":
            console.log(event + " - " + i);
            i++;
            break;
          case "resizeCanvas":
            console.log(event + " - " + i);
            i++;
            break;
          case "annotationWindowClosed":
            console.log(event + " - " + i);
            i++;
            break;
          case "endAnnotation":
            console.log(event + " - " + i);
            i++;
            break;

          // archiving
          case "startArchive":
            console.log(event + " - " + i);
            i++;
            break;
          case "stopArchive":
            console.log(event + " - " + i);
            i++;
            break;
          case "archiveReady":
            console.log(event + " - " + i);
            i++;
            break;
          case "archiveError":
            console.log(event + " - " + i);
            i++;
            break;

          default:
            break;
        }
      })
    );
  }

  startCall() {
    otCore
      .startCall()
      .then(({ publishers, subscribers, meta }) => {
        this.setState({ publishers, subscribers, meta, active: true });
      })
      .catch(error => console.log(error));
  }

  endCall() {
    this.setState({ active: false });
    otCore
      .endCall()
      .then(({ publishers, subscribers, meta }) => {
        this.setState({ publishers, subscribers, meta, active: true });
      })
      .catch(error => console.log(error));
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
    const { connected, active } = this.state;
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