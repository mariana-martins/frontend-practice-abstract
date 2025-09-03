import styled from 'styled-components';

import React, { useState } from 'react';

import Button from '../Button';
import Logo from '../Logo/Logo';
import SearchInput from '../SearchInput';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block: ${({ theme }) => theme.spacing[5]};
  padding-inline: ${({ theme }) => theme.spacing[18]};
  background-color: ${({ theme }) => theme.colors.brand.black};
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
`;

function Header() {
  const [search, setSearch] = useState('');
  const handleSearch = e => {
    setSearch(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    alert('Search: ' + search);
  };
  return (
    <StyledHeader>
      <Logo />
      <Box>
        <form onSubmit={handleSubmit}>
          <Box>
            <SearchInput
              size="lg"
              id={'header-search-input'}
              value={search}
              onChange={handleSearch}
            />
            <Button variant="secondary" size="lg">
              Submit a request
            </Button>
          </Box>
        </form>
        <Button variant="primary" size="lg">
          Sign In
        </Button>
      </Box>
    </StyledHeader>
  );
}

export default Header;
