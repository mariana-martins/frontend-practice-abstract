import { ThemeProvider } from 'styled-components';

import React from 'react';

import Header from './components/Header';
import SearchFormSection from './components/SearchFormSection';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <main>
        <SearchFormSection />
      </main>
    </ThemeProvider>
  );
}

export default App;
