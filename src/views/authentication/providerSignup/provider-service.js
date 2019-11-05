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
    .post(environment.baseUrl + "provider", {
      title: body.title,
      firstName: body.firstName,
      lastName: body.lastName,
      slmcNo: body.slmcNo,
      birthDay: body.birthDay,
      gender: body.gender,
      deliveryAddress: body.deliveryAddress,
      mobile: body.mobile,
      specializations: [{ id: body.specialization }],
      user: {
        accName: body.accName,
        email: body.email,
        password: body.password,
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
