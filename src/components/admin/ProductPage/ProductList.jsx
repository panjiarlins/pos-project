import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import ProductItem from './ProductItem';

function ProductList({ handleOnReload }) {
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
              bgcolor: 'error.main',
            }}
          >
            <TableCell sx={{ color: 'white' }}>ID</TableCell>
            <TableCell sx={{ color: 'white' }}>Image</TableCell>
            <TableCell sx={{ color: 'white' }}>Name</TableCell>
            <TableCell sx={{ color: 'white' }}>Description</TableCell>
            <TableCell sx={{ color: 'white' }}>Variants</TableCell>
            <TableCell sx={{ color: 'white' }} align="center">
              Status
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <ProductItem {...{ handleOnReload }} />
      </Table>
    </TableContainer>
  );
}

export default ProductList;
