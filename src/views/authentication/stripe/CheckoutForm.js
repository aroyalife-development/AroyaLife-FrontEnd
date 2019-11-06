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
import axios from "axios";
import { environment } from "../../../environments";
import "./stripe.css";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = { complete: false };
    this.submit = this.submit.bind(this);
    // console.log(props.location.state.subscriptionId);
    console.log(props.subscription);
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (this.currentUser === null) {
      window.location = "/authentication/login";
    }
  }

  async submit(ev) {
    let { token } = await this.props.stripe.createToken({ name: "John" });
    console.log(JSON.stringify(token));

    // await axios
    //   .post(environment.baseUrl + "payment/charge", {
    //     amount: this.props.subscription.amount,
    //     userId: this.currentUser.id,
    //     recipient: "buddhi.hasanka@gmail.com",
    //     subscriptionId: this.props.subscription.subscriptionId,
    //     stripeToken: token.id
    //   })
    //   .then(response => {
    //     console.log("------------------- response - ", response);
    //     alert("SUCCESS!");
    //     // return response;
    //   })
    //   .catch(error => {
    //     console.log("------------------- error - ", error);
    //     alert("ERROR!");
    //     // return error;
    //   });

    // if (response.ok) this.setState({ complete: true });
  }

  render() {
    // if (this.state.complete) {
    //   return (
    //     <div className="checkout">
    //       <p>Thank You!</p>
    //     </div>
    //   );
    // }

    return (
      <div>
        {/* <div className="checkout">
          <p>Would you like to complete the purchase?</p>
          <CardElement />
          <button onClick={this.submit}>Purchase</button>
        </div> */}
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
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
