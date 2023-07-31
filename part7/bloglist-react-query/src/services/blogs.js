import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newBlog) => {
  // authorization header
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

// 5.9
const update = async (updatedBlog) => {
  console.log('axios: ', `${baseUrl}/${updatedBlog.id}`);
  const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog);
  return response.data;
};

// 5.11
const deleteBlog = async (blogId) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.delete(`${baseUrl}/${blogId}`, config);
  return response.data;
};

export default { setToken, getAll, create, update, deleteBlog };
