// import AccCore from "opentok-accelerator-core";
// import config from "./config.json";

// let callState = false;
// let otCore;
// const otCoreOptions = {
//   credentials: {
//     apiKey: config.apiKey,
//     sessionId: config.sessionId,
//     token: config.token
//   },
//   // A container can either be a query selector or an HTML Element
//   streamContainers(pubSub, type, data, stream) {
//     return {
//       publisher: {
//         camera: "#cameraPublisherContainer",
//         screen: "#screenPublisherContainer"
//       },
//       subscriber: {
//         camera: "#cameraSubscriberContainer",
//         screen: "#screenSubscriberContainer"
//       }
//     }[pubSub][type];
//   },
//   controlsContainer: "#controls",
//   packages: [],
//   // packages: ['textChat', 'screenSharing', 'annotation'],
//   communication: {
//     callProperties: null // Using default
//   },
//   textChat: {
//     name: ["David", "Paul", "Emma", "George", "Amanda"][
//       (Math.random() * 5) | 0
//     ], // eslint-disable-line no-bitwise
//     waitingMessage: "Messages will be delivered when other users arrive",
//     container: "#chat"
//   },
//   screenSharing: {
//     extensionID: "plocfffmbcclpdifaikiikgplfnepkpo",
//     annotation: true,
//     externalWindow: false,
//     dev: true,
//     screenProperties: {
//       insertMode: "append",
//       width: "100%",
//       height: "100%",
//       showControls: false,
//       style: {
//         buttonDisplayMode: "off"
//       },
//       videoSource: "window",
//       fitMode: "contain" // Using default
//     }
//   },
//   annotation: {
//     absoluteParent: {
//       publisher: ".openTok-video-container",
//       subscriber: ".openTok-video-container"
//     }
//   }
// };

// export class Controller {
//   static sharedInstance =
//     Controller.sharedInstance == null ? new Controller() : this.sharedInstance;

//   // getConnectedState() {
//   //   return connected;
//   // }

//   // getOTCore() {
//   //   return otCore;
//   // }

//   connectOT() {
//     otCore = new AccCore(otCoreOptions);
//     otCore
//       .connect()
//       .then(() => {
//         window.connected = true;
//         window.otCore = otCore;
//         console.log("------------------------------------------ connected");
//         console.log("--------------------- Ser 1 - ", window.connected);
//       })
//       .catch(error => console.log(error));

//     const events = [
//       "archiveStarted",
//       "archiveStopped",
//       "connectionCreated",
//       "connectionDestroyed",
//       "sessionConnected",
//       "sessionDisconnected",
//       "sessionReconnected",
//       "sessionReconnecting",
//       "signal",
//       "streamCreated",
//       "streamDestroyed",
//       // "streamPropertyChanged",

//       "connected",
//       "startScreenShare",
//       "endScreenShare",
//       "error",

//       "startCall",
//       // "endCall",
//       "callPropertyChanged",
//       "subscribeToCamera",
//       "subscribeToScreen",
//       "subscribeToSip",
//       "unsubscribeFromCamera",
//       "unsubscribeFromSip",
//       "unsubscribeFromScreen",
//       "startViewingSharedScreen",
//       "endViewingSharedScreen",

//       // "showTextChat",
//       // "hideTextChat",
//       "messageSent",
//       "errorSendingMessage",
//       "messageReceived",

//       "startScreenSharing",
//       "endScreenSharing",
//       "screenSharingError",

//       "startAnnotation",
//       "linkAnnotation",
//       "resizeCanvas",
//       "annotationWindowClosed",
//       "endAnnotation",

//       "startArchive",
//       "stopArchive",
//       "archiveReady",
//       "archiveError"
//     ];

//     // events.forEach(event => otCore.on(event, ({ publishers, subscribers, meta }) => {
//     //   this.setState({ publishers, subscribers, meta });
//     //   console.log(event);
//     // }));

//     let i = 0;

//     events.forEach(eventName =>
//       otCore.on(eventName, ({ publishers, subscribers, meta }) => {
//         // this.setState({ publishers, subscribers, meta });
//         console.log({ publishers, subscribers, meta });
//         console.log(this.state);

//         switch (eventName) {
//           // session
//           case "archiveStarted":
//             console.log(eventName + " - " + i + " - " + i);
//             i++;
//             break;
//           case "archiveStopped":
//             console.log(eventName + " - " + i + " - " + i);
//             i++;
//             break;
//           case "connectionCreated":
//             // this.startCall();
//             console.log(eventName + " - " + i + " - " + i);
//             i++;
//             break;
//           case "connectionDestroyed":
//             console.log(eventName + " - " + i + " - " + i);
//             i++;
//             break;
//           case "sessionConnected":
//             console.log(eventName + " - " + i + " - " + i);
//             i++;
//             break;
//           case "sessionDisconnected":
//             console.log(eventName + " - " + i + " - " + i);
//             i++;
//             break;
//           case "sessionReconnected":
//             console.log(eventName + " - " + i + " - " + i);
//             i++;
//             break;
//           case "sessionReconnecting":
//             console.log(eventName + " - " + i + " - " + i);
//             i++;
//             break;
//           case "signal":
//             console.log(eventName + " - " + i + " - " + i);
//             i++;
//             break;
//           case "streamCreated":
//             console.log(eventName + " - " + i + " - " + i);
//             i++;
//             break;
//           case "streamDestroyed":
//             console.log(eventName + " - " + i + " - " + i);
//             i++;
//             break;
//           case "streamPropertyChanged":
//             console.log(eventName + " - " + i + " - " + i);
//             i++;
//             break;

