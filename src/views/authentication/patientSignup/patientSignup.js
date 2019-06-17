import React, { Component } from 'react';
import StepZilla from 'react-stepzilla';
import {
  Card,
  CardBody,
  CardTitle,
  Navbar,
  NavbarBrand,
  Row
} from 'reactstrap';

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';


import img2 from '../../../assets/images/big/Aroya_Life_subcription_Background-01.jpg';
import logodarkicon from '../../../assets/images/login/AroyaLifeLogo.png';
import logolighticon from '../../../assets/images/login/AroyaLifeLogo.png';


const sidebarBackground = {
  backgroundImage: 'url(' + img2 + ')',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center'
};

class PatientSignup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.sampleStore = {
      email: '',
      gender: '',
      savedToCloud: false
    };
  }

  getStore() {
    return this.sampleStore;
  }

  updateStore(update) {
    this.sampleStore = {
      ...this.sampleStore,
      ...update,
    }
  }

  render() {
    const steps =
      [
        { name: 'Basic Details', component: <Step1 getStore={() => (this.getStore())} updateStore={(u) => { this.updateStore(u) }} /> },
        { name: 'Privacy Details', component: <Step2 getStore={() => (this.getStore())} updateStore={(u) => { this.updateStore(u) }} /> },
        // { name: 'Physical Details', component: <Step3 getStore={() => (this.getStore())} updateStore={(u) => { this.updateStore(u) }} /> },
        { name: 'Done', component: <Step4 getStore={() => (this.getStore())} updateStore={(u) => { this.updateStore(u) }} /> }
      ]

    return (
      <div>
        <Navbar>
          <NavbarBrand href="/">
            <b className="logo-icon">
              <img src={logodarkicon} alt="homepage" height="50px" className="dark-logo ml-5" />
              {/* <img
                src={logolighticon}
                alt="homepage"
                className="light-logo"
              /> */}
            </b>
          </NavbarBrand>
        </Navbar>

        <div className="auth-wrapper align-items-center d-flex" style={sidebarBackground}>

          <div className="container mt-3">
            <Card>
              <CardBody className="border-bottom">
                <CardTitle className="mb-0"><i className="mdi mdi-border-right mr-2"></i>Signup as a Patient</CardTitle>
              </CardBody>
              <CardBody>
                <div className='example'>
                  <div className='step-progress'>
                    <StepZilla
                      steps={steps}
                      nextTextOnFinalActionStep={"Save"}
                      nextButtonCls={"btn btn-prev btn-success btn-lg pull-right"}
                      backButtonCls={"btn btn-next btn-success btn-lg pull-left"}
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>

    );
  }
}

export default PatientSignup;
