import { useGetUser } from '../hooks/useGetUser';
import { useParams } from 'react-router-dom';
import { useGetBlogs } from '../hooks/useGetBlogs';

const Blog = ({ handleLike, handleDelete }) => {
  const { data: user } = useGetUser();
  const { data: blogs, isLoading: isBlogsLoading } = useGetBlogs();
  const { id: blogId } = useParams();

  if (isBlogsLoading) return <div>Is loading...</div>;

  const blog = blogs.find((b) => b.id === blogId);
  if (!blog) return null;

  return (
    <div className="blogElement">
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>
        <div>{blog.url}</div>
        <div>
          <div className="likesElement">likes {blog.likes}</div>
          <button id="like-button" onClick={handleLike(blog.id)}>
            like
          </button>
        </div>
        <div>added by {blog.user.username}</div>
        {blog.user.username === user.username ? (
          <button
            id="delete-button"
            style={{ backgroundColor: 'lightblue' }}
            onClick={handleDelete(blog.id)}
          >
            delete
          </button>
        ) : (
          <></>
        )}
        <div>
          <h4>Comments</h4>
          <ul>
            {blog.comments.map((c, index) => {
              return <li key={index}>{c}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Blog;
