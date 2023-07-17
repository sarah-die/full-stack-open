import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event/';
import NewBlogForm from './NewBlogForm';

test('<Blogform/> the event handler the form receives is called with the right details', async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  render(<NewBlogForm createBlog={createBlog} />);

  const titleInput = screen.getByPlaceholderText('write title here');
  const authorInput = screen.getByPlaceholderText('write author here');
  const urlInput = screen.getByPlaceholderText('write url here');

  const sendButton = screen.getByText('create');

  await user.type(titleInput, 'test title');
  await user.type(authorInput, 'test author');
  await user.type(urlInput, 'test url');

  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0]).toStrictEqual({
    title: 'test title',
    author: 'test author',
    url: 'test url',
  });
});
