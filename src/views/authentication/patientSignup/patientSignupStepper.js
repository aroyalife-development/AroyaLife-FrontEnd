// import React, { Component } from "react";
// import StepZilla from "react-stepzilla";
// import {
//   Card,
//   CardBody,
//   CardTitle,
//   Navbar,
//   NavbarBrand,
//   Row
// } from "reactstrap";

// import Step1 from "./Step1";
// import Step2 from "./Step2";
// import Step3 from "./Step3";
// import Step4 from "./Step4";

import React from "react";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import clsx from "clsx";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { ThemeProvider } from "@material-ui/styles";
import { Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import PersonalDetails from "./personalDetails";
import AccountDetails from "./accountDetails";
import ConfirmationMsg from "./confirmationMsg";
import { save } from "./patient-service";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "50px",
    marginBottom: "70px"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  floatRight: {
    float: "right"
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  },
  // root: {
  //   display: "flex",
  //   flexWrap: "wrap"
  // },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#26a69a"
    }
    // secondary: {
    //   light: '#0066ff',
    //   main: '#0044ff',
    //   // dark: will be calculated from palette.secondary.main,
    //   contrastText: '#ffcc00',
    // }
  }
});

function getSteps() {
  return ["Personal Details", "Account Details"];
}

function getStepContent(stepIndex, classes, props) {
  switch (stepIndex) {
    case 0:
      return (
        <PersonalDetails
          classes={classes}
          patientState={props.patientState}
          updateState={props.updateState}
        />
      );
    case 1:
      return (
        <AccountDetails
          classes={classes}
          patientState={props.patientState}
          updateState={props.updateState}
        />
      );
    default:
      return "Uknown stepIndex";
  }
}

const PatientSignupStepper = props => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
    // activeStep === steps.length - 1 ? alert("Finish") : alert("Next");
    if (activeStep === steps.length - 1) {
      savePatient();
    }
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  async function savePatient() {
    let response = await save(props.patientState);
    console.log(response);
    if (response.status === 201) {
      alert("OK");
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    } else {
      alert("Not Ok");
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Container maxWidth="md">
                <ConfirmationMsg classes={classes} />
              </Container>
            </div>
          ) : (
            <div>
              <Container maxWidth="md">
                {getStepContent(activeStep, classes, props)}
              </Container>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={(classes.instructions, classes.floatRight)}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default PatientSignupStepper;
