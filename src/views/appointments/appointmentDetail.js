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

class AppointmentDet extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.togglereco = this.togglereco.bind(this);
    this.state = {
      activeTab: "1",
      modal: false,
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

  render() {
    const data = this.state.jsonData.map((prop, key) => {
      return {
        id: key,
        dateTime: prop.appointDateTime,
        name: prop.patient.user.accName,
        type: prop.patient.user.type,
        status: prop.status,
        callDate: prop.callLog.callDate,
        callTime: prop.callLog.callTime,
        duration: prop.callLog.duration,
        status: prop.callLog.status,
        actions: (
          // we've added some custom button actions
          <div className="text-center">
            {/* use this button to add a edit kind of action */}
            {/* <Button
              onClick={() => {
                let obj = data.find(o => o.id === key);
                // this.setState({
                //   modal: !this.state.modal,
                //   obj: obj
                // });
                let path = `appointmentDetails`;
                this.props.history.push({
                  pathname: path,
                  state: { id: obj.id }
                });
              }}
              color="inverse"
              size="sm"
              round="true"
              icon="true"
            >
              <i className="fa fa-edit" />
            </Button> */}
            {/* use this button to remove the data row */}
            {/* <Button
              onClick={() => {
                let newdata = data2;
                newdata.find((o, i) => {
                  if (o.id === key) {
                    newdata.splice(i, 1);
                    console.log(newdata);
                    return true;
                  }
                  return false;
                });
                this.setState({ jsonData: newdata });
              }}
              className="ml-1"
              color="danger"
              size="sm"
              round="true"
              icon="true"
            >
              <i className="fa fa-times" />
            </Button> */}
          </div>
        )
      };
    });

    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.togglereco}>
          <ModalHeader togglereco={this.togglereco}>
            Call Log Details
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
              View Recommendation
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
                  </h5>
                  <h5>
                    <Badge color="secondary" className="ml-3" pill>
                      email
                    </Badge>
                  </h5>
                </div>
              </Col>
              <Col></Col>
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
