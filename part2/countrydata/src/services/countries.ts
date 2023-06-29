import axios, { AxiosResponse } from "axios";

const baseURL: string = "https://studies.cs.helsinki.fi/restcountries/";

const getAllNames = () => {
  const request = axios.get(`${baseURL}/api/all`);
  return request.then((response: AxiosResponse) =>
    response.data.map((el: any) => el.name.common)
  );
};

const getCountry = (country: string) => {
  const request = axios.get(`${baseURL}api/name/${country}`);
  return request.then((response: AxiosResponse) => response.data);
};

export default { getAllNames, getCountry };
