import { SearchRounded } from '@mui/icons-material';
import { IconButton, TextField, Tooltip } from '@mui/material';

function SearchInput({ searchParams, setSearchParams, handleOnReload }) {
  return (
    <TextField
      color="info"
      size="small"
      label="Search Products"
      variant="outlined"
      value={searchParams.get('name') || ''}
      onChange={({ target }) => setSearchParams({ name: target.value })}
      onKeyUp={({ key }) => key === 'Enter' && handleOnReload()}
      sx={{ width: { md: '50%' } }}
      InputProps={{
        endAdornment: (
          <Tooltip title="Search categories" arrow>
            <IconButton onClick={handleOnReload}>
              <SearchRounded />
            </IconButton>
          </Tooltip>
        ),
      }}
    />
  );
}

export default SearchInput;
