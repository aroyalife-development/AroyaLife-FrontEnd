import React, { Component, Fragment } from "react";
import ChatList from "../../containers/chat/chatList";
import ChatSearch from "../../containers/chat/chatSearch";
import ChatContent from "../../containers/chat/chatContent";
import ChatMsgSend from "../../containers/chat/chatMsgSend";
import {
  Collapse,
  Button,
  Card,
  CardBody,
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

class videoCall extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
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
              <div>
                {/* <Button
                  color="warning"
                  // onClick={this.toggle}
                  style={{ marginBottom: "1rem" }}
                  className="btn"
                >
                  <i className="mdi mdi-transfer" />
                </Button> */}
                {/* <Collapse isOpen={this.state.collapse}>
                                    <Card className="border">
                                        <CardBody>
                                            <Form className="form-material">
                                                <FormGroup>
                                                    <Label>Add Prescription</Label>
                                                    <Input type="textarea" rows="4" />
                                                    <br />
                                                    <Button className="btn" color="success">
                                                        Submit
                                                    </Button>
                                                </FormGroup>
                                            </Form>
                                        </CardBody>
                                    </Card>
                                </Collapse> */}
                {/* <Button
                  color="success"
                  onClick={this.toggle}
                  style={{ marginBottom: "1rem" }}
                  className="ml-2"
                >
                  <i className="mdi mdi-medical-bag" />
                </Button> */}

              </div>
            </div>

            {/* <div className="bg-white chat-list"></div> */}
          </Col>
          <Col xs="12" md="4">
            <div>
              <div className="d-flex align-items-center p-3 border-bottom">
                <div className="mr-3">
                  <img src="" alt="user" className="rounded-circle" width="50" />
                </div>
                <div>
                  <h5 className="message-title mb-0">James Johnson</h5>
                  <span className="online"></span>
                  <p className="mb-0">online</p>

                </div>
              </div>
            </div>
            <div id="chat" className="openTok-chat-container" />
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
        </Row>
      </Fragment>
    );
  }
}

export default videoCall;
