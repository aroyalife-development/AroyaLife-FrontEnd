import React, { Component, Fragment, PropTypes } from "react";
import { Prompt } from "react-router";
import ChatList from "../../containers/chat/chatList";
import ChatSearch from "../../containers/chat/chatSearch";
import ChatContent from "../../containers/chat/chatContent";
import ChatMsgSend from "../../containers/chat/chatMsgSend";
import {
  Collapse,
  Button,
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardImg,
  CardTitle,
  UncontrolledCollapse,
  Fade,
  Row,
  Input,
  FormGroup,
  Label,
  Form,
  Col
} from "reactstrap";

import img1 from "../../assets/images/big/img1.jpg";
import img2 from "../../assets/images/big/img2.jpg";
import OpenTok from "../../components/openTok/OpenTok";

import userimg from '../../assets/images/users/7.jpg';
import "./videoCall.css";


class videoCall extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggle1 = this.toggle1.bind(this);
    this.state = { collapse: false, 'modal': false };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }
  toggle1() {
    this.setState({
      'modal': !this.state.modal
    });
  }

  transfer() {
    console.log("transfer");
  }

  render() {
    return (
      <Fragment>
        {/* <div>
                    <div className="left-part bg-white chat-list">
                        <ChatSearch />
                        <ChatList />
                    </div>
                    <div className="right-part bg-white chat-list">
                        <ChatContent />
                        <ChatMsgSend />
                    </div>
                </div> */}
        <Row>
          <Col xs="12" md="8">
            <div>
              <OpenTok
                prescriptionHandler={this.toggle}
                transferHandler={this.transfer}
              />
            </div>

            {/* <div className="bg-white chat-list"></div> */}
          </Col>
          <Col xs="12" md="4">
            <div className="user-container">
              <div className="d-flex align-items-center p-3 border-bottom">
                <div className="mr-3">
                  <span className="user-img">
                    <img src={userimg} alt="user" className="rounded-circle" width="64" />
                  </span>
                </div>
                <div>
                  <h5 className="message-title mb-0">James Johnson</h5>
                  <p className="mb-0">
                    <span className="mdi mdi-brightness-1 heartbit" style={{ color: "green" }}></span>
                    online</p>
                </div>
              </div>
            </div>

            <div>
              <div id="chat" className="openTok-chat-container" />
            </div>
            {/* <div className="bg-white chat-list">
              <ChatContent />
              <ChatMsgSend />
            </div> */}

            <div className="prescription-container">
              <Collapse isOpen={this.state.collapse}>
                <Card className="border">
                  <CardBody>
                    <Form className="form-material">
                      <FormGroup>
                        <Label>Add Prescription Here</Label>
                        <Input type="textarea" rows="4" />
                        <br />
                        <Button className="btn" color="success">
                          Submit
                        </Button>
                      </FormGroup>
                    </Form>
                  </CardBody>
                </Card>
              </Collapse>
            </div>
          </Col>
          <Col xs="12" md="6">
            <Card>
              <CardTitle className="bg-light border-bottom p-3 mb-0">
                <i className="mdi mdi mdi-tablet mr-2"> </i>
                Modals
              </CardTitle>

              <CardBody className="">
                <Button color="danger" onClick={this.toggle1}>
                  Launch Modal
                </Button>
                <Modal
                  isOpen={this.state.modal}
                  toggle={this.toggle1}
                  className={this.props.className}
                >
                  <ModalBody>
                    <div class="intro-banner-vdo-play-btn pinkBg" >

                      <img
                        src={userimg}
                        alt="user"
                        className="rounded-circle call-img"
                        width="100"
                      />
                      <span class="ripple pinkBg"></span>
                      <span class="ripple pinkBg"></span>
                      <span class="ripple pinkBg"></span>

                    </div>
                    {/* <center> */}
                    <div align="center">
                      <br />
                      <br />
                      <br />
                      <br />
                      <h2>Buddhi Hasanka</h2>
                      <h6>is calling...</h6>
                      <br />
                      <button type="button" className="btn btn-success btn-circle btn-xl mr-5 ">
                        <i className="mdi mdi-phone"></i>
                      </button>

                      <button type="button" className="btn btn-danger btn-circle btn-xl ml-5">
                        <i className="mdi mdi-phone-hangup"></i>
                      </button>
                      <br />
                      <br />
                    </div>
                    {/* </center> */}
                  </ModalBody>

                </Modal>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default videoCall;
