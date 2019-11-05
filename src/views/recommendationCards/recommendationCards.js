import React, { Component } from "react";
import ReactTable from "react-table";
import {
  Alert,
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

class RecommendationCards extends React.Component {
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
        appointmentId: prop[0],
        recoType: prop[1],
        provider: prop[2],
        callTime: prop[3],
        details: prop[4],
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
              <i className="fa fa-folder-open" />
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
          <ModalHeader toggle={this.toggle}>
            Recommendation Cards Details
          </ModalHeader>
          <ModalBody>
            <Row>
              <h5>
                <Badge color="secondary" className="ml-3" pill>
                  Appointment ID
                </Badge>
              </h5>
              <p className="ml-3">{this.state.obj.appointmentId}</p>
            </Row>
            <Row>
              <h5>
                <Badge color="secondary" className="ml-3" pill>
                  Recommend Type
                </Badge>
              </h5>
              <p className="ml-3">{this.state.obj.recoType}</p>
            </Row>
            <Row>
              <h5>
                <Badge color="secondary" className="ml-3" pill>
                  Provider Name
                </Badge>
              </h5>
              <p className="ml-3">{this.state.obj.provider}</p>
            </Row>
            <Row>
              <h5>
                <Badge color="secondary" className="ml-3" pill>
                  Call Time
                </Badge>
              </h5>
              <p className="ml-3">{this.state.obj.callTime}</p>
            </Row>
            <Row>
              <h5>
                <Badge color="secondary" className="ml-3" pill>
                  Details
                </Badge>
              </h5>
            </Row>
            <div>
              <Alert color="secondary">
                <p className="ml-3">{this.state.obj.details}</p>
                {/* <hr />
                <p className="mb-0">
                  Whenever you need to, be sure to use margin utilities to keep
                  things nice and tidy.
                </p> */}
              </Alert>
            </div>
          </ModalBody>
        </Modal>
        <Card>
          <CardTitle className="mb-0 p-3 border-bottom bg-light">
            <i className="mdi mdi-border-right mr-2"></i>Recommendation Cards
          </CardTitle>
          <CardBody>
            <ReactTable
              columns={[
                {
                  Header: "Appointment ID",
                  accessor: "appointmentId"
                },
                {
                  Header: "Recommend Type",
                  accessor: "recoType"
                },
                {
                  Header: "Provider Name",
                  accessor: "provider"
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

export default RecommendationCards;
