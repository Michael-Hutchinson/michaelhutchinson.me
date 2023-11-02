import React from 'react';
import { render, screen } from '@testing-library/react';
import Email from './Email';

describe('Email', () => {
  it('renders the email link correctly', () => {
    render(<Email />);
    const linkElement = screen.getByRole('link', {
      name: /michael-hutchinson@hotmail.co.uk/i,
    });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute(
      'href',
      'mailto:michael-hutchinson@hotmail.co.uk'
    );
  });
});
