import * as Label from '@radix-ui/react-label';
import * as Tooltip from '@radix-ui/react-tooltip';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
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
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.brand.placeholder};
  }

  /* Focus states for accessibility */
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.brand.primary};
    outline-offset: 2px;
    border-color: ${({ theme }) => theme.colors.brand.primary};
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

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  'aria-describedby': ariaDescribedby,
  'aria-invalid': ariaInvalid,
  'aria-required': ariaRequired,
  showError = false,
  errorMessage = '',
  ...props
}) {
  return (
    <Box>
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
    </Box>
  );
}

export default Input;
