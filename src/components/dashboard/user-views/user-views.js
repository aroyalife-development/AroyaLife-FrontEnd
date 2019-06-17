import React from 'react';
import { Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

import { Line } from 'react-chartjs-2';

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

class UserViews extends React.Component {
  render() {
    return (
      /*--------------------------------------------------------------------------------*/
      /* Used In Dashboard-3                                                            */
      /*--------------------------------------------------------------------------------*/
      <Card>
        <CardBody>
          <div className="d-flex flex-wrap">
            <div>
              <CardTitle>User Views</CardTitle>
              <CardSubtitle>Last 5 Months Views</CardSubtitle>
            </div>
          </div>
          <div className="campaign ct-charts mt-4">
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
          <div className="d-flex no-block align-items-center justify-content-center mt-4 mb-2">
            <div>
              <h6 className="text-success">
                <i className="fa fa-circle font-10 mr-2" />
                Positive View
              </h6>
            </div>
            <div className="ml-3">
              <h6 className="text-info">
                <i className="fa fa-circle font-10 mr-2" />
                Negative View
              </h6>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default UserViews;
