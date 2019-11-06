import React from "react";
import { auth, db } from "../../firebase";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardColumns,
  CardGroup,
  CardDeck,
  CardLink,
  CardHeader,
  CardFooter,
  Button,
  Row,
  Col,
  Badge
} from "reactstrap";

import img2 from "../../assets/images/big/Aroya_Life_subcription_Background-01.jpg";

const sidebarBackground = {
  backgroundImage: "url(" + img2 + ")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center"
};

class Subscription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      error: null
    };
    this.path = "/authentication/stripe";
  }

  render() {
    const path = this.path;
    return (
      <div
        className="auth-wrapper  align-items-center d-flex"
        style={sidebarBackground}
      >
        {/*--------------------------------------------------------------------------------*/}
        {/*Row 1*/}
        {/*--------------------------------------------------------------------------------*/}

        <div className="container">
          <h2 className="ml-2 mb-5">SUBSCRIPTION PLAN</h2>
          <Row className="justify-content-center">
            <Col xs="12" md="4">
              {/* --------------------------------------------------------------------------------*/}
              {/* Card-1*/}
              {/* --------------------------------------------------------------------------------*/}
              <Card
                body
                inverse
                style={{
                  backgroundColor: "#333",
                  borderColor: "#333"
                }}
              >
                <div className="round round-lg align-self-center round-info">
                  <i className="ti-layout-width-full" />
                </div>
                <CardTitle className="align-self-center mt-3">BASIC</CardTitle>
                <h2 className="font-light text-white align-self-center">$30</h2>
                <CardText className="mt-3 text-muted">
                  <li>Lorem ipsum dolor sit amet.</li>
                  <li>sed do eiusmod tempor incididunt ut.</li>
                  <li>Nunc vitae massa dapibus, varius odio.</li>
                  <li>varius odio quis.</li>
                  <li>fringilla sem. Mauris semper.</li>
                  <li>lacus at porttitor pellentesque</li>
                  <li>Lorem ipsum dolor sit amet.</li>
                  <li>sed do eiusmod tempor incididunt ut.</li>
                  <li>Nunc vitae massa dapibus, varius odio.</li>
                  <li>varius odio quis.</li>
                  <li>fringilla sem. Mauris semper.</li>
                  <li>lacus at porttitor pellentesque</li>
                </CardText>
                <Link
                  to={{
                    pathname: path,
                    state: {
                      subscriptionId: "faa6643aca8c5318a9583178795542cf",
                      amount: 30
                    }
                  }}
                >
                  <Button color="info" className="mt-3" size="lg" block>
                    Subscribe
                  </Button>
                </Link>
              </Card>
            </Col>
            {/* <Col xs="12" md="4"> */}
            {/* --------------------------------------------------------------------------------*/}
            {/* Card-1*/}
            {/* --------------------------------------------------------------------------------*/}
            {/* <Card
                body
                inverse
                style={{
                  backgroundColor: "#333",
                  borderColor: "#333"
                }}
              >
                <div className="round round-lg align-self-center round-primary">
                  <i className="ti-layout-grid2" />
                </div>
                <CardTitle className="align-self-center mt-3">
                  STANDARD
                </CardTitle>
                <h2 className="font-light text-white align-self-center">$50</h2>
                <CardText className="mt-3 text-muted">
                  <li>Lorem ipsum dolor sit amet.</li>
                  <li>sed do eiusmod tempor incididunt ut.</li>
                  <li>Nunc vitae massa dapibus, varius odio.</li>
                  <li>varius odio quis.</li>
                  <li>fringilla sem. Mauris semper.</li>
                  <li>lacus at porttitor pellentesque</li>
                  <li>Lorem ipsum dolor sit amet.</li>
                  <li>sed do eiusmod tempor incididunt ut.</li>
                  <li>Nunc vitae massa dapibus, varius odio.</li>
                  <li>varius odio quis.</li>
                  <li>fringilla sem. Mauris semper.</li>
                  <li>lacus at porttitor pellentesque</li>
                </CardText>
                <Link to={path}>
                  <Button color="primary" className="mt-3" size="lg" block>
                    Subscribe
                  </Button>
                </Link>
              </Card>
            </Col> */}
            <Col xs="12" md="4">
              {/* --------------------------------------------------------------------------------*/}
              {/* Card-1*/}
              {/* --------------------------------------------------------------------------------*/}
              <Card
                body
                inverse
                style={{
                  backgroundColor: "#333",
                  borderColor: "#333"
                }}
              >
                <div className="round round-lg align-self-center round-danger">
                  <i className="ti-layout-grid3" />
                </div>
                <CardTitle className="align-self-center mt-3">
                  PREMIUM{" "}
                  <Badge color="warning" pill>
                    Free Trial
                  </Badge>
                </CardTitle>
                <h2 className="font-light text-white align-self-center">$70</h2>
                <CardText className="mt-3 text-muted">
                  <li>Lorem ipsum dolor sit amet.</li>
                  <li>sed do eiusmod tempor incididunt ut.</li>
                  <li>Nunc vitae massa dapibus, varius odio.</li>
                  <li>varius odio quis.</li>
                  <li>fringilla sem. Mauris semper.</li>
                  <li>lacus at porttitor pellentesque</li>
                  <li>Lorem ipsum dolor sit amet.</li>
                  <li>sed do eiusmod tempor incididunt ut.</li>
                  <li>Nunc vitae massa dapibus, varius odio.</li>
                  <li>varius odio quis.</li>
                  <li>fringilla sem. Mauris semper.</li>
                  <li>lacus at porttitor pellentesque</li>
                </CardText>
                <Link
                  to={{
                    pathname: path,
                    state: {
                      subscriptionId: "d36eeebd8b1f0cde16210339e97b9408",
                      amount: 70
                    }
                  }}
                >
                  <Button color="danger" className="mt-3" size="lg" block>
                    Subscribe
                  </Button>
                </Link>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Subscription;
