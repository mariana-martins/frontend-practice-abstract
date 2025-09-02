import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';

import { useState } from 'react';

import Button from './components/Button';
import SearchInput from './components/SearchInput';
import theme from './theme';

const Box = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

function App() {
  const [search, setSearch] = useState('');
  const handleSearch = e => {
    setSearch(e.target.value);
  };
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundColor: 'white',
        }}
      >
        <Box>
          <SearchInput size="lg" value={search} onChange={handleSearch} />
          <Button variant="secondary" size={"lg"}>
            Submit a request
          </Button>
        </Box>
        <Button variant="primary" size="lg">
          Click me
        </Button>
      </div>
    </ThemeProvider>
  );
}

export default App;
