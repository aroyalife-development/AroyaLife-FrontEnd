import React, { Component } from "react";
import indexRoutes from "./routes/";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "./redux/store";
import AccCore from "opentok-accelerator-core";
import config from "./components/openTok/config.json";
import userimg from "./assets/images/users/7.jpg";
import "./views/video-call/videoCall.css";

import { Modal, ModalBody, Button } from "reactstrap";



let otCore;
let callState = false;
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
  packages: [],
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

class App extends Component {
  constructor(props) {
    super(props);
    this.toggleCallRingModal = this.toggleCallRingModal.bind(this);
    this.endCall = this.endCall.bind(this);
    this.answerCall = this.answerCall.bind(this);
    this.state = { collapse: false, modal: false };
  }

  toggleCallRingModal() {
    this.setState({
      modal: !this.state.modal
    });
  }

  answerCall() {
    if (this.state.modal) {
      otCore
        .signal("callStatus", "startCall")
        .then(() => {
          console.log("startCall......");
        })
        .catch(error => console.log(error));
    }
    this.toggleCallRingModal();
    // props.history.push("/videoCall")
  }

  endCall() {
    if (this.state.modal) {
      otCore
        .signal("callStatus", "endCall")
        .then(() => {
          console.log("endCall......");
        })
        .catch(error => console.log(error));
    }
    this.toggleCallRingModal();
  }

