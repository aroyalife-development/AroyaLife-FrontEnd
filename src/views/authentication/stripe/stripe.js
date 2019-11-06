import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "./CheckoutForm";
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

import img2 from "../../../assets/images/big/Aroya_Life_subcription_Background-01.jpg";
import { stripe } from "../../../environments";

const sidebarBackground = {
  backgroundImage: "url(" + img2 + ")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center"
};

class Stripe extends React.Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    const subscription = this.props.location.state;

    return (
      <div
        className="auth-wrapper align-items-center d-flex"
        style={sidebarBackground}
      >
        <div className="container">
          <div>
            <Row className="no-gutters justify-content-center">
              <Col md="6" lg="4" className="bg-white">
                <div className="p-4">
                  <h3 className="font-medium mb-3">Checkout</h3>
                  <StripeProvider apiKey={stripe.apiKey}>
                    <div className="example">
                      <Elements>
                        <CheckoutForm
                        subscription={subscription}
                        />
                      </Elements>
                    </div>
                  </StripeProvider>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default Stripe;
