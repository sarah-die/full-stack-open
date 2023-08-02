import { useParams } from 'react-router-dom';
import { useGetAllUsers } from '../hooks/useGetAllUsers';
import { List } from 'antd';

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
      <h2>Username: {user.username}</h2>
      {user.blogs.length === 0 ? (
        <div>No blogs created</div>
      ) : (
        <List
          header={<h3>Added Blogs</h3>}
          size="small"
          dataSource={user.blogs}
          renderItem={(blog) => (
            <List.Item key={blog.id}>{blog.title}</List.Item>
          )}
        />
      )}
    </div>
  );
};
