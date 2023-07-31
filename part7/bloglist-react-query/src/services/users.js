import axios from 'axios';
const baseUrl = '/api/users';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getById = async (userId) => {
  const response = await axios.get(`${baseUrl}/${userId}`);
  return response.data;
};

export default { getAll, getById };
