import styled from 'styled-components';

import React from 'react';

import logoImage from '../../assets/logo.svg';

const StyledLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.brand.white};
`;

const StyledSpan = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
`;

const StyledImage = styled.img`
  width: 130px;
  min-width: 80px;
  display: block;
`;

const Divider = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const Logo = () => {
  return (
    <StyledLink href="https://www.goabstract.com">
      <StyledImage src={logoImage} alt="Logo" />
      <Divider>|</Divider>
      <StyledSpan>Help Center</StyledSpan>
    </StyledLink>
  );
};

export default Logo;
