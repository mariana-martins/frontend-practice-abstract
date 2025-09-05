import * as Label from '@radix-ui/react-label';
import * as Tooltip from '@radix-ui/react-tooltip';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import styled, { css } from 'styled-components';

import React from 'react';

const inputSizes = {
  lg: css`
    padding: ${({ theme }) => theme.spacing[2.5]} ${({ theme }) => theme.spacing[5]};
    border-radius: 8px;
    border-color: ${({ theme }) => theme.colors.brand.border};
    font-weight: ${({ theme }) => theme.typography.fontWeight.base};
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease;

    &:focus,
    &:active,
    &:hover {
      outline: 2px solid ${({ theme }) => theme.colors.brand.primary};
      outline-offset: 2px;
      border-color: ${({ theme }) => theme.colors.brand.primary};
    }
  `,
  xl: css`
    max-width: 720px;
    padding: ${({ theme }) => theme.spacing[4]};
    border-radius: 4px;
    border-color: ${({ theme }) => theme.colors.brand.black};

    &:focus,
    &:active,
    &:hover {
      border-color: ${({ theme }) => theme.colors.brand.primary};
      outline: 1px solid ${({ theme }) => theme.colors.brand.primary};
    }
  `,
};

export const StyledInput = styled.input`
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.base};
  border: 1px solid;
  width: 100%;

  &::placeholder {
    color: ${({ theme }) => theme.colors.brand.placeholder};
  }

  /* Error state */
  &[aria-invalid='true'] {
    border-color: ${({ theme }) => theme.colors.brand.error};
  }

  &[aria-invalid='true']:focus {
    outline-color: ${({ theme }) => theme.colors.brand.error};
  }

  /* Sizes */
  ${({ $size }) => inputSizes[$size] || inputSizes.lg}
`;

const StyledTooltipContent = styled(Tooltip.Content)`
  background-color: ${({ theme }) => theme.colors.brand.error};
  color: white;
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  border-radius: 4px;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 50;
`;

const StyledTooltipArrow = styled(Tooltip.Arrow)`
  fill: ${({ theme }) => theme.colors.brand.error};
`;

function Input({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  size = 'lg',
  required = false,
  showIcon = false,
  'aria-describedby': ariaDescribedby,
  'aria-invalid': ariaInvalid,
  'aria-required': ariaRequired,
  showError = false,
  errorMessage = '',
  ...props
}) {
  return (
    <>
      <VisuallyHidden.Root>
        <Label.Root htmlFor={id}>{label}</Label.Root>
      </VisuallyHidden.Root>
      <Tooltip.Provider>
        <Tooltip.Root open={showError}>
          <Tooltip.Trigger asChild>
            <StyledInput
              id={id}
              type={type}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              $size={size}
              required={required}
              aria-label={label}
              aria-describedby={ariaDescribedby}
              aria-invalid={ariaInvalid}
              aria-required={ariaRequired}
              {...props}
            />
          </Tooltip.Trigger>
          {showError && (
            <Tooltip.Portal>
              <StyledTooltipContent side="top" align="center">
                {errorMessage}
                <StyledTooltipArrow />
              </StyledTooltipContent>
            </Tooltip.Portal>
          )}
        </Tooltip.Root>
      </Tooltip.Provider>
    </>
  );
}

export default Input;
