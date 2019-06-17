import React from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Col, Row } from 'reactstrap';

import Chart from 'react-c3-component';
import 'c3/c3.css';

class RevenueStatics extends React.Component {
  render() {
    return (
      /*--------------------------------------------------------------------------------*/
      /* Used In Dashboard-3                                                            */
      /*--------------------------------------------------------------------------------*/
      <Card>
        <CardBody>
          <Row>
            <Col xs="12">
              <div className="d-flex flex-wrap">
                <div>
                  <CardTitle>Revenue Statistics</CardTitle>
                  <CardSubtitle>Xtreme Admin Vs Nice Admin</CardSubtitle>
                </div>
              </div>
            </Col>
            <Col xs="12">
              <Chart
                style={{ height: '300px', width: '100%' }}
                config={{
                  data: {
                    columns: [['Site A', 3, 5, 3, 3], ['Site B', 4, 3, 2, 5]],
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
          <div className="d-flex no-block align-items-center justify-content-center">
            <div>
              <h6 className="text-success">
                <i className="fa fa-circle font-10 mr-2" />
                Xtreme
              </h6>
            </div>
            <div className="ml-3">
              <h6 className="text-info">
                <i className="fa fa-circle font-10 mr-2" />
                Nice
              </h6>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default RevenueStatics;
