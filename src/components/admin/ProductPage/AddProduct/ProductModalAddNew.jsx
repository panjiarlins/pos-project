import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import ProductDetailsForm from './ProductDetailsForm';
import ProductCategoryCheckBox from './ProductCategoryCheckBox';
import { asyncCreateProduct } from '../../../../states/products/action';
import {
  useMuiNewValue,
  useSingleFileInput,
  useCheckBoxList,
  useValueInput,
} from '../../../../hooks';
import ProductVariants from './ProductVariants';

function ProductModalAddNew({ isAddNewProductOpen, setIsAddNewProductOpen }) {
  const dispatch = useDispatch();
  const [isProductActive, handleIsProductActive, setIsProductActive] =
    useMuiNewValue(true);
  const [productImage, handleProductImage, setProductImage] =
    useSingleFileInput(null);
  const [productName, handleProductName, setProductName] = useValueInput('');
  const [productDescription, handleProductDescription, setProductDescription] =
    useValueInput('');
  const [selectedCategories, handleSelectedCategories, setSelectedCategories] =
    useCheckBoxList([]);
  const [variants, setVariants] = useState([]);

  const handleOnSave = () => {
    const formData = new FormData();
    if (productImage) formData.append('image', productImage);
    formData.append('isActive', isProductActive);
    formData.append('name', productName);
    formData.append('description', productDescription);
    formData.append('categoryId', JSON.stringify(selectedCategories));
    formData.append(
      'variants',
      JSON.stringify(
        variants.map((variant) => ({
          name: variant.name,
          price: variant.price,
          stock: variant.stock,
        }))
      )
    );
    dispatch(asyncCreateProduct(formData)).then((isSuccess) => {
      if (isSuccess) {
        setIsAddNewProductOpen(false);
        setIsProductActive(true);
        setProductImage(null);
        setProductName('');
        setProductDescription('');
        setSelectedCategories([]);
        setVariants([]);
      }
    });
  };

  return (
    <Dialog
      fullWidth
      open={isAddNewProductOpen}
      onClose={() => setIsAddNewProductOpen(false)}
    >
      <DialogTitle>New Product</DialogTitle>
      <DialogContent>
        <Stack spacing={4}>
          <ProductDetailsForm
            {...{
              handleProductImage,
              isProductActive,
              handleIsProductActive,
              productName,
              handleProductName,
              productDescription,
              handleProductDescription,
            }}
          />
          <ProductCategoryCheckBox
            {...{ selectedCategories, handleSelectedCategories }}
          />
          <ProductVariants {...{ variants, setVariants }} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color="error" variant="contained" onClick={handleOnSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default ProductModalAddNew;
