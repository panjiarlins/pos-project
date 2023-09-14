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

function ProductList({ categoryId }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveProducts({ categoryId }));
  }, [dispatch]);

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: '0',
        m: '0 auto',
        maxWidth: '70vw',
      }}
    >
      <Table aria-label="Data Table">
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: '#FEE4E2',
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
