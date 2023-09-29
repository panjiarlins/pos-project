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

  const handleSave = () => {
    const formData = new FormData();
    if (image) formData.append('image', image);
    formData.append('name', name);
    dispatch(asyncCreateCategory(formData)).then((isSuccess) => {
      if (isSuccess) {
        dispatch(asyncReceiveCategories({ name: searchParams.get('name') }));
        setIsCreateModalOpen(false);
        setName('');
        setImage(null);
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

export default CreateModal;
