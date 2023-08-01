import { useState, useRef } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import { useMutation, useQueryClient } from 'react-query';
import { useNotificationDispatch } from './NotificationContext';
import Notification from './components/Notification';
import { Home } from './components/Home';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { UserInfo } from './components/UserInfo';
import { Menu } from './components/Menu';
import { useGetUser } from './hooks/useGetUser';
import { useGetBlogs } from './hooks/useGetBlogs';
import { User } from './components/User';
import Blog from './components/Blog';

const App = () => {
  const queryClient = useQueryClient();
  const dispatchNotification = useNotificationDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { data: user } = useGetUser();

  const loginMutation = useMutation(loginService.login, {
    onSuccess: (user) => {
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      queryClient.invalidateQueries('user');
      dispatchNotification(`Login successful for user "${username}"`);
    },
    onError: (error) => {
      dispatchNotification(error.response.data.error);
    },
  });

  const handleLogin = async (event) => {
    event.preventDefault();
    loginMutation.mutate(
      { username, password },
      {
        onSuccess: () => {
          setUsername('');
          setPassword('');
        },
      },
    );
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      window.localStorage.removeItem('loggedBlogAppUser');
      dispatchNotification('Logout successful');
      queryClient.invalidateQueries('user');
    } catch (error) {
      dispatchNotification(error.response.data.error);
    }
  };

  // blog-logic
  // mutations = create/ update/ delete
  const newBlogMutation = useMutation(blogService.create, {
    onSuccess: () => {
      // const blogs2 = queryClient.getQueryData('blogs');
      // queryClient.setQueryData('blogs', blogs2.concat(newBlog));
      queryClient.invalidateQueries('blogs');
    },
  });

  const createBlog = async (blogObject) => {
    try {
      newBlogFormRef.current.toggleVisibility();
      newBlogMutation.mutate(blogObject);
      dispatchNotification(
        `A new blog ${blogObject.title} by ${blogObject.author} added`,
      );
    } catch (error) {
      dispatchNotification(error.response.data.error);
    }
  };

  const updateBlogMutation = useMutation(blogService.update, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
    },
  });

  const handleLike = (blogId) => async () => {
    const blogIndex = blogs.findIndex((b) => b.id === blogId);
    const blog = blogs[blogIndex];
    try {
      updateBlogMutation.mutate({
        ...blog,
        likes: blog.likes + 1,
      });
      dispatchNotification(`You liked the blog ${blog.title}`);
    } catch (error) {
      dispatchNotification(error.response.data.error);
    }
  };

  const deleteBlogMutation = useMutation(blogService.deleteBlog, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
    },
  });

  const handleDelete = (blogId) => async () => {
    const blogIndex = blogs.findIndex((b) => b.id === blogId);
    const blog = blogs[blogIndex];
    const confirm = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}?`,
    );
    if (confirm) {
      try {
        deleteBlogMutation.mutate(blogId);
        dispatchNotification(`Blog ${blog.title} deleted`);
        navigate('/');
      } catch (error) {
        dispatchNotification(error.response.data.error);
      }
    }
  };

  const newBlogFormRef = useRef();

  // const { isLoading, isFetching, error, data, status } = useQuery();
  const { isLoading: isBlogLoading, data: blogs } = useGetBlogs();
  if (isBlogLoading) {
    return <div>loading data ...</div>;
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
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
      <Menu handleLogout={handleLogout} />
      <h2>Blog App</h2>
      <Notification />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              createBlog={createBlog}
              newBlogFormRef={newBlogFormRef}
              user={user}
              handleLike={handleLike}
              handleDelete={handleDelete}
              blogs={blogs}
            />
          }
        />
        <Route path="/users" element={<UserInfo />} />
        <Route path="/users/:id" element={<User />} />
        <Route
          path="/blogs/:id"
          element={<Blog handleLike={handleLike} handleDelete={handleDelete} />}
        />
      </Routes>
    </div>
  );
};

export default App;
