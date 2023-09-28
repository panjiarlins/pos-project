import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Box, Stack } from '@mui/material';
import { asyncReceiveProducts } from '../../states/products/action';
import { asyncReceiveCategories } from '../../states/categories/action';
import SelectSortBy from '../../components/admin/ProductPage/SelectSortBy';
import SelectOrderBy from '../../components/admin/ProductPage/SelectOrderBy';
import useCustomSearchParams from '../../hooks/useCustomSearchParams';
import PageHeader from '../../components/admin/ProductPage/PageHeader';
import SearchInput from '../../components/admin/ProductPage/SearchInput';
import DownloadButton from '../../components/admin/ProductPage/DownloadButton';
import CreateButton from '../../components/admin/ProductPage/CreateButton';
import ContainerTab from '../../components/admin/ProductPage/ContainerTab';

function ProductPage() {
  const dispatch = useDispatch();
  const [searchParams, updateQueryParams] = useCustomSearchParams();

  useEffect(() => {
    dispatch(asyncReceiveCategories({ perPage: 1000 })).catch((error) =>
      console.log(error)
    );
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
  }, [
    dispatch,
    searchParams.get('currCategoryId'),
    searchParams.get('sortBy'),
    searchParams.get('orderBy'),
    searchParams.get('isPaginated'),
    searchParams.get('page'),
    searchParams.get('perPage'),
  ]);

  return (
    <Stack
      direction="column"
      spacing={2}
      p={{ xs: '5vw', md: '2em' }}
      mx="auto"
      maxWidth="1200px"
    >
      <PageHeader />
      <Box>
        <Stack spacing={2} direction={{ xs: 'column', md: 'row' }}>
          <SearchInput {...{ searchParams, updateQueryParams }} />
          <Box sx={{ flexGrow: 1 }} display={{ xs: 'none', md: 'inherit' }} />
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <Stack direction="row" spacing={1} justifyContent="center">
              <DownloadButton />
              <CreateButton />
            </Stack>
            <Stack direction="row" spacing={1} justifyContent="center">
              <SelectSortBy {...{ searchParams, updateQueryParams }} />
              <SelectOrderBy {...{ searchParams, updateQueryParams }} />
            </Stack>
          </Stack>
        </Stack>
      </Box>
      <ContainerTab {...{ searchParams, updateQueryParams }} />
    </Stack>
  );
}

export default ProductPage;
