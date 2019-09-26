// import React from "react";
// import {
//   InputGroup,
//   InputGroupAddon,
//   InputGroupText,
//   Input,
//   CustomInput,
//   Form,
//   Row,
//   Col,
//   Label,
//   Button
// } from "reactstrap";
// import { auth } from "../../firebase";
// import validators from "./validators";
// //gradient button
// import GradientButton from "react-linear-gradient-button";

// import img2 from "../../assets/images/big/auth-bg.jpg";

// const sidebarBackground = {
//   backgroundImage: "url(" + img2 + ")",
//   backgroundRepeat: "no-repeat",
//   backgroundPosition: "center center"
// };

// import { login } from "./patientLogin-service";
// //added logo
// import logo from "../../assets/images/login/AroyaLifeLogo.png";
// const logoImage = logo;

// class PatientLogin extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: "",
//       password: "",
//       error: null
//     };
//     this.handleClick = this.handleClick.bind(this);
//     this.validators = validators;
//     this.onInputChange = this.onInputChange.bind(this);
//     this.doLogin = this.doLogin.bind(this);
//     this.showErrors = this.showErrors.bind(this);
//     this.formValidators = this.formValidators.bind(this);
//   }
//   onInputChange(event) {
//     this.setState({
//       [event.target.name]: event.target.value
//     });
//     this.formValidators([event.target.name], event.target.value);
//   }
//   formValidators(fieldName, value) {
//     this.validators[fieldName].errors = [];
//     this.validators[fieldName].state = value;
//     this.validators[fieldName].valid = true;
//     this.validators[fieldName].rules.forEach(rule => {
//       if (rule.test instanceof RegExp) {
//         if (!rule.test.test(value)) {
//           this.validators[fieldName].errors.push(rule.message);
//           this.validators[fieldName].valid = false;
//         }
//       } else if (typeof rule.test === "function") {
//         if (!rule.test(value)) {
//           this.validators[fieldName].errors.push(rule.message);
//           this.validators[fieldName].valid = false;
//         }
//       }
//     });
//   }
//   validForm() {
//     let status = true;
//     Object.keys(this.validators).forEach(field => {
//       if (field === "email" || field === "password") {
//         if (!this.validators[field].valid) {
//           status = false;
//         }
//       }
//     });
//     return status;
//   }
//   showErrors(fieldName) {
//     const validator = this.validators[fieldName];
//     const result = "";
//     if (validator && !validator.valid) {
//       const errors = validator.errors.map((info, index) => {
//         return (
//           <span className="error" key={index}>
//             * {info}
//             <br />
//           </span>
//         );
//       });
//       return <div className="error mb-2">{errors}</div>;
//     }
//     return result;
//   }
//   doLogin(event) {
//     const { email, password } = this.state;
//     login(email, password)
//       .then(() => {
//         this.props.history.push("/dashboard");
//       })
//       .catch(error => {
//         alert("Invalid login id or password.");
//       });
//     event.preventDefault();

//     // auth.doSignInWithEmailAndPassword(email, password)
//     // 	.then(() => {
//     // 		this.setState(() => ({
//     // 			email: email,
//     // 			password: password,
//     // 		}));
//     // 		this.props.history.push("/");
//     // 	})
//     // 	.catch(error => {
//     // 		alert('Invalid login id or password.');
//     // 	});
//     // event.preventDefault();
//   }

//   handleClick() {
//     var elem = document.getElementById("loginform");
//     elem.style.transition = "all 2s ease-in-out";
//     elem.style.display = "none";
//     document.getElementById("recoverform").style.display = "block";
//   }
//   render() {
//     return (
//       <div
//         className="auth-wrapper  align-items-center d-flex"
//         style={sidebarBackground}
//       >
//         {/*--------------------------------------------------------------------------------*/}
//         {/*patientLogin Cards*/}
//         {/*--------------------------------------------------------------------------------*/}
//         <div className="container">
//           <div>
//             <Row className="no-gutters justify-content-center">
//               <Col md="6" lg="4" className="bg-dark text-white">
//                 <div className="text-center mt-5 mb-3">
//                   <img height="100" src={logoImage} />
//                 </div>
//                 <div className="text-center mt-4 mb-3">
//                   <h4>YOUR SLOGAN HERE</h4>
//                 </div>
//                 <div className="text-center mt-3 mb-3 ml-3 mr-3">
//                   <h6>
//                     Lorem Ipsum is simply dummy text of the printing and
//                     typesetting industry. Lorem Ipsum has been the industry's
//                     standard dummy text ever since the 1500s, when an unknown
//                     printer took a galley of type and scrambled it to make a
//                     type specimen book.
//                   </h6>
//                 </div>
//               </Col>
//               <Col md="6" lg="4" className="bg-white">
//                 <div className="p-4">
//                   <h3 className="font-medium mb-3">Sign In to Patient</h3>
//                   <Form className="mt-3" id="loginform">
//                     <Label for="email" className="font-medium">
//                       Email
//                     </Label>
//                     <InputGroup className="mb-2" size="lg">
//                       <InputGroupAddon addonType="prepend">
//                         <InputGroupText>
//                           <i className="ti-user"></i>
//                         </InputGroupText>
//                       </InputGroupAddon>
//                       <Input
//                         type="email"
//                         id="email"
//                         name="email"
//                         value={this.state.email}
//                         onChange={this.onInputChange}
//                         placeholder="Email"
//                       />
//                     </InputGroup>
//                     {this.showErrors("email")}
//                     <Label for="password" className="mt-3 font-medium">
//                       Password
//                     </Label>
//                     <InputGroup className="mb-3" size="lg">
//                       <InputGroupAddon addonType="prepend">
//                         <InputGroupText>
//                           <i className="ti-pencil"></i>
//                         </InputGroupText>
//                       </InputGroupAddon>
//                       <Input
//                         type="password"
//                         id="password"
//                         name="password"
//                         value={this.state.password}
//                         onChange={this.onInputChange}
//                         placeholder="Password"
//                       />
//                     </InputGroup>
//                     {this.showErrors("password")}
//                     <div className="d-flex no-block align-items-center mb-4 mt-4">
//                       <CustomInput
//                         type="checkbox"
//                         id="exampleCustomCheckbox"
//                         label="Remember Me"
//                       />
//                     </div>
//                     <Row className="mb-3">
//                       <Col xs="12">
//                         <Button
//                           color="success"
//                           onClick={this.doLogin}
//                           className={`${this.validForm() ? "" : "disabled"}`}
//                           size="lg"
//                           type="submit"
//                           block
//                         >
//                           Log In
//                         </Button>
//                         {/* <GradientButton  onClick={this.doLogin} className={`${this.validForm() ? '' : 'disabled'}`} size="lg" type="submit" block>Log In</GradientButton> */}
//                       </Col>
//                     </Row>
//                     <div className="text-center">
//                       Don&apos;t have an account?{" "}
//                       <a
//                         href="/authentication/subscription"
//                         className="text-info ml-1"
//                       >
//                         <b>Sign Up</b>
//                       </a>
//                     </div>
//                   </Form>
//                 </div>
//               </Col>
//             </Row>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default PatientLogin;

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
  Button
} from "reactstrap";

