import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  useMuiNewValue,
  useSingleFileInput,
  useCheckBoxList,
  useValueInput,
} from '../../../../hooks';
import { asyncEditProduct } from '../../../../states/products/action';
import DetailsInput from './DetailsInput';
import CategoriesInput from './CategoriesInput';
import VariantsInput from './VariantsInput';

function EditModal({ productData, isEditModalOpen, setIsEditModalOpen }) {
  const dispatch = useDispatch();
  const [image, handleImageChange, setImage] = useSingleFileInput(null);
  const [status, handleStatusChange, setStatus] = useMuiNewValue(true);
  const [name, handleNameChange, setName] = useValueInput('');
  const [variants, setVariants] = useState([]);
  const [description, handleDescriptionChange, setDescription] =
    useValueInput('');
  const [categories, handleCategoriesChange, setCategories] = useCheckBoxList(
    []
  );

  useEffect(() => {
    setImage(null);
    setStatus(productData.isActive === undefined ? true : productData.isActive);
    setName(productData.name || '');
    setDescription(productData.description || '');
    setCategories(productData.Categories?.map(({ id }) => id) || []);
    setVariants(
      productData.Variants
        ? JSON.parse(JSON.stringify(productData.Variants))
        : []
    );
  }, [productData]);

  const handleSave = () => {
    const formData = new FormData();
    if (image) formData.append('image', image);
    formData.append('isActive', status);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('categoryId', JSON.stringify(categories));
    formData.append(
      'variants',
      JSON.stringify(
        variants.map(({ id, name: varName, price, stock }) => ({
          id,
          name: varName,
          price,
          stock,
        }))
      )
    );
    dispatch(asyncEditProduct({ productId: productData.id, formData })).then(
      (isSuccess) => {
        if (isSuccess) setIsEditModalOpen(false);
      }
    );
  };

  return (
    <Dialog
      fullWidth
      open={isEditModalOpen}
      onClose={() => setIsEditModalOpen(false)}
    >
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <Stack spacing={4}>
          <DetailsInput
            {...{
              handleImageChange,
              status,
              handleStatusChange,
              name,
              handleNameChange,
              description,
              handleDescriptionChange,
            }}
          />
          <CategoriesInput {...{ categories, handleCategoriesChange }} />
          <VariantsInput {...{ variants, setVariants }} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color="error" variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditModal;
