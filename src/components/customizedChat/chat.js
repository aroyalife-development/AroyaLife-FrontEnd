import React from "react";
import ReactDOM from "react-dom";
import { Card, CardBody, Form, Input, Row, Col, Button } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import Message from "./message.js";

import user1 from "../../assets/images/users/1.jpg";
import user2 from "../../assets/images/users/2.jpg";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: []
    };
    this.submitMessage = this.submitMessage.bind(this);
    this.socket = window.socket;

    this.currentUserId = null;
    this.currentUserType = null;
    this.currentAppointmentId = null;

    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let currentAppointment = JSON.parse(
      localStorage.getItem("currentAppointment")
    );

    if (currentUser && currentUser.id) {
      this.currentUserId = currentUser.id;
      this.currentUserType = currentUser.role.name;
    }
    if (currentAppointment && currentAppointment.id) {
      this.currentAppointmentId = currentAppointment.id;
    }
  }

  componentDidMount() {
    this.scrollToBot();

    this.socket.emit("getChatList", {
      appointment: this.currentAppointmentId
    });

    this.socket.on("updateChat", data => {
      console.log(data);

      if (this.currentAppointmentId === data.appointment) {
        this.setState(
          {
            chats: data.chatList
          },
          () => {
            ReactDOM.findDOMNode(this.msg).value = "";
          }
        );
      }
    });
  }

  componentDidUpdate() {
    this.scrollToBot();
  }

  scrollToBot() {
    ReactDOM.findDOMNode(this.chats).scrollTop = ReactDOM.findDOMNode(
      this.chats
    ).scrollHeight;
  }

  submitMessage(e) {
    if (this.currentUserId && this.currentAppointmentId) {
      e.preventDefault();
      this.socket.emit("sendMSG", {
        user: this.currentUserId,
        appointment: this.currentAppointmentId,
        msg: ReactDOM.findDOMNode(this.msg).value,
        img: this.currentUserType === "Patient" ? user1 : user2
      });
    }
  }

  render() {
    const username = this.currentUserId;
    const { chats } = this.state;
    return (
      /*--------------------------------------------------------------------------------*/
      /* Used In Dashboard-4                                                            */
      /*--------------------------------------------------------------------------------*/
      <Card>
        <CardBody>
          {/* <h5 className="mb-4">Recent Chats</h5> */}
          <div className="chat-box" style={{ height: "350px" }}>
            <PerfectScrollbar>
              <ul
                className="chat-list p-4"
                ref={e => {
                  this.chats = e;
                }}
              >
                {chats.map((chat, index) => (
                  <Message key={index} chat={chat} user={username} />
                ))}
              </ul>
            </PerfectScrollbar>
          </div>
          <div className="border-top pt-4">
            <Form onSubmit={e => this.submitMessage(e)}>
              <Row>
                <Col xs="9">
                  <div className="input-field mt-0 mb-0">
                    <Input
                      placeholder="Type and enter"
                      // ref="msg"
                      ref={d => {
                        this.msg = d;
                      }}
                      className="form-control border-0"
                      type="text"
                    />
                  </div>
                </Col>
                <Col xs="3">
                  <Button
                    className="btn btn-circle btn-lg btn-info float-right text-white"
                    type="submit"
                    value="submit"
                  >
                    <i className="fas fa-paper-plane" />
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default Chat;
