import { Box, MenuItem, TextField } from '@mui/material';

function SelectSortBy({ sortBy, handleSortByChange }) {
  return (
    <Box>
      <TextField
        label="Sort by"
        size="small"
        value={sortBy}
        onChange={handleSortByChange}
        select
        fullWidth
      >
        <MenuItem value="id">ID</MenuItem>
        <MenuItem value="name">Name</MenuItem>
        <MenuItem value="price">Price</MenuItem>
        <MenuItem value="isActive">Status</MenuItem>
        <MenuItem value="description">Description</MenuItem>
        <MenuItem value="createdAt">Created at</MenuItem>
        <MenuItem value="updatedAt">Updated at</MenuItem>
      </TextField>
    </Box>
  );
}

export default SelectSortBy;
