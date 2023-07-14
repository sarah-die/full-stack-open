import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [notification, setNotification] = useState(
    "Notifications appear here."
  );
  const [isVisible, setIsVisible] = useState(false);

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

  useEffect(() => {
    if (notification === "") {
      setIsVisible(false);
      return;
    }
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setNotification("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [notification]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      setUser(user);
      setNotification(`Login successful for user "${username}"`);
      setUsername("");
      setPassword("");
    } catch (error) {
      setNotification(error.response.data.error);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      window.localStorage.removeItem("loggedBlogAppUser");
      setNotification(`Logout successful`);
      setUser(null);
    } catch (error) {
      setNotification(error.response.data.error);
    }
  };

  const addBlog = async (event) => {
    event.preventDefault();

    try {
      const returnedBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(returnedBlog));
      setNotification(
        `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`
      );
      setNewBlog({ title: "", author: "", url: "" });
    } catch (error) {
      setNotification(error.response.data.error);
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {isVisible && <div className="error">{notification}</div>}
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
      {isVisible && <div className="error">{notification}</div>}
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
