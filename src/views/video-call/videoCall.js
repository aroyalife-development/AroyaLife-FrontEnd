import React, { Component, Fragment, PropTypes } from "react";
import { Prompt } from "react-router";
import {
  TodoList,
  RecentComment,
  MonthTable,
  CardProfile,
  Feeds,
  CardContact,
  BrowserStats
} from "../../components/dashboard/index.js";
import Chat from "../../components/customizedChat/chat";
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
import axios from "axios";
import { environment } from "../../environments";

class videoCall extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.modelToggle = this.modelToggle.bind(this);

    this.state = {
      modal: false,
      activeTab: "1",
      recoCard: "",
      reco: [],
      recommendation: "",
      callStatus: false
    };

    this.OpenTok = React.createRef();

    this.socket = window.socket;
    this.currentAppointment = JSON.parse(
      localStorage.getItem("currentAppointment")
    );
    console.log("this.currentAppointment 01 -- ", this.currentAppointment);

    this.submitRecommendation = this.submitRecommendation.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.changeCallStatus = this.changeCallStatus.bind(this);
  }

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

  changeCallStatus(status) {
    this.setState({
      callStatus: status
    });
  }

  onInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async submitRecommendation(event) {
    console.log(this.state.recommendation);

    let endCallStatus = false;

    if (this.state.callStatus) {
      if (this.currentAppointment.id) {
        var bodyFormData = new FormData();
        bodyFormData.set("details", this.state.recommendation);
        bodyFormData.set("appointmentId", this.currentAppointment.id);
        bodyFormData.set("recommendType", "prescription");

        await axios({
          method: "post",
          url: environment.baseUrl + "recommendation",
          data: bodyFormData,
          config: { headers: { "Content-Type": "multipart/form-data" } }
        })
          .then(function(response) {
            console.log(response);
            endCallStatus = true;
          })
          .catch(function(response) {
            console.log(response);
          });
      } else {
        console.log("===============================");
        console.log("currentAppointment Not Exist");
        console.log("===============================");
      }
    } else {
      console.log("Can not save recommendation before start call!");
    }

    if (endCallStatus) {
      this.currentAppointment = JSON.parse(
        localStorage.getItem("currentAppointment")
      );
      console.log("this.currentAppointment 02 -- ", this.currentAppointment);

      if (this.currentAppointment) {
        this.socket.emit("endCall", {
          appointment: this.currentAppointment.id,
          sender: this.currentAppointment.patient.user.id,
          receiver: this.currentAppointment.provider.user.id
        });
        // localStorage.removeItem("currentAppointment");
        // localStorage.removeItem("credentials");
        this.OpenTok.current.endCall();
      }
    }
  }

  render() {
    const isProvider =
      JSON.parse(localStorage.getItem("currentUser")).role.name === "Provider";
    return (
      <Fragment>
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
                    changeCallStatus={this.changeCallStatus}
                    ref={this.OpenTok}
                  />
                </div>
              </CardBody>
              <div>
                <hr className="mt-0 mb-0" />
              </div>
            </Card>
          </Col>

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
                {/* <NavItem>
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
                </NavItem> */}
                {isProvider && (
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
                )}
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <Row>
                    <Col sm="12">
                      <Chat />
                    </Col>
                  </Row>
                </TabPane>
                {/* <TabPane tabId="2">
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
                </TabPane> */}
                {isProvider && (
                  <TabPane tabId="3">
                    <Row>
                      <Col sm="12">
                        <Card>
                          <CardBody>
                            <Label>Recommendation</Label>
                            <Input
                              type="textarea"
                              rows="5"
                              placeholder="Add recommendation here..."
                              onChange={this.onInputChange}
                              name="recommendation"
                            />
                            <Button
                              onClick={this.submitRecommendation}
                              type="submit"
                            >
                              Submit
                            </Button>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </TabPane>
                )}
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
