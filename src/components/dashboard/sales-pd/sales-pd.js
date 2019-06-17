import React from 'react';
import { Card, CardBody, CardTitle, Col, Row } from 'reactstrap';

import { Line } from 'react-chartjs-2';
import Chart from 'react-c3-component';
import 'c3/c3.css';

//Line chart
let lineData = {
  labels: ['2012', '2013', '2014', '2015', '2016', '2017'],
  datasets: [
    {
      label: 'Bounce %',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: ['transparent'],
      borderColor: ['#7460ee'],
      borderWidth: 2
    }
  ]
};

let lineOptions = {
  elements: { point: { radius: 2 } },
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          display: false
        }
      }
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          display: false
        }
      }
    ]
  },
  legend: {
    display: false,
    labels: {
      fontColor: 'rgb(255, 99, 132)'
    }
  }
};

class SalesPd extends React.Component {
  render() {
    return (
      /*--------------------------------------------------------------------------------*/
      /* Used In Dashboard-4                                                            */
      /*--------------------------------------------------------------------------------*/
      <Row>
        <Col xs="12">
          <Card>
            <CardBody>
              <CardTitle>Sales Prediction</CardTitle>
              <div className="d-flex mt-4">
                <div className="align-self-center">
                  <span className="display-6 text-primary">$3528</span>
                  <h6 className="text-muted">10% Increased</h6>
                  <h5>(150-165 Sales)</h5>
                </div>
                <div className="ml-auto">
                  <div
                    className="chart-wrapper mb-4"
                    style={{ maxWidth: '150px', height: '55px' }}
                  >
                    <Line data={lineData} options={lineOptions} />
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12">
          <Card>
            <CardBody>
              <CardTitle className="mb-0">Sales Difference</CardTitle>
              <Row>
                <Col lg="6" md="6" className="align-self-center">
                  <div>
                    <span className="display-6 text-success">$4316</span>
                    <h6 className="text-muted">10% Increased</h6>
                    <h5>(150-165 Sales)</h5>
                  </div>
                </Col>
                <Col lg="6" md="6" className="align-self-center">
                  <div>
                    <Chart
                      style={{ height: '150px', width: '100%' }}
                      config={{
                        data: {
                          columns: [['Success', 45], ['Pending', 15]],
                          type: 'donut',
                          tooltip: {
                            show: true
                          }
                        },
                        donut: {
                          label: {
                            show: false
                          },
                          title: '75%',
                          width: 20
                        },
                        legend: {
                          hide: true
                        },
                        color: {
                          pattern: ['#26c6da', '#e9ecef']
                        }
                      }}
                    />
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default SalesPd;
