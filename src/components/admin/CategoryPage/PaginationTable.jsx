import { Pagination } from '@mui/material';
import React from 'react';

function PaginationTable({ searchParams, updateQueryParams, paginationInfo }) {
  return (
    <Pagination
      count={paginationInfo.total_page}
      variant="text"
      shape="rounded"
      color="error"
      size="medium"
      page={+searchParams.get('page') || 1}
      onChange={(e, page) => updateQueryParams({ page })}
      sx={{
        '& .MuiPagination-ul': {
          justifyContent: 'center',
        },
      }}
    />
  );
}

export default PaginationTable;
