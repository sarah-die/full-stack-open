import { Link } from 'react-router-dom';
import { Menu } from 'antd';
export const CustomMenu = () => {
  const padding = {
    paddingRight: 5,
  };

  return (
    <Menu theme="dark" mode="horizontal">
      <Menu.Item key="1">
        <Link style={padding} to="/">
          Home
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link style={padding} to="/users">
          User
        </Link>
      </Menu.Item>
    </Menu>
  );
};
