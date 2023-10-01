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
import { useSearchParams } from 'react-router-dom';
import { bool, func } from 'prop-types';
import {
  asyncCreateProduct,
  asyncReceiveProducts,
} from '../../../../states/products/action';
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
  const [searchParams] = useSearchParams();
  const [isActive, handleIsActiveChange, setIsActive] = useMuiNewValue(true);
  const [image, handleImageChange, setImage] = useSingleFileInput(null);
  const [imageURL, setImageURL] = useState('');
  const [name, handleNameChange, setName] = useValueInput('');
  const [variants, setVariants] = useState([]);
  const [description, handleDescriptionChange, setDescription] =
    useValueInput('');
  const [
    selectedCategories,
    handleSelectedCategoriesChange,
    setSelectedCategories,
  ] = useCheckBoxList([]);

  useEffect(
    // cleanup function
    () => () => {
      setIsActive(true);
      setImage(null);
      setName('');
      setVariants([]);
      setDescription('');
      setSelectedCategories([]);
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
        dispatch(
          asyncReceiveProducts({
            name: searchParams.get('name'),
            categoryId: searchParams.get('currCategoryId'),
            sortBy: searchParams.get('sortBy'),
            orderBy: searchParams.get('orderBy'),
            isPaginated: searchParams.get('isPaginated'),
            page: searchParams.get('page'),
            perPage: searchParams.get('perPage'),
          })
        );
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
      <DialogTitle>New Product</DialogTitle>
      <DialogContent>
        <Stack spacing={4}>
          <DetailsInput
            {...{
              imageURL,
              imageName: image?.name || '',
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

CreateModal.propTypes = {
  isCreateModalOpen: bool.isRequired,
  setIsCreateModalOpen: func.isRequired,
};

export default CreateModal;
