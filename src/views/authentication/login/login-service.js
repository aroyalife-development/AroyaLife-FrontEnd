import axios from "axios";
import { environment } from "../../../environments";

export const login = async body => {
  return axios
    .post(environment.baseUrl + "platform-users/login", {
      username: body.username,
      password: body.password
    })
    .then(response => {
      console.log("------------------- response - ", response);
      return response;
    })
    .catch(error => {
      console.log("------------------- error - ", error);
      return error;
    });
};
