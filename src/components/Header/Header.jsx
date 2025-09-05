import styled from 'styled-components';

import React, { useState } from 'react';

import Button from '../Button';
import Input from '../Input';
import Logo from '../Logo/Logo';

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  padding-block: ${({ theme }) => theme.spacing[5]};
  padding-inline: ${({ theme }) => theme.spacing[18]};
  background-color: ${({ theme }) => theme.colors.brand.black};
`;

const Form = styled.form`
  margin-left: auto;
  margin-right: ${({ theme }) => theme.spacing[4]};
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  width: 100%;
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
      <Form onSubmit={handleSubmit}>
        <Box>
          <Input
            size="lg"
            id="header-search-input"
            label="Search"
            value={search}
            onChange={handleSearch}
            type="text"
            showError={showError}
            errorMessage={searchError}
            placeholder={'Search'}
            aria-invalid={showError}
            aria-label="Search"
            aria-describedby="header-search-input"
          />
          <Button variant="secondary" size="lg">
            Submit a request
          </Button>
        </Box>
      </Form>
      <Button variant="primary" size="lg">
        Sign In
      </Button>
    </StyledHeader>
  );
}

export default Header;
