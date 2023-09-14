import { AddCircleRounded } from '@mui/icons-material';
import { Button, Tooltip } from '@mui/material';
import React from 'react';

function ProductAddNewButton() {
  return (
    <Tooltip title="Add new product" arrow>
      <Button
        color="error"
        size="small"
        variant="contained"
        startIcon={<AddCircleRounded />}
      >
        Product
      </Button>
    </Tooltip>
  );
}

export default ProductAddNewButton;
