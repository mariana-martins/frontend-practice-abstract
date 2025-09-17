import styled from 'styled-components';

import React from 'react';

import data from '../../data';
import Card from '../Card';

const Stack = styled.section`
  display: grid;
  grid-template-columns: repeat(2, minmax(50px, 1fr));
  padding-inline: ${({ theme }) => theme.spacing[4]};
  padding-block: ${({ theme }) => theme.spacing[16]};
  margin-inline: auto;
  width: 80%;
  max-width: 1600px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(1, minmax(50px, 1fr));
    padding-inline: 0;
  }
`;

function CardStack() {
  return (
    <Stack>
      {data.cards.map((card, index) => (
        <Card
          key={card.id}
          image={card.image}
          title={card.title}
          description={card.description}
          link={card.link}
          tabIndex={0}
          aria-label={`Article ${index + 1}: ${card.title}`}
        />
      ))}
    </Stack>
  );
}

export default CardStack;
