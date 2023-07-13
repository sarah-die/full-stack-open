import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    const user = await loginService.login({ username, password });
    blogService.setToken(user.token);
    window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
    setUser(user);
    setUsername("");
    setPassword("");
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
  };

  const addBlog = async (event) => {
    event.preventDefault();

    const returnedBlog = await blogService.create(newBlog);
    setBlogs(blogs.concat(returnedBlog));
    setNewBlog({ title: "", author: "", url: "" });
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <LoginForm
          handleLogin={handleLogin}
          setPassword={setPassword}
          password={password}
          setUsername={setUsername}
          username={username}
        />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <div>{user.username} logged in</div>
      <button onClick={handleLogout}>logout</button>
      <h2>Create new Blog</h2>
      <NewBlogForm
        addBlog={addBlog}
        newBlog={newBlog}
        setNewBlog={setNewBlog}
      />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
