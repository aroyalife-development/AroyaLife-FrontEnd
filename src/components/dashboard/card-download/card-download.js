import React from 'react';
import { Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

import { Bar } from 'react-chartjs-2';

//bar chart
let barData = {
  labels: [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18'
  ],
  datasets: [
    {
      label: 'A',
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      borderColor: 'rgba(255, 255, 255, 0.3)',
      data: [4, 5, 6, 3, 7, 2, 1, 3, 4, 6, 7, 3, 2, 1, 5, 6, 4, 7]
    }
  ]
};

let barOptions = {
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          display: false
        },
        barThickness: 2
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
  options: {
    responsive: true,
    maintainAspectRatio: true
  },
  legend: {
    display: false,
    labels: {
      fontColor: 'rgb(255, 99, 132)'
    }
  }
};

class CardDownload extends React.Component {
  render() {
    /*--------------------------------------------------------------------------------*/
    /* Used In Dashboard-1,2,3                                                        */
    /*--------------------------------------------------------------------------------*/
    return (
      <Card className="bg-success">
        <CardBody>
          <div className="d-flex">
            <div className="mr-3 align-self-center">
              <h1 className="text-white">
                <i className="icon-cloud-download" />
              </h1>
            </div>
            <div>
              <CardTitle className="text-white">Download count</CardTitle>
              <CardSubtitle className="text-white op-5">
                March 2017
              </CardSubtitle>
            </div>
          </div>
          <div className="d-flex align-items-center mt-4">
            <div className="mr-auto">
              <h2 className="font-light text-white">35487</h2>
            </div>
            <div>
              <Bar
                data={barData}
                width={100}
                height={80}
                options={barOptions}
              />
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default CardDownload;
