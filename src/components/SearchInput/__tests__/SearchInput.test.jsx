import userEvent from '@testing-library/user-event';

import React from 'react';

import { renderWithTheme, rerenderWithTheme, screen } from '../../../test-utils';
import SearchInput from '../index.js';

describe('SearchInput Component', () => {
  const defaultProps = {
    id: 'search-input',
    label: 'Search',
    value: '',
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders search input with default props', () => {
    renderWithTheme(<SearchInput {...defaultProps} />);

    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('id', 'search-input');
    expect(searchInput).toHaveAttribute('type', 'text');
    expect(searchInput).toHaveAttribute('placeholder', 'Search');
  });

  it('renders with custom id', () => {
    renderWithTheme(<SearchInput {...defaultProps} id="custom-search" />);

    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toHaveAttribute('id', 'custom-search');
  });

  it('renders with custom size prop', () => {
    renderWithTheme(<SearchInput {...defaultProps} size="large" />);

    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toBeInTheDocument();
  });

  it('displays the correct value', () => {
    renderWithTheme(<SearchInput {...defaultProps} value="test search" />);

    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toHaveValue('test search');
  });

  it('handles onChange events', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();

    renderWithTheme(<SearchInput {...defaultProps} onChange={mockOnChange} />);

    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, 'hello');

    expect(mockOnChange).toHaveBeenCalledTimes(5); // Called for each character
  });

  it('handles controlled input value changes', () => {
    const mockOnChange = jest.fn();
    const { rerender } = renderWithTheme(
      <SearchInput {...defaultProps} value="initial" onChange={mockOnChange} />
    );

    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toHaveValue('initial');

    // Simulate external value change
    rerenderWithTheme(
      rerender,
      <SearchInput {...defaultProps} value="updated" onChange={mockOnChange} />
    );

    expect(searchInput).toHaveValue('updated');
  });

  it('forwards all props to Input component', () => {
    const customProps = {
      ...defaultProps,
      disabled: false,
    };

    renderWithTheme(<SearchInput {...customProps} />);

    const searchInput = screen.getByRole('textbox');
    expect(searchInput).not.toBeDisabled();
    expect(searchInput).toHaveAttribute('type', 'text');
    expect(searchInput).toHaveAttribute('placeholder', 'Search');
  });

  it('has accessible label for screen readers', () => {
    renderWithTheme(<SearchInput {...defaultProps} />);

    // The label should be visually hidden but accessible to screen readers
    const label = screen.getByLabelText('Search');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('id', 'search-input');
  });

  it('handles focus and blur events', async () => {
    const user = userEvent.setup();
    renderWithTheme(<SearchInput {...defaultProps} />);

    const searchInput = screen.getByRole('textbox');

    await user.click(searchInput);
    expect(searchInput).toHaveFocus();

    await user.tab();
    expect(searchInput).not.toHaveFocus();
  });

  it('handles keyboard events', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();

    renderWithTheme(<SearchInput {...defaultProps} onChange={mockOnChange} />);

    const searchInput = screen.getByRole('textbox');

    await user.type(searchInput, 'test');
    await user.keyboard('{Enter}');
    await user.keyboard('{Escape}');

    expect(mockOnChange).toHaveBeenCalled();
  });

  // New tests for enhanced SearchInput functionality
  it('renders with error handling props', () => {
    renderWithTheme(
      <SearchInput
        {...defaultProps}
        showError={true}
        errorMessage="Search error message"
        aria-invalid={true}
      />
    );

    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toHaveAttribute('aria-invalid', 'true');

    // Check if error message is present
    const errorMessages = screen.getAllByText('Search error message');
    expect(errorMessages.length).toBeGreaterThan(0);
  });

  it('does not show error when showError is false', () => {
    renderWithTheme(
      <SearchInput {...defaultProps} showError={false} errorMessage="This should not show" />
    );

    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toHaveAttribute('aria-invalid', 'false');

    // Error message should not be visible
    expect(screen.queryByText('This should not show')).not.toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    renderWithTheme(<SearchInput {...defaultProps} placeholder="Custom search placeholder" />);

    const searchInput = screen.getByPlaceholderText('Custom search placeholder');
    expect(searchInput).toBeInTheDocument();
  });

  it('renders with required attribute', () => {
    renderWithTheme(<SearchInput {...defaultProps} required={true} aria-required={true} />);

    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toBeRequired();
    expect(searchInput).toHaveAttribute('aria-required', 'true');
  });

  it('forwards all props to Input component correctly', () => {
    renderWithTheme(
      <SearchInput
        {...defaultProps}
        type="search"
        placeholder="Advanced search"
        required={true}
        showError={true}
        errorMessage="Validation error"
        aria-describedby="search-help"
        data-testid="custom-search"
      />
    );

    const searchInput = screen.getByTestId('custom-search');
    expect(searchInput).toHaveAttribute('type', 'search');
    expect(searchInput).toHaveAttribute('placeholder', 'Advanced search');
    expect(searchInput).toHaveAttribute('aria-describedby', 'search-help');
    expect(searchInput).toBeRequired();

    // Check error message is displayed
    const errorMessages = screen.getAllByText('Validation error');
    expect(errorMessages.length).toBeGreaterThan(0);
  });

  it('handles error state changes dynamically', async () => {
    const user = userEvent.setup();
    const TestComponent = () => {
      const [value, setValue] = React.useState('');
      const [showError, setShowError] = React.useState(false);
      const [ariaInvalid, setAriaInvalid] = React.useState(false);

      const handleChange = e => {
        setValue(e.target.value);
        // Clear error when user types
        if (e.target.value.length > 0 && showError) {
          setShowError(false);
          setAriaInvalid(false);
        }
      };

      const handleSubmit = () => {
        if (!value.trim()) {
          setShowError(true);
          setAriaInvalid(true);
        }
      };

      return (
        <div>
          <SearchInput
            {...defaultProps}
            value={value}
            onChange={handleChange}
            showError={showError}
            errorMessage="Please enter a search term"
            aria-invalid={ariaInvalid}
          />
          <button onClick={handleSubmit}>Search</button>
        </div>
      );
    };

    renderWithTheme(<TestComponent />);

    const searchInput = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    // Initially no error
    expect(searchInput).toHaveAttribute('aria-invalid', 'false');
    expect(screen.queryByText('Please enter a search term')).not.toBeInTheDocument();

    // Submit empty form to trigger error
    await user.click(searchButton);
    expect(searchInput).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getAllByText('Please enter a search term').length).toBeGreaterThan(0);

    // Type something to clear error
    await user.type(searchInput, 'test');
    expect(searchInput).toHaveAttribute('aria-invalid', 'false');
    expect(screen.queryByText('Please enter a search term')).not.toBeInTheDocument();
  });

  it('maintains accessibility with proper labeling', () => {
    renderWithTheme(
      <SearchInput
        {...defaultProps}
        label="Custom Search Label"
        aria-describedby="search-description"
      />
    );

    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toHaveAttribute('aria-label', 'Custom Search Label');
    expect(searchInput).toHaveAttribute('aria-describedby', 'search-description');

    // Check that label is accessible to screen readers
    const label = screen.getByLabelText('Custom Search Label');
    expect(label).toBeInTheDocument();
  });

  it('handles disabled state', () => {
    renderWithTheme(<SearchInput {...defaultProps} disabled={true} />);

    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toBeDisabled();
  });

  it('forwards additional HTML attributes', () => {
    renderWithTheme(
      <SearchInput
        {...defaultProps}
        maxLength={100}
        autoComplete="off"
        spellCheck={false}
        data-testid="search-with-attrs"
      />
    );

    const searchInput = screen.getByTestId('search-with-attrs');
    expect(searchInput).toHaveAttribute('maxLength', '100');
    expect(searchInput).toHaveAttribute('autoComplete', 'off');
    expect(searchInput).toHaveAttribute('spellCheck', 'false');
  });
});
