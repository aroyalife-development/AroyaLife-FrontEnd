import React from "react";
import { Grid, Typography } from "@material-ui/core";

const ConfirmationMsg = props => {
  return (
    <div className={props.classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            {props.saveResponseError ? "Error" : "Thanks"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            {props.saveResponseError
              ? "An error has occurred"
              : "Your details have been successfully Saved!"}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default ConfirmationMsg;
