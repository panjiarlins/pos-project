import { TextField } from '@mui/material';
import { useEffect } from 'react';

function ProductSearchInput({
  searchParams,
  updateQueryParams,
  handleOnReload,
}) {
  useEffect(() => {
    // debounce
    const timerId = setTimeout(handleOnReload, 300);
    return () => clearTimeout(timerId);
  }, [searchParams.get('name')]);

  return (
    <TextField
      color="info"
      size="small"
      label="Search Products 🔍"
      variant="outlined"
      value={searchParams.get('name') || ''}
      onChange={({ target }) => updateQueryParams({ name: target.value })}
      sx={{ width: { md: '50%' } }}
      // InputProps={{
      //   endAdornment: (
      //     <Tooltip title="Search products" arrow>
      //       <IconButton onClick={handleOnReload}>
      //         <SearchRounded />
      //       </IconButton>
      //     </Tooltip>
      //   ),
      // }}
    />
  );
}

export default ProductSearchInput;
