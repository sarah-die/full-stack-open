import { useParams } from 'react-router-dom';
import { useGetAllUsers } from '../hooks/useGetAllUsers';

export const User = () => {
  const { data: allUsers, isLoading: isUsersLoading } = useGetAllUsers();
  // access the URL parameter
  const userId = useParams().id;

  if (isUsersLoading) {
    return <div>Is loading ...</div>;
  }

  const user = allUsers.find((u) => u.id === userId);

  return (
    <div>
      <h2>{user.username}</h2>
      <h4>Added Blogs</h4>
      {user.blogs.length === 0 ? (
        <div>No blogs created</div>
      ) : (
        <ul>
          {user.blogs.map((blog) => {
            return <li key={blog.id}>{blog.title}</li>;
          })}
        </ul>
      )}
    </div>
  );
};
