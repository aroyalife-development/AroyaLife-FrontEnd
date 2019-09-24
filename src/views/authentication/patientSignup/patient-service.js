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
  axios
    .post(environment.baseUrl + "patient", {
      name: body.name,
      surname: body.surname,
      mobile: body.mobile,
      birthDay: body.birthDay,
      gender: body.gender,
      user: {
        accName: body.accName,
        email: body.email,
        password: body.password,
        role: { id: "d36eeebd8b1f0cde16210339e97b9408" }
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