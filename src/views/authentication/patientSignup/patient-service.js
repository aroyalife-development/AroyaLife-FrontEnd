import axios from "axios";
import { environment } from "../../../environments";


export const save = body => {
  //   return fetch({
  //     method: "POST",
  //     url: `${API}/sign-up`,
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(body)
  //   });

  return axios
    .post(environment.baseUrl + 'patient')
    .then(response => {
        console.log('------------------- response - ', response);
    })
    .catch(error  => {
        console.log('------------------- error - ', error);
    });
};
