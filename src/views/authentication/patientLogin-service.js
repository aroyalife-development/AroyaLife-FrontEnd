import axios from "axios";
import { environment } from "../../environments";

export const login = patient => {
  let patientEmail = patient.email;
  let patientPassword = patient.password;
  console.log(patientEmail, patientPassword);

  let username = "CPAP";
  let password = "Cp43&$^fdgd*+!!@#Agdo4Ged";
  let formdata = new FormData();
  let headers = new Headers();

  ormdata.append("grant_type", "password");
  formdata.append("email", patientEmail);
  formdata.append("password", patientPassword);

  headers.append("Authorization", "Basic " + btoa(username + ":" + password));
  fetch(environment.baseUrl + "oauth/token", {
    method: "POST",
    headers: headers,
    body: formdata
  })
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson);

      //  this.setState({
      //     data: responseJson
      //  })
    })
    .catch(error => {
      console.error(error);
    });
};
