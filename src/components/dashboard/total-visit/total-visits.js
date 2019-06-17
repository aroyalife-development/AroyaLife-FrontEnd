import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';

import { VectorMap } from 'react-jvectormap';
import '../../../views/maps/vectormap.css';

var mapData = {
  FR: 540,
  AU: 360,
  GB: 690,
  GE: 200,
  IN: 400,
  RO: 600,
  RU: 300,
  US: 2920
};

class TotalVisits extends React.Component {
  render() {
    return (
      /*--------------------------------------------------------------------------------*/
      /* Used In Dashboard-4                                                            */
      /*--------------------------------------------------------------------------------*/
      <Card>
        <CardBody>
          <CardTitle>Total Visits</CardTitle>
          <VectorMap
            map={'world_mill'}
            backgroundColor="transparent"
            zoomOnScroll={false}
            containerStyle={{
              width: '100%',
              height: '420px'
            }}
            containerClassName="map"
            regionStyle={{
              initial: {
                fill: '#d5e4e4',
                'fill-opacity': 0.9,
                stroke: '1',
                'stroke-width': 1,
                'stroke-opacity': 0.5
              }
            }}
            series={{
              regions: [
                {
                  values: mapData,
                  scale: ['#1e88e5', '#1b8ce9']
                }
              ]
            }}
          />
        </CardBody>
      </Card>
    );
  }
}

export default TotalVisits;
