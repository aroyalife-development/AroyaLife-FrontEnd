import React from 'react';
import { CardGroup, Card, CardBody } from 'reactstrap';

import { Bar } from 'react-chartjs-2';

let barData1 = {
  labels: ['1', '2', '3', '4', '5', '6', '7'],
  datasets: [
    {
      label: 'A',
      backgroundColor: 'rgb(79, 195, 247)',
      borderColor: 'rgb(79, 195, 247)',
      data: [4, 5, 2, 10, 9, 12, 4]
    }
  ]
};

let barData2 = {
  labels: ['1', '2', '3', '4', '5', '6', '7'],
  datasets: [
    {
      label: 'B',
      backgroundColor: 'rgb(116, 96, 238)',
      borderColor: 'rgb(116, 96, 238)',
      data: [2, 5, 4, 6, 8, 5, 4]
    }
  ]
};

let barData3 = {
  labels: ['1', '2', '3', '4', '5', '6', '7'],
  datasets: [
    {
      label: 'C',
      backgroundColor: 'rgb(30, 136, 229)',
      borderColor: 'rgb(30, 136, 229)',
      data: [3, 4, 5, 6, 4, 5, 3]
    }
  ]
};

let barData4 = {
  labels: ['1', '2', '3', '4', '5', '6', '7'],
  datasets: [
    {
      label: 'D',
      backgroundColor: 'rgb(252, 75, 108)',
      borderColor: 'rgb(252, 75, 108)',
      data: [4, 5, 2, 10, 9, 12, 4]
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
        barThickness: 8
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

class VisitrateView extends React.Component {
  render() {
    return (
      /*--------------------------------------------------------------------------------*/
      /* Used In Dashboard-4                                                            */
      /*--------------------------------------------------------------------------------*/
      <CardGroup>
        <Card>
          <CardBody className="text-center">
            <h4 className="text-center">Unique Visit</h4>
            <div style={{ width: '100px', margin: '0 auto' }}>
              <Bar
                data={barData1}
                width={100}
                height={100}
                options={barOptions}
              />
            </div>
          </CardBody>
          <div className="p-2 border-top text-center">
            <h4 className="font-medium mb-0">
              <i className="ti-angle-up text-success" /> 12456
            </h4>
          </div>
        </Card>

        <Card>
          <CardBody className="text-center">
            <h4 className="text-center">Total Visit</h4>
            <div style={{ width: '100px', margin: '0 auto' }}>
              <Bar
                data={barData2}
                width={100}
                height={100}
                options={barOptions}
              />
            </div>
          </CardBody>
          <div className="p-2 border-top text-center">
            <h4 className="font-medium mb-0">
              <i className="ti-angle-down text-primary" /> 456
            </h4>
          </div>
        </Card>
        <Card>
          <CardBody className="text-center">
            <h4 className="text-center">Bounce rate</h4>
            <div style={{ width: '100px', margin: '0 auto' }}>
              <Bar
                data={barData3}
                width={100}
                height={100}
                options={barOptions}
              />
            </div>
          </CardBody>
          <div className="p-2 border-top text-center">
            <h4 className="font-medium mb-0">
              <i className="ti-angle-up text-info" /> 12456
            </h4>
          </div>
        </Card>

        <Card>
          <CardBody className="text-center">
            <h4 className="text-center">Page Views</h4>
            <div style={{ width: '100px', margin: '0 auto' }}>
              <Bar
                data={barData4}
                width={100}
                height={100}
                options={barOptions}
              />
            </div>
          </CardBody>
          <div className="p-2 border-top text-center">
            <h4 className="font-medium mb-0">
              <i className="ti-angle-down text-danger" /> 456
            </h4>
          </div>
        </Card>
      </CardGroup>
    );
  }
}

export default VisitrateView;
