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

class UserAppointments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      search: false
    };

    this.toggle = this.toggle.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  handleCategory = () => {
    this.setState({
      search: !this.state.search
    });

    let path = `videoCall`;
    setTimeout(() => this.setState(this.props.history.push(path)), 3000);
  };

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
                <Input type="select" className="custom-select">
                  <option value="">Select</option>
                  <option>Addiction psychiatrist</option>
                  <option>Adolescent medicine specialist</option>
                  <option>Cardiologist</option>
                  <option>Endocrinologist</option>
                  <option>Gynecologist</option>
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
