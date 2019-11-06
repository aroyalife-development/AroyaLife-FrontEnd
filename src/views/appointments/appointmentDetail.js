import React, { Component } from "react";
import ReactTable from "react-table";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  CardBody,
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
  Badge,
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";
import classnames from "classnames";
import data from "./data.js";
import axios from "axios";
import { environment } from "../../environments";

class AppointmentDet extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.togglereco = this.togglereco.bind(this);
    this.state = {
      activeTab: "1",
      modal: false,
      appointment: [],
      appointmentFixed: {},
      jsonData: [
        {
          id: "9d0fe08395fbd9add6cfb1b66505fbf9",
          patient: {
            id: "faa6643aca8c5318a9583178795542cf",
            user: {
              id: "faa6643aca8c5318a9583178795542cf",
              accName: "Buddhi",
              type: "type1"
            }
          },
          provider: {
            id: "faa6643aca8c5318a9583178795542cf",
            user: {
              id: "39e48f3f7bd8d5c2372533bc24f182b7",
              accName: "Rashmi",
              type: "type2"
            }
          },
          status: "ongoing",
          appointDateTime: "2019-10-28",
          callLog: {
            callDate: "2019-03-04",
            callTime: "11.00pm",
            duration: "10min",
            status: "completed"
          }
        }
      ],
      userType: 1
    };
    //this.appointment = [];
    this.attachment = [];
    console.log(this.props.location.state.id);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  togglereco() {
    this.setState({
      modal: !this.state.modal
    });
  }

  async componentDidMount() {
    await axios
      .get(environment.baseUrl + "appointment/" + this.props.location.state.id)
      .then(response => {
        console.log("------------------- response - ", response);
        //this.appointment = response.data.content;
        this.setState({ appointment: response.data.content });
        // console.log(
        //   "------------------- appointment - ",
        //   this.state.appointment.patient
        // );
      })
      .catch(error => {
        console.log("------------------- error - ", error);
      });

    const app = this.state.appointment;
    const arr = [];
    if (
      app &&
      app.appointDateTime &&
      app.id &&
      app.patient &&
      app.provider &&
      app.sessionId
    ) {
      arr.push(app);
    }

    this.setState({ appointmentFixed: arr });

    // await axios
    // .get(environment.baseUrl + "appointment/" + this.props.location.state.id + "attachment")
    // .then(response => {
    //   console.log("------------------- response - ", response);
    //   //this.appointment = response.data.content;
    //   //this.setState({ appointment: response.data.content });
    //   console.log(
    //     "------------------- appointment - ",
    //     this.state.appointment
    //   );
    // })
    // .catch(error => {
    //   console.log("------------------- error - ", error);
    // });
  }

  render() {
    console.log("--- this.state.appointmentFixed", this.state.appointmentFixed);

    const data = [];

    const appointment = this.state.appointment;
    // this.state.appointmentFixed.map((prop, key) => {
    //   return {
    //     id: prop.id,
    //     dateTime: prop.appointDateTime
    //   };
    // });

    // const data = this.state.appointmentFixed.map((prop, key) => {
    //   return {
    //     id: prop.id,
    //     dateTime: prop.appointDateTime
    //     //patient: prop.patient.user.accName,
    //     //provider: prop.patient.user.type,
    //     //status: prop.status,
    //     //callDate: prop.callLog.callDate,
    //     //callTime: prop.callLog.callTime,
    //     //duration: prop.callLog.duration,
    //     //status: prop.callLog.status,
    //   };
    // });

    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.togglereco}>
          <ModalHeader togglereco={this.togglereco}>
            Prescription Details
          </ModalHeader>
          <ModalBody></ModalBody>
        </Modal>
        <Breadcrumb>
          <BreadcrumbItem>
            <a href="/appointments">Appointment</a>
          </BreadcrumbItem>
          <BreadcrumbItem active>Appointment Details</BreadcrumbItem>
        </Breadcrumb>

        <Card>
          <CardTitle className="bg-light border-bottom p-3 mb-0">
            <i className="mdi mdi-tab-unselected mr-2"> </i>
            Appointment Details
            <Button
              onClick={() => {
                //   let obj = data.find(o => o.id === key);
                this.setState({
                  modal: !this.state.modal
                  // obj: obj
                });
              }}
              color="primary"
              className="btn float-right"
            >
              <i className="fa fa-folder-open mr-1" />
              View Prescription
            </Button>
          </CardTitle>

          <CardBody className="">
            <Row className="mt-3">
              <Col>
                <div>
                  <h5>
                    <Badge color="secondary" className="ml-3" pill>
                      Patient name
                    </Badge>
                    <span className="ml-1">
                      {appointment.patient && appointment.patient.name}
                    </span>
                    {/* {console.log("appointment.patient - ", appointment.patient)} */}
                  </h5>
                  <h5>
                    <Badge color="secondary" className="ml-3" pill>
                      Provider name
                    </Badge>
                    <span className="ml-1">
                      {appointment.provider && appointment.provider.firstName}
                    </span>
                  </h5>
                </div>
              </Col>
              <Col>
                <div>
                  <h5>
                    <Badge color="secondary" className="ml-3" pill>
                      Appointment Date
                    </Badge>
                    <span className="ml-1">{appointment.appointDateTime}</span>
                  </h5>
                </div>
              </Col>
            </Row>

            <Nav tabs className="mt-3">
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "1"
                  })}
                  onClick={() => {
                    this.toggle("1");
                  }}
                >
                  Call Log
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
                  Attachements
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
                  Notes
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">
                    <Card body>
                      <ReactTable
                        columns={[
                          {
                            Header: "Call Date",
                            accessor: "callDate"
                          },
                          {
                            Header: "Call Time",
                            accessor: "callTime"
                          },
                          {
                            Header: "Call Duration",
                            accessor: "duration"
                          },
                          {
                            Header: "Status",
                            accessor: "status"
                          }
                          // {
                          //   Header: "Actions",
                          //   accessor: "actions",
                          //   sortable: false,
                          //   filterable: false
                          // }
                        ]}
                        defaultPageSize={5}
                        showPaginationBottom={true}
                        className="-striped -highlight"
                        filterable
                        data={data}
                      />
                    </Card>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col sm="12">
                    <Card body>
                      <ReactTable
                        columns={[
                          {
                            Header: "Attachment Name",
                            accessor: "aName"
                          },
                          {
                            Header: "File Size",
                            accessor: "size"
                          },
                          {
                            Header: "Actions",
                            accessor: "actions",
                            sortable: false,
                            filterable: false
                          }
                        ]}
                        defaultPageSize={5}
                        showPaginationBottom={true}
                        className="-striped -highlight"
                        filterable
                        //data={data}
                      />
                    </Card>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="3">
                <Row>
                  <Col sm="12">
                    <Card body>
                      <ReactTable
                        columns={[
                          {
                            Header: "Note Name",
                            accessor: "nName"
                          },
                          {
                            Header: "Actions",
                            accessor: "actions",
                            sortable: false,
                            filterable: false
                          }
                        ]}
                        defaultPageSize={5}
                        showPaginationBottom={true}
                        className="-striped -highlight"
                        filterable
                        data={data}
                      />
                    </Card>
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default AppointmentDet;
