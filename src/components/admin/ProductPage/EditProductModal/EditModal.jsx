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
  const [imageURL, setImageURL] = useState('');
  const [isActive, handleIsActiveChange, setIsActive] = useMuiNewValue(true);
  const [name, handleNameChange, setName] = useValueInput('');
  const [variants, setVariants] = useState([]);
  const [description, handleDescriptionChange, setDescription] =
    useValueInput('');
  const [
    selectedCategories,
    handleSelectedCategoriesChange,
    setSelectedCategories,
  ] = useCheckBoxList([]);

  useEffect(() => {
    if (image && imageURL) URL.revokeObjectURL(imageURL);
    setImageURL(
      productData.id
        ? `${import.meta.env.VITE_API_URL}/products/image/${productData.id}`
        : ''
    );
    setImage(null);
    setIsActive(
      productData.isActive === undefined ? true : productData.isActive
    );
    setName(productData.name || '');
    setDescription(productData.description || '');
    setSelectedCategories(productData.Categories?.map(({ id }) => id) || []);
    setVariants(
      productData.Variants
        ? JSON.parse(JSON.stringify(productData.Variants))
        : []
    );
  }, [productData, isEditModalOpen]);

  useEffect(() => {
    if (image) {
      if (imageURL) {
        // Release the object URL when it's no longer needed to free up resources
        URL.revokeObjectURL(imageURL);
      }
      setImageURL(URL.createObjectURL(image));
    }
  }, [image]);

  const handleSave = () => {
    const formData = new FormData();
    if (image) formData.append('image', image);
    if (isActive !== productData.isActive)
      formData.append('isActive', isActive);
    if (name !== productData.name) formData.append('name', name);
    if (description !== productData.description)
      formData.append('description', description);
    formData.append('categoryId', JSON.stringify(selectedCategories));
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
        if (isSuccess) {
          setIsEditModalOpen(false);
          if (image && imageURL) URL.revokeObjectURL(imageURL);
        }
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
              imageURL,
              image,
              handleImageChange,
              isActive,
              handleIsActiveChange,
              name,
              handleNameChange,
              description,
              handleDescriptionChange,
            }}
          />
          <CategoriesInput
            {...{ selectedCategories, handleSelectedCategoriesChange }}
          />
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
