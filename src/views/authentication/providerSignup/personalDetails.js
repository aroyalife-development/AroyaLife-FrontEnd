import React from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";

const PersonalDetails = props => {
  return (
    <form className={props.classes.container} noValidate autoComplete="off">
      <Grid container spacing={3}>
        <Grid item md={2} xs={6}>
          <TextField
            select
            name="title"
            label="Title"
            className={props.classes.textField}
            value={props.providerState.title}
            onChange={props.updateState}
            margin="normal"
            variant="outlined"
            fullWidth
          >
            <MenuItem value="dr">Mr.</MenuItem>
            <MenuItem value="miss">Miss.</MenuItem>
            <MenuItem value="mrs">Mrs.</MenuItem>
          </TextField>
        </Grid>
        <Grid item md={5} xs={6}>
          <TextField
            name="firstName"
            label="FirstName"
            className={props.classes.textField}
            value={props.providerState.firstName}
            onChange={props.updateState}
            margin="normal"
            variant="outlined"
            fullWidth
          />
          <span>{props.providerState.firstName}</span>
        </Grid>
        <Grid item md={5} xs={6}>
          <TextField
            name="lastName"
            label="LastName"
            className={props.classes.textField}
            value={props.providerState.lastName}
            onChange={props.updateState}
            margin="normal"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item md={4} xs={6}>
          <TextField
            name="slmcNo"
            label="SlmcNo"
            className={props.classes.textField}
            value={props.providerState.slmcNo}
            onChange={props.updateState}
            margin="normal"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item md={4} xs={6}>
          <TextField
            name="mobile"
            label="Mobile"
            className={props.classes.textField}
            value={props.providerState.mobile}
            onChange={props.updateState}
            margin="normal"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item md={4} xs={6}>
          <TextField
            select
            name="gender"
            label="Gender"
            className={props.classes.textField}
            value={props.providerState.gender}
            onChange={props.updateState}
            // helperText="Please select your currency"
            margin="normal"
            variant="outlined"
            fullWidth

            // SelectProps={{
            //   MenuProps: {
            //     className: props.classes.menu
            //   }
            // }}
          >
            {/* {currencies.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
            <MenuItem value="">
              <em>None</em>
            </MenuItem> */}
            <MenuItem value="M">Male</MenuItem>
            <MenuItem value="F">Female</MenuItem>
            <MenuItem value="O">Other</MenuItem>
          </TextField>
        </Grid>

        <Grid item md={4} xs={6}>
          <TextField
            name="deliveryAddress"
            label="Delivery Address"
            className={props.classes.textField}
            value={props.providerState.deliveryAddress}
            onChange={props.updateState}
            margin="normal"
            variant="outlined"
            fullWidth
            multiline
            rowsMax="4"
          />
        </Grid>
        <Grid item md={4} xs={6}>
          <TextField
            name="birthDay"
            // label="Birthday"
            className={props.classes.textField}
            value={props.providerState.birthDay}
            onChange={props.updateState}
            margin="normal"
            variant="outlined"
            type="date"
            // helperText="Please select your Birthday"
            fullWidth
          />
        </Grid>
        <Grid item md={4} xs={6}>
          <TextField
            select
            name="specialization"
            label="Specialization"
            className={props.classes.textField}
            value={props.providerState.specialization}
            onChange={props.updateState}
            margin="normal"
            variant="outlined"
            fullWidth
          >
            {props.providerState.specializationList.map(option => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </form>
  );
};

// const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
function handleDateChange(date) {
  setSelectedDate(date);
}

export default PersonalDetails;
