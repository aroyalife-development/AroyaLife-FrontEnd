import React from 'react';
import { Row, Col } from 'reactstrap';

import {
  VisitrateView,
  TotalVisits,
  BrowserStats,
  TotalRevenue,
  SalesPd,
  CalendarElement,
  Chat,
  Messages
} from '../../components/dashboard/index.js';

class FourthDashboard extends React.Component {
  render() {
    return (
      <div>
        <VisitrateView />
        {/* --------------------------------------------------------------------------------*/}
        {/* Row-1                                                                          */}
        {/* --------------------------------------------------------------------------------*/}
        <Row>
          <Col lg="8">
            <TotalVisits />
          </Col>
          <Col lg="4">
            <BrowserStats />
          </Col>
        </Row>
        {/* --------------------------------------------------------------------------------*/}
        {/* Row-2                                                                          */}
        {/* --------------------------------------------------------------------------------*/}
        <Row>
          <Col lg="8">
            <TotalRevenue />
          </Col>
          <Col lg="4">
            <SalesPd />
          </Col>
        </Row>
        {/* --------------------------------------------------------------------------------*/}
        {/* Row-3                                                                          */}
        {/* --------------------------------------------------------------------------------*/}
        <Row>
          <Col lg="12">
            <CalendarElement />
          </Col>
        </Row>
        {/* --------------------------------------------------------------------------------*/}
        {/* Row-4                                                                          */}
        {/* --------------------------------------------------------------------------------*/}
        <Row>
          <Col lg="6">
            <Chat />
          </Col>
          <Col lg="6">
            <Messages />
          </Col>
        </Row>
      </div>
    );
  }
}

export default FourthDashboard;
