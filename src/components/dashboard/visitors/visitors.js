import React from 'react';
import { Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

import Chart from 'react-c3-component';
import 'c3/c3.css';

class Visitors extends React.Component {
  render() {
    return (
      /*--------------------------------------------------------------------------------*/
      /* Used In Dashboard-1,2                                                          */
      /*--------------------------------------------------------------------------------*/
      <Card>
        <CardBody>
          <CardTitle>Our Visitors</CardTitle>
          <CardSubtitle className="mb-3">
            Different Devices Used to Visit
          </CardSubtitle>
          <Chart
            style={{ height: '255px', width: '100%' }}
            config={{
              data: {
                columns: [
                  ['Other', 30],
                  ['Desktop', 10],
                  ['Tablet', 40],
                  ['Mobile', 50]
                ],

                type: 'donut',
                tooltip: {
                  show: true
                }
              },
              donut: {
                label: {
                  show: false
                },
                title: 'Our Visitor',
                width: 20
              },
              legend: {
                hide: true
              },
              color: {
                pattern: ['#eceff1', '#745af2', '#26c6da', '#1e88e5']
              }
            }}
          />
        </CardBody>
        <div>
          <hr className="mt-0 mb-0" />
        </div>
        <CardBody>
          <div className="d-flex no-block align-items-center justify-content-center">
            <div>
              <h6 className="text-info">
                <i className="fa fa-circle font-10 mr-2" />
                Mobile
              </h6>
            </div>
            <div className="ml-3">
              <h6 className="text-primary">
                <i className="fa fa-circle font-10 mr-2" />
                Desktop
              </h6>
            </div>
            <div className="ml-3">
              <h6 className="text-success">
                <i className="fa fa-circle font-10 mr-2" />
                Tablet
              </h6>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default Visitors;
