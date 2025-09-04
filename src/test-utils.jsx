import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import React from 'react';

import theme from './theme';

/**
 * Custom render function that includes the theme provider
 * Use this instead of the default render from @testing-library/react
 * when testing styled-components that depend on theme values
 *
 * @param {ReactElement} component - The component to render
 * @returns {RenderResult} The render result with theme provider
 *
 * @example
 * import { renderWithTheme, screen } from '../test-utils';
 *
 * test('renders component with theme', () => {
 *   renderWithTheme(<MyComponent />);
 *   expect(screen.getByText('Hello')).toBeInTheDocument();
 * });
 */
const renderWithTheme = component => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

// Re-export everything from testing library
export * from '@testing-library/react';

// Export our custom render function
export { renderWithTheme };
