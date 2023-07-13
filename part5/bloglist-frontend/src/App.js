import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    const user = await loginService.login({ username, password });
    blogService.setToken(user.token);
    setUser(user);
    setUsername("");
    setPassword("");
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
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
