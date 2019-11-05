import React from "react";
import ReactTable from "react-table";
import { Link } from "react-router-dom";
import treeTableHOC from "react-table/lib/hoc/treeTable";
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  NavLink
} from "reactstrap";
import "react-table/react-table.css";
import provider from "../../assets/images/provider-image/provider-catagory.jpg";
import providergif from "../../assets/images/provider-image/animat-search-color.gif";

import axios from "axios";
import { environment } from "../../environments";
import moment from "moment";
import { otCoreOptions } from "../../model/openTok/otCoreOptions";

class UserAppointments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      search: false,
      specialization: "",
      specializationList: []
    };

    this.toggle = this.toggle.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.credentials = {
      apiKey: null,
      sessionId: null,
      token: null
    };
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    console.log("currentUser ---- ", currentUser);

    this.userId = null;
    if (currentUser) {
      this.userId = currentUser.id;
      console.log(this.userId);
    }
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleSearchState() {
    this.setState({
      search: !this.state.search
    });
  }

  handleCategory = () => {
    this.toggleSearchState();
    axios
      .get(
        environment.baseUrl +
          "provider/specialization/" +
          this.state.specialization
      )
      .then(response => {
        if (response.data.content.length > 0) {
          axios
            .post(environment.baseUrl + "appointment", {
              appointDateTime: moment().format("YYYY-MM-DD"),
              appointmentType: "auto",
              patient: {
                id: this.userId
              },
              provider: {
                id: response.data.content[0].id
              }
            })
            .then(response => {
              console.log("------------------- response 2- ", response);
              
              let sessionId = response.data.content.sessionId;
              this.credentials.sessionId = sessionId;

              localStorage.setItem(
                "credentials",
                JSON.stringify(this.credentials)
              );
              localStorage.setItem(
                "currentAppointment",
                JSON.stringify(response.data.content)
              );
              let path = "videoCall?id=" + response.data.content.id;
              setTimeout(() => this.props.history.push(path), 3000);
            })
            .catch(error => {
              console.log("------------------- error2 - ", error);
            });
        } else {
          console.log("------------------- NO DOCTORS");
          alert("NO DOCTORS");
          this.toggleSearchState();
        }
      })
      .catch(error => {
        console.log("------------------- error1 - ", error);
      });

    // let path = `videoCall`;
    // setTimeout(() => this.setState(this.props.history.push(path)), 3000);
  };

  specializationHandler = e => {
    this.setState({
      specialization: e.target.value
    });
  };

  componentDidMount() {
    axios
      .get(environment.baseUrl + "specialization")
      .then(response => {
        console.log(
          "------------------- response.data.content - ",
          response.data.content
        );
        this.setState({
          specializationList: response.data.content,
          specialization: response.data.content[0].id
        });
      })
      .catch(error => {
        console.log("------------------- error - ", error);
      });
  }

  render() {
    return (
      <Card>
        <CardTitle className="mb-0 p-3 border-bottom bg-light">
          <i className="mdi mdi-border-right mr-2" />
          Appointments
          <Button
            color="success"
            style={{ marginBottom: "1rem" }}
            className="btn float-right"
            onClick={this.toggle}
          >
            <i className="mdi mdi-phone" />
            <span className="ml-2">Make a Call</span>
          </Button>
        </CardTitle>
        <CardBody>
          <ReactTable
            columns={[
              {
                Header: "Date",
                accessor: "date"
              },
              {
                Header: "Time",
                accessor: "time"
              },
              {
                Header: "Duration",
                accessor: "duration"
              },
              {
                Header: "Provider Name",
                accessor: "providerName"
              },
              {
                Header: "Call Status",
                accessor: "callStatus"
              },
              {
                Header: "Diognosis Link",
                accessor: "diognosis"
              },
              {
                Header: "Recommendation Link",
                accessor: "ecommendationLink"
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
            filterable
          />
        </CardBody>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>
            Choose Specialization Category
          </ModalHeader>
          <ModalBody>
            <div>
              {this.state.search ? (
                <img
                  src={providergif}
                  alt="user"
                  className="rounded mx-auto d-block"
                  width="300"
                />
              ) : (
                <img
                  src={provider}
                  alt="user"
                  className="rounded mx-auto d-block"
                  width="300"
                />
              )}
            </div>
            <br />
            <Form>
              <InputGroup>
                <Input
                  type="select"
                  className="custom-select"
                  value={this.state.specialization}
                  onChange={this.specializationHandler}
                >
                  {this.state.specializationList.map(option => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </Input>
                <InputGroupAddon addonType="append">
                  <Button
                    color="success"
                    onClick={() => {
                      this.handleCategory();
                    }}
                  >
                    Button
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </Form>
          </ModalBody>
        </Modal>
      </Card>
    );
  }
}

export default UserAppointments;
