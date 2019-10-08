import React, { Component, Fragment, PropTypes } from "react";
import { Prompt } from "react-router";
import {
  TodoList,
  RecentComment,
  MonthTable,
  CardProfile,
  Feeds,
  Chat,
  CardContact,
  BrowserStats
} from "../../components/dashboard/index.js";
import {
  Collapse,
  Badge,
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
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Progress,
  CardSubtitle
} from "reactstrap";

import classnames from "classnames";

import img1 from "../../assets/images/big/img1.jpg";
import img2 from "../../assets/images/big/img2.jpg";
import OpenTok from "../../components/openTok/OpenTok";

import userimg from "../../assets/images/users/7.jpg";
import "./videoCall.css";

class videoCall extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.modelToggle = this.modelToggle.bind(this);

    this.state = {
      collapse: false,
      modal: false,
      activeTab: "1",
      recoCard: "",
      reco: []
    };
  }

  // toggle() {
  //   this.setState({ collapse: !this.state.collapse });
  // }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  modelToggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  transfer() {
    console.log("transfer");
  }
  handleChange = e => {
    this.setState({
      recoCard: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      recoCard: "",
      reco: [...this.state.reco, this.state.recoCard],
      modal: !this.state.modal
    });
  };

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
          <Col xs="12" md="8" lg="8">
            <Card>
              <CardBody>
                <CardTitle>Welcome</CardTitle>
                <CardSubtitle className="mb-3">
                  Online Video Call Section
                </CardSubtitle>
                <div>
                  <OpenTok
                    prescriptionHandler={this.toggle}
                    transferHandler={this.transfer}
                  />
                </div>
              </CardBody>
              <div>
                <hr className="mt-0 mb-0" />
              </div>
            </Card>

            {/* <div className="bg-white chat-list"></div> */}
          </Col>
          {/* <Col xs="12" md="4"> */}
          {/* <div className="user-container">
              <div className="d-flex align-items-center p-3 border-bottom">
                <div className="mr-3">
                  <span className="user-img">
                    <img
                      src={userimg}
                      alt="user"
                      className="rounded-circle"
                      width="64"
                    />
                  </span>
                </div>
                <div>
                  <h5 className="message-title mb-0">James Johnson</h5>
                  <p className="mb-0">
                    <span
                      className="mdi mdi-brightness-1 heartbit pr-1"
                      style={{ color: "green" }}
                    />
                    online
                  </p>
                </div>
              </div>
            </div> */}

          {/* <div>
              <div id="chat" className="openTok-chat-container" />
            </div> */}
          {/* <--- ---> */}
          {/* <div className="bg-white chat-list">
              <ChatContent />
              <ChatMsgSend />
            </div>

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
            </div> */}
          {/* </Col> */}

          <Col xs="12" md="4" lg="4">
            <Card>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "1"
                    })}
                    onClick={() => {
                      this.toggle("1");
                    }}
                  >
                    <i className="ti-comment-alt"></i>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "2"
                    })}
                    onClick={() => {
                      this.toggle("2");
                    }}
                  >
                    <i className="ti-layers"></i>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "3"
                    })}
                    onClick={() => {
                      this.toggle("3");
                    }}
                  >
                    <i className="ti-pencil-alt"></i>
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <Row>
                    <Col sm="12">
                      <Chat />
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Col sm="12">
                      <Card>
                        <CardBody className="bg-success">
                          <CardTitle className="text-white">
                            Recommendation
                          </CardTitle>
                          <CardSubtitle className="text-white mb-0 op-5">
                            Add recommendation cards here
                          </CardSubtitle>
                        </CardBody>
                        <CardBody>
                          <div className="mailbox position-relative">
                            <h2 className="add-ct-btn">
                              <Button
                                size="lg"
                                className="btn btn-circle text-white btn-info"
                                onClick={this.modelToggle}
                              >
                                +
                              </Button>
                            </h2>
                            {/* <div className="message-center message-body">
                              {this.state.reco.map((item, index) => (
                                <li key={index}>
                                  <div className="d-flex flex-row comment-row mt-0">
                                    <h3>
                                      <Badge color="primary" pill>
                                        Recommendation Card {index + 1}
                                      </Badge>
                                    </h3>
                                    <span className="action-icons ml-2">
                                      <a href="#pencil">
                                        <i className="ti-pencil-alt" />
                                      </a>
                                    </span>
                                  </div>
                                </li>
                              ))}
                            </div> */}
                            <div className="message-center message-body">
                              {this.state.reco.map((item, index) => {
                                return (
                                  <a
                                    href="/"
                                    className="message-item"
                                    key={index}
                                  >
                                    <span className="user-img">
                                      <a href="#pencil">
                                        <i className="ti-pencil-alt" />
                                      </a>
                                    </span>
                                    <div className="mail-contnet">
                                      <h5 className="message-title">
                                        <h3>
                                          <Badge color="primary" pill>
                                            Recommendation Card {index + 1}
                                          </Badge>
                                        </h3>
                                      </h5>
                                      <span className="mail-desc">{item}</span>
                                    </div>
                                  </a>
                                );
                              })}
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="3">
                  <Row>
                    <Col sm="12">
                      <Card>
                        <CardBody>
                          <Label>Add</Label>
                          <Input type="textarea" rows="5" />
                          <Button>Submit</Button>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </Card>
          </Col>
        </Row>

        <Modal
          isOpen={this.state.modal}
          modelToggle={this.modelToggle}
          className={this.props.className}
        >
          <ModalHeader modelToggle={this.modelToggle}>
            Add recommendation here
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Input
                  type="textarea"
                  placeholder="Add here"
                  rows="20"
                  value={this.state.recoCard}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <ModalFooter>
                <Button color="success">Submit</Button>
                <Button color="secondary" onClick={this.modelToggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Form>
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default videoCall;
