import { DeleteRounded, EditNoteRounded } from '@mui/icons-material';
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Switch,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import {
  asyncDeleteProduct,
  asyncEditProduct,
} from '../../../states/products/action';
import EditModal from './EditProduct/EditModal';

function ProductItem({ handleOnReload }) {
  const dispatch = useDispatch();
  const products = useSelector((states) => states.products);
  const [productData, setProductData] = useState({});
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);

  const handleToggleStatus = (event, newValue) => {
    const formData = new FormData();
    formData.append('isActive', newValue);
    dispatch(asyncEditProduct(event.target.value, formData)).then(
      handleOnReload
    );
  };

  const handleOnEditButton = (product) => {
    setProductData(product);
    setIsModalEditOpen(true);
  };

  const handleOnDelete = (productId) => {
    dispatch(asyncDeleteProduct(productId)).then(handleOnReload);
  };

  return (
    <>
      <TableBody>
        {!products.length && (
          <TableRow>
            <TableCell colSpan={6}>
              <Typography variant="body2" align="center">
                no data available
              </Typography>
            </TableCell>
          </TableRow>
        )}
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.id}</TableCell>
            <TableCell>
              <Avatar
                variant="square"
                alt={product.name}
                src={`${import.meta.env.VITE_API_URL}/products/image/${
                  product.id
                }`}
              />
            </TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.description}</TableCell>
            <TableCell>
              <List>
                {product.Variants.map((variant) => (
                  <ListItem key={variant.id} divider disablePadding>
                    <ListItemText
                      primary={`${variant.name} (${variant.stock}Pcs)`}
                      secondary={`Rp${variant.price.toLocaleString('id-ID')}`}
                    />
                  </ListItem>
                ))}
              </List>
            </TableCell>
            <TableCell align="center">
              <Tooltip
                title={`Product status: ${
                  product.isActive ? 'Active' : 'Inactive'
                }`}
                arrow
              >
                <Switch
                  checked={product.isActive}
                  value={product.id}
                  onChange={handleToggleStatus}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: 'success.light',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: 'success.light',
                    },
                  }}
                />
              </Tooltip>
            </TableCell>
            <TableCell>
              <Stack direction="row">
                <Tooltip title="Edit product" arrow>
                  <IconButton
                    onClick={() => handleOnEditButton(product)}
                    sx={{ '&:hover': { color: 'info.main' } }}
                  >
                    <EditNoteRounded />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete product" arrow>
                  <IconButton
                    value="productId"
                    onClick={() => handleOnDelete(product.id)}
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
          productData,
          isModalEditOpen,
          setIsModalEditOpen,
          handleOnReload,
        }}
      />
    </>
  );
}

export default ProductItem;
