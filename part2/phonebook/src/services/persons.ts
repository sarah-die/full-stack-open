import axios, { AxiosResponse } from "axios";
import { Contact } from "../App";
const baseURL = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then((response: AxiosResponse) => response.data);
};

const create = (newObject: Contact) => {
  const request = axios.post(baseURL, newObject);
  return request.then((response: AxiosResponse) => response.data);
};

const deletePerson = (id: number) => {
  const request = axios.delete(`${baseURL}/${id}`);
  return request.then((response) => response.data);
};

export default { getAll, create, deletePerson };
