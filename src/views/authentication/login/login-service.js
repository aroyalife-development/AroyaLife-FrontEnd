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

export const resetPassword = async body => {
  var bodyFormData = new FormData();
  bodyFormData.set("email", body.email);

  return axios({
    method: "post",
    url: environment.baseUrl + "platform-users/resetPassword",
    data: bodyFormData,
    config: { headers: { "Content-Type": "multipart/form-data" } }
  })
    .then(response => {
      console.log("------------------- response - ", response);
      return response;
    })
    .catch(error => {
      console.log("------------------- error - ", JSON.stringify(error));
      return error;
    });
};

export const changePassword = async body => {
  var bodyFormData = new FormData();
  bodyFormData.set("id", body.userId);
  bodyFormData.set("newPass", body.password);
  bodyFormData.set("confirmPass", body.confirmPassword);

  return axios({
    method: "post",
    url: environment.baseUrl + "platform-users/changePassword",
    data: bodyFormData,
    config: { headers: { "Content-Type": "multipart/form-data" } }
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
