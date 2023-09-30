import { Avatar, Stack, Switch, TextField, Typography } from '@mui/material';

function DetailsInput({
  imageURL,
  image,
  handleImageChange,
  isActive,
  handleIsActiveChange,
  name,
  handleNameChange,
  description,
  handleDescriptionChange,
}) {
  return (
    <Stack spacing={2}>
      <Typography variant="h6">Product Details</Typography>
      <Stack spacing={3}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography>Product status</Typography>
          <Switch
            checked={isActive}
            onChange={handleIsActiveChange}
            sx={{
              '& .MuiSwitch-switchBase.Mui-checked': {
                color: 'success.light',
              },
              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                backgroundColor: 'success.light',
              },
            }}
          />
        </Stack>
        <Stack spacing={0.5}>
          <Typography>Product image</Typography>
          <Avatar
            component="label"
            htmlFor="image_create-product"
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
            id="image_create-product"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            hidden
          />
        </Stack>
        <TextField
          required
          color="info"
          size="small"
          label="Product name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={handleNameChange}
        />
        <TextField
          required
          color="info"
          size="small"
          label="Product Description"
          variant="outlined"
          fullWidth
          multiline
          rows={10}
          value={description}
          onChange={handleDescriptionChange}
        />
      </Stack>
    </Stack>
  );
}

export default DetailsInput;
