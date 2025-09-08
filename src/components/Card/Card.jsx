import styled from 'styled-components';

import React from 'react';

const StyledCard = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing[4]};
  padding-top: ${({ theme }) => theme.spacing[12]};
  padding-bottom: ${({ theme }) => theme.spacing[4]};
`;

const CardContent = styled.div`
  flex: 2;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
`;

const Image = styled.img`
  flex: 1;
  width: 50%;
  height: auto;
  max-height: 120px;
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme }) => theme.spacing[7]};
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  line-height: ${({ theme }) => theme.spacing[8]};
  margin-bottom: ${({ theme }) => theme.spacing[5]};
`;

const Link = styled.a`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  line-height: ${({ theme }) => theme.spacing[7]};
  color: ${({ theme }) => theme.colors.brand.primary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

function Card({ image, title, description, link, linkText, ...props }) {
  return (
    <StyledCard {...props}>
      <Image src={image} alt={title} />
      <CardContent>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <Link href={link}>Learn more →</Link>
      </CardContent>
    </StyledCard>
  );
}

export default Card;
