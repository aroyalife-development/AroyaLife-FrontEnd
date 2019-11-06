import React from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  CustomInput,
  Form,
  Row,
  Col,
  Label,
  Button,
  Jumbotron
} from "reactstrap";
import validators from "../validators";
import { changePassword } from "./login-service";
import { Link } from "react-router-dom";

import axios from "axios";
import { environment } from "../../../environments";

//gradient button
import GradientButton from "react-linear-gradient-button";

import img2 from "../../../assets/images/big/auth-bg.jpg";

const sidebarBackground = {
  backgroundImage: "url(" + img2 + ")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center"
};

//added logo
import logo from "../../../assets/images/login/AroyaLifeLogo.png";
const logoImage = logo;

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirmPassword: "",
      requestSent: false,
      requestError: null,
      error: null
    };
    this.handleClick = this.handleClick.bind(this);
    this.validators = validators;
    this.onInputChange = this.onInputChange.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.showErrors = this.showErrors.bind(this);
    this.formValidators = this.formValidators.bind(this);
    this.requestError = this.requestError.bind(this);
    this.socket = window.socket;

    let array = props.location.pathname.split("/");
    this.userId = array[array.length - 1];
  }
  onInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    this.formValidators([event.target.name], event.target.value);
  }
  formValidators(fieldName, value) {
    this.validators[fieldName].errors = [];
    this.validators[fieldName].state = value;
    this.validators[fieldName].valid = true;
    this.validators[fieldName].rules.forEach(rule => {
      if (rule.test instanceof RegExp) {
        if (!rule.test.test(value)) {
          this.validators[fieldName].errors.push(rule.message);
          this.validators[fieldName].valid = false;
        }
      } else if (typeof rule.test === "function") {
        if (!rule.test(value)) {
          this.validators[fieldName].errors.push(rule.message);
          this.validators[fieldName].valid = false;
        }
      }
    });
  }
  validForm() {
    let status = true;
    Object.keys(this.validators).forEach(field => {
      if (field === "password") {
        if (!this.validators[field].valid) {
          status = false;
        }
      }
    });
    return status;
  }
  showErrors(fieldName) {
    const validator = this.validators[fieldName];
    const result = "";
    if (validator && !validator.valid) {
      const errors = validator.errors.map((info, index) => {
        return (
          <span className="error" key={index}>
            * {info}
            <br />
          </span>
        );
      });
      return <div className="error mb-2">{errors}</div>;
    }
    return result;
  }

  requestError() {
    const result = "";
    if (this.state.requestError) {
      return (
        <div className="error mb-2">
          <span className="error">
            {this.state.requestError}
            <br />
          </span>
        </div>
      );
    }
    return result;
  }

  async changePassword(event) {
    const { password, confirmPassword } = this.state;

    if (this.validForm()) {
      console.log("SAVED");
      changePassword({
        userId: this.userId,
        password: password,
        confirmPassword: confirmPassword
      })
        .then(response => {
          if (response.status == 200) {
            console.log("OK....");
            console.log("response - ", response.data.content);
            // alert("Check Your Email");
            this.setState({
              requestSent: true,
              requestError: null
            });
            // let path = "/appointments";
            // setTimeout(() => this.props.history.push(path), 3000);
          } else {
            console.log("Error1....", response);
            this.setState({
              requestError: "Passwords do Not Match!"
            });
          }
        })
        .catch(error => {
          console.log("Error2....", error);
        });
    }
    event.preventDefault();
  }

  handleClick() {
    var elem = document.getElementById("loginform");
    elem.style.transition = "all 2s ease-in-out";
    elem.style.display = "none";
    document.getElementById("recoverform").style.display = "block";
  }
  render() {
    const { requestSent } = this.state;
    return (
      <div
        className="auth-wrapper  align-items-center d-flex"
        style={sidebarBackground}
      >
        {/*--------------------------------------------------------------------------------*/}
        {/*patientLogin Cards*/}
        {/*--------------------------------------------------------------------------------*/}
        <div className="container">
          <div>
            <Row className="no-gutters justify-content-center">
              <Col md="6" lg="4" className="bg-white">
                <div className="p-4">
                  <h3 className="font-medium mb-3">Reset Password</h3>
                  {!requestSent && (
                    <Form className="mt-3" id="loginform" action="/dashbaord">
                      {/* <Label for="email" className="font-medium">
                      No worries Enter your email and we will send you a reset.
                    </Label> */}
                      <Label for="password" className="mt-3 font-medium">
                        Password
                      </Label>
                      <InputGroup className="mb-3" size="lg">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ti-pencil"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          id="password"
                          name="password"
                          value={this.state.password}
                          onChange={this.onInputChange}
                          placeholder="Password"
                        />
                      </InputGroup>
                      {this.showErrors("password")}

                      <Label for="confirmPassword" className="mt-3 font-medium">
                        Confirm Password
                      </Label>
                      <InputGroup className="mb-3" size="lg">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ti-pencil"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={this.state.confirmPassword}
                          onChange={this.onInputChange}
                          placeholder="Confirm Password"
                        />
                      </InputGroup>
                      {this.showErrors("confirmPassword")}
                      {this.requestError()}

                      <Row className="mb-3 mt-5">
                        <Col xs="12">
                          <Button
                            color="success"
                            onClick={this.changePassword}
                            className={`${this.validForm() ? "" : "disabled"}`}
                            size="lg"
                            type="submit"
                            block
                          >
                            Change
                          </Button>
                        </Col>
                      </Row>
                      <div className="text-center mb-3">
                        Back to{" "}
                        <a
                          href="/authentication/login"
                          className="text-info ml-1"
                        >
                          <b>Login</b>
                        </a>
                      </div>
                    </Form>
                  )}
                  {requestSent && (
                    <Jumbotron>
                      <h1 className="display-4">Success!</h1>
                      <p className="lead">Your password has been reset.</p>
                      <hr className="my-2" />
                      <p className="lead float-right">
                        <Link to="/authentication/login">
                          <Button color="primary">Login</Button>
                        </Link>
                      </p>
                    </Jumbotron>
                  )}
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default ChangePassword;
