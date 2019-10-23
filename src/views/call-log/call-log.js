import React, { Component } from "react";
import ReactTable from "react-table";
import {
  Badge,
  Card,
  CardBody,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row
} from "reactstrap";
import "react-table/react-table.css";
import * as data from "./data.js";

class callLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      obj: {},
      jsonData: data.dataTable
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  render() {
    const data = this.state.jsonData.map((prop, key) => {
      return {
        id: key,
        start: prop[0],
        end: prop[1],
        appointmentid: prop[2],
        status: prop[3],
        receiver: prop[4],
        actions: (
          // we've added some custom button actions
          <div className="text-center">
            {/* use this button to add a edit kind of action */}
            <Button
              onClick={() => {
                let obj = data.find(o => o.id === key);
                this.setState({
                  modal: !this.state.modal,
                  obj: obj
                });
              }}
              color="inverse"
              size="sm"
              round="true"
              icon="true"
            >
              <i className="fa fa-edit" />
            </Button>
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
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Call Log Details</ModalHeader>
          <ModalBody>
            <Row>
              <h5>
                <Badge color="secondary" className="ml-3" pill>
                  Start Time
                </Badge>
              </h5>
              <p className="ml-3">{this.state.obj.start}</p>
            </Row>
            <Row>
              <h5>
                <Badge color="secondary" className="ml-3" pill>
                  End Time
                </Badge>
              </h5>
              <p className="ml-3">{this.state.obj.end}</p>
            </Row>
            <Row>
              <h5>
                <Badge color="secondary" className="ml-3" pill>
                  Appointment Id
                </Badge>
              </h5>
              <p className="ml-3">{this.state.obj.appointmentid}</p>
            </Row>
            <Row>
              <h5>
                <Badge color="secondary" className="ml-3" pill>
                  Status
                </Badge>
              </h5>
              <p className="ml-3">{this.state.obj.status}</p>
            </Row>
            <Row>
              <h5>
                <Badge color="secondary" className="ml-3" pill>
                  Receiver
                </Badge>
              </h5>
              <p className="ml-3">{this.state.obj.receiver}</p>
            </Row>
          </ModalBody>
        </Modal>
        <Card>
          <CardTitle className="mb-0 p-3 border-bottom bg-light">
            <i className="mdi mdi-border-right mr-2"></i>Call Log
          </CardTitle>
          <CardBody>
            <ReactTable
              columns={[
                {
                  Header: "StartTime",
                  accessor: "start"
                },
                {
                  Header: "EndTime",
                  accessor: "end"
                },
                {
                  Header: "Appointment Id",
                  accessor: "appointmentid"
                },
                {
                  Header: "Actions",
                  accessor: "actions",
                  sortable: false,
                  filterable: false
                }
              ]}
              defaultPageSize={10}
              showPaginationBottom={true}
              className="-striped -highlight"
              data={data}
              filterable
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default callLog;
