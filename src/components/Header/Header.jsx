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
  const [searchError, setSearchError] = useState('');
  const [showError, setShowError] = useState(false);

  const handleSearch = e => {
    setSearch(e.target.value);
    // Clear error when user starts typing
    if (showError) {
      setShowError(false);
      setSearchError('');
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    try {
      // Trim whitespace and validate input
      const trimmedSearch = search.trim();

      if (!trimmedSearch) {
        setSearchError('Please enter a search term');
        setShowError(true);
        return;
      }

      // Additional validation for search term length
      if (trimmedSearch.length < 4) {
        setSearchError('Search term must be at least 4 characters long');
        setShowError(true);
        return;
      }

      setSearch('');
      setShowError(false);
      setSearchError('');
      alert('Search: ' + trimmedSearch);
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setSearchError('An error occurred. Please try again.');
      setShowError(true);
    }
  };
  return (
    <StyledHeader>
      <Logo />
      <Box>
        <form onSubmit={handleSubmit}>
          <Box>
            <SearchInput
              size="lg"
              id="header-search-input"
              value={search}
              onChange={handleSearch}
              type="text"
              showError={showError}
              errorMessage={searchError}
              aria-invalid={showError}
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
