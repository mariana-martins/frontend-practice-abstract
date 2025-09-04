import userEvent from '@testing-library/user-event';

import React from 'react';

import { renderWithTheme, screen } from '../../../test-utils';
import Input from '../Input';

describe('Input Component', () => {
  it('renders input with default props', () => {
    renderWithTheme(<Input />);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    // HTML inputs default to type="text" but don't show the attribute
    expect(input.tagName).toBe('INPUT');
  });

  it('renders input with custom id', () => {
    renderWithTheme(<Input id="test-input" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('id', 'test-input');
  });

  it('renders input with placeholder', () => {
    renderWithTheme(<Input placeholder="Enter your name" />);

    const input = screen.getByPlaceholderText('Enter your name');
    expect(input).toBeInTheDocument();
  });

  it('renders input with value', () => {
    renderWithTheme(<Input value="test value" onChange={() => {}} />);

    const input = screen.getByDisplayValue('test value');
    expect(input).toBeInTheDocument();
  });

  it('handles onChange events', async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();

    renderWithTheme(<Input onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'test');

    expect(handleChange).toHaveBeenCalledTimes(4); // Called for each character
  });

  it('handles controlled input value changes', async () => {
    const user = userEvent.setup();
    const TestComponent = () => {
      const [value, setValue] = React.useState('');
      return (
        <Input value={value} onChange={e => setValue(e.target.value)} placeholder="Type here" />
      );
    };

    renderWithTheme(<TestComponent />);

    const input = screen.getByPlaceholderText('Type here');
    await user.type(input, 'hello');

    expect(input).toHaveValue('hello');
  });

  it('renders input with size prop', () => {
    renderWithTheme(<Input size="lg" />);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    // The size prop is passed as $size to styled-components
    // We can't directly test the CSS, but we can verify the component renders
  });

  it('renders input with required attribute', () => {
    renderWithTheme(<Input required />);

    const input = screen.getByRole('textbox');
    expect(input).toBeRequired();
  });

  it('forwards additional props to input element', () => {
    renderWithTheme(<Input data-testid="custom-input" aria-label="Custom input" maxLength={10} />);

    const input = screen.getByTestId('custom-input');
    expect(input).toHaveAttribute('aria-label', 'Custom input');
    expect(input).toHaveAttribute('maxLength', '10');
  });

  it('handles focus and blur events', async () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    const user = userEvent.setup();

    renderWithTheme(<Input onFocus={handleFocus} onBlur={handleBlur} placeholder="Focus test" />);

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
      <Input onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} placeholder="Key test" />
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
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="Multi test"
            data-testid="input-1"
          />
          <Input
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
    renderWithTheme(<Input value="" onChange={() => {}} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('');
  });

  it('handles undefined and null values gracefully', () => {
    renderWithTheme(<Input value={undefined} />);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });
});
