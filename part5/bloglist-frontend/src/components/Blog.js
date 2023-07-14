import { useState } from "react";

const Blog = ({ blog }) => {
  const [isVisible, setIsVisible] = useState(true);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>
      {isVisible ? (
        <button onClick={() => setIsVisible(!isVisible)}>hide</button>
      ) : (
        <button onClick={() => setIsVisible(!isVisible)}>view</button>
      )}
      {isVisible && (
        <div>
          <div>{blog.url}</div>
          <div>
            <div>likes {blog.likes}</div>
            <button>like</button>
          </div>
          <div>{blog.user.username}</div>
        </div>
      )}
    </div>
  );
};

export default Blog;
