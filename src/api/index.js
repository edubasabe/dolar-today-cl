import Axios from "axios";

export const instance = Axios.create({
  baseURL: 'https://api.sbif.cl/api-sbifv3/recursos_api/dolar/',
  timeout: (30 * 1000),
});

export const defaultParams = {
  apikey: process.env.REACT_APP_API_KEY,
  formato: "json",
};

