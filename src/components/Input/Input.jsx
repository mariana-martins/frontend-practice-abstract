import * as Label from '@radix-ui/react-label';
import * as Tooltip from '@radix-ui/react-tooltip';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { ArrowRight } from 'feather-icons-react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import React from 'react';

const Container = styled.div`
  position: relative;
`;

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
    &:focus-visible,
    &:active,
    &:hover {
      outline: 2px solid ${({ theme }) => theme.colors.brand.primary};
      outline-offset: 2px;
      border-color: ${({ theme }) => theme.colors.brand.primary};
    }
  `,
  xl: css`
    padding: ${({ theme }) => theme.spacing[4]};
    border-radius: 4px;
    border-color: ${({ theme }) => theme.colors.brand.black};
    box-shadow: 0 9px 14px 0 rgba(0, 0, 0, 0.1);

    &:focus,
    &:focus-visible,
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
    outline-color: ${({ theme }) => theme.colors.brand.error};
    border-color: ${({ theme }) => theme.colors.brand.error};
  }

  &[aria-invalid='true']:focus {
    outline-color: ${({ theme }) => theme.colors.brand.error};
    border-color: ${({ theme }) => theme.colors.brand.error};
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

const InputIcon = styled(ArrowRight)`
  position: absolute;
  color: ${({ theme }) => theme.colors.brand.black};
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  transition: color 0.2s ease;
  pointer-events: none;

  /* Icon hover styles when input is hovered */
  ${StyledInput}:hover ~ & {
    color: ${({ theme }) => theme.colors.brand.primary};
  }

  ${StyledInput}:focus ~ & {
    color: ${({ theme }) => theme.colors.brand.primary};
  }

  ${StyledInput}[aria-invalid='true']:focus ~ & {
    color: ${({ theme }) => theme.colors.brand.error};
  }
`;

function Input({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  size,
  required,
  showIcon,
  'aria-describedby': ariaDescribedby,
  'aria-invalid': ariaInvalid,
  'aria-required': ariaRequired,
  showError,
  errorMessage,
  ...props
}) {
  return (
    <Container>
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
              <StyledTooltipContent side="top" align="center" role="alert" aria-live="polite">
                {errorMessage}
                <StyledTooltipArrow />
              </StyledTooltipContent>
            </Tooltip.Portal>
          )}
        </Tooltip.Root>
      </Tooltip.Provider>
      {showIcon && <InputIcon size={28} aria-hidden="true" role="presentation" />}
    </Container>
  );
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['lg', 'xl']),
  required: PropTypes.bool,
  showIcon: PropTypes.bool,
  'aria-describedby': PropTypes.string,
  'aria-invalid': PropTypes.bool,
  'aria-required': PropTypes.bool,
  showError: PropTypes.bool,
  errorMessage: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
  placeholder: undefined,
  size: 'lg',
  required: false,
  showIcon: false,
  'aria-describedby': undefined,
  'aria-invalid': false,
  'aria-required': false,
  showError: false,
  errorMessage: '',
};

export default Input;
