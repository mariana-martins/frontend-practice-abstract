import styled from 'styled-components';

import React from 'react';

import data from '../../data';
import Card from '../Card';

const Stack = styled.div`
  display: grid;
  padding-inline: ${({ theme }) => theme.spacing[4]};
  padding-block: ${({ theme }) => theme.spacing[16]};
  margin-inline: auto;
  grid-template-columns: repeat(2, minmax(50px, 1fr));
  width: 80%;
  max-width: 1600px;
`;

function CardStack() {
  return (
    <Stack>
      {data.cards.map(card => (
        <Card
          key={card.id}
          image={card.image}
          title={card.title}
          description={card.description}
          link={card.link}
        />
      ))}
    </Stack>
  );
}

export default CardStack;
