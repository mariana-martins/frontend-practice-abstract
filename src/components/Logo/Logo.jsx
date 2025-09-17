import PropTypes from 'prop-types';
import styled from 'styled-components';

import React from 'react';

import logoImage from '../../assets/logo.svg';

export const MiniLogo = ({ ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 51"
      preserveAspectRatio="xMinYMid slice"
      {...props}
    >
      <g fill="#fff">
        <path d="M25.41 0C5.08 0 0 5.08 0 25.41s5.08 25.41 25.41 25.41 25.41-5.08 25.41-25.41S45.74 0 25.41 0zm-4.17 39.31A9.73 9.73 0 1 1 31 29.58a9.75 9.75 0 0 1-9.76 9.73zm17.67-.4h-4.77V16.67H11.91v-4.76h27z" />
        <circle cx="21.24" cy="29.58" r="4.96" />
      </g>
    </svg>
  );
};

MiniLogo.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  'aria-label': PropTypes.string,
  'aria-hidden': PropTypes.bool,
  role: PropTypes.string,
};

const StyledLink = styled.a`
  display: flex;
  flex-wrap: nowrap;
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
