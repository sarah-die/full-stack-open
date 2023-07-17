import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';

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
