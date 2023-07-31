import Togglable from './Togglable';
import NewBlogForm from './NewBlogForm';
import Blog from './Blog';
import { useGetBlogs } from '../hooks/useGetBlogs';
import { useGetUser } from '../hooks/useGetUser';

export const Home = ({
  createBlog,
  newBlogFormRef,
  handleLike,
  handleDelete,
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
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike(blog.id)}
            handleDelete={handleDelete(blog.id)}
            user={user}
          />
        ))}
    </div>
  );
};
