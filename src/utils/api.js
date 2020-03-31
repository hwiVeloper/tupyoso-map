import Axios from "axios";

const apiUri = process.env.REACT_APP_API_URI;

export const apiGet = endpoint => {
  return Axios.get(apiUri + endpoint);
};

export const apiPost = (endpoint, data) => {
  return Axios.post(apiUri + endpoint, data);
};
