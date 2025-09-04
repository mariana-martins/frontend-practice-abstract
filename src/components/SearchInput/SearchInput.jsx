import React from 'react';

import Input from '../Input';

function SearchInput({
  id,
  label,
  size,
  value,
  onChange,
  type = 'text',
  placeholder = 'Search',
  required = false,
  showError = false,
  errorMessage = '',
  'aria-describedby': ariaDescribedby = 'search-help',
  'aria-invalid': ariaInvalid = false,
  'aria-required': ariaRequired = false,
  ...props
}) {
  return (
    <Input
      id={id}
      label={label || 'Search'}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder || 'Search'}
      $size={size}
      required={required}
      showError={showError}
      errorMessage={errorMessage}
      aria-label={label || 'Search'}
      aria-describedby={ariaDescribedby}
      aria-invalid={ariaInvalid}
      aria-required={ariaRequired}
      {...props}
    />
  );
}

export default SearchInput;
