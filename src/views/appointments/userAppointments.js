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
import providergif from "../../assets/images/provider-image/provider-search.gif";
import data from "./data.js";

class UserAppointments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      search: false,
      obj: {},
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
          appointDateTime: "2019-10-28"
        },
        {
          id: "432dfd29c36d70028141a473d246aeb9",
          patient: {
            id: "faa6643aca8c5318a9583178795542cf",
            user: {
              id: "faa6643aca8c5318a9583178795542cf",
              accName: "Buddhi",
              type: "type3"
            }
          },
          provider: {
            id: "faa6643aca8c5318a9583178795542cf",
            user: {
              id: "39e48f3f7bd8d5c2372533bc24f182b7",
              accName: "Rashmi",
              type: "type4"
            }
          },
          status: "done",
          appointDateTime: "2019-10-29"
        }
      ]
    };

    this.toggle = this.toggle.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
  }

  // componentDidMount() {
  //   axios.get('http://localhost:3001/api/v1/lists.json')
  //   .then(response => {
  //     console.log(response.data);
  //     this.setState({lists: response.data})
  //   })
  // }

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
    const data = this.state.jsonData.map((prop, key) => {
      return {
        id: key,
        dateTime: prop.appointDateTime,
        name: prop.patient.user.accName,
        type: prop.patient.user.type,
        status: prop.status,
        actions: (
          // we've added some custom button actions
          <div className="text-center">
            {/* use this button to add a edit kind of action */}
            <Button
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
                Header: "Appointment Date and Time",
                accessor: "dateTime"
              },
              {
                Header: "Name",
                accessor: "name"
              },
              {
                Header: "Type",
                accessor: "type"
              },
              {
                Header: "Status",
                accessor: "status"
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
            data={data}
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
