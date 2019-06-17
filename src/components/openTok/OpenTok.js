import React, { Component } from 'react';
import Spinner from 'react-spinner';
import classNames from 'classnames';

import AccCore from 'opentok-accelerator-core';
import 'opentok-solutions-css';

// import logo from './logo.svg';
import config from './config.json';
import './App.css';

let otCore;
const otCoreOptions = {
  credentials: {
    apiKey: config.apiKey,
    sessionId: config.sessionId,
    token: config.token,
  },
  // A container can either be a query selector or an HTML Element
  streamContainers(pubSub, type, data, stream) {
    return {
      publisher: {
        camera: '#cameraPublisherContainer',
        screen: '#screenPublisherContainer',
      },
      subscriber: {
        camera: '#cameraSubscriberContainer',
        screen: '#screenSubscriberContainer',
      },
    }[pubSub][type];
  },
  controlsContainer: '#controls',
  packages: ['textChat'],
  // packages: ['textChat', 'screenSharing', 'annotation'],
  communication: {
    callProperties: null, // Using default
  },
  textChat: {
    name: ['David', 'Paul', 'Emma', 'George', 'Amanda'][Math.random() * 5 | 0], // eslint-disable-line no-bitwise
    waitingMessage: 'Messages will be delivered when other users arrive',
    container: '#chat',
  },
  screenSharing: {
    extensionID: 'plocfffmbcclpdifaikiikgplfnepkpo',
    annotation: true,
    externalWindow: false,
    dev: true,
    screenProperties: {
      insertMode: 'append',
      width: '100%',
      height: '100%',
      showControls: false,
      style: {
        buttonDisplayMode: 'off',
      },
      videoSource: 'window',
      fitMode: 'contain' // Using default
    },
  },
  annotation: {
    absoluteParent: {
      publisher: '.openTok-video-container',
      subscriber: '.openTok-video-container'
    }
  },
};


/**
 * Build classes for container elements based on state
 * @param {Object} state
 */
const containerClasses = (state) => {
  const { active, meta, localAudioEnabled, localVideoEnabled } = state;
  const sharingScreen = meta ? !!meta.publisher.screen : false;
  const viewingSharedScreen = meta ? meta.subscriber.screen : false;
  const activeCameraSubscribers = meta ? meta.subscriber.camera : 0;
  const activeCameraSubscribersGt2 = activeCameraSubscribers > 2;
  const activeCameraSubscribersOdd = activeCameraSubscribers % 2;
  const screenshareActive = viewingSharedScreen || sharingScreen;
  return {
    controlClass: classNames('openTok-control-container', { hidden: !active }),
    localTransferClass: classNames('ots-video-control circle circle-transfer', { hidden: !active, muted: !localAudioEnabled }),
    localPrescriptionClass: classNames('ots-video-control circle circle-prescription', { hidden: !active, muted: !localAudioEnabled }),
    localAudioClass: classNames('ots-video-control circle audio', { hidden: !active, muted: !localAudioEnabled }),
    localVideoClass: classNames('ots-video-control circle video', { hidden: !active, muted: !localVideoEnabled }),
    localCallClass: classNames('ots-video-control circle end-call', { hidden: !active }),
    cameraPublisherClass: classNames('video-container', { hidden: !active, small: !!activeCameraSubscribers || screenshareActive, left: screenshareActive }),
    screenPublisherClass: classNames('video-container', { hidden: !active || !sharingScreen }),
    cameraSubscriberClass: classNames('video-container', { hidden: !active || !activeCameraSubscribers },
      { 'active-gt2': activeCameraSubscribersGt2 && !screenshareActive },
      { 'active-odd': activeCameraSubscribersOdd && !screenshareActive },
      { small: screenshareActive }
    ),
    screenSubscriberClass: classNames('video-container', { hidden: !viewingSharedScreen || !active }),
  };
};

const connectingMask = () =>
  <div className="openTok-mask">
    <Spinner />
    <div className="message with-spinner">Connecting</div>
  </div>;

const startCallMask = start =>
  <div className="openTok-mask">
    <button className="message button clickable" onClick={start}>Click to Start Call </button>
  </div>;

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
      localVideoEnabled: true,
    };
    this.startCall = this.startCall.bind(this);
    this.endCall = this.endCall.bind(this);
    this.toggleLocalAudio = this.toggleLocalAudio.bind(this);
    this.toggleLocalVideo = this.toggleLocalVideo.bind(this);
    

    // otCore.session.addEventListener();

    // this.sessionEventHandlers = {
    //   sessionConnected: () => {
    //     console.log('Connected');
        
    //     this.setState({ connection: 'Connected' });
    //   },
    //   sessionDisconnected: () => {
    //     this.setState({ connection: 'Disconnected' });
    //   },
    //   sessionReconnected: () => {
    //     this.setState({ connection: 'Reconnected' });
    //   },
    //   sessionReconnecting: () => {
    //     this.setState({ connection: 'Reconnecting' });
    //   },
    // };
  }

  

  componentDidMount() {
    otCore = new AccCore(otCoreOptions);
    otCore.connect().then(() => this.setState({ connected: true })).catch(error => console.log(error));;
    const events = [
      'subscribeToCamera',
      'unsubscribeFromCamera',
      'subscribeToScreen',
      'unsubscribeFromScreen',
      'startScreenShare',
      'endScreenShare',
    ];

    events.forEach(event => otCore.on(event, ({ publishers, subscribers, meta }) => {
      this.setState({ publishers, subscribers, meta });
    }));
  }

  startCall() {
    console.log(otCore);
    console.log(otCore.eventListeners);
    console.log(otCore.eventListeners.connected);
    console.log(otCore.state());
    
    otCore.startCall()
      .then(({ publishers, subscribers, meta }) => {
        this.setState({ publishers, subscribers, meta, active: true });
      }).catch(error => console.log(error));
  }

  endCall() {
    otCore.endCall();
    this.setState({ active: false });
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
      screenSubscriberClass,
    } = containerClasses(this.state);

    return (
      <div className="openTok">
        <div className="openTok-main">
          <div className="openTok-video-container">
            { !connected && connectingMask() }
            { connected && !active && startCallMask(this.startCall)}
            <div id="cameraPublisherContainer" className={cameraPublisherClass} />
            <div id="screenPublisherContainer" className={screenPublisherClass} />
            <div id="cameraSubscriberContainer" className={cameraSubscriberClass} />
            <div id="screenSubscriberContainer" className={screenSubscriberClass} />
          </div>
          <div id="controls" className={controlClass}>
            <div title="Transfer" className={localTransferClass} onClick={this.props.transferHandler}><i className="mdi mdi-transfer" /></div>
            <div title="Prescription" className={localPrescriptionClass} onClick={this.props.prescriptionHandler}><i className="mdi mdi-medical-bag" /></div>
            <div title="Audio" className={localAudioClass} onClick={this.toggleLocalAudio} />
            <div title="Video" className={localVideoClass} onClick={this.toggleLocalVideo} />
            <div title="End Call" className={localCallClass} onClick={this.endCall} />
          </div>
          {/* <div id="chat" className="openTok-chat-container" /> */}
        </div>
      </div>
    );
  }
}

export default OpenTok;
