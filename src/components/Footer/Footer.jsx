import styled from 'styled-components';

import React from 'react';

import { MiniLogo } from '../Logo/Logo';

const StyledFooter = styled.footer`
  display: grid;
  grid-template-columns: repeat(4, minmax(150px, 170px)) 1.5fr;
  gap: ${({ theme }) => theme.spacing[0.5]};

  padding-bottom: ${({ theme }) => theme.spacing[16]};
  padding-inline: ${({ theme }) => theme.spacing[24]};

  background-color: ${({ theme }) => theme.colors.brand.black};
  color: ${({ theme }) => theme.colors.brand.white};
`;

const Stack = styled.section`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  margin-top: ${({ theme }) => theme.spacing[12]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};

  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme }) => theme.spacing[7]};
`;

const SubTitle = styled.h4`
  margin-top: ${({ theme }) => theme.spacing[7]};

  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  line-height: ${({ theme }) => theme.spacing[6]};
`;

const Link = styled.a`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.brand.white};
  width: fit-content;
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.spacing[1]};
  transition: all 0.2s ease;

  &:hover {
    text-decoration: underline;
    background-color: ${({ theme }) => theme.colors.brand.white}10;
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.brand.primary};
    outline-offset: 2px;
    background-color: ${({ theme }) => theme.colors.brand.primary}20;
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brand.primary};
    outline-offset: 2px;
    background-color: ${({ theme }) => theme.colors.brand.primary}20;
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.brand.primary}30;
  }
`;

const StyledStack = styled(Stack)`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  line-height: ${({ theme }) => theme.spacing[7]};
  margin-top: ${({ theme }) => theme.spacing[50]};
  align-self: end;
  justify-self: end;
`;

const StyledMiniLogo = styled(MiniLogo)`
  height: 35px;
  width: 35px;
  max-width: 40px;
  max-height: 40px;
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

function Footer() {
  return (
    <StyledFooter role="contentinfo">
      <Stack>
        <Title>Abstract</Title>
        <Link href="https://www.goabstract.com/">Start Trial</Link>
        <Link href="https://www.goabstract.com/">Pricing</Link>
        <Link href="https://www.goabstract.com/">Download</Link>
      </Stack>
      <Stack>
        <Title>Resources</Title>
        <Link href="https://www.goabstract.com/">Blog</Link>
        <Link href="https://www.goabstract.com/">Help Center</Link>
        <Link href="https://www.goabstract.com/">Release Notes</Link>
        <Link href="https://www.goabstract.com/">Status</Link>
      </Stack>
      <Stack>
        <Title>Community</Title>
        <Link href="https://www.goabstract.com/">Twitter</Link>
        <Link href="https://www.goabstract.com/">LinkedIn</Link>
        <Link href="https://www.goabstract.com/">Facebook</Link>
        <Link href="https://www.goabstract.com/">Dribbble</Link>
        <Link href="https://www.goabstract.com/">Podcast</Link>
      </Stack>
      <Stack>
        <Title>Company</Title>
        <Link href="https://www.goabstract.com/">About Us</Link>
        <Link href="https://www.goabstract.com/">Careers</Link>
        <Link href="https://www.goabstract.com/">Legal</Link>
        <SubTitle>Contact Us</SubTitle>
        <Link href="mailto:info@goabstract.com">info@goabstract.com</Link>
      </Stack>

      <StyledStack aria-labelledby="copyright-heading">
        <StyledMiniLogo aria-hidden="true" />
        <p>© Copyright 2025</p>
        <p>Abstract Studio Design, Inc.</p>
        <p>All rights reserved</p>
      </StyledStack>
    </StyledFooter>
  );
}

export default Footer;
