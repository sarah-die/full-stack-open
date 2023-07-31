import { useQuery } from 'react-query';
import blogService from '../services/blogs';

const QUERY_KEY = ['user'];

const checkLoggedUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    blogService.setToken(user.token);
    return user;
  }
  return null;
};

export const useGetUser = () => {
  return useQuery(QUERY_KEY, () => checkLoggedUser, {
    refetchOnWindowFocus: false,
  });
};
