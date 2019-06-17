import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';

import Chart from 'react-c3-component';
import 'c3/c3.css';

class TotalRevenue extends React.Component {
  render() {
    return (
      /*--------------------------------------------------------------------------------*/
      /* Used In Dashboard-4                                                            */
      /*--------------------------------------------------------------------------------*/
      <Card>
        <CardBody>
          <div className="d-flex no-block align-items-center">
            <CardTitle>Total Revenue</CardTitle>
            <div className="ml-auto d-flex no-block align-items-center">
              <ul className="list-inline font-12 dl mr-3 mb-0">
                <li className="border-0 p-0 text-info list-inline-item">
                  <h6 className="text-muted">
                    <i className="fa fa-circle mr-1 text-success" />
                    2015
                  </h6>
                </li>
                <li className="border-0 p-0 text-primary list-inline-item">
                  <h6 className="text-muted">
                    <i className="fa fa-circle mr-1 text-danger" />
                    2016
                  </h6>
                </li>
                <li className="border-0 p-0 text-primary list-inline-item">
                  <h6 className="text-muted">
                    <i className="fa fa-circle mr-1 text-info" />
                    2017
                  </h6>
                </li>
              </ul>
            </div>
          </div>
          <div className="product-sales">
            <Chart
              style={{ height: '350px', width: '100%' }}
              config={{
                data: {
                  columns: [
                    ['Site A', 5, 6, 3, 7, 9, 10, 14, 12, 11, 9],
                    ['Site B', 1, 2, 8, 3, 4, 5, 7, 6, 5, 6],
                    ['Site C', 4, 2, 6, 3, 5, 2, 1, 7, 4, 6]
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
                  width: 4
                },
                padding: {
                  top: 0,
                  right: 10,
                  bottom: 0,
                  left: 20
                },
                point: {
                  r: 0
                },
                legend: {
                  hide: true
                },
                color: {
                  pattern: ['#1e88e5', '#26c6da', '#fc4b6c', '#7e74fb']
                }
              }}
            />
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default TotalRevenue;
