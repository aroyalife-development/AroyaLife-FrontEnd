import React, { Component } from "react";
import { Card, CardBody, CardTitle, Navbar, NavbarBrand } from "reactstrap";

import ProviderSignupStepper from "./ProviderSignupStepper";

import img2 from "../../../assets/images/big/Aroya_Life_subcription_Background-01.jpg";
import logodarkicon from "../../../assets/images/login/AroyaLifeLogo.png";

import axios from "axios";
import { environment } from "../../../environments";

const sidebarBackground = {
  backgroundImage: "url(" + img2 + ")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center"
};

class ProviderSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      firstName: "",
      lastName: "",
      slmcNo: "",
      birthDay: "",
      gender: "",
      mobile: "",
      deliveryAddress: "",
      specialization: "",
      accName: "",
      email: "",
      password: "",
      specializationList: []
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

  componentDidMount() {
    axios
      .get(environment.baseUrl + "specialization")
      .then(response => {
        this.setState({
          specializationList: response.data.content
        });
        // return response;
      })
      .catch(error => {
        console.log("------------------- error - ", error);
        // return error;
      });
  }

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
                  Signup as a Provider
                </CardTitle>
              </CardBody>
              <CardBody>
                <ProviderSignupStepper
                  providerState={this.state}
                  updateState={this.updateState}
                />
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default ProviderSignup;
