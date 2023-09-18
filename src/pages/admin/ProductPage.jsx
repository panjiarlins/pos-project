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
import { useMuiNewValue, useValueInput } from '../../hooks';
import SelectSortBy from '../../components/admin/ProductPage/SelectSortBy';
import SelectOrderBy from '../../components/admin/ProductPage/SelectOrderBy';

function ProductPage() {
  const dispatch = useDispatch();
  const [currCategoryId, handleCurrCategoryIdChange] = useMuiNewValue('0');
  const [sortBy, handleSortByChange] = useValueInput('updatedAt');
  const [orderBy, handleOrderByChange] = useValueInput('DESC');
  const [searchName, handleSearchNameChange] = useValueInput('');

  useEffect(() => {
    dispatch(asyncReceiveCategories());
    dispatch(
      asyncReceiveProducts({
        name: searchName,
        categoryId: currCategoryId,
        sortBy,
        orderBy,
      })
    );
  }, [dispatch, currCategoryId, sortBy, orderBy]);

  const handleOnReload = () => {
    dispatch(
      asyncReceiveProducts({
        name: searchName,
        categoryId: currCategoryId,
        sortBy,
        orderBy,
      })
    );
  };

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
          <Stack spacing={2} direction={{ xs: 'column', md: 'row' }}>
            <ProductSearchInput
              {...{ searchName, handleSearchNameChange, handleOnReload }}
            />
            <Box sx={{ flexGrow: 1 }} display={{ xs: 'none', md: 'inherit' }} />
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <Stack direction="row" spacing={1} justifyContent="center">
                <ProductDownloadButton />
                <ProductAddNewButton {...{ handleOnReload }} />
              </Stack>
              <Stack direction="row" spacing={1} justifyContent="center">
                <SelectSortBy {...{ sortBy, handleSortByChange }} />
                <SelectOrderBy {...{ orderBy, handleOrderByChange }} />
              </Stack>
            </Stack>
          </Stack>
        </Box>
        <ProductCategoryTab
          {...{ currCategoryId, handleCurrCategoryIdChange, handleOnReload }}
        />
      </Stack>
    </>
  );
}

export default ProductPage;
