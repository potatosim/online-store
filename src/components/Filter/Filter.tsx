import { FormControl, InputLabel, OutlinedInput, Select } from '@mui/material';
import React, { FC } from 'react';
import ComponentWithChildren from 'types/ComponentWithChildren';

interface FilterProps extends ComponentWithChildren {
  label: string;
  value: string[];
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Filter: FC<FilterProps> = ({ value, children, label }) => {
  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel>{label}</InputLabel>
      <Select multiple value={value} input={<OutlinedInput label={label} />} MenuProps={MenuProps}>
        {children}
      </Select>
    </FormControl>
  );
};

export default Filter;
