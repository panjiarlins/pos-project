import { SearchRounded } from '@mui/icons-material';
import { IconButton, TextField, Tooltip } from '@mui/material';

function ProductSearchInput({
  searchName,
  handleSearchNameChange,
  handleOnReload,
}) {
  return (
    <TextField
      color="info"
      size="small"
      label="Search Products"
      variant="outlined"
      value={searchName}
      onChange={handleSearchNameChange}
      sx={{ width: { md: '50%' } }}
      InputProps={{
        endAdornment: (
          <Tooltip title="Search products" arrow>
            <IconButton onClick={handleOnReload}>
              <SearchRounded />
            </IconButton>
          </Tooltip>
        ),
      }}
    />
  );
}

export default ProductSearchInput;
