import PropTypes from 'prop-types';
import styled from 'styled-components';

import React from 'react';

const StyledCard = styled.article`
  display: flex;
  flex-direction: row;
  padding-top: ${({ theme }) => theme.spacing[12]};
  padding-bottom: ${({ theme }) => theme.spacing[4]};
`;

const CardContent = styled.div`
  flex: 2;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
`;

const Image = styled.img`
  flex: 1;
  width: 100%;
  height: auto;
  max-height: 80px;
  object-fit: contain;
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

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.brand.primary};
    outline-offset: 2px;
    background-color: ${({ theme }) => theme.colors.brand.primary}10;
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brand.primary};
    outline-offset: 2px;
  }
`;

function Card({ image, title, description, link, linkText = 'Learn more', ariaLabel, ...props }) {
  const cardId = `card-${title.toLowerCase().replace(/\s+/g, '-')}`;
  const linkId = `${cardId}-link`;
  const descriptionId = `${cardId}-description`;

  return (
    <StyledCard
      {...props}
      role="article"
      aria-labelledby={`${cardId}-title`}
      aria-describedby={descriptionId}
    >
      <Image src={image} alt={title} role="presentation" aria-hidden="true" />
      <CardContent>
        <Title id={`${cardId}-title`}>{title}</Title>
        <Description id={descriptionId}>{description}</Description>
        <Link
          href={link}
          id={linkId}
          aria-label={ariaLabel || `${linkText} about ${title}`}
          aria-describedby={descriptionId}
        >
          {linkText} →
        </Link>
      </CardContent>
    </StyledCard>
  );
}

Card.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  linkText: PropTypes.string,
  ariaLabel: PropTypes.string,
};

export default Card;
