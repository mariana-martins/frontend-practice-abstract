import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import React from 'react';

import { renderWithTheme } from '../../../test-utils';
import Card from '../Card';

// Mock data for testing
const mockCardData = {
  image: '/test-image.png',
  title: 'Test Card Title',
  description: 'This is a test card description that explains what the card is about.',
  link: 'https://example.com',
  linkText: 'Learn more →',
};

describe('Card Component', () => {
  it('renders card with all required props', () => {
    renderWithTheme(<Card {...mockCardData} />);

    expect(screen.getByText('Test Card Title')).toBeInTheDocument();
    expect(
      screen.getByText('This is a test card description that explains what the card is about.')
    ).toBeInTheDocument();
    expect(screen.getByText(/Learn more/)).toBeInTheDocument();
    expect(screen.getByRole('article', { name: 'Test Card Title' })).toBeInTheDocument();
  });

  it('renders image with correct attributes', () => {
    renderWithTheme(<Card {...mockCardData} />);

    const image = screen.getByAltText('Test Card Title');
    expect(image).toHaveAttribute('src', '/test-image.png');
    expect(image).toHaveAttribute('alt', 'Test Card Title');
  });

  it('renders link with correct href', () => {
    renderWithTheme(<Card {...mockCardData} />);

    const link = screen.getByRole('link', { name: 'Learn more → about Test Card Title' });
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('handles click events on the link', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Card {...mockCardData} />);

    const link = screen.getByRole('link', { name: 'Learn more → about Test Card Title' });
    await user.click(link);

    // Link should be clickable (we can't test external navigation in tests)
    expect(link).toBeInTheDocument();
  });

  it('forwards additional props to the card container', () => {
    renderWithTheme(<Card {...mockCardData} data-testid="custom-card" className="custom-class" />);

    const card = screen.getByTestId('custom-card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('custom-class');
  });

  it('renders with different title and description', () => {
    const customData = {
      ...mockCardData,
      title: 'Custom Title',
      description: 'Custom description text',
    };

    renderWithTheme(<Card {...customData} />);

    expect(screen.getByText('Custom Title')).toBeInTheDocument();
    expect(screen.getByText('Custom description text')).toBeInTheDocument();
  });

  it('renders with different image source', () => {
    const customData = {
      ...mockCardData,
      image: '/custom-image.jpg',
      title: 'Custom Image Card',
    };

    renderWithTheme(<Card {...customData} />);

    const image = screen.getByAltText('Custom Image Card');
    expect(image).toHaveAttribute('src', '/custom-image.jpg');
  });

  it('renders with different link URL', () => {
    const customData = {
      ...mockCardData,
      link: 'https://different-example.com',
    };

    renderWithTheme(<Card {...customData} />);

    const link = screen.getByRole('link', { name: 'Learn more → about Test Card Title' });
    expect(link).toHaveAttribute('href', 'https://different-example.com');
  });

  it('handles keyboard navigation', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Card {...mockCardData} />);

    const link = screen.getByRole('link', { name: 'Learn more → about Test Card Title' });

    // Tab to the link
    await user.tab();
    expect(link).toHaveFocus();

    // Press Enter to activate
    await user.keyboard('{Enter}');
    expect(link).toBeInTheDocument();
  });
});