//           // core
//           case "connected":
//             console.log(eventName + " - " + i + " - " + i);
//             i++;
//             break;
//           case "startScreenShare":
//             this.setState({ publishers, subscribers, meta });
//             console.log(eventName + " - " + i + " - " + i);
//             i++;
//             break;
//           case "endScreenShare":
//             this.setState({ publishers, subscribers, meta });
//             console.log(eventName + " - " + i + " - " + i);
//             i++;
//             break;
//           case "error":
//             console.log(eventName + " - " + i + " - " + i);
//             i++;
//             break;

//           // communication
//           case "startCall":
//             console.log(eventName + " - " + i + " - " + i);
//             i++;
//             break;
//           // case "endCall":
//           //   console.log(eventName + " - " + i + " - " + i);
//           //   i++;
//           //   break;
//           case "callPropertyChanged":
//             console.log(eventName + " - " + i + " - " + i);
//             i++;
//             break;
//           case "subscribeToCamera":
//             this.setState({ publishers, subscribers, meta });
//             console.log(eventName + " - " + i + " - " + i);
//             i++;
//             break;
//           case "subscribeToScreen":
//             this.setState({ publishers, subscribers, meta });
//             console.log(eventName + " - " + i + " - " + i);
//             i++;
//             break;
//           case "subscribeToSip":
//             console.log(eventName + " - " + i + " - " + i);
//             i++;
//             break;
//           case "unsubscribeFromCamera":
//             this.setState({ publishers, subscribers, meta });
//             console.log(eventName + " - " + i + " - " + i);
//             i++;
//             break;
//           case "unsubscribeFromSip":
//             console.log(eventName + " - " + i + " - " + i);
//             i++;
//             break;
//           case "unsubscribeFromScreen":
//             this.setState({ publishers, subscribers, meta });
//             console.log(eventName + " - " + i + " - " + i);
//             i++;
//             break;
//           case "startViewingSharedScreen":
//             console.log(eventName + " - " + i + " - " + i);
//             i++;
//             break;
//           case "endViewingSharedScreen":
//             console.log(eventName + " - " + i + " - " + i);
//             i++;
//             break;

//           // textChat
//           // case "showTextChat":
//           //   console.log(eventName + " - " + i + " - " + i);
//           //   i++;
//           //   break;
//           // case "hideTextChat":
//           //   console.log(eventName + " - " + i + " - " + i);
//           //   i++;
//           //   break;
//           case "messageSent":
//             console.log(eventName + " - " + i + " - " + i);
//             i++;
//             break;
//           case "errorSendingMessage":
//             console.log(eventName + " - " + i + " - " + i);
//             i++;
//             break;
//           case "messageReceived":
//             console.log(eventName + " - " + i + " - " + i);
//             i++;
//             break;

//           // screenSharing
//           case "startScreenSharing":
//             console.log(eventName + " - " + i + " - " + i);
//             i++;
//             break;
//           case "endScreenSharing":
//             console.log(eventName + " - " + i + " - " + i);
//             i++;
//             break;
//           case "screenSharingError":
//             console.log(eventName + " - " + i + " - " + i);
//             i++;
//             break;

//           // annotation
//           case "startAnnotation":
//             console.log(eventName + " - " + i + " - " + i);
//             i++;
//             break;
//           case "linkAnnotation":
//             console.log(eventName + " - " + i + " - " + i);
//             i++;
//             break;
//           case "resizeCanvas":
//             console.log(eventName + " - " + i + " - " + i);
//             i++;
//             break;
//           case "annotationWindowClosed":
//             console.log(eventName + " - " + i + " - " + i);
//             i++;
//             break;
//           case "endAnnotation":
//             console.log(eventName + " - " + i + " - " + i);
//             i++;
//             break;

//           // archiving
//           case "startArchive":
//             console.log(eventName + " - " + i + " - " + i);
//             i++;
//             break;
//           case "stopArchive":
//             console.log(eventName + " - " + i + " - " + i);
//             i++;
//             break;
//           case "archiveReady":
//             console.log(eventName + " - " + i + " - " + i);
//             i++;
//             break;
//           case "archiveError":
//             console.log(eventName + " - " + i + " - " + i);
//             i++;
//             break;

//           default:
//             break;
//         }
//       })
//     );

//     otCore.on("endCall", event => {
//       console.log(event);
//       console.log(this.state);
//       console.log("endCall" + " - " + i);
//       i++;
//     });
//   }
// }


