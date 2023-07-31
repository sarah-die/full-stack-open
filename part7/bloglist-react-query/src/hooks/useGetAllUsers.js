import { useQuery } from 'react-query';
import usersService from '../services/users';

const QUERY_KEY = ['allUsers'];

export const useGetAllUsers = () => {
  return useQuery(QUERY_KEY, usersService.getAll, {
    refetchOnWindowFocus: false,
  });
};
