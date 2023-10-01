import { useDispatch } from 'react-redux';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { bool, func } from 'prop-types';
import { useSingleFileInput, useValueInput } from '../../../../hooks';
import {
  asyncCreateCategory,
  asyncReceiveCategories,
} from '../../../../states/categories/action';
import DetailsInput from './DetailsInput';

function CreateModal({ isCreateModalOpen, setIsCreateModalOpen }) {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [name, handleNameChange, setName] = useValueInput('');
  const [image, handleImageChange, setImage] = useSingleFileInput(null);
  const [imageURL, setImageURL] = useState('');

  useEffect(
    () => () => {
      setImage(null);
      setName('');
    },
    [isCreateModalOpen]
  );

  useEffect(() => {
    if (imageURL) URL.revokeObjectURL(imageURL);
    setImageURL(image ? URL.createObjectURL(image) : '');
  }, [image]);

  const handleSave = () => {
    const formData = new FormData();
    if (image) formData.append('image', image);
    formData.append('name', name);
    dispatch(asyncCreateCategory(formData)).then((isSuccess) => {
      if (isSuccess) {
        dispatch(asyncReceiveCategories({ name: searchParams.get('name') }));
        setIsCreateModalOpen(false);
      }
    });
  };

  return (
    <Dialog
      fullWidth
      open={isCreateModalOpen}
      onClose={() => setIsCreateModalOpen(false)}
    >
      <DialogTitle>New Category</DialogTitle>
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

CreateModal.propTypes = {
  isCreateModalOpen: bool.isRequired,
  setIsCreateModalOpen: func.isRequired,
};

export default CreateModal;
