import userEvent from '@testing-library/user-event';

import React from 'react';

import { renderWithTheme, rerenderWithTheme, screen } from '../../../test-utils';
import SearchInput from '../SearchInput';

describe('SearchInput Component', () => {
  const defaultProps = {
    id: 'search-input',
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
});
