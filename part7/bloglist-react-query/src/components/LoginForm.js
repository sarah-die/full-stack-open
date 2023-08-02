import PropTypes from 'prop-types';
import { Button, Form, Input } from 'antd';

const LoginForm = ({
  username,
  password,
  handleLogin,
  setUsername,
  setPassword,
}) => (
  <Form
    onFinish={handleLogin}
    labelCol={{
      span: 4,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 500,
    }}
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input
        id="username"
        type="text"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />
    </Form.Item>
    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password
        id="password"
        type="password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
    </Form.Item>
    <Button id="login-button" type="primary" htmlType="submit">
      login
    </Button>
  </Form>
);

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
};

export default LoginForm;
