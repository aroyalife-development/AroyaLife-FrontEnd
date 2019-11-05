import React, { Component } from "react";
import indexRoutes from "./routes/";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "./redux/store";
import userimg from "./assets/images/users/7.jpg";
import AccCore from "opentok-accelerator-core";
import config from "./components/openTok/config.json";
import "./views/video-call/videoCall.css";
import { Modal, ModalBody, Button } from "reactstrap";

import socketIOClient from "socket.io-client";
import axios from "axios";

// Add a request interceptor
// axios.interceptors.request.use(function(config) {
//   const token =
//     "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiU1MiLCJRUyIsIlBTIiwiQVVTIl0sInVzZXJfdHlwZSI6IkFVIiwidXNlcl9pZCI6IjM5ZTQ4ZjNmN2JkOGQ1YzIzNzI1MzNiYzI0ZjE4MmI3IiwidXNlcl9uYW1lIjoiaGJoLmhhc2Fua2EuYnVkZGkuaGFzYW5rYUBnbWFpbC5jb20iLCJzY29wZSI6WyJBUCJdLCJleHAiOjE1NzIyNTk0MjcsImF1dGhvcml0aWVzIjpbImEtcyIsInAtYyIsIm9wYXNzLWMiLCJhLXYiLCJndCIsImYtdWkiLCJwci1zcyIsImEtYyIsInAtcyIsInAtdiIsIm9wcm9mLXUiLCJvcHJvZi12IiwicHItdiIsInUtdiJdLCJqdGkiOiIyOTIyZTI0NC0zZTNiLTRjNTQtYWRlYS00MzczZmU3NDZhYzkiLCJjbGllbnRfaWQiOiJDUEFQIn0.KvNZ6h9dkMLioCES3HrGqQnfpGQvLv_slxXoGkHo_cK_yqo1PnvhW0UZudnTiI-3bKxnXkh5_H3MIG5jzSFDo1Iu3EezufkNL4eNoiQks4JGnhxtm99hxqOTUS8hnuHC-YS_mYrIhKeTfRXFHEM2Lp119iJk_Fg4Y_loFxWc2xOT_-H1ptJfguzopB7DjzW-vw-DTHhidDWdvzIpAFPTL3YodrCyxJhDRtVYtbhMAkPNybOkBIVmFss_RuYCTZQ5cih2_vHm9FE0_EvkafyaoYbg_XLJ6EVGHYnpNmRiAOa7-iLzLrEyFr3cIzMudWfYT1CMCH9p9m-b-Iv3UUlEJA";
//   config.headers.Authorization = token;
//   return config;
// });

// axios.interceptors.request.use(
//   config => {
//     const token =
//       "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiU1MiLCJRUyIsIlBTIiwiQVVTIl0sInVzZXJfdHlwZSI6IkFVIiwidXNlcl9pZCI6IjM5ZTQ4ZjNmN2JkOGQ1YzIzNzI1MzNiYzI0ZjE4MmI3IiwidXNlcl9uYW1lIjoiaGJoLmhhc2Fua2EuYnVkZGkuaGFzYW5rYUBnbWFpbC5jb20iLCJzY29wZSI6WyJBUCJdLCJleHAiOjE1NzIyNTk0MjcsImF1dGhvcml0aWVzIjpbImEtcyIsInAtYyIsIm9wYXNzLWMiLCJhLXYiLCJndCIsImYtdWkiLCJwci1zcyIsImEtYyIsInAtcyIsInAtdiIsIm9wcm9mLXUiLCJvcHJvZi12IiwicHItdiIsInUtdiJdLCJqdGkiOiIyOTIyZTI0NC0zZTNiLTRjNTQtYWRlYS00MzczZmU3NDZhYzkiLCJjbGllbnRfaWQiOiJDUEFQIn0.KvNZ6h9dkMLioCES3HrGqQnfpGQvLv_slxXoGkHo_cK_yqo1PnvhW0UZudnTiI-3bKxnXkh5_H3MIG5jzSFDo1Iu3EezufkNL4eNoiQks4JGnhxtm99hxqOTUS8hnuHC-YS_mYrIhKeTfRXFHEM2Lp119iJk_Fg4Y_loFxWc2xOT_-H1ptJfguzopB7DjzW-vw-DTHhidDWdvzIpAFPTL3YodrCyxJhDRtVYtbhMAkPNybOkBIVmFss_RuYCTZQ5cih2_vHm9FE0_EvkafyaoYbg_XLJ6EVGHYnpNmRiAOa7-iLzLrEyFr3cIzMudWfYT1CMCH9p9m-b-Iv3UUlEJA";
//     if (token) {
//       config.headers["Authorization"] = "Bearer " + token;
//     }
//     config.headers['Content-Type'] = 'application/json';
//     return config;
//   },
//   error => {
//     Promise.reject(error);
//   }
// );

class App extends Component {
  constructor(props) {
    super(props);
    this.toggleCallRingModal = this.toggleCallRingModal.bind(this);
    this.endCall = this.endCall.bind(this);
    this.answerCall = this.answerCall.bind(this);
    this.state = { collapse: false, modal: false };
    this.state = {
      endpoint: "localhost:4001",
      ///
      color: "white"
      ///
    };
    this.socket = window.socket = socketIOClient(this.state.endpoint);
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (this.currentUser) {
      this.socket.emit("initUser", {
        id: this.socket.id,
        user: this.currentUser
      });
    }
    console.log("INIT - ", socket.id);
  }

  componentDidMount() {
    this.socket.on("test01", col => {
      console.log("TEST01 - ", col);
    });
    this.socket.on("test02", col => {
      console.log("TEST02 - ", col);
    });

    this.socket.on("startCall", data => {
      this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (this.currentUser && this.currentUser.id === data.receiver) {
        localStorage.setItem(
          "currentAppointment",
          JSON.stringify(data.appointment)
        );
        localStorage.setItem("credentials", JSON.stringify(data.credentials));
        this.toggleCallRingModal();
      }
    });

    this.socket.on("endCall", data => {

      this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
      let currentAppointment = JSON.parse(localStorage.getItem("currentAppointment"));

      console.log("endCall - ", data);
      console.log("this.currentUser - ", this.currentUser);
      console.log("currentAppointment  - ", currentAppointment );


      if (this.currentUser && currentAppointment) {
        if (
          (this.currentUser.id === data.receiver ||
            this.currentUser.id === data.sender) &&
          currentAppointment.id === data.appointment
        ) {
          console.log("IN APP END CALL");
          
          localStorage.removeItem("currentAppointment");
          localStorage.removeItem("credentials");
          // let path = "appointments";
          // this.props.history.push(path);
          // setTimeout(() => this.props.history.push(path), 3000);
          window.location = "/appointments"
        }
      }
    });
  }

  toggleCallRingModal() {
    this.setState({
      modal: !this.state.modal
    });
  }

  answerCall() {
    this.toggleCallRingModal();
    // props.history.push("/videoCall");
  }

  endCall() {
    this.toggleCallRingModal();
    // NOTE : remove unnecessary objects.
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
