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
import { asyncCreateProduct } from '../../../../states/products/action';
import {
  useMuiNewValue,
  useSingleFileInput,
  useCheckBoxList,
  useValueInput,
} from '../../../../hooks';
import DetailsInput from './DetailsInput';
import CategoriesInput from './CategoriesInput';
import VariantsInput from './VariantsInput';

function CreateModal({ isCreateModalOpen, setIsCreateModalOpen }) {
  const dispatch = useDispatch();
  const [isActive, handleIsActiveChange, setIsActive] = useMuiNewValue(true);
  const [image, handleImageChange, setImage] = useSingleFileInput(null);
  const [name, handleNameChange, setName] = useValueInput('');
  const [variants, setVariants] = useState([]);
  const [description, handleDescriptionChange, setDescription] =
    useValueInput('');
  const [
    selectedCategories,
    handleSelectedCategoriesChange,
    setSelectedCategories,
  ] = useCheckBoxList([]);

  const handleOnSave = () => {
    const formData = new FormData();
    if (image) formData.append('image', image);
    formData.append('isActive', isActive);
    formData.append('name', name);
    formData.append('description', description);
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
        setIsCreateModalOpen(false);
        setIsActive(true);
        setImage(null);
        setName('');
        setDescription('');
        setSelectedCategories([]);
        setVariants([]);
      }
    });
  };

  return (
    <Dialog
      fullWidth
      open={isCreateModalOpen}
      onClose={() => setIsCreateModalOpen(false)}
    >
      <DialogTitle>New Product</DialogTitle>
      <DialogContent>
        <Stack spacing={4}>
          <DetailsInput
            {...{
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
        <Button color="error" variant="contained" onClick={handleOnSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateModal;
