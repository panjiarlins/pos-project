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
import { asyncCreateCategory } from '../../../../states/categories/action';
import DetailsInput from './DetailsInput';

function CreateModal({
  isCreateModalOpen,
  setIsCreateModalOpen,
  handleOnReload,
}) {
  const dispatch = useDispatch();
  const [name, handleNameChange, setName] = useValueInput('');
  const [image, handleImageChange, setImage] = useSingleFileInput(null);

  const handleOnSave = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);
    dispatch(asyncCreateCategory(formData))
      .then(() => {
        handleOnReload();
        setIsCreateModalOpen(false);
        setName('');
        setImage(null);
      })
      .catch((error) => console.log(error));
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
        <Button color="error" variant="contained" onClick={handleOnSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateModal;
