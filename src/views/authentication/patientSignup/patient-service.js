import axios from "axios";
import { environment } from "../../../environments";

// export const getUserRole = () => {
//   axios
//     .get(environment.baseUrl + "role")
//     .then(response => {
//       console.log("------------------- response - ", response);
//       return response;
//     })
//     .catch(error => {
//       console.log("------------------- error - ", error);
//       return error;
//     });
// };

export const save = body => {
  return axios
    .post(environment.baseUrl + "patient", {
      name: body.name,
      surname: body.surname,
      mobile: body.mobile,
      birthDay: body.birthDay,
      gender: body.gender,
      user: {
        accName: body.accName,
        email: body.email,
        password: body.password
      },
      subscription: {
        id: "faa6643aca8c5318a9583178795542cf"
      }
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
