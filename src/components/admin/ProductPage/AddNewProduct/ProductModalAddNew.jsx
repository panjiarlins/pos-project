import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import ProductDetailsForm from './ProductDetailsForm';
import ProductCategoryCheckBox from './ProductCategoryCheckBox';
import {
  asyncCreateProduct,
  asyncReceiveProducts,
} from '../../../../states/products/action';
import {
  useMuiNewValue,
  useSingleFileInput,
  useToggleList,
  useValueInput,
} from '../../../../hooks';

function ProductModalAddNew({
  currCategoryTab,
  isAddNewProductOpen,
  setIsAddNewProductOpen,
}) {
  const dispatch = useDispatch();
  const [isProductActive, handleIsProductActive] = useMuiNewValue(true);
  const [productImage, handleProductImage] = useSingleFileInput();
  const [productName, handleProductName] = useValueInput();
  const [productDescription, handleProductDescription] = useValueInput();
  const [selectedCategories, handleSelectedCategories] = useToggleList([]);
  // const [productPrice, handleProductPrice] = useValueInput();

  const handleOnSave = () => {
    const formData = new FormData();
    formData.append('isActive', isProductActive);
    formData.append('image', productImage);
    formData.append('name', productName);
    formData.append('description', productDescription);
    formData.append('categoryId', JSON.stringify(selectedCategories));

    dispatch(asyncCreateProduct(formData));
    dispatch(asyncReceiveProducts({ categoryId: currCategoryTab }));

    setIsAddNewProductOpen(false);
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
