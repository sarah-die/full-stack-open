import { useQuery } from 'react-query';
import blogService from '../services/blogs';

// imp! https://majidlotfinia.medium.com/react-query-best-practices-separating-concerns-with-custom-hooks-3f1bc9051fa2
const QUERY_KEY = ['blogs'];

// React Query: fetch all data -> wrap axios call in a query formed with the useQuery function
export const useGetBlogs = () => {
  return useQuery(QUERY_KEY, blogService.getAll, {
    refetchOnWindowFocus: false,
  });
};
