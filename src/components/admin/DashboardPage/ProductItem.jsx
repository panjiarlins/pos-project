import { DeleteRounded, EditNoteRounded } from '@mui/icons-material';
import {
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';

function ProductItem() {
  const products = useSelector((states) => states.products);

  if (!products.length) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={6}>
            <Typography variant="body2" align="center">
              No data available.
            </Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  // const handleProductStatus = (event, newValue) => {
  //   event.target.value
  //   newValue:true/false
  //   dispatch()
  // };

  return products.map((product) => (
    <TableBody key={product.id}>
      <TableRow>
        <TableCell>{product.id}</TableCell>
        <TableCell />
        <TableCell>{product.name}</TableCell>
        <TableCell>{product.description}</TableCell>
        <TableCell align="center">
          <FormControlLabel
            control={
              <Tooltip
                title={`Product status: ${
                  product.isActive ? 'Active' : 'Inactive'
                }`}
                arrow
              >
                <Switch
                  checked={product.isActive}
                  value={product.id}
                  // onChange={handleProductStatus}
                  // sx={{
                  //   '.Mui-checked': {
                  //     color: 'limegreen',
                  //   },
                  //   '.Mui-checked + .MuiSwitch-track': {
                  //     bgcolor: 'limegreen',
                  //   },
                  // }}
                />
              </Tooltip>
            }
          />
        </TableCell>
        <TableCell>
          <Stack direction="row">
            <Tooltip title="Edit product" arrow>
              <IconButton className="hover:text-[#528BFF]">
                <EditNoteRounded />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete product" arrow>
              <IconButton className="hover:text-[#F97066]">
                <DeleteRounded />
              </IconButton>
            </Tooltip>
          </Stack>
        </TableCell>
      </TableRow>
    </TableBody>
  ));
}

export default ProductItem;
