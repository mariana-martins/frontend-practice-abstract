import styled, { css } from 'styled-components';

import React from 'react';

const inputSizes = {
  lg: css`
    padding: ${({ theme }) => theme.spacing[2.5]} ${({ theme }) => theme.spacing[5]};
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    border-radius: 8px;
    border-color: ${({ theme }) => theme.colors.brand.border};
    font-weight: ${({ theme }) => theme.typography.fontWeight.base};
  `,
};

export const StyledInput = styled.input`
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  border: 1px solid;

  &::placeholder {
    color: ${({ theme }) => theme.colors.brand.placeholder};
  }
  /* Sizes */
  ${({ $size }) => inputSizes[$size] || inputSizes.lg}
`;

function Input({ id, size, value, onChange, ...props }) {
  return <StyledInput id={id} $size={size} value={value} onChange={onChange} {...props} />;
}

export default Input;
