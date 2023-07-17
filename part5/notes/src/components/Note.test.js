import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event/';
import Note from './Note';

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
  };

  // Note component is rendered
  // component is not rendered to the DOM but to a format that is suitable for tests
  render(<Note note={note} />);

  screen.debug();

  // use object screen to access rendered component
  const element = screen.getByText(
    'Component testing is done with react-testing-library'
  );

  screen.debug(element);

  expect(element).toBeDefined();
});

test('renders content (second test)', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
  };

  // container is one of the fields returned by rendern
  const { container } = render(<Note note={note} />);

  // querySelector to find element by CSS-selector
  const div = container.querySelector('.note');
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  );
});

test('clicking the button calls event handler once', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
  };

  // mock function: to replace dependencies
  // use to return hardcoded responses, verify the number of times a function is called and with what params
  const mockHandler = jest.fn();

  render(<Note note={note} toggleImportance={mockHandler} />);

  // start session to interact with the rendered component
  const user = userEvent.setup();
  // find the button by the text from the rendered component
  const button = screen.getByText('make not important');
  // click button
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);
});
