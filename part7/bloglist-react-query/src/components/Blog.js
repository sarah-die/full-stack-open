import { useState } from 'react';

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [isVisible, setIsVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle} className="blogElement">
      <div>
        {blog.title} {blog.author}
      </div>
      {isVisible ? (
        <button id="view-button" onClick={() => setIsVisible(!isVisible)}>
          hide
        </button>
      ) : (
        <button id="view-button" onClick={() => setIsVisible(!isVisible)}>
          view
        </button>
      )}
      {isVisible && (
        <div>
          <div>{blog.url}</div>
          <div>
            <div className="likesElement">likes {blog.likes}</div>
            <button id="like-button" onClick={handleLike}>
              like
            </button>
          </div>
          <div>{blog.user.username}</div>
          {blog.user.username === user.username ? (
            <button
              id="delete-button"
              style={{ backgroundColor: 'lightblue' }}
              onClick={handleDelete}
            >
              delete
            </button>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
