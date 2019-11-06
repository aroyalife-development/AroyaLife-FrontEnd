import React, { Component } from "react";
import {
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  PostalCodeElement,
  PaymentRequestButtonElement,
  IbanElement,
  IdealBankElement,
  injectStripe
} from "react-stripe-elements";
import { Link } from "react-router-dom";
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
import axios from "axios";
import { environment } from "../../../environments";
import "./stripe.css";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = { requestSent: false };
    this.submit = this.submit.bind(this);
    // console.log(props.location.state.subscriptionId);
    console.log(props.subscription);
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (this.currentUser === null) {
      window.location = "/authentication/login";
    }
    if (props.subscription === undefined) {
      window.location = "/authentication/subscription";
    }
  }

  async submit(ev) {
    let { token } = await this.props.stripe.createToken({ name: "John" });
    console.log(JSON.stringify(token));

    await axios
      .post(environment.baseUrl + "payment/charge", {
        amount: this.props.subscription.amount * 100,
        userId: this.currentUser.id,
        subscriptionId: this.props.subscription.subscriptionId,
        stripeToken: token.id
      })
      .then(response => {
        console.log("------------------- response - ", response);
        // alert("SUCCESS!");
        this.setState({
          requestSent: true
        });
        // return response;
      })
      .catch(error => {
        console.log("------------------- error - ", error);
        alert("ERROR!");
        // return error;
      });
  }

  render() {
    const { requestSent } = this.state;

    return (
      <div>
        {/* <div className="checkout">
          <p>Would you like to complete the purchase?</p>
          <CardElement />
          <button onClick={this.submit}>Purchase</button>
        </div> */}
        {!requestSent && (
          <div className="checkout">
            <p>Would you like to complete the purchase?</p>
            <Label className="font-medium">Card number</Label>
            <CardNumberElement />
            <Label className="font-medium">Expiration date</Label>
            <CardExpiryElement />
            <Label className="font-medium">CVC</Label>
            <CardCvcElement />
            <Button
              onClick={this.submit}
              color="success"
              className="mt-5 mb-3"
              size="lg"
              block
            >
              <span>PAY ${this.props.subscription.amount}</span>
            </Button>
          </div>
        )}
        {requestSent && (
          <Jumbotron>
            <h1 className="display-4">Success!</h1>
            <p className="lead">Thank you for your purchase!</p>
            <hr className="my-2" />
            <p className="lead float-right">
              <Link to="/appointments">
                <Button color="primary">View My Appointments</Button>
              </Link>
            </p>
          </Jumbotron>
        )}
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
