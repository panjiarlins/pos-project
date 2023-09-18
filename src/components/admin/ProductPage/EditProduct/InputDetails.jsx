import { Stack, Switch, TextField, Typography } from '@mui/material';

function InputDetails({
  handleImage,
  status,
  handleStatus,
  name,
  handleName,
  description,
  handleDescription,
}) {
  return (
    <Stack spacing={2}>
      <Typography variant="h6">Product Details</Typography>
      <Stack spacing={1.5}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography>Product status</Typography>
          <Switch
            checked={status}
            onChange={handleStatus}
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
          <label htmlFor="new-product-image" className="cursor-pointer">
            <Typography>Product image</Typography>
          </label>
          <input
            className="cursor-pointer"
            id="new-product-image"
            type="file"
            accept="image/*"
            onChange={handleImage}
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
          onChange={handleName}
        />
        <TextField
          required
          color="info"
          size="small"
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={10}
          value={description}
          onChange={handleDescription}
        />
      </Stack>
    </Stack>
  );
}

export default InputDetails;
