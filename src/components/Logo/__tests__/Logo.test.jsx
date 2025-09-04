import React from 'react';

import { renderWithTheme, screen } from '../../../test-utils';
import Logo from '../Logo';

// Mock the logo image
jest.mock('../../../assets/logo.svg', () => 'mocked-logo.svg');

describe('Logo Component', () => {
  it('renders logo with correct link', () => {
    renderWithTheme(<Logo />);

    const logoLink = screen.getByRole('link');
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', 'https://www.goabstract.com');
  });

  it('renders logo image with correct attributes', () => {
    renderWithTheme(<Logo />);

    const logoImage = screen.getByRole('img');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', 'mocked-logo.svg');
    expect(logoImage).toHaveAttribute('alt', 'Logo');
  });

  it('renders divider and help center text', () => {
    renderWithTheme(<Logo />);

    const divider = screen.getByText('|');
    const helpCenterText = screen.getByText('Help Center');

    expect(divider).toBeInTheDocument();
    expect(helpCenterText).toBeInTheDocument();
  });

  it('is accessible with proper link behavior', () => {
    renderWithTheme(<Logo />);

    const logoLink = screen.getByRole('link');
    expect(logoLink).toBeInTheDocument();

    // Check that the link is focusable
    logoLink.focus();
    expect(logoLink).toHaveFocus();
  });
});
