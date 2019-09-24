import React from "react";
import { Grid, TextField } from "@material-ui/core";

const AccountDetails = props => {
  return (
    <form className={props.classes.container} noValidate autoComplete="off">
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <TextField
            name="accName"
            label="Account Name"
            className={props.classes.textField}
            value={props.patientState.accName}
            onChange={props.updateState}
            margin="normal"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            name="email"
            label="Email"
            className={props.classes.textField}
            value={props.patientState.email}
            onChange={props.updateState}
            margin="normal"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            name="password"
            label="Password"
            className={props.classes.textField}
            value={props.patientState.password}
            onChange={props.updateState}
            margin="normal"
            variant="outlined"
            type="password"
            fullWidth
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default AccountDetails;
