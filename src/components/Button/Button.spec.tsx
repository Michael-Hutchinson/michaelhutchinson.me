import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    const buttonText = 'Test Button';
    const links = 'http://test.com';

    render(<Button buttonText={buttonText} links={links} />);

    const buttonElement = screen.getByText(buttonText);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute('href', links);
  });
});
