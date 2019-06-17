import React from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Col, Row } from 'reactstrap';

import Chart from 'react-c3-component';
import 'c3/c3.css';

class SalesOverview extends React.Component {
  render() {
    return (
      /*--------------------------------------------------------------------------------*/
      /* Used In Dashboard-1                                                            */
      /*--------------------------------------------------------------------------------*/
      <Card>
        <CardBody>
          <Row>
            <Col xs="12">
              <div className="d-flex flex-wrap">
                <div>
                  <CardTitle>Sales Overview</CardTitle>
                  <CardSubtitle>Ample Admin Vs Pixel Admin</CardSubtitle>
                </div>
                <div className="ml-auto">
                  <div className="d-flex no-block align-items-center justify-content-center">
                    <div>
                      <h6 className="text-success">
                        <i className="fa fa-circle font-10 mr-2" />
                        Ample
                      </h6>
                    </div>
                    <div className="ml-3">
                      <h6 className="text-info">
                        <i className="fa fa-circle font-10 mr-2" />
                        Pixel
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs="12">
              <Chart
                style={{ height: '315px', width: '100%' }}
                config={{
                  data: {
                    columns: [
                      ['Site A', 9, 5, 3, 7, 5, 10, 3],
                      ['Site B', 6, 3, 9, 5, 4, 6, 4]
                    ],
                    type: 'bar'
                  },
                  axis: {
                    y: {
                      show: true,
                      tick: {
                        count: 0,
                        outer: false
                      }
                    },
                    x: {
                      show: true
                    }
                  },
                  bar: {
                    width: 10,
                    ratio: 2
                  },

                  padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 30
                  },
                  point: {
                    r: 0
                  },
                  legend: {
                    hide: true
                  },
                  color: {
                    pattern: ['#1e88e5', '#26c6da', '#ff821c', '#7e74fb']
                  }
                }}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default SalesOverview;
