import { AddCircleRounded } from '@mui/icons-material';
import { Button, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import ProductModalAddNew from './AddProduct/ProductModalAddNew';

function ProductAddNewButton({ handleOnReload }) {
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
        {...{
          isAddNewProductOpen,
          setIsAddNewProductOpen,
          handleOnReload,
        }}
      />
    </>
  );
}

export default ProductAddNewButton;
