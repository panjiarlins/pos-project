import {
  AddCircleRounded,
  DeleteRounded,
  ExpandMoreRounded,
} from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';

function ProductVariants({ productVariants, setProductVariants }) {
  const handleVariantOnAdd = () => {
    setProductVariants((prevState) => {
      const newState = [...prevState];
      newState.push({
        key: Math.random(),
        name: `Variant ${prevState.length + 1}`,
        price: 1,
        stock: 1,
      });
      return newState;
    });
  };

  const handleVariantOnChange = (index, field, value) => {
    setProductVariants((prevState) => {
      const newVariants = [...prevState];
      newVariants[index][field] = value;
      return newVariants;
    });
  };

  const handleVariantOnDelete = (index) => {
    setProductVariants((prevState) => {
      const newVariants = [...prevState];
      newVariants.splice(index, 1);
      return newVariants;
    });
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h6">Product Variants</Typography>
      <Box>
        {productVariants.map((variant, index) => (
          <Accordion key={variant.key}>
            <AccordionSummary expandIcon={<ExpandMoreRounded />}>
              <Typography>{variant.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack direction="column" spacing={2}>
                <TextField
                  required
                  color="info"
                  size="small"
                  label="Name"
                  variant="outlined"
                  fullWidth
                  value={variant.name}
                  onChange={({ target }) =>
                    handleVariantOnChange(index, 'name', target.value)
                  }
                />
                <TextField
                  required
                  type="number"
                  color="info"
                  size="small"
                  label="Price"
                  variant="outlined"
                  InputProps={{
                    inputProps: {
                      min: 0,
                      step: 1,
                    },
                    startAdornment: (
                      <InputAdornment position="start">Rp</InputAdornment>
                    ),
                  }}
                  fullWidth
                  value={variant.price}
                  onChange={({ target }) =>
                    handleVariantOnChange(index, 'price', +target.value)
                  }
                />
                <TextField
                  required
                  type="number"
                  color="info"
                  size="small"
                  label="Stock"
                  variant="outlined"
                  InputProps={{
                    inputProps: {
                      min: 0,
                      step: 1,
                    },
                    startAdornment: (
                      <InputAdornment position="start">📦</InputAdornment>
                    ),
                  }}
                  fullWidth
                  value={variant.stock}
                  onChange={({ target }) =>
                    handleVariantOnChange(index, 'stock', +target.value)
                  }
                />
                <Box display="flex" justifyContent="center">
                  <Tooltip title="Delete variant" placement="right" arrow>
                    <IconButton
                      color="error"
                      size="large"
                      onClick={() => handleVariantOnDelete(index)}
                    >
                      <DeleteRounded />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
      <Box display="flex" justifyContent="center">
        <Tooltip title="Add variant" arrow>
          <IconButton color="error" size="large" onClick={handleVariantOnAdd}>
            <AddCircleRounded color="error" fontSize="large" />
          </IconButton>
        </Tooltip>
      </Box>
    </Stack>
  );
}

export default ProductVariants;
