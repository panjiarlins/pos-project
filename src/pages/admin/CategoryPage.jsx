import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Stack } from '@mui/material';
import { asyncReceiveCategories } from '../../states/categories/action';
import PageHeader from '../../components/admin/CategoryPage/PageHeader';
import SearchInput from '../../components/admin/CategoryPage/SearchInput';
import DownloadButton from '../../components/admin/CategoryPage/DownloadButton';
import CreateButton from '../../components/admin/CategoryPage/CreateButton';
import ContainerTable from '../../components/admin/CategoryPage/ContainerTable';
import useCustomSearchParams from '../../hooks/useCustomSearchParams';

function CategoryPage() {
  const dispatch = useDispatch();
  const [searchParams, updateQueryParams] = useCustomSearchParams();
  const [paginationInfo, setPaginationInfo] = useState({});

  useEffect(() => {
    dispatch(
      asyncReceiveCategories({
        name: searchParams.get('name'),
        page: searchParams.get('page'),
        perPage: searchParams.get('perPage'),
      })
    )
      .then(setPaginationInfo)
      .catch((error) => console.log(error));
  }, [dispatch, searchParams.get('page')]);

  const handleOnReload = () => {
    dispatch(
      asyncReceiveCategories({
        name: searchParams.get('name'),
        page: searchParams.get('page'),
        perPage: searchParams.get('perPage'),
      })
    )
      .then(setPaginationInfo)
      .catch((error) => console.log(error));
  };

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
          <SearchInput
            {...{ searchParams, updateQueryParams, handleOnReload }}
          />
          <Box sx={{ flexGrow: 1 }} display={{ xs: 'none', md: 'inherit' }} />
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <Stack direction="row" spacing={1} justifyContent="center">
              <DownloadButton />
              <CreateButton {...{ handleOnReload }} />
            </Stack>
            {/* <Stack direction="row" spacing={1} justifyContent="center">
                <SelectSortBy {...{ sortBy, handleSortByChange }} />
                <SelectOrderBy {...{ orderBy, handleOrderByChange }} />
              </Stack> */}
          </Stack>
        </Stack>
      </Box>
      <ContainerTable
        {...{ searchParams, updateQueryParams, handleOnReload, paginationInfo }}
      />
    </Stack>
  );
}

export default CategoryPage;
