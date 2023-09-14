import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Box, Stack } from '@mui/material';
import { asyncReceiveProducts } from '../../states/products/action';
import { asyncReceiveCategories } from '../../states/categories/action';
import NavbarAdmin from '../../components/admin/NavbarAdmin';
import ProductTitle from '../../components/admin/ProductPage/ProductTitle';
import ProductCategoryTab from '../../components/admin/ProductPage/ProductCategoryTab';
import ProductSearchInput from '../../components/admin/ProductPage/ProductSearchInput';
import ProductDownloadButton from '../../components/admin/ProductPage/ProductDownloadButton';
import ProductAddNewButton from '../../components/admin/ProductPage/ProductAddNewButton';

function ProductPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveCategories());
    dispatch(asyncReceiveProducts());
  }, [dispatch]);

  return (
    <>
      <NavbarAdmin />
      <Stack
        direction="column"
        spacing={2}
        p={{ xs: '5vw', md: '2em' }}
        mx="auto"
        maxWidth="1200px"
      >
        <ProductTitle />
        <Box>
          <Stack spacing={1} direction={{ xs: 'column', md: 'row' }}>
            <ProductSearchInput />
            <Box sx={{ flexGrow: 1 }} display={{ xs: 'none', md: 'inherit' }} />
            <Stack direction="row" spacing={1} justifyContent="center">
              <ProductDownloadButton />
              <ProductAddNewButton />
            </Stack>
          </Stack>
        </Box>
        <ProductCategoryTab />
      </Stack>
    </>
  );
}

export default ProductPage;
