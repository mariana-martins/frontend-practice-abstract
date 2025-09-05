import styled from 'styled-components';

import React from 'react';

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
`;

function SearchFormSection() {
  return (
    <StyledSearchFormSection>
      <Title>How can we help?</Title>
      <Input
        id={'main-search-input'}
        type={'text'}
        value={''}
        onChange={() => {}}
        placeholder={'Search'}
        size={'xl'}
        showIcon={true}
        aria-label={'Search'}
        aria-describedby={'main-search-input'}
        aria-invalid={false}
        aria-required={false}
      />
    </StyledSearchFormSection>
  );
}

export default SearchFormSection;
