import React from 'react';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from './Form';

jest.mock('@emailjs/browser');

describe('Form', () => {
  it('Renders Form and checks form fields', async () => {
    const { getByPlaceholderText } = render(<Form />);

    const nameField = getByPlaceholderText('Name');
    const emailField = getByPlaceholderText('Email');
    const subjectField = getByPlaceholderText('Subject');
    const messageField = getByPlaceholderText('Message');

    expect(nameField).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
    expect(subjectField).toBeInTheDocument();
    expect(messageField).toBeInTheDocument();

    expect(nameField).toHaveValue('');
    expect(emailField).toHaveValue('');
    expect(subjectField).toHaveValue('');
    expect(messageField).toHaveValue('');
  });

  it('Submits form successfully', async () => {
    (
      emailjs.sendForm as jest.Mock<Promise<EmailJSResponseStatus>>
    ).mockImplementation(() =>
      Promise.resolve({ status: 200, text: 'OK' } as EmailJSResponseStatus)
    );
    const user = userEvent.setup();
    const { getByPlaceholderText } = render(<Form />);

    const nameField = getByPlaceholderText('Name');
    const emailField = getByPlaceholderText('Email');
    const subjectField = getByPlaceholderText('Subject');
    const messageField = getByPlaceholderText('Message');

    await user.type(nameField, 'John Doe');
    await user.type(emailField, 'test@gmail.com');
    await user.type(subjectField, 'Test subject');
    await user.type(messageField, 'Test message');

    await waitFor(() => {
      expect(nameField).toHaveValue('John Doe');
      expect(emailField).toHaveValue('test@gmail.com');
      expect(subjectField).toHaveValue('Test subject');
      expect(messageField).toHaveValue('Test message');
    });

    await userEvent.click(
      screen.getByRole('button', { name: /Send message/i })
    );

    expect(emailjs.sendForm).toHaveBeenCalled();
    expect(
      screen.getByText(/The email was sent sucessfully!/i)
    ).toBeInTheDocument();
  });

  it('Submits form with an error', async () => {
    (
      emailjs.sendForm as jest.Mock<Promise<EmailJSResponseStatus>>
    ).mockImplementation(() => Promise.reject(new Error('Test error')));
    const user = userEvent.setup();
    const { getByPlaceholderText } = render(<Form />);

    const nameField = getByPlaceholderText('Name');
    const emailField = getByPlaceholderText('Email');
    const subjectField = getByPlaceholderText('Subject');
    const messageField = getByPlaceholderText('Message');

    await user.type(nameField, 'John Doe');
    await user.type(emailField, 'test@gmail.com');
    await user.type(subjectField, 'Test subject');
    await user.type(messageField, 'Test message');

    await waitFor(() => {
      expect(nameField).toHaveValue('John Doe');
      expect(emailField).toHaveValue('test@gmail.com');
      expect(subjectField).toHaveValue('Test subject');
      expect(messageField).toHaveValue('Test message');
    });

    await userEvent.click(
      screen.getByRole('button', { name: /Send message/i })
    );

    expect(emailjs.sendForm).toHaveBeenCalled();
    expect(
      screen.getByText(/There was a problem sending your email!/i)
    ).toBeInTheDocument();
  });
});
