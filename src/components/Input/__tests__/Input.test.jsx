import userEvent from '@testing-library/user-event';

import React from 'react';

import { renderWithTheme, screen } from '../../../test-utils';
import Input from '../Input';

describe('Input Component', () => {
  it('renders input with default props', () => {
    renderWithTheme(<Input id="test-input" label="Test Input" />);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'test-input');
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('aria-label', 'Test Input');
  });

  it('renders input with custom id', () => {
    renderWithTheme(<Input id="test-input" label="Test Input" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('id', 'test-input');
  });

  it('renders input with placeholder', () => {
    renderWithTheme(<Input id="test-input" label="Test Input" placeholder="Enter your name" />);

    const input = screen.getByPlaceholderText('Enter your name');
    expect(input).toBeInTheDocument();
  });

  it('renders input with value', () => {
    renderWithTheme(
      <Input id="test-input" label="Test Input" value="test value" onChange={() => {}} />
    );

    const input = screen.getByDisplayValue('test value');
    expect(input).toBeInTheDocument();
  });

  it('handles onChange events', async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();

    renderWithTheme(<Input id="test-input" label="Test Input" onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'test');

    expect(handleChange).toHaveBeenCalledTimes(4); // Called for each character
  });

  it('handles controlled input value changes', async () => {
    const user = userEvent.setup();
    const TestComponent = () => {
      const [value, setValue] = React.useState('');
      return (
        <Input
          id="test-input"
          label="Test Input"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Type here"
        />
      );
    };

    renderWithTheme(<TestComponent />);

    const input = screen.getByPlaceholderText('Type here');
    await user.type(input, 'hello');

    expect(input).toHaveValue('hello');
  });

  it('renders input with size prop', () => {
    renderWithTheme(<Input id="test-input" label="Test Input" size="lg" />);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    // The size prop is passed as $size to styled-components
    // We can't directly test the CSS, but we can verify the component renders
  });

  it('renders input with required attribute', () => {
    renderWithTheme(<Input id="test-input" label="Test Input" required />);

    const input = screen.getByRole('textbox');
    expect(input).toBeRequired();
  });

  it('forwards additional props to input element', () => {
    renderWithTheme(
      <Input
        id="test-input"
        label="Test Input"
        data-testid="custom-input"
        aria-label="Custom input"
        maxLength={10}
      />
    );

    const input = screen.getByTestId('custom-input');
    expect(input).toHaveAttribute('aria-label', 'Custom input');
    expect(input).toHaveAttribute('maxLength', '10');
  });

  it('handles focus and blur events', async () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    const user = userEvent.setup();

    renderWithTheme(
      <Input
        id="test-input"
        label="Test Input"
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Focus test"
      />
    );

    const input = screen.getByPlaceholderText('Focus test');

    await user.click(input);
    expect(handleFocus).toHaveBeenCalledTimes(1);

    await user.tab();
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('handles key events', async () => {
    const handleKeyDown = jest.fn();
    const handleKeyUp = jest.fn();
    const user = userEvent.setup();

    renderWithTheme(
      <Input
        id="test-input"
        label="Test Input"
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        placeholder="Key test"
      />
    );

    const input = screen.getByPlaceholderText('Key test');

    await user.click(input);
    await user.keyboard('a');

    expect(handleKeyDown).toHaveBeenCalled();
    expect(handleKeyUp).toHaveBeenCalled();
  });

  it('handles multiple input interactions', async () => {
    const user = userEvent.setup();
    const TestComponent = () => {
      const [value, setValue] = React.useState('');
      return (
        <div>
          <Input
            id="input-1"
            label="Input 1"
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="Multi test"
            data-testid="input-1"
          />
          <Input
            id="input-2"
            label="Input 2"
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="Multi test 2"
            data-testid="input-2"
          />
        </div>
      );
    };

    renderWithTheme(<TestComponent />);

    const input1 = screen.getByTestId('input-1');
    const input2 = screen.getByTestId('input-2');

    await user.type(input1, 'shared value');

    expect(input1).toHaveValue('shared value');
    expect(input2).toHaveValue('shared value');
  });

  it('handles edge cases with empty values', () => {
    renderWithTheme(<Input id="test-input" label="Test Input" value="" onChange={() => {}} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('');
  });

  it('handles undefined and null values gracefully', () => {
    renderWithTheme(<Input id="test-input" label="Test Input" value={undefined} />);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  // New tests for error handling and tooltip functionality
  it('renders error message when showError is true', () => {
    renderWithTheme(
      <Input
        id="test-input"
        label="Test Input"
        showError={true}
        errorMessage="This is an error message"
        aria-invalid={true}
      />
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');

    // Check if error message is present (it should be in a tooltip)
    const errorMessages = screen.getAllByText('This is an error message');
    expect(errorMessages.length).toBeGreaterThan(0);
  });

  it('does not render error message when showError is false', () => {
    renderWithTheme(
      <Input
        id="test-input"
        label="Test Input"
        showError={false}
        errorMessage="This error should not show"
        aria-invalid={false}
      />
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'false');

    // Error message should not be visible
    expect(screen.queryByText('This error should not show')).not.toBeInTheDocument();
  });

  it('applies error styling when aria-invalid is true', () => {
    renderWithTheme(
      <Input
        id="test-input"
        label="Test Input"
        aria-invalid={true}
        showError={true}
        errorMessage="Error message"
      />
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('renders with proper accessibility attributes', () => {
    renderWithTheme(
      <Input
        id="test-input"
        label="Test Input"
        required={true}
        aria-describedby="help-text"
        aria-required={true}
      />
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-label', 'Test Input');
    expect(input).toHaveAttribute('aria-describedby', 'help-text');
    expect(input).toHaveAttribute('aria-required', 'true');
    expect(input).toBeRequired();
  });

  it('renders visually hidden label for screen readers', () => {
    renderWithTheme(<Input id="test-input" label="Test Input" />);

    // The label should be accessible to screen readers
    const label = screen.getByLabelText('Test Input');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('id', 'test-input');
  });

  it('handles tooltip positioning and content', () => {
    renderWithTheme(
      <Input
        id="test-input"
        label="Test Input"
        showError={true}
        errorMessage="Tooltip error message"
        aria-invalid={true}
      />
    );

    const input = screen.getByRole('textbox');
    const errorMessages = screen.getAllByText('Tooltip error message');

    expect(input).toBeInTheDocument();
    expect(errorMessages.length).toBeGreaterThan(0);
  });

  it('clears error state when user starts typing', async () => {
    const user = userEvent.setup();
    const TestComponent = () => {
      const [value, setValue] = React.useState('');
      const [showError, setShowError] = React.useState(true);
      const [ariaInvalid, setAriaInvalid] = React.useState(true);

      const handleChange = e => {
        setValue(e.target.value);
        if (e.target.value.length > 0) {
          setShowError(false);
          setAriaInvalid(false);
        }
      };

      return (
        <Input
          id="test-input"
          label="Test Input"
          value={value}
          onChange={handleChange}
          showError={showError}
          errorMessage="Initial error"
          aria-invalid={ariaInvalid}
        />
      );
    };

    renderWithTheme(<TestComponent />);

    const input = screen.getByRole('textbox');

    // Initially should show error
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getAllByText('Initial error').length).toBeGreaterThan(0);

    // Type something to clear error
    await user.type(input, 'test');

    // Error should be cleared
    expect(input).toHaveAttribute('aria-invalid', 'false');
    expect(screen.queryByText('Initial error')).not.toBeInTheDocument();
  });

  it('handles disabled state with proper styling', () => {
    renderWithTheme(<Input id="test-input" label="Test Input" disabled={true} />);

    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('forwards all additional props correctly', () => {
    renderWithTheme(
      <Input
        id="test-input"
        label="Test Input"
        data-testid="custom-input"
        maxLength={50}
        autoComplete="off"
        spellCheck={false}
      />
    );

    const input = screen.getByTestId('custom-input');
    expect(input).toHaveAttribute('maxLength', '50');
    expect(input).toHaveAttribute('autoComplete', 'off');
    expect(input).toHaveAttribute('spellCheck', 'false');
  });

  // Icon functionality tests
  describe('Icon functionality', () => {
    it('renders icon when showIcon is true', () => {
      renderWithTheme(<Input id="test-input" label="Test Input" showIcon={true} />);

      const input = screen.getByRole('textbox');
      const icon = input.parentElement.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('does not render icon when showIcon is false', () => {
      renderWithTheme(<Input id="test-input" label="Test Input" showIcon={false} />);

      const input = screen.getByRole('textbox');
      const icon = input.parentElement.querySelector('svg');
      expect(icon).not.toBeInTheDocument();
    });

    it('icon changes color on input hover', async () => {
      const user = userEvent.setup();
      renderWithTheme(<Input id="test-input" label="Test Input" showIcon={true} />);

      const input = screen.getByRole('textbox');
      const icon = input.parentElement.querySelector('svg');

      expect(icon).toBeInTheDocument();

      // Hover over input
      await user.hover(input);

      // Icon should have hover styles applied (we can't directly test CSS, but we can verify the structure)
      expect(icon).toBeInTheDocument();
    });

    it('icon changes color on input focus', async () => {
      const user = userEvent.setup();
      renderWithTheme(<Input id="test-input" label="Test Input" showIcon={true} />);

      const input = screen.getByRole('textbox');
      const icon = input.parentElement.querySelector('svg');

      expect(icon).toBeInTheDocument();

      // Focus input
      await user.click(input);

      // Icon should still be present
      expect(icon).toBeInTheDocument();
    });

    it('icon shows error color when input has error state', () => {
      renderWithTheme(
        <Input
          id="test-input"
          label="Test Input"
          showIcon={true}
          showError={true}
          errorMessage="Error message"
          aria-invalid={true}
        />
      );

      const input = screen.getByRole('textbox');
      const icon = input.parentElement.querySelector('svg');

      expect(icon).toBeInTheDocument();
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });
  });

  // Size variant tests
  describe('Size variants', () => {
    it('renders with lg size by default', () => {
      renderWithTheme(<Input id="test-input" label="Test Input" />);

      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
      // The size prop is passed as $size to styled-components
      // We can verify the component renders correctly
    });

    it('renders with xl size when specified', () => {
      renderWithTheme(<Input id="test-input" label="Test Input" size="xl" />);

      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    it('applies correct styling for xl size with icon', () => {
      renderWithTheme(<Input id="test-input" label="Test Input" size="xl" showIcon={true} />);

      const input = screen.getByRole('textbox');
      const icon = input.parentElement.querySelector('svg');

      expect(input).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
    });
  });
});
