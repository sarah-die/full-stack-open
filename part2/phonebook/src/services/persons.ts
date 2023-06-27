import axios, { AxiosResponse } from "axios";
import {Contact, PostEntity} from "../App";
const baseURL = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then((response: AxiosResponse) => response.data);
};

const create = (newObject: PostEntity<Contact>) => {
  const request = axios.post(baseURL, newObject);
  return request.then((response: AxiosResponse) => response.data);
};

const deletePerson = (id: number) => {
  const request = axios.delete(`${baseURL}/${id}`);
  return request.then((response) => response);
};

export default { getAll, create, deletePerson };
