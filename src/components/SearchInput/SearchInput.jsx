import { Label, VisuallyHidden } from 'radix-ui';

import React from 'react';

import Input from '../Input';

function SearchInput({ id, size, value, onChange }) {
  return (
    <>
      <VisuallyHidden.Root>
        <Label.Root htmlFor={id}>Search</Label.Root>
      </VisuallyHidden.Root>

      <Input
        id={id}
        size={size}
        type="text"
        value={value}
        placeholder={'Search'}
        onChange={onChange}
      />
    </>
  );
}

export default SearchInput;
