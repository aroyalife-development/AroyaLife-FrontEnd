import React, { Component } from "react";
import { Card, CardBody, CardTitle, Navbar, NavbarBrand } from "reactstrap";

import PatientSignupStepper from "./patientSignupStepper";

import img2 from "../../../assets/images/big/Aroya_Life_subcription_Background-01.jpg";
import logodarkicon from "../../../assets/images/login/AroyaLifeLogo.png";

import axios from "axios";
import { environment } from "../../../environments";

const sidebarBackground = {
  backgroundImage: "url(" + img2 + ")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center"
};

class PatientSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      surname: "",
      mobile: "",
      gender: "",
      birthDay: "",
      accName: "",
      email: "",
      password: "",
      saveStatusError: false
    };
  }

  getState() {
    return this.state;
  }

  updateState = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  updateSaveStatusError = value => {
    this.setState({
      saveStatusError: value
    });
  };

  componentDidMount() {}

  render() {
    return (
      <div>
        <Navbar>
          <NavbarBrand href="/">
            <b className="logo-icon">
              <img
                src={logodarkicon}
                alt="homepage"
                height="50px"
                className="dark-logo ml-5"
              />
            </b>
          </NavbarBrand>
        </Navbar>

        <div
          className="auth-wrapper align-items-center d-flex"
          style={sidebarBackground}
        >
          <div className="container mt-3">
            <Card>
              <CardBody className="border-bottom">
                <CardTitle className="mb-0">
                  {/* <i className="mdi mdi-border-right mr-2"></i> */}
                  Signup as a Patient
                </CardTitle>
              </CardBody>
              <CardBody>
                <PatientSignupStepper
                  patientState={this.state}
                  updateState={this.updateState}
                  updateSaveStatusError={this.updateSaveStatusError}
                />
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default PatientSignup;
