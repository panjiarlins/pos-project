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
import { bool, func, number, shape, string } from 'prop-types';
import { useSingleFileInput, useValueInput } from '../../../../hooks';
import DetailsInput from './DetailsInput';
import { asyncEditCategory } from '../../../../states/categories/action';

function EditModal({ categoryData, isEditModalOpen, setIsEditModalOpen }) {
  const dispatch = useDispatch();
  const [name, handleNameChange, setName] = useValueInput('');
  const [image, handleImageChange, setImage] = useSingleFileInput(null);
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    if (image && imageURL) URL.revokeObjectURL(imageURL);
    setImageURL(
      categoryData.id
        ? `${import.meta.env.VITE_API_URL}/categories/image/${categoryData.id}`
        : ''
    );
    setImage(null);
    setName(categoryData.name || '');
  }, [categoryData, isEditModalOpen]);

  useEffect(() => {
    if (image) {
      if (imageURL) URL.revokeObjectURL(imageURL);
      setImageURL(URL.createObjectURL(image));
    }
  }, [image]);

  const handleSave = () => {
    const formData = new FormData();
    if (image) formData.append('image', image);
    if (name !== categoryData.name) formData.append('name', name);
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
              imageURL,
              imageName: image?.name || '',
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

EditModal.propTypes = {
  categoryData: shape({
    id: number,
    name: string,
  }).isRequired,
  isEditModalOpen: bool.isRequired,
  setIsEditModalOpen: func.isRequired,
};

export default EditModal;
