import { DeleteRounded, EditNoteRounded } from '@mui/icons-material';
import {
  Avatar,
  IconButton,
  Stack,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditModal from './EditCategoryModal/EditModal';
import { asyncDeleteCategory } from '../../../states/categories/action';

function ItemTable({ handleOnReload }) {
  const dispatch = useDispatch();
  const categories = useSelector((states) => states.categories);
  const [categoryData, setCategoryData] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleOnEditButton = (category) => {
    setCategoryData(category);
    setIsEditModalOpen(true);
  };

  const handleOnDelete = (categoryId) => {
    dispatch(asyncDeleteCategory(categoryId))
      .then(handleOnReload)
      .catch((error) => console.log(error));
  };

  return (
    <>
      <TableBody>
        {!categories.length && (
          <TableRow>
            <TableCell colSpan={6}>
              <Typography variant="body2" align="center">
                no data available
              </Typography>
            </TableCell>
          </TableRow>
        )}
        {categories.map((category) => (
          <TableRow key={category.id}>
            <TableCell>{category.id}</TableCell>
            <TableCell>
              <Avatar
                variant="square"
                alt={category.name}
                src={`${import.meta.env.VITE_API_URL}/categories/image/${
                  category.id
                }`}
              />
            </TableCell>
            <TableCell>{category.name}</TableCell>
            <TableCell>{category.Products.length} Pcs</TableCell>
            <TableCell>
              <Stack direction="row">
                <Tooltip title="Edit category" arrow>
                  <IconButton
                    onClick={() => handleOnEditButton(category)}
                    sx={{ '&:hover': { color: 'info.main' } }}
                  >
                    <EditNoteRounded />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete category" arrow>
                  <IconButton
                    value="categoryId"
                    onClick={() => handleOnDelete(category.id)}
                    sx={{ '&:hover': { color: 'error.main' } }}
                  >
                    <DeleteRounded />
                  </IconButton>
                </Tooltip>
              </Stack>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <EditModal
        {...{
          categoryData,
          isEditModalOpen,
          setIsEditModalOpen,
          handleOnReload,
        }}
      />
    </>
  );
}

export default ItemTable;
