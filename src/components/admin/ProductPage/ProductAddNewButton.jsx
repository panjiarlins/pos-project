import { AddCircleRounded } from '@mui/icons-material';
import { Button, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import ProductModalAddNew from './AddNewProduct/ProductModalAddNew';

function ProductAddNewButton() {
  const [isAddNewProductOpen, setIsAddNewProductOpen] = useState(false);

  return (
    <>
      <Tooltip title="Add new product" arrow>
        <Button
          color="error"
          size="small"
          variant="contained"
          startIcon={<AddCircleRounded />}
          onClick={() => setIsAddNewProductOpen(true)}
        >
          Product
        </Button>
      </Tooltip>
      <ProductModalAddNew
        isAddNewProductOpen={isAddNewProductOpen}
        setIsAddNewProductOpen={setIsAddNewProductOpen}
      />
    </>
  );
}

export default ProductAddNewButton;
