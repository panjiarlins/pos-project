import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
import { useSingleFileInput, useValueInput } from '../../../../hooks';
import DetailsInput from './DetailsInput';
import { asyncEditCategory } from '../../../../states/categories/action';

function EditModal({
  categoryData,
  isEditModalOpen,
  setIsEditModalOpen,
  handleOnReload,
}) {
  const dispatch = useDispatch();
  const [categoryId, setCategoryId] = useState();
  const [name, handleNameChange, setName] = useValueInput('');
  const [image, handleImageChange, setImage] = useSingleFileInput(null);

  useEffect(() => {
    setCategoryId(categoryData.id);
    setName(categoryData.name || '');
    setImage(null);
  }, [categoryData]);

  const handleOnSave = () => {
    const formData = new FormData();
    formData.append('name', name);
    if (image) formData.append('image', image);
    dispatch(asyncEditCategory(categoryId, formData))
      .then(() => {
        handleOnReload();
        setIsEditModalOpen(false);
        setName('');
        setImage(null);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Dialog
      fullWidth
      open={isEditModalOpen}
      onClose={() => setIsEditModalOpen(false)}
    >
      <DialogTitle>Edit Category</DialogTitle>
      <DialogContent>
        <Stack spacing={4}>
          <DetailsInput
            {...{
              handleImageChange,
              name,
              handleNameChange,
            }}
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

export default EditModal;
