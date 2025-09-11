import React from 'react';

import App from '../App';
import { renderWithTheme, screen } from '../test-utils';

describe('App Component', () => {
  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      expect(() => renderWithTheme(<App />)).not.toThrow();
    });

    it('renders all main layout elements', () => {
      renderWithTheme(<App />);

      // Check main layout structure
      const header = screen.getByRole('banner');
      const main = screen.getByRole('main');
      const footer = screen.getByRole('contentinfo');

      expect(header).toBeInTheDocument();
      expect(main).toBeInTheDocument();
      expect(footer).toBeInTheDocument();
    });
  });

  describe('Theme Provider Integration', () => {
    it('provides theme context to all child components', () => {
      renderWithTheme(<App />);

      // Verify that styled-components receive theme context
      const header = screen.getByRole('banner');
      const main = screen.getByRole('main');
      const footer = screen.getByRole('contentinfo');

      expect(header).toBeInTheDocument();
      expect(main).toBeInTheDocument();
      expect(footer).toBeInTheDocument();

      // Verify styled-components are working (no theme errors)
      const logo = screen.getByRole('link', { name: /logo/i });
      const searchInputs = screen.getAllByRole('textbox');

      expect(logo).toBeInTheDocument();
      expect(searchInputs).toHaveLength(2);
    });

    it('maintains theme consistency across re-renders', () => {
      const { rerender } = renderWithTheme(<App />);

      // Re-render the component
      rerender(<App />);

      // Verify elements are still present after re-render
      const header = screen.getByRole('banner');
      const main = screen.getByRole('main');
      const footer = screen.getByRole('contentinfo');
      const logo = screen.getByRole('link', { name: /logo/i });

      expect(header).toBeInTheDocument();
      expect(main).toBeInTheDocument();
      expect(footer).toBeInTheDocument();
      expect(logo).toBeInTheDocument();
    });
  });
});
