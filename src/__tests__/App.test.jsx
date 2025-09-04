import React from 'react';

import App from '../App';
import { renderWithTheme, screen } from '../test-utils';

describe('App Component', () => {
  it('renders without crashing', () => {
    expect(() => renderWithTheme(<App />)).not.toThrow();
  });

  it('renders the main application structure', () => {
    renderWithTheme(<App />);

    // The App component should render the Header component
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('provides theme context to child components', () => {
    renderWithTheme(<App />);

    // Verify that styled-components receive theme context
    // by checking if the Header component renders properly with its styling
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();

    // Check that the Header contains its expected child components
    const logo = screen.getByRole('link');
    const searchInput = screen.getByRole('textbox');
    const buttons = screen.getAllByRole('button');

    expect(logo).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(buttons).toHaveLength(2); // Submit a request and Sign In buttons
  });

  it('renders all main application elements', () => {
    renderWithTheme(<App />);

    // Verify the complete application structure
    const header = screen.getByRole('banner');
    const logo = screen.getByRole('link');
    const searchInput = screen.getByRole('textbox');
    const buttons = screen.getAllByRole('button');

    expect(header).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(buttons).toHaveLength(2);
  });

  it('maintains consistent structure across re-renders', () => {
    const { rerender } = renderWithTheme(<App />);

    // Re-render the component
    rerender(<App />);

    // Verify elements are still present after re-render
    const header = screen.getByRole('banner');
    const logo = screen.getByRole('link');
    const searchInput = screen.getByRole('textbox');

    expect(header).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
  });

  it('renders with correct theme provider setup', () => {
    renderWithTheme(<App />);

    // Since we're using renderWithTheme, the App component's ThemeProvider
    // should work correctly with our test setup
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();

    // Verify that styled-components are working (no theme errors)
    const logo = screen.getByRole('link');
    const searchInput = screen.getByRole('textbox');

    expect(logo).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
  });
});
