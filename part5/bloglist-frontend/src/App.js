import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const [notification, setNotification] = useState(
    'Notifications appear here.'
  );
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // const fetchBlogs = async () => {
    //   const blogs = await blogService.getAll();
    //   setBlogs(blogs);
    // };
    // fetchBlogs();
    (async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    })();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    if (notification === '') {
      setIsVisible(false);
      return;
    }
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setNotification('');
    }, 5000);
    return () => clearTimeout(timer);
  }, [notification]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      setUser(user);
      setNotification(`Login successful for user "${username}"`);
      setUsername('');
      setPassword('');
    } catch (error) {
      setNotification(error.response.data.error);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      window.localStorage.removeItem('loggedBlogAppUser');
      setNotification('Logout successful');
      setUser(null);
    } catch (error) {
      setNotification(error.response.data.error);
    }
  };

  const handleLike = (blogId) => async () => {
    const blogIndex = blogs.findIndex((b) => b.id === blogId);
    const blog = blogs[blogIndex];
    try {
      const updatedBlog = {
        user: blog.user.id,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url,
      };
      const returnedBlog = await blogService.update(updatedBlog, blogId);
      setNotification(`You liked the blog ${returnedBlog.title}`);
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    } catch (error) {
      setNotification(error.response.data.error);
    }
  };

  // 5.11
  const handleDelete = (blogId) => async () => {
    const blogIndex = blogs.findIndex((b) => b.id === blogId);
    const blog = blogs[blogIndex];
    const confirm = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}?`
    );
    if (confirm) {
      try {
        await blogService.deleteBlog(blogId);
        setNotification(`Blog ${blog.title} deleted`);
        const blogs = await blogService.getAll();
        setBlogs(blogs);
      } catch (error) {
        setNotification(error.response.data.error);
      }
    }
  };

  const createBlog = async (blogObject) => {
    try {
      newBlogFormRef.current.toggleVisibility();
      const returnedBlog = await blogService.create(blogObject);
      // setBlogs(blogs.concat(returnedBlog)); block created (added to db) -> later blocks fetched from db
      setNotification(
        `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`
      );
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    } catch (error) {
      setNotification(error.response.data.error);
    }
  };

  const newBlogFormRef = useRef();

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
      <button id="logout-button" onClick={handleLogout}>
        logout
      </button>
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

export default App;
