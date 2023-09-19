import { TextField } from '@mui/material';
import { useEffect } from 'react';

function SearchInput({ searchParams, updateQueryParams, handleOnReload }) {
  useEffect(() => {
    // Create a debounce timer
    const timerId = setTimeout(() => {
      handleOnReload();
    }, 300); // Adjust the delay as needed

    // Clear the previous timer on each input change
    return () => {
      clearTimeout(timerId);
    };
  }, [searchParams.get('name')]);

  return (
    <TextField
      color="info"
      size="small"
      label="Search Products 🔍"
      variant="outlined"
      value={searchParams.get('name') || ''}
      onChange={({ target }) => updateQueryParams({ name: target.value })}
      onKeyUp={({ key }) => key === 'Enter' && handleOnReload()}
      sx={{ width: { md: '50%' } }}
    />
  );
}

export default SearchInput;
