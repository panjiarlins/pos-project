import { Stack, TextField, Typography } from '@mui/material';

function DetailsInput({ handleImageChange, name, handleNameChange }) {
  return (
    <Stack spacing={2}>
      <Typography variant="h6">Category Details</Typography>
      <Stack spacing={1.5}>
        <TextField
          required
          color="info"
          size="small"
          label="Category name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={handleNameChange}
        />
        <Stack spacing={0.5}>
          <label htmlFor="new-category-image" className="cursor-pointer">
            <Typography>Category image</Typography>
          </label>
          <input
            className="cursor-pointer"
            id="new-category-image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}

export default DetailsInput;
