import React from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Row, Col } from 'reactstrap';

import { Line } from 'react-chartjs-2';

import Newsdata from './newsdata.js';
//Line chart
let lineData = {
  labels: [1, 2, 3, 4, 5, 6, 7, 8],
  datasets: [
    {
      label: 'Income',
      borderWidth: 2,
      backgroundColor: 'rgba(0, 136, 229,.1)',
      borderColor: 'rgb(30, 136, 229)',
      pointBorderColor: 'rgb(30, 136, 229)',
      pointBackgroundColor: 'rgb(30, 136, 229)',
      data: [0, 5, 6, 8, 20, 7, 8, 12]
    },
    {
      label: 'Outcome',
      borderWidth: 2,
      backgroundColor: 'rgba(79,195,247,.1)',
      borderColor: 'rgb(79,195,247)',
      pointBorderColor: 'rgb(79,195,247)',
      pointBackgroundColor: 'rgb(79,195,247)',
      data: [0, 3, 4, 5, 15, 3, 3, 10]
    }
  ]
};

class NewsleterCompaign extends React.Component {
  render() {
    return (
      /*--------------------------------------------------------------------------------*/
      /* Used In Dashboard-1,2                                                          */
      /*--------------------------------------------------------------------------------*/
      <Card>
        <CardBody>
          <div className="d-flex flex-wrap">
            <div>
              <CardTitle>Newsletter Campaign</CardTitle>
              <CardSubtitle>Overview of Newsletter Campaign</CardSubtitle>
            </div>
            <div className="ml-auto align-self-center">
              <div className="d-flex no-block align-items-center justify-content-center">
                <div>
                  <h6 className="text-success">
                    <i className="fa fa-circle font-10 mr-2" />
                    Open Rate
                  </h6>
                </div>
                <div className="ml-3">
                  <h6 className="text-info">
                    <i className="fa fa-circle font-10 mr-2" />
                    Recurring Payments
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div className="campaign ct-charts mt-3">
            <div
              className="chart-wrapper"
              style={{ width: '100%', margin: '0 auto', height: 250 }}
            >
              <Line
                data={lineData}
                options={{
                  maintainAspectRatio: false,
                  legend: {
                    display: false,
                    labels: { fontFamily: 'Poppins' }
                  },
                  scales: {
                    yAxes: [
                      {
                        stacked: true,
                        gridLines: { display: false },
                        ticks: { fontFamily: 'Poppins' }
                      }
                    ],
                    xAxes: [
                      {
                        gridLines: { display: false },
                        ticks: { fontFamily: 'Poppins' }
                      }
                    ]
                  }
                }}
              />
            </div>
          </div>
          <Row className="text-center">
            <Col lg="4" md="4" className="mt-3">
              <Newsdata texttitle="5098" textsubtitle="Total Sent" />
            </Col>
            <Col lg="4" md="4" className="mt-3">
              <Newsdata texttitle="4156" textsubtitle="Mail Open Rate" />
            </Col>
            <Col lg="4" md="4" className="mt-3">
              <Newsdata texttitle="1369" textsubtitle="Click Rate" />
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default NewsleterCompaign;
