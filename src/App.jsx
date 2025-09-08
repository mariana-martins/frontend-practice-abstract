import styled, { ThemeProvider } from 'styled-components';

import React from 'react';

import CardStack from './components/CardStack/CardStack';
import Header from './components/Header';
import SearchFormSection from './components/SearchFormSection';
import theme from './theme';

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 1600px;
  margin-inline: auto;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Stack>
        <Header />
        <main>
          <SearchFormSection />
          <CardStack />
        </main>
      </Stack>
    </ThemeProvider>
  );
}

export default App;
