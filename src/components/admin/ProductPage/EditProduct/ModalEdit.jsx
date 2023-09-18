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
import InputDetails from './InputDetails';
import InputCategories from './InputCategories';
import InputVariants from './InputVariants';

function ModalEdit({
  productData,
  isModalEditOpen,
  setIsModalEditOpen,
  handleOnReload,
}) {
  const dispatch = useDispatch();
  const [productId, setProductId] = useState();
  const [image, handleImage, setImage] = useSingleFileInput(null);
  const [status, handleStatus, setStatus] = useMuiNewValue(true);
  const [name, handleName, setName] = useValueInput('');
  const [description, handleDescription, setDescription] = useValueInput('');
  const [categories, handleCategories, setCategories] = useCheckBoxList([]);
  const [variants, handleVariants, setVariants] = useValueInput('[]');

  useEffect(() => {
    setProductId(productData.id);
    setImage(null);
    setStatus(productData.isActive || true);
    setName(productData.name || '');
    setDescription(productData.description || '');
    setCategories(productData.Categories?.map(({ id }) => id) || []);
    setVariants(JSON.stringify(productData.Variants) || '[]');
  }, [productData]);

  const handleOnSave = () => {
    const formData = new FormData();
    if (image) formData.append('image', image);
    formData.append('isActive', status);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('categoryId', JSON.stringify(categories));
    formData.append('variants', variants);
    dispatch(asyncEditProduct(productId, formData)).then(() => {
      handleOnReload();
      setIsModalEditOpen(false);
      setStatus(true);
      setImage(null);
      setName('');
      setDescription('');
      setCategories([]);
      setVariants([]);
    });
  };

  return (
    <Dialog
      fullWidth
      open={isModalEditOpen}
      onClose={() => setIsModalEditOpen(false)}
    >
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <Stack spacing={4}>
          <InputDetails
            {...{
              handleImage,
              status,
              handleStatus,
              name,
              handleName,
              description,
              handleDescription,
            }}
          />
          <InputCategories {...{ categories, handleCategories }} />
          <InputVariants {...{ variants, handleVariants }} />
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

export default ModalEdit;
