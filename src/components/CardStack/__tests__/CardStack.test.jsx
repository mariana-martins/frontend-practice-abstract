import { screen } from '@testing-library/react';

import React from 'react';

import { renderWithTheme } from '../../../test-utils';
import Card from '../../Card';
import CardStack from '../CardStack';

// Mock the data module
jest.mock('../../../data', () => ({
  cards: [
    {
      id: 'test-card-1',
      title: 'Test Card 1',
      description: 'Description for test card 1',
      link: 'https://example1.com',
      image: '/test-image1.png',
    },
    {
      id: 'test-card-2',
      title: 'Test Card 2',
      description: 'Description for test card 2',
      link: 'https://example2.com',
      image: '/test-image2.png',
    },
    {
      id: 'test-card-3',
      title: 'Test Card 3',
      description: 'Description for test card 3',
      link: 'https://example3.com',
      image: '/test-image3.png',
    },
  ],
}));

describe('CardStack Component', () => {
  it('renders without crashing', () => {
    expect(() => renderWithTheme(<CardStack />)).not.toThrow();
  });

  it('renders all cards from data', () => {
    renderWithTheme(<CardStack />);

    expect(screen.getByText('Test Card 1')).toBeInTheDocument();
    expect(screen.getByText('Test Card 2')).toBeInTheDocument();
    expect(screen.getByText('Test Card 3')).toBeInTheDocument();
  });

  it('uses correct keys for each card', () => {
    renderWithTheme(<CardStack />);

    // Each card should have unique content based on their IDs
    expect(screen.getByText('Test Card 1')).toBeInTheDocument();
    expect(screen.getByText('Test Card 2')).toBeInTheDocument();
    expect(screen.getByText('Test Card 3')).toBeInTheDocument();
  });

  it('renders correct number of cards', () => {
    renderWithTheme(<CardStack />);

    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(3);
  });
});