  componentWillMount() {
    otCore = new AccCore(otCoreOptions);
    otCore
      .connect()
      .then()
      .catch(error => console.log(error));

    window.otCore = otCore;

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
        // this.setState({ publishers, subscribers, meta });
        console.log({ publishers, subscribers, meta });
        console.log(this.state);

        switch (eventName) {
          // ---------------------- Session Events ----------------------
          case "archiveStarted":
            console.log(eventName + " - " + i + " app - " + i);
            i++;
            break;
          case "archiveStopped":
            console.log(eventName + " - " + i + " app - " + i);
            i++;
            break;
          case "connectionCreated":
            console.log(eventName + " - " + i + " app - " + i);
            i++;
            break;
          case "connectionDestroyed":
            console.log(eventName + " - " + i + " app - " + i);
            i++;
            break;
          case "sessionConnected":
            otCore.se;
            console.log(eventName + " - " + i + " app - " + i);
            i++;
            break;
          case "sessionDisconnected":
            console.log(eventName + " - " + i + " app - " + i);
            i++;
            break;
          case "sessionReconnected":
            console.log(eventName + " - " + i + " app - " + i);
            i++;
            break;
          case "sessionReconnecting":
            console.log(eventName + " - " + i + " app - " + i);
            i++;
            break;
          case "signal":
            console.log(eventName + " - " + i + " app - " + i);
            i++;
            break;
          case "streamCreated":
            console.log(eventName + " - " + i + " app - " + i);
            if(!callState){
              this.toggleCallRingModal();
            }
            i++;
            break;
          case "streamDestroyed":
            console.log(eventName + " - " + i + " app - " + i);

            i++;
            break;
          case "streamPropertyChanged":
            console.log(eventName + " - " + i + " app - " + i);
            i++;
            break;

          // ------------------------ Core Events -----------------------
          case "connected":
            console.log(eventName + " - " + i + " app - " + i);
            i++;
            break;
          case "startScreenShare":
            this.setState({ publishers, subscribers, meta });
            console.log(eventName + " - " + i + " app - " + i);
            i++;
            break;
          case "endScreenShare":
            this.setState({ publishers, subscribers, meta });
            console.log(eventName + " - " + i + " app - " + i);
            i++;
            break;
          case "error":
            console.log(eventName + " - " + i + " app - " + i);
            i++;
            break;

          // -------------------- Communication Events ------------------
          case "startCall":
            console.log(eventName + " - " + i + " app - " + i);
            i++;
            break;
          // case "endCall":
          //   console.log(eventName + " - " + i + " app - " + i);
          //   i++;
          //   break;
          case "callPropertyChanged":
            console.log(eventName + " - " + i + " app - " + i);
            i++;
            break;
          case "subscribeToCamera":
            this.setState({ publishers, subscribers, meta });
            console.log(eventName + " - " + i + " app - " + i);
            i++;
            break;
          case "subscribeToScreen":
            this.setState({ publishers, subscribers, meta });
            console.log(eventName + " - " + i + " app - " + i);
            i++;
            break;
          case "subscribeToSip":
            console.log(eventName + " - " + i + " app - " + i);
            i++;
            break;
          case "unsubscribeFromCamera":
            this.setState({ publishers, subscribers, meta });
            console.log(eventName + " - " + i + " app - " + i);
            i++;
            break;
          case "unsubscribeFromSip":
            console.log(eventName + " - " + i + " app - " + i);
            i++;
            break;
          case "unsubscribeFromScreen":
            this.setState({ publishers, subscribers, meta });
            console.log(eventName + " - " + i + " app - " + i);
            i++;
            break;
          case "startViewingSharedScreen":
            console.log(eventName + " - " + i + " app - " + i);
            i++;
            break;
          case "endViewingSharedScreen":
            console.log(eventName + " - " + i + " app - " + i);
            i++;
            break;

          // ----------------------- TextChat Events --------------------
          // case "showTextChat":
          //   console.log(eventName + " - " + i + " app - " + i);
          //   i++;
          //   break;
          // case "hideTextChat":
          //   console.log(eventName + " - " + i + " app - " + i);
          //   i++;
          //   break;
          case "messageSent":
            console.log(eventName + " - " + i + " app - " + i);
            i++;
            break;
          case "errorSendingMessage":
            console.log(eventName + " - " + i + " app - " + i);
            i++;
            break;
          case "messageReceived":
            console.log(eventName + " - " + i + " app - " + i);
            i++;
            break;

          // -------------------- ScreenSharing Events ------------------
          // screenSharing
          case "startScreenSharing":
            console.log(eventName + " - " + i + " app - " + i);
            i++;
            break;
          case "endScreenSharing":
            console.log(eventName + " - " + i + " app - " + i);
            i++;
            break;
          case "screenSharingError":
            console.log(eventName + " - " + i + " app - " + i);
            i++;
            break;

          // annotation
          case "startAnnotation":
            console.log(eventName + " - " + i + " app - " + i);
            i++;
            break;
          case "linkAnnotation":
            console.log(eventName + " - " + i + " app - " + i);
            i++;
            break;
          case "resizeCanvas":
            console.log(eventName + " - " + i + " app - " + i);
            i++;
            break;
          case "annotationWindowClosed":
            console.log(eventName + " - " + i + " app - " + i);
            i++;
            break;
          case "endAnnotation":
            console.log(eventName + " - " + i + " app - " + i);
            i++;
            break;

          // archiving
          case "startArchive":
            console.log(eventName + " - " + i + " app - " + i);
            i++;
            break;
          case "stopArchive":
            console.log(eventName + " - " + i + " app - " + i);
            i++;
            break;
          case "archiveReady":
            console.log(eventName + " - " + i + " app - " + i);
            i++;
            break;
          case "archiveError":
            console.log(eventName + " - " + i + " app - " + i);
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
      console.log("endCall - " + i + " app - " + i);
      // console.log("window.callStatus", window.callStatus);
      i++;
    });
    otCore.on("signal", event => {
      console.log(event);
      console.log(this.state);
      console.log(this.state.modal);
      console.log("signal - " + i + " app - " + i);

      if (JSON.parse(event.data) === "endCall") {
        if(this.state.modal){
            this.toggleCallRingModal();
        }
        callState = false;
      } else if (JSON.parse(event.data) === "startCall") {
        callState = true;
      }

      i++;

    });
  }


  render() {
    return (
      <Provider store={configureStore()}>
        <Router basename="/">
          <div>
            <Switch>
              {indexRoutes.map((prop, key) => {
                return (
                  <Route
                    path={prop.path}
                    key={key}
                    component={prop.component}
                  />
                );
              })}
            </Switch>
            <Modal
              isOpen={this.state.modal}
              toggle={this.toggleCallRingModal}
              className={this.props.className}
            >
              <ModalBody>
                <div className="intro-banner-vdo-play-btn pinkBg mb-5">
                  <img
                    src={userimg}
                    alt="user"
                    className="rounded-circle call-img"
                    width="100"
                  />
                  <span className="ripple pinkBg" />
                  <span className="ripple pinkBg" />
                  <span className="ripple pinkBg" />
                </div>
                <div align="center">
                  <h2>Buddhi Hasanka</h2>
                  <h6>is calling...</h6>
                  <br />
                  <Link
                    to="/videoCall"
                    onClick={this.answerCall}
                    type="button"
                    className="btn btn-success btn-circle btn-xl mr-5 "
                  >
                    <i className="mdi mdi-phone" />
                  </Link>
                  <button
                    onClick={this.endCall}
                    type="button"
                    className="btn btn-danger btn-circle btn-xl ml-5"
                  >
                    <i className="mdi mdi-phone-hangup" />
                  </button>
                  <br />
                  <br />
                </div>
              </ModalBody>
            </Modal>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

{
  /* <Link to="/videoCall">
  <Button
    color="success"
    style={{ marginBottom: "1rem" }}
    className="btn float-right"
  >
    <i className="mdi mdi-phone" />
    <span className="ml-2">Make a Call</span>
  </Button>
</Link>; */
}
