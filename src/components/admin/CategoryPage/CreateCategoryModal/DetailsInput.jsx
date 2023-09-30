import { Avatar, Stack, TextField, Typography } from '@mui/material';

function DetailsInput({
  imageURL,
  image,
  handleImageChange,
  name,
  handleNameChange,
}) {
  return (
    <Stack spacing={2}>
      <Typography variant="h6">Category Details</Typography>
      <Stack spacing={3}>
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
          <Typography>Category image</Typography>
          <Avatar
            component="label"
            htmlFor="image_create-category"
            src={imageURL}
            alt={image?.name || name}
            variant="square"
            sx={{
              width: '10rem',
              height: '10rem',
              cursor: 'pointer',
              '&:hover': { opacity: 0.8 },
            }}
          />
          <input
            id="image_create-category"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            hidden
          />
        </Stack>
      </Stack>
    </Stack>
  );
}

export default DetailsInput;