import img2 from "../../assets/images/big/auth-bg.jpg";

const sidebarBackground = {
  backgroundImage: "url(" + img2 + ")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center"
};

import { login } from "./patientLogin-service";
//added logo
import logo from "../../assets/images/login/AroyaLifeLogo.png";
const logoImage = logo;

class PatientLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      submitted: false,
      loading: false,
      error: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  async handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { email, password, returnUrl } = this.state;

    // stop here if form is invalid
    if (!(email && password)) {
      return;
    }

    this.setState({ loading: true });

    let response = await login(this.state);
    console.log("response--", response);

    // .then(
    //   success => {
    //     // const { from } = this.props.location.state || {
    //     //   from: { pathname: "/" }
    //     // };
    //     // this.props.history.push(from);
    //     // this.props.history.push("/dashboard");
    //     console.log(success);
    //   },
    //   error => {
    //     this.setState({ error, loading: false }), console.log("error");
    //   }
    // );
  }

  handleClick() {
    var elem = document.getElementById("loginform");
    elem.style.transition = "all 2s ease-in-out";
    elem.style.display = "none";
    document.getElementById("recoverform").style.display = "block";
  }

  render() {
    const { email, password, submitted, loading, error } = this.state;
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
              <Col md="6" lg="4" className="bg-dark text-white">
                <div className="text-center mt-5 mb-3">
                  <img height="100" src={logoImage} />
                </div>
                <div className="text-center mt-4 mb-3">
                  <h4>YOUR SLOGAN HERE</h4>
                </div>
                <div className="text-center mt-3 mb-3 ml-3 mr-3">
                  <h6>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                  </h6>
                </div>
              </Col>
              <Col md="6" lg="4" className="bg-white">
                <div className="p-4">
                  <h3 className="font-medium mb-3">Sign In to Patient</h3>
                  <Form
                    className="mt-3"
                    id="loginform"
                    onSubmit={this.handleSubmit}
                  >
                    <Label for="email" className="font-medium">
                      Email
                    </Label>
                    <InputGroup className="mb-2" size="lg">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ti-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                        placeholder="Email"
                      />
                    </InputGroup>
                    {submitted && !email && (
                      <div className="help-block">Email is required</div>
                    )}
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
                        value={password}
                        onChange={this.handleChange}
                        placeholder="Password"
                      />
                      {submitted && !password && (
                        <div className="help-block">Password is required</div>
                      )}
                    </InputGroup>

                    <div className="d-flex no-block align-items-center mb-4 mt-4">
                      <CustomInput
                        type="checkbox"
                        id="exampleCustomCheckbox"
                        label="Remember Me"
                      />
                    </div>
                    <Row className="mb-3">
                      <Col xs="12">
                        <Button color="success" size="lg" block>
                          Log In
                        </Button>
                        {error && (
                          <div className={"alert alert-danger"}>{error}</div>
                        )}
                        {/* <GradientButton  onClick={this.doLogin} className={`${this.validForm() ? '' : 'disabled'}`} size="lg" type="submit" block>Log In</GradientButton> */}
                      </Col>
                    </Row>
                    <div className="text-center">
                      Don&apos;t have an account?{" "}
                      <a
                        href="/authentication/subscription"
                        className="text-info ml-1"
                      >
                        <b>Sign Up</b>
                      </a>
                    </div>
                  </Form>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default PatientLogin;
