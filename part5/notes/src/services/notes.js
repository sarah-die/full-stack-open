import axios from "axios";
// const baseUrl = "http://localhost:3001/api/notes";
const baseUrl = "/api/notes";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  // token is set to authorization header
  const config = { headers: { Authorization: token } };
  // header is third parameter of axios post method
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

// export default {
//   getAll: getAll,
//   create: create,
//   update: update,
// };
// short form since key names and variables are the same
export default { getAll, create, update, setToken };
