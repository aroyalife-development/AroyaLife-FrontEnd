import React from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Col, Row } from 'reactstrap';

import { Line } from 'react-chartjs-2';
import 'c3/c3.css';

//Line chart
let lineData = {
  labels: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
  datasets: [
    {
      label: 'Bandwidth %',
      data: [5, 0, 16, 1, 8, 3, 12, 15],
      backgroundColor: ['transparent'],
      borderColor: ['rgba(255, 255, 255, 0.4)'],
      borderWidth: 3
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

class CardBandwidth extends React.Component {
  render() {
    return (
      /*--------------------------------------------------------------------------------*/
      /* Used In Dashboard-1,2,3                                                        */
      /*--------------------------------------------------------------------------------*/
      <Card className="bg-primary">
        <CardBody>
          <div className="d-flex">
            <div className="mr-3 align-self-center">
              <h1 className="text-white">
                <i className="ti-pie-chart" />
              </h1>
            </div>
            <div>
              <CardTitle className="text-white">Bandwidth usage</CardTitle>
              <CardSubtitle className="text-white op-5">
                March 2017
              </CardSubtitle>
            </div>
          </div>
          <Row className="mt-2">
            <Col xs="4" className="align-self-center">
              <h2 className="font-light text-white">50 GB</h2>
            </Col>
            <Col xs="8" className="pt-2 pb-3 align-self-center">
              <div
                className="chart-wrapper float-right mb-4"
                style={{ maxWidth: '150px', height: '55px' }}
              >
                <Line data={lineData} options={lineOptions} />
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default CardBandwidth;
