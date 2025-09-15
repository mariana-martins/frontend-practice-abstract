import { Menu, Search } from 'feather-icons-react';
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

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

const SignInButton = styled(Button)`
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

const MobileMenu = styled.div`
  display: none;
  margin-left: auto;
  margin-right: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.brand.white};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[4]};
  }

  /* Hover animation for all children (icons) */
  & > * {
    transition: transform 0.2s ease-in-out;
    cursor: pointer;

    &:hover {
      transform: scale(1.2);
    }
  }
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
      <SignInButton variant="primary" size="lg">
        Sign In
      </SignInButton>
      <MobileMenu>
        <Search size={24} />
        <Menu size={24} />
      </MobileMenu>
    </StyledHeader>
  );
}

export default Header;
