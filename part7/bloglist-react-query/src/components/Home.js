import Togglable from './Togglable';
import NewBlogForm from './NewBlogForm';
import { useGetBlogs } from '../hooks/useGetBlogs';
import { useGetUser } from '../hooks/useGetUser';
import { Link } from 'react-router-dom';

export const Home = ({
  createBlog,
  newBlogFormRef,
  // handleLike,
  // handleDelete,
}) => {
  const { data: blogs } = useGetBlogs();
  const { data: user } = useGetUser();

  return (
    <div>
      <h2>Blogs</h2>
      <Togglable buttonLabel="create Blog" ref={newBlogFormRef}>
        <NewBlogForm createBlog={createBlog} creator={user.username} />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} by {blog.author}
            </Link>
            <br />
          </div>
        ))}
    </div>
  );
};
