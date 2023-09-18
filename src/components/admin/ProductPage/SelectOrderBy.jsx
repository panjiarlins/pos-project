import React from 'react';
import { Box, MenuItem, TextField } from '@mui/material';

function SelectOrderBy({ orderBy, handleOrderByChange }) {
  return (
    <Box>
      <TextField
        label="Order by"
        size="small"
        value={orderBy}
        onChange={handleOrderByChange}
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
