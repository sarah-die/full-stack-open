import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NoteForm from './NoteForm';
import userEvent from '@testing-library/user-event';

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  // mock function
  const createNote = jest.fn();
  const user = userEvent.setup();

  render(<NoteForm createNote={createNote} />);

  // access to the input field
  // const input = screen.getByRole('textbox');
  // better to find one specific textbox
  const input = screen.getByPlaceholderText('write note content here');
  const sendButton = screen.getByText('save');

  // type method is used to write text to input field
  await user.type(input, 'testing a form...');
  await user.click(sendButton);

  // create notes is called on submit
  expect(createNote.mock.calls).toHaveLength(1);
  // event handler is called with right params -> note with correct content is created
  expect(createNote.mock.calls[0][0].content).toBe('testing a form...');
});
