import React from 'react';

import { fireEvent, renderWithTheme, screen } from '../../../test-utils';
import Button from '../Button';

describe('Button Component', () => {
  it('renders button with children', () => {
    renderWithTheme(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('renders primary variant by default', () => {
    renderWithTheme(<Button>Primary Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('renders secondary variant', () => {
    renderWithTheme(<Button variant="secondary">Secondary Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    renderWithTheme(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders with different sizes', () => {
    renderWithTheme(<Button size="lg">Large Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});
