import styled, { css } from 'styled-components';

// Button variants
const buttonVariants = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.brand.primary};
    color: ${({ theme }) => theme.colors.brand.white};
    border: 1px solid transparent;

    &:hover,
    &:focus,
    &:active {
      background-color: ${({ theme }) => theme.colors.brand.white};
      color: ${({ theme }) => theme.colors.brand.black};
    }
  `,

  secondary: css`
    background-color: ${({ theme }) => theme.colors.brand.black};
    color: ${({ theme }) => theme.colors.brand.white};
    border: 1px solid ${({ theme }) => theme.colors.brand.white};

    &:hover,
    &:focus,
    &:active {
      background-color: ${({ theme }) => theme.colors.brand.white};
      color: ${({ theme }) => theme.colors.brand.black};
    }
  `,
};

// Button sizes
const buttonSizes = {
  md: css`
    padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[5]};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    border-radius: 999rem;
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  `,

  lg: css`
    padding: ${({ theme }) => theme.spacing[1.5]} ${({ theme }) => theme.spacing[2]};
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
    border-radius: 8px;
    font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  `,
};

export const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  cursor: pointer;

  /* Variants */
  ${({ variant }) => buttonVariants[variant] || buttonVariants.primary}

  /* Sizes */
  ${({ size }) => buttonSizes[size] || buttonSizes.md}
`;

// Button component with default props
const Button = ({ children, variant, size }) => {
  return (
    <StyledButton variant={variant} size={size}>
      {children}
    </StyledButton>
  );
};

export default Button;
