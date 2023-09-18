import { Stack, TextField, Typography } from '@mui/material';

function ProductVariants({ productVariants, handleProductVariants }) {
  return (
    <Stack spacing={2}>
      <Typography variant="h6">Product Variants</Typography>
      <TextField
        color="info"
        size="small"
        //   label="Variants"
        variant="outlined"
        placeholder={`[\n\t{"name":"Big","price":10000,"stock":10},\n\t{"name":"Medium","price":8000,"stock":8}\n]`}
        fullWidth
        multiline
        rows={10}
        value={productVariants}
        onChange={handleProductVariants}
        InputProps={{
          style: {
            fontFamily: 'monospace',
            backgroundColor: '#f3f3f3',
            border: '1px solid #ccc',
          },
        }}
      />
    </Stack>
  );
}

export default ProductVariants;
