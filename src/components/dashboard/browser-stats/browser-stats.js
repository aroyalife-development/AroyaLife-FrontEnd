import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';

import chrome from '../../../assets/images/browser/chrome-logo.png';
import firefox from '../../../assets/images/browser/firefox-logo.png';
import safari from '../../../assets/images/browser/safari-logo.png';
import ie from '../../../assets/images/browser/internet-logo.png';
import opera from '../../../assets/images/browser/opera-logo.png';
import edge from '../../../assets/images/browser/internet-logo.png';

import BrowseData from './browsedata.js';

class BrowserStats extends React.Component {
  render() {
    return (
      /*--------------------------------------------------------------------------------*/
      /* Used In Dashboard-4 and Widget Page                                            */
      /*--------------------------------------------------------------------------------*/
      <Card>
        <CardBody>
          <CardTitle className="mb-4">Browser Stats</CardTitle>
          <BrowseData
            image={chrome}
            content="Google Chrome"
            badge="23%"
            badgeColor="danger"
          />
          <BrowseData
            image={firefox}
            content="Mozila Firefox"
            badge="12%"
            badgeColor="primary"
          />
          <BrowseData
            image={safari}
            content="Apple Safari"
            badge="25%"
            badgeColor="info"
          />
          <BrowseData
            image={ie}
            content="Internet Explorer"
            badge="13%"
            badgeColor="warning"
          />
          <BrowseData
            image={opera}
            content="Opera mini"
            badge="03%"
            badgeColor="success"
          />
          <BrowseData
            image={edge}
            content="Microsoft edge"
            badge="73%"
            badgeColor="info"
          />
        </CardBody>
      </Card>
    );
  }
}

export default BrowserStats;
