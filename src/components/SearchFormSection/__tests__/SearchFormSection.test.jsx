import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import React from 'react';

import { renderWithTheme } from '../../../test-utils';
import SearchFormSection from '../SearchFormSection';

// Mock console.error to avoid noise in tests
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
});

describe('SearchFormSection', () => {
  beforeEach(() => {
    // Clear any previous alerts
    window.alert = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the search form section with title and input', () => {
    renderWithTheme(<SearchFormSection />);

    expect(screen.getByText('How can we help?')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /search/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });

  it('renders input with correct attributes', () => {
    renderWithTheme(<SearchFormSection />);

    const input = screen.getByRole('textbox', { name: /search/i });
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('placeholder', 'Search');
    expect(input).toHaveAttribute('aria-label', 'Search');
    expect(input).toHaveAttribute('aria-describedby', 'main-search-input');
    expect(input).toHaveAttribute('aria-required', 'false');
  });

  it('updates input value when user types', async () => {
    const user = userEvent.setup();
    renderWithTheme(<SearchFormSection />);

    const input = screen.getByRole('textbox', { name: /search/i });
    await user.type(input, 'test search');

    expect(input).toHaveValue('test search');
  });

  it('shows error when submitting empty form', async () => {
    renderWithTheme(<SearchFormSection />);

    // Trigger form submission directly
    const form = screen.getByRole('form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Please enter a search term');
    });

    const input = screen.getByRole('textbox', { name: /search/i });
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('shows error when search term is too short', async () => {
    const user = userEvent.setup();
    renderWithTheme(<SearchFormSection />);

    const input = screen.getByRole('textbox', { name: /search/i });
    await user.type(input, 'abc');
    await user.keyboard('{Enter}');

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(
        'Search term must be at least 4 characters long'
      );
    });

    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('clears error when user starts typing after error', async () => {
    const user = userEvent.setup();
    renderWithTheme(<SearchFormSection />);

    const input = screen.getByRole('textbox', { name: /search/i });

    // Trigger error first
    await user.type(input, 'abc');
    await user.keyboard('{Enter}');

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(
        'Search term must be at least 4 characters long'
      );
    });

    // Start typing to clear error
    await user.type(input, 'd');

    await waitFor(() => {
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    expect(input).toHaveAttribute('aria-invalid', 'false');
  });

  it('submits successfully with valid search term', async () => {
    const user = userEvent.setup();
    renderWithTheme(<SearchFormSection />);

    const input = screen.getByRole('textbox', { name: /search/i });
    await user.type(input, 'valid search');
    await user.keyboard('{Enter}');

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Search: valid search');
    });

    // Input should be cleared after successful submission
    expect(input).toHaveValue('');
  });

  it('trims whitespace from search term before validation', async () => {
    const user = userEvent.setup();
    renderWithTheme(<SearchFormSection />);

    const input = screen.getByRole('textbox', { name: /search/i });
    await user.type(input, '  valid search  ');
    await user.keyboard('{Enter}');

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Search: valid search');
    });
  });

  it('handles form submission via Enter key', async () => {
    const user = userEvent.setup();
    renderWithTheme(<SearchFormSection />);

    const input = screen.getByRole('textbox', { name: /search/i });
    await user.type(input, 'test search');
    await user.keyboard('{Enter}');

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Search: test search');
    });
  });

  it('handles form submission via form submit event', async () => {
    const user = userEvent.setup();
    renderWithTheme(<SearchFormSection />);

    const input = screen.getByRole('textbox', { name: /search/i });
    const form = screen.getByRole('form');

    await user.type(input, 'test search');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Search: test search');
    });
  });

  it('handles error in submit function gracefully', async () => {
    const user = userEvent.setup();

    // Mock console.error to avoid noise
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Mock a function that throws an error
    const originalAlert = window.alert;
    window.alert = jest.fn(() => {
      throw new Error('Test error');
    });

    renderWithTheme(<SearchFormSection />);

    const input = screen.getByRole('textbox', { name: /search/i });
    await user.type(input, 'test search');
    await user.keyboard('{Enter}');

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('An error occurred. Please try again.');
    });

    expect(consoleSpy).toHaveBeenCalledWith('Error in handleSubmit:', expect.any(Error));

    // Cleanup
    window.alert = originalAlert;
    consoleSpy.mockRestore();
  });

  it('maintains input focus after clearing error', async () => {
    const user = userEvent.setup();
    renderWithTheme(<SearchFormSection />);

    const input = screen.getByRole('textbox', { name: /search/i });

    // Trigger error
    await user.type(input, 'abc');
    await user.keyboard('{Enter}');

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(
        'Search term must be at least 4 characters long'
      );
    });

    // Clear error by typing more
    await user.type(input, 'd');

    // Input should still be focused
    expect(input).toHaveFocus();
  });
});
