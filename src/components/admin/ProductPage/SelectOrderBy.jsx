import React from 'react';
import { Box, MenuItem, TextField } from '@mui/material';

function SelectOrderBy({ searchParams, updateQueryParams }) {
  return (
    <Box>
      <TextField
        label="Order by"
        size="small"
        value={searchParams.get('orderBy') || 'DESC'}
        onChange={({ target }) => updateQueryParams({ orderBy: target.value })}
        select
        fullWidth
      >
        <MenuItem value="ASC">ASC</MenuItem>
        <MenuItem value="DESC">DESC</MenuItem>
      </TextField>
    </Box>
  );
}

export default SelectOrderBy;
