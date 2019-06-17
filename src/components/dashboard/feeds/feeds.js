import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';

import FeedData from './feeddata.js';

class Feeds extends React.Component {
  render() {
    return (
      /*--------------------------------------------------------------------------------*/
      /* Used In Dashboard-1,2,3  && Widget Page                                        */
      /*--------------------------------------------------------------------------------*/
      <Card>
        <CardBody>
          <CardTitle>Feeds</CardTitle>
          <div className="feeds">
            <FeedData
              buttoncolor="info"
              iconname="far fa-bell"
              content="You have 4 pending tasks."
              smtext="5 Aug"
            />

            <FeedData
              buttoncolor="success"
              iconname="ti-server"
              content="Server #1 overloaded."
              smtext="12 July"
            />

            <FeedData
              buttoncolor="warning"
              iconname="ti-shopping-cart"
              content="New order received."
              smtext="31 May"
            />

            <FeedData
              buttoncolor="danger"
              iconname="ti-user"
              content="New user registered."
              smtext="30 May"
            />

            <FeedData
              buttoncolor="inverse"
              iconname="far fa-bell"
              content="New Version just arrived."
              smtext="27 May"
            />

            <FeedData
              buttoncolor="info"
              iconname="far fa-bell"
              content="You have 4 pending tasks."
              smtext="20 May"
            />
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default Feeds;
