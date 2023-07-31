import { Link } from 'react-router-dom';
import { useGetUser } from '../hooks/useGetUser';
export const Menu = ({ handleLogout }) => {
  const padding = {
    paddingRight: 5,
  };

  const { data: user } = useGetUser();

  return (
    <div>
      <Link style={padding} to="/">
        Home
      </Link>
      <Link style={padding} to="/users">
        User
      </Link>
      <div>{user.username} logged in</div>
      <button id="logout-button" onClick={handleLogout}>
        logout
      </button>
    </div>
  );
};
