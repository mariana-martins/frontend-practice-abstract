import { Label, VisuallyHidden } from 'radix-ui';
import React from 'react';

import Input from '../Input';

function SearchInput({ size, value, onChange }) {
  return (
    <>
      <VisuallyHidden.Root>
        <Label.Root className="LabelRoot" htmlFor="SearchInput">
          Search
        </Label.Root>
      </VisuallyHidden.Root>

      <Input
        size={size}
        type="text"
        id="SearchInput"
        value={value}
        placeholder={'Search'}
        onChange={onChange}
      />
    </>
  );
}

export default SearchInput;
