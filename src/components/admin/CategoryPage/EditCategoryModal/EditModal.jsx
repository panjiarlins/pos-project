import { useEffect } from 'react';
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

function EditModal({ categoryData, isEditModalOpen, setIsEditModalOpen }) {
  const dispatch = useDispatch();
  const [name, handleNameChange, setName] = useValueInput('');
  const [image, handleImageChange, setImage] = useSingleFileInput(null);

  useEffect(() => {
    setName(categoryData.name || '');
    setImage(null);
  }, [categoryData]);

  const handleSave = () => {
    const formData = new FormData();
    if (image) formData.append('image', image);
    formData.append('name', name);
    dispatch(asyncEditCategory({ categoryId: categoryData.id, formData })).then(
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
        <Button color="error" variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditModal;
