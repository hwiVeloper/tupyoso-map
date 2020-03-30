import Axios from "axios";

const apiUri = "http://localhost";

export const apiGet = endpoint => {
  return Axios.get(apiUri + endpoint);
};

export const apiPost = (endpoint, data) => {
  return Axios.post(apiUri + endpoint, data);
};
