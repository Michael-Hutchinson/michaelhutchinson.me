import React from 'react';
import { render } from '@testing-library/react';
import Footer from './Footer';
import config from '../../data/config.json';

describe('Footer', () => {
  it('renders without crashing', () => {
    const { unmount } = render(<Footer />);
    unmount();
  });

  it('contains the expected text', () => {
    const { getByText } = render(<Footer />);
    expect(getByText(config.sections.footer.p)).toBeInTheDocument();
  });
});
