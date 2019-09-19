// import React, { Component } from "react";
// import StepZilla from "react-stepzilla";
import {
  Card,
  CardBody,
  CardTitle,
  Navbar,
  NavbarBrand,
  Row
} from "reactstrap";

// import Step1 from "./Step1";
// import Step2 from "./Step2";
// import Step3 from "./Step3";
// import Step4 from "./Step4";

import img2 from "../../../assets/images/big/Aroya_Life_subcription_Background-01.jpg";
import logodarkicon from "../../../assets/images/login/AroyaLifeLogo.png";
import logolighticon from "../../../assets/images/login/AroyaLifeLogo.png";

const sidebarBackground = {
  backgroundImage: "url(" + img2 + ")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center"
};

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import clsx from "clsx";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

// import React from 'react';
// import clsx from 'clsx';
// import { makeStyles } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
// import TextField from '@material-ui/core/TextField';

const currencies = [
  {
    value: "USD",
    label: "$"
  },
  {
    value: "EUR",
    label: "€"
  },
  {
    value: "BTC",
    label: "฿"
  },
  {
    value: "JPY",
    label: "¥"
  }
];

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  }
}));

function getSteps() {
  return ["Personal Details", "Account Details"];
}

function getStepContent(stepIndex, classes, values, handleChange) {
  switch (stepIndex) {
    case 0:
      // return "Select campaign settings...";
      return (
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="outlined-name"
            label="Name"
            className={classes.textField}
            value={values.name}
            onChange={handleChange("name")}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-uncontrolled"
            label="Uncontrolled"
            defaultValue="foo"
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <TextField
            required
            id="outlined-required"
            label="Required"
            defaultValue="Hello World"
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <TextField
            error
            id="outlined-error"
            label="Error"
            defaultValue="Hello World"
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <TextField
            disabled
            id="outlined-disabled"
            label="Disabled"
            defaultValue="Hello World"
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-email-input"
            label="Email"
            className={classes.textField}
            type="email"
            name="email"
            autoComplete="email"
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            className={classes.textField}
            type="password"
            autoComplete="current-password"
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-read-only-input"
            label="Read Only"
            defaultValue="Hello World"
            className={classes.textField}
            margin="normal"
            InputProps={{
              readOnly: true
            }}
            variant="outlined"
          />
          <TextField
            id="outlined-dense"
            label="Dense"
            className={clsx(classes.textField, classes.dense)}
            margin="dense"
            variant="outlined"
          />
          <TextField
            id="outlined-dense-multiline"
            label="Dense multiline"
            className={clsx(classes.textField, classes.dense)}
            margin="dense"
            variant="outlined"
            multiline
            rowsMax="4"
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Multiline"
            multiline
            rowsMax="4"
            value={values.multiline}
            onChange={handleChange("multiline")}
            className={classes.textField}
            margin="normal"
            helperText="hello"
            variant="outlined"
          />
          <TextField
            id="outlined-multiline-static"
            label="Multiline"
            multiline
            rows="4"
            defaultValue="Default Value"
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-helperText"
            label="Helper text"
            defaultValue="Default Value"
            className={classes.textField}
            helperText="Some important text"
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-with-placeholder"
            label="With placeholder"
            placeholder="Placeholder"
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
        </form>
      );
    case 1:
      return (
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="outlined-textarea"
            label="Multiline Placeholder"
            placeholder="Placeholder"
            multiline
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-number"
            label="Number"
            value={values.age}
            onChange={handleChange("age")}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-search"
            label="Search field"
            type="search"
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-select-currency"
            select
            label="Select"
            className={classes.textField}
            value={values.currency}
            onChange={handleChange("currency")}
            SelectProps={{
              MenuProps: {
                className: classes.menu
              }
            }}
            helperText="Please select your currency"
            margin="normal"
            variant="outlined"
          >
            {currencies.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-select-currency-native"
            select
            label="Native select"
            className={classes.textField}
            value={values.currency}
            onChange={handleChange("currency")}
            SelectProps={{
              native: true,
              MenuProps: {
                className: classes.menu
              }
            }}
            helperText="Please select your currency"
            margin="normal"
            variant="outlined"
          >
            {currencies.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
          <TextField
            id="outlined-full-width"
            label="Label"
            style={{ margin: 8 }}
            placeholder="Placeholder"
            helperText="Full width!"
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            id="outlined-bare"
            className={classes.textField}
            defaultValue="Bare"
            margin="normal"
            variant="outlined"
            inputProps={{ "aria-label": "bare" }}
          />
        </form>
      );
    default:
      return "Uknown stepIndex";
  }
}

export default function HorizontalLabelPositionBelowStepper() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: "Cat in the Hat",
    age: "",
    multiline: "Controlled",
    currency: "EUR"
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function handleReset() {
    setActiveStep(0);
  }

  return (
    <div>
      <Navbar>
        <NavbarBrand href="/">
          <b className="logo-icon">
            <img
              src={logodarkicon}
              alt="homepage"
              height="50px"
              className="dark-logo ml-5"
            />
            {/* <img
              src={logolighticon}
              alt="homepage"
              className="light-logo"
            /> */}
          </b>
        </NavbarBrand>
      </Navbar>

      <div
        className="auth-wrapper align-items-center d-flex"
        style={sidebarBackground}
      >
        <div className="container mt-3">
          <Card>
            <CardBody className="border-bottom">
              <CardTitle className="mb-0">
                <i className="mdi mdi-border-right mr-2"></i>Signup as a Patient
              </CardTitle>
            </CardBody>
            <CardBody>
              {/* <div className="example">
                <div className="step-progress">
                  <StepZilla
                    steps={steps}
                    prevBtnOnLastStep={false}
                    nextButtonCls={
                      "btn btn-prev btn-success btn-lg pull-right"
                    }
                    backButtonCls={
                      "btn btn-next btn-success btn-lg pull-left"
                    }
                  />
                </div>
              </div> */}
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
                      <Typography className={classes.instructions}>
                        All steps completed
                      </Typography>
                      <Button onClick={handleReset}>Reset</Button>
                    </div>
                  ) : (
                    <div>
                      <Typography className={classes.instructions}>
                        {getStepContent(
                          activeStep,
                          classes,
                          values,
                          handleChange
                        )}
                      </Typography>
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
                        >
                          {activeStep === steps.length - 1 ? "Finish" : "Next"}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

// export default PatientSignup;

// import React from 'react';
// import clsx from 'clsx';
// import { makeStyles } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
// import TextField from '@material-ui/core/TextField';

// const currencies = [
//   {
//     value: 'USD',
//     label: '$',
//   },
//   {
//     value: 'EUR',
//     label: '€',
//   },
//   {
//     value: 'BTC',
//     label: '฿',
//   },
//   {
//     value: 'JPY',
//     label: '¥',
//   },
// ];

// const useStyles = makeStyles(theme => ({
//   container: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   textField: {
//     marginLeft: theme.spacing(1),
//     marginRight: theme.spacing(1),
//   },
//   dense: {
//     marginTop: theme.spacing(2),
//   },
//   menu: {
//     width: 200,
//   },
// }));

// export default function OutlinedTextFields() {
//   const classes = useStyles();
//   const [values, setValues] = React.useState({
//     name: 'Cat in the Hat',
//     age: '',
//     multiline: 'Controlled',
//     currency: 'EUR',
//   });

//   const handleChange = name => event => {
//     setValues({ ...values, [name]: event.target.value });
//   };

//   return (
//     <form className={classes.container} noValidate autoComplete="off">
//       <TextField
//         id="outlined-name"
//         label="Name"
//         className={classes.textField}
//         value={values.name}
//         onChange={handleChange('name')}
//         margin="normal"
//         variant="outlined"
//       />
//       <TextField
//         id="outlined-uncontrolled"
//         label="Uncontrolled"
//         defaultValue="foo"
//         className={classes.textField}
//         margin="normal"
//         variant="outlined"
//       />
//       <TextField
//         required
//         id="outlined-required"
//         label="Required"
//         defaultValue="Hello World"
//         className={classes.textField}
//         margin="normal"
//         variant="outlined"
//       />
//       <TextField
//         error
//         id="outlined-error"
//         label="Error"
//         defaultValue="Hello World"
//         className={classes.textField}
//         margin="normal"
//         variant="outlined"
//       />
//       <TextField
//         disabled
//         id="outlined-disabled"
//         label="Disabled"
//         defaultValue="Hello World"
//         className={classes.textField}
//         margin="normal"
//         variant="outlined"
//       />
//       <TextField
//         id="outlined-email-input"
//         label="Email"
//         className={classes.textField}
//         type="email"
//         name="email"
//         autoComplete="email"
//         margin="normal"
//         variant="outlined"
//       />
//       <TextField
//         id="outlined-password-input"
//         label="Password"
//         className={classes.textField}
//         type="password"
//         autoComplete="current-password"
//         margin="normal"
//         variant="outlined"
//       />
//       <TextField
//         id="outlined-read-only-input"
//         label="Read Only"
//         defaultValue="Hello World"
//         className={classes.textField}
//         margin="normal"
//         InputProps={{
//           readOnly: true,
//         }}
//         variant="outlined"
//       />
//       <TextField
//         id="outlined-dense"
//         label="Dense"
//         className={clsx(classes.textField, classes.dense)}
//         margin="dense"
//         variant="outlined"
//       />
//       <TextField
//         id="outlined-dense-multiline"
//         label="Dense multiline"
//         className={clsx(classes.textField, classes.dense)}
//         margin="dense"
//         variant="outlined"
//         multiline
//         rowsMax="4"
//       />
//       <TextField
//         id="outlined-multiline-flexible"
//         label="Multiline"
//         multiline
//         rowsMax="4"
//         value={values.multiline}
//         onChange={handleChange('multiline')}
//         className={classes.textField}
//         margin="normal"
//         helperText="hello"
//         variant="outlined"
//       />
//       <TextField
//         id="outlined-multiline-static"
//         label="Multiline"
//         multiline
//         rows="4"
//         defaultValue="Default Value"
//         className={classes.textField}
//         margin="normal"
//         variant="outlined"
//       />
//       <TextField
//         id="outlined-helperText"
//         label="Helper text"
//         defaultValue="Default Value"
//         className={classes.textField}
//         helperText="Some important text"
//         margin="normal"
//         variant="outlined"
//       />
//       <TextField
//         id="outlined-with-placeholder"
//         label="With placeholder"
//         placeholder="Placeholder"
//         className={classes.textField}
//         margin="normal"
//         variant="outlined"
//       />
//       <TextField
//         id="outlined-textarea"
//         label="Multiline Placeholder"
//         placeholder="Placeholder"
//         multiline
//         className={classes.textField}
//         margin="normal"
//         variant="outlined"
//       />
//       <TextField
//         id="outlined-number"
//         label="Number"
//         value={values.age}
//         onChange={handleChange('age')}
//         type="number"
//         className={classes.textField}
//         InputLabelProps={{
//           shrink: true,
//         }}
//         margin="normal"
//         variant="outlined"
//       />
//       <TextField
//         id="outlined-search"
//         label="Search field"
//         type="search"
//         className={classes.textField}
//         margin="normal"
//         variant="outlined"
//       />
//       <TextField
//         id="outlined-select-currency"
//         select
//         label="Select"
//         className={classes.textField}
//         value={values.currency}
//         onChange={handleChange('currency')}
//         SelectProps={{
//           MenuProps: {
//             className: classes.menu,
//           },
//         }}
//         helperText="Please select your currency"
//         margin="normal"
//         variant="outlined"
//       >
//         {currencies.map(option => (
//           <MenuItem key={option.value} value={option.value}>
//             {option.label}
//           </MenuItem>
//         ))}
//       </TextField>
//       <TextField
//         id="outlined-select-currency-native"
//         select
//         label="Native select"
//         className={classes.textField}
//         value={values.currency}
//         onChange={handleChange('currency')}
//         SelectProps={{
//           native: true,
//           MenuProps: {
//             className: classes.menu,
//           },
//         }}
//         helperText="Please select your currency"
//         margin="normal"
//         variant="outlined"
//       >
//         {currencies.map(option => (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </TextField>
//       <TextField
//         id="outlined-full-width"
//         label="Label"
//         style={{ margin: 8 }}
//         placeholder="Placeholder"
//         helperText="Full width!"
//         fullWidth
//         margin="normal"
//         variant="outlined"
//         InputLabelProps={{
//           shrink: true,
//         }}
//       />
//       <TextField
//         id="outlined-bare"
//         className={classes.textField}
//         defaultValue="Bare"
//         margin="normal"
//         variant="outlined"
//         inputProps={{ 'aria-label': 'bare' }}
//       />
//     </form>
//   );
// }
