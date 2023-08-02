import Togglable from './Togglable';
import NewBlogForm from './NewBlogForm';
import { useGetBlogs } from '../hooks/useGetBlogs';
import { useGetUser } from '../hooks/useGetUser';
import { Link } from 'react-router-dom';
import { List } from 'antd';

export const Home = ({ createBlog, newBlogFormRef }) => {
  const { data: blogs } = useGetBlogs();
  const { data: user } = useGetUser();

  return (
    <div>
      <Togglable buttonLabel="create Blog" ref={newBlogFormRef}>
        <NewBlogForm createBlog={createBlog} creator={user.username} />
      </Togglable>
      <List
        header={<h2>Blogs</h2>}
        dataSource={blogs.slice().sort((a, b) => b.likes - a.likes)}
        renderItem={(blog) => (
          <List.Item key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} by {blog.author}
            </Link>
            <br />
          </List.Item>
        )}
      ></List>
    </div>
  );
};
