import { useState, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import Togglable from './components/Togglable';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNotificationDispatch } from './NotificationContext';
import Notification from './components/Notification';

const App = () => {
  const queryClient = useQueryClient();
  const dispatchNotification = useNotificationDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // login-logic
  const checkLoggedUser = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      return loggedUserJSON;
    }
    return null;
  };

  const { data: userTemp } = useQuery('user', () => checkLoggedUser, {
    refetchOnWindowFocus: false,
  });
  console.log('this is the logged user: ', userTemp);

  const loginMutation = useMutation(loginService.login, {
    onSuccess: (user) => {
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      queryClient.invalidateQueries('user');
    },
  });

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      loginMutation.mutate({ username, password });
      dispatchNotification(`Login successful for user "${username}"`);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.log('error', error);
      dispatchNotification(error.response.data.error);
    }
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
      } catch (error) {
        dispatchNotification(error.response.data.error);
      }
    }
  };

  const newBlogFormRef = useRef();

  // React Query: fetch all data -> wrap axios call in a query formed with the useQuery function
  const blogResult = useQuery('blogs', blogService.getAll, {
    refetchOnWindowFocus: false,
  });
  if (blogResult.isLoading) {
    return <div>loading data ...</div>;
  }
  // .data is neccessary -> useQuery returns an object (status, data, ...)
  // const { isLoading, isFetching, error, data, status } = useQuery();
  const blogs = blogResult.data;

  if (userTemp === null) {
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
      <h2>blogs</h2>
      <Notification />
      <div>{userTemp.username} logged in</div>
      <button id="logout-button" onClick={handleLogout}>
        logout
      </button>
      <Togglable buttonLabel="create Blog" ref={newBlogFormRef}>
        <NewBlogForm createBlog={createBlog} creator={userTemp.username} />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike(blog.id)}
            handleDelete={handleDelete(blog.id)}
            user={userTemp}
          />
        ))}
    </div>
  );
};

export default App;
