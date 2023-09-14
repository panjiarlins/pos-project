import { SearchRounded } from '@mui/icons-material';
import { IconButton, TextField, Tooltip } from '@mui/material';

function ProductSearchInput() {
  return (
    <TextField
      color="info"
      size="small"
      label="Search Products"
      variant="outlined"
      // value={searchTerm}
      // onChange={(e) => setSearchTerm(e.target.value)}
      sx={{ width: { md: '50%' } }}
      InputProps={{
        endAdornment: (
          <Tooltip title="Search products" arrow>
            <IconButton
            // onClick={handleSearch}
            >
              <SearchRounded />
            </IconButton>
          </Tooltip>
        ),
      }}
    />
  );
}

export default ProductSearchInput;
