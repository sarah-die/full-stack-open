import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';
import userEvent from '@testing-library/user-event/';

test('<Blog/> renders title and author but does not render URL or number of likes by default', () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
    likes: 25,
  };

  const { container } = render(<Blog blog={blog} />);

  const div = container.querySelector('.blogElement');
  screen.debug(div);

  expect(div).toHaveTextContent('test title');
  expect(div).toHaveTextContent('test author');
  expect(div).not.toHaveTextContent('test url');
  expect(div).not.toHaveTextContent('25');
});

test('<Blog/> URL and likes are shown when button is clicked', async () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
    likes: 25,
    user: { username: 'test user' },
  };

  const testUser = {
    username: 'test user',
    user: 'test user',
  };

  const { container } = render(<Blog blog={blog} user={testUser} />);

  const user = userEvent.setup();
  const button = screen.getByText('view');
  await user.click(button);

  const div = container.querySelector('.blogElement');

  expect(div).toHaveTextContent('test url');
  expect(div).toHaveTextContent('25');
});
