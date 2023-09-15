import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ProductItem from './ProductItem';
import { asyncReceiveProducts } from '../../../states/products/action';

function ProductList({ currCategoryId = null, currCategoryTab }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveProducts({ categoryId: currCategoryId }));
  }, [dispatch, currCategoryTab]);

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: '0',
        m: '0 auto',
      }}
    >
      <Table aria-label="Data Table">
        <TableHead>
          <TableRow
            sx={{
              bgcolor: 'error.light',
              '& > *': { color: '#fff' },
            }}
          >
            <TableCell>ID</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <ProductItem />
      </Table>
    </TableContainer>
  );
}

export default ProductList;
