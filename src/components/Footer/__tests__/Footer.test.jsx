import { screen } from '@testing-library/react';

import React from 'react';

import { renderWithTheme } from '../../../test-utils';
import Footer from '../Footer';

// Mock the MiniLogo component
jest.mock('../../Logo/Logo', () => ({
  MiniLogo: ({ 'aria-hidden': ariaHidden, ...props }) => (
    <div data-testid="mini-logo" aria-hidden={ariaHidden} {...props} />
  ),
}));

describe('Footer', () => {
  describe('Rendering', () => {
    it('renders the footer with correct role', () => {
      renderWithTheme(<Footer />);

      const footer = screen.getByRole('contentinfo');
      expect(footer).toBeInTheDocument();
    });

    it('renders all four main sections', () => {
      renderWithTheme(<Footer />);

      const sections = screen.getAllByRole('region');
      expect(sections).toHaveLength(1); // Only the copyright section has aria-labelledby

      // Check for the four main content sections by their headings
      expect(screen.getByRole('heading', { name: 'Abstract' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Resources' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Community' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Company' })).toBeInTheDocument();
    });

    it('renders all section headings', () => {
      renderWithTheme(<Footer />);

      expect(screen.getByRole('heading', { name: 'Abstract' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Resources' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Community' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Company' })).toBeInTheDocument();
    });

    it('renders the contact us subheading', () => {
      renderWithTheme(<Footer />);

      expect(screen.getByRole('heading', { name: 'Contact Us' })).toBeInTheDocument();
    });

    it('renders the mini logo', () => {
      renderWithTheme(<Footer />);

      const logo = screen.getByTestId('mini-logo');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('aria-hidden', 'true');
    });

    it('renders copyright information', () => {
      renderWithTheme(<Footer />);

      expect(screen.getByText('© Copyright 2025')).toBeInTheDocument();
      expect(screen.getByText('Abstract Studio Design, Inc.')).toBeInTheDocument();
      expect(screen.getByText('All rights reserved')).toBeInTheDocument();
    });
  });

  describe('Links', () => {
    it('renders all Abstract section links', () => {
      renderWithTheme(<Footer />);

      expect(screen.getByRole('link', { name: 'Start Trial' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Pricing' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Download' })).toBeInTheDocument();
    });

    it('renders all Resources section links', () => {
      renderWithTheme(<Footer />);

      expect(screen.getByRole('link', { name: 'Blog' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Help Center' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Release Notes' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Status' })).toBeInTheDocument();
    });

    it('renders all Community section links', () => {
      renderWithTheme(<Footer />);

      expect(screen.getByRole('link', { name: 'Twitter' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'LinkedIn' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Facebook' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Dribbble' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Podcast' })).toBeInTheDocument();
    });

    it('renders all Company section links', () => {
      renderWithTheme(<Footer />);

      expect(screen.getByRole('link', { name: 'About Us' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Careers' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Legal' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'info@goabstract.com' })).toBeInTheDocument();
    });
  });
});
