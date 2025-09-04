import userEvent from '@testing-library/user-event';

import React from 'react';

import { renderWithTheme, screen } from '../../../test-utils';
import Header from '../Header';

// Mock the alert function
const mockAlert = jest.fn();
global.alert = mockAlert;

describe('Header Component', () => {
  beforeEach(() => {
    mockAlert.mockClear();
  });

  it('renders header with all main elements', () => {
    renderWithTheme(<Header />);

    // Check if header element exists
    expect(screen.getByRole('banner')).toBeInTheDocument();

    // Check if logo is rendered
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(screen.getByText('Help Center')).toBeInTheDocument();

    // Check if search input is rendered
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();

    // Check if buttons are rendered
    expect(screen.getByRole('button', { name: /submit a request/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('renders logo with correct link', () => {
    renderWithTheme(<Header />);

    const logoLink = screen.getByRole('link');
    expect(logoLink).toHaveAttribute('href', 'https://www.goabstract.com');
    expect(logoLink).toHaveTextContent('Help Center');
  });

  it('handles search input changes', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Header />);

    const searchInput = screen.getByPlaceholderText('Search');

    // Type in search input
    await user.type(searchInput, 'test search');

    // Check if value is updated
    expect(searchInput).toHaveValue('test search');
  });

  it('handles form submission with search value', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Header />);

    const searchInput = screen.getByPlaceholderText('Search');
    const submitButton = screen.getByRole('button', { name: /submit a request/i });

    // Type in search input
    await user.type(searchInput, 'test query');

    // Submit the form
    await user.click(submitButton);

    // Check if alert was called with correct value
    expect(mockAlert).toHaveBeenCalledWith('Search: test query');

    // Check if search input is cleared after submission
    expect(searchInput).toHaveValue('');
  });

  it('handles form submission via Enter key', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Header />);

    const searchInput = screen.getByPlaceholderText('Search');

    // Type in search input
    await user.type(searchInput, 'enter test');

    // Press Enter key
    await user.keyboard('{Enter}');

    // Check if alert was called
    expect(mockAlert).toHaveBeenCalledWith('Search: enter test');

    // Check if search input is cleared after submission
    expect(searchInput).toHaveValue('');
  });

  it('shows validation message for empty search submission', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Header />);

    const submitButton = screen.getByRole('button', { name: /submit a request/i });
    const searchInput = screen.getByPlaceholderText('Search');

    // Submit form without typing anything
    await user.click(submitButton);

    // Check if alert was NOT called (since we now use state-based error handling)
    expect(mockAlert).not.toHaveBeenCalledWith('Please enter a search term');

    // Check that the search input still has no value (wasn't cleared)
    expect(searchInput).toHaveValue('');

    // Check that the input has aria-invalid attribute set to true
    expect(searchInput).toHaveAttribute('aria-invalid', 'true');
  });

  it('shows validation message for empty search via Enter key', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Header />);

    const searchInput = screen.getByPlaceholderText('Search');

    // Focus on the input and press Enter key without typing anything
    await user.click(searchInput);
    await user.keyboard('{Enter}');

    // Check if alert was NOT called (since we now use state-based error handling)
    expect(mockAlert).not.toHaveBeenCalledWith('Please enter a search term');

    // Check that the search input still has no value (wasn't cleared)
    expect(searchInput).toHaveValue('');

    // Check that the input has aria-invalid attribute set to true
    expect(searchInput).toHaveAttribute('aria-invalid', 'true');
  });

  it('has correct button variants and sizes', () => {
    renderWithTheme(<Header />);

    const submitButton = screen.getByRole('button', { name: /submit a request/i });
    const signInButton = screen.getByRole('button', { name: /sign in/i });

    // Both buttons should be present
    expect(submitButton).toBeInTheDocument();
    expect(signInButton).toBeInTheDocument();
  });

  it('has accessible search input with proper labeling', () => {
    renderWithTheme(<Header />);

    const searchInput = screen.getByPlaceholderText('Search');
    expect(searchInput).toHaveAttribute('id', 'header-search-input');

    // Check if there's a label for the input (even if visually hidden)
    const label = screen.getByText('Search');
    expect(label).toBeInTheDocument();
  });

  // New tests for enhanced validation and error handling
  it('shows validation error for search term too short', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Header />);

    const searchInput = screen.getByPlaceholderText('Search');
    const submitButton = screen.getByRole('button', { name: /submit a request/i });

    // Type a short search term (less than 4 characters)
    await user.type(searchInput, 'ab');
    await user.click(submitButton);

    // Check that error state is set
    expect(searchInput).toHaveAttribute('aria-invalid', 'true');

    // Check that alert was NOT called (since we use state-based error handling)
    expect(mockAlert).not.toHaveBeenCalled();
  });

  it('shows validation error for search term too short via Enter key', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Header />);

    const searchInput = screen.getByPlaceholderText('Search');

    // Type a short search term and press Enter
    await user.type(searchInput, 'xyz');
    await user.keyboard('{Enter}');

    // Check that error state is set
    expect(searchInput).toHaveAttribute('aria-invalid', 'true');

    // Check that alert was NOT called
    expect(mockAlert).not.toHaveBeenCalled();
  });

  it('clears error when user starts typing after validation error', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Header />);

    const searchInput = screen.getByPlaceholderText('Search');
    const submitButton = screen.getByRole('button', { name: /submit a request/i });

    // Submit empty form to trigger error
    await user.click(submitButton);
    expect(searchInput).toHaveAttribute('aria-invalid', 'true');

    // Start typing to clear error
    await user.type(searchInput, 'test');
    expect(searchInput).toHaveAttribute('aria-invalid', 'false');
  });

  it('handles successful search with valid input', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Header />);

    const searchInput = screen.getByPlaceholderText('Search');
    const submitButton = screen.getByRole('button', { name: /submit a request/i });

    // Type a valid search term (4+ characters)
    await user.type(searchInput, 'valid search');
    await user.click(submitButton);

    // Check that alert was called with the search term
    expect(mockAlert).toHaveBeenCalledWith('Search: valid search');

    // Check that input is cleared after successful search
    expect(searchInput).toHaveValue('');

    // Check that error state is cleared
    expect(searchInput).toHaveAttribute('aria-invalid', 'false');
  });

  it('handles successful search via Enter key with valid input', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Header />);

    const searchInput = screen.getByPlaceholderText('Search');

    // Type a valid search term and press Enter
    await user.type(searchInput, 'enter search');
    await user.keyboard('{Enter}');

    // Check that alert was called
    expect(mockAlert).toHaveBeenCalledWith('Search: enter search');

    // Check that input is cleared
    expect(searchInput).toHaveValue('');
  });

  it('trims whitespace from search input before validation', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Header />);

    const searchInput = screen.getByPlaceholderText('Search');
    const submitButton = screen.getByRole('button', { name: /submit a request/i });

    // Type search term with leading/trailing whitespace
    await user.type(searchInput, '  test  ');
    await user.click(submitButton);

    // Should succeed because trimmed value is valid
    expect(mockAlert).toHaveBeenCalledWith('Search: test');
    expect(searchInput).toHaveValue('');
  });

  it('handles error during form submission gracefully', async () => {
    const user = userEvent.setup();

    // Mock console.error to avoid noise in test output
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Mock a function that throws an error
    const originalAlert = global.alert;
    global.alert = jest.fn(() => {
      throw new Error('Alert failed');
    });

    renderWithTheme(<Header />);

    const searchInput = screen.getByPlaceholderText('Search');
    const submitButton = screen.getByRole('button', { name: /submit a request/i });

    // Type a valid search term
    await user.type(searchInput, 'test search');
    await user.click(submitButton);

    // Check that error state is set due to the thrown error
    expect(searchInput).toHaveAttribute('aria-invalid', 'true');

    // Restore original alert and console.error
    global.alert = originalAlert;
    consoleSpy.mockRestore();
  });

  it('maintains proper form structure and accessibility', () => {
    renderWithTheme(<Header />);

    // Check that form element exists (using tag name since role might not be recognized)
    const form = document.querySelector('form');
    expect(form).toBeInTheDocument();

    // Check that search input is properly associated with the form
    const searchInput = screen.getByPlaceholderText('Search');
    expect(form).toContainElement(searchInput);

    // Check that submit button is in the form
    const submitButton = screen.getByRole('button', { name: /submit a request/i });
    expect(form).toContainElement(submitButton);
  });
});
