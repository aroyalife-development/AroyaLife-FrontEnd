import React from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";

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

// const classes = useStyles();
// const [values, setValues] = React.useState({
//   age: '',
//   name: 'hai',
// });

// const inputLabel = React.useRef(null);
// const [labelWidth, setLabelWidth] = React.useState(0);
// React.useEffect(() => {
//   setLabelWidth(inputLabel.current.offsetWidth);
// }, []);

// function handleChange(event) {
//   setValues(oldValues => ({
//     ...oldValues,
//     [event.target.name]: event.target.value,
//   }));
// }

const PersonalDetails = props => {

  return (
    <form className={props.classes.container} noValidate autoComplete="off">
      <Grid container spacing={3}>
        <Grid item md={6} xs={6}>
          <TextField
            name="name"
            label="Name"
            className={props.classes.textField}
            value={props.patientState.name}
            onChange={props.updateState}
            margin="normal"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item md={6} xs={6}>
          <TextField
            name="surname"
            label="Surname"
            className={props.classes.textField}
            value={props.patientState.surname}
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
            value={props.patientState.mobile}
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
            value={props.patientState.gender}
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

          {/* <FormControl variant="outlined" className={props.classes.formControl}>
            <InputLabel htmlFor="outlined-age-simple">Age</InputLabel>
            <Select
              value={10}
              // onChange={handleChange}
              // labelWidth={labelWidth}
              // inputProps={{
              //   name: "age",
              //   id: "outlined-age-simple"
              // }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl> */}
        </Grid>
        <Grid item md={4} xs={6}>
          <TextField
            name="birthDay"
            // label="Birthday"
            className={props.classes.textField}
            value={props.patientState.birthDay}
            onChange={props.updateState}
            margin="normal"
            variant="outlined"
            type="date"
            // helperText="Please select your Birthday"
            fullWidth
          />
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
