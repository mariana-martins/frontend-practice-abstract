import styled from 'styled-components';

import React, { useState } from 'react';

import Input from '../Input';

const StyledSearchFormSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.brand.secondary};
  padding-inline: ${({ theme }) => theme.spacing[8]};
  padding-top: ${({ theme }) => theme.spacing[20]};
  padding-bottom: ${({ theme }) => theme.spacing[29]};
`;

const Title = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.typography.fontSize['8xl']};
  color: ${({ theme }) => theme.colors.brand.black};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: ${({ theme }) => theme.typography.fontSize['6xl']};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  }
`;

const Form = styled.form`
  width: 100%;
  max-width: 720px;
`;

function SearchFormSection() {
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
    } catch {
      setSearchError('An error occurred. Please try again.');
      setShowError(true);
    }
  };
  return (
    <StyledSearchFormSection>
      <Title>How can we help?</Title>
      <Form onSubmit={handleSubmit} role="form">
        <Input
          id={'main-search-input'}
          type={'text'}
          value={search}
          onChange={handleSearch}
          placeholder={'Search'}
          size={'xl'}
          showIcon={true}
          aria-label={'Search'}
          aria-describedby={'main-search-input'}
          aria-invalid={showError}
          aria-required={false}
          showError={showError}
          errorMessage={searchError}
        />
      </Form>
    </StyledSearchFormSection>
  );
}

export default SearchFormSection;
