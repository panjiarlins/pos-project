import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { useSelector } from 'react-redux';
import ProductList from './ProductList';

function ProductCategoryTab({
  currCategoryId,
  handleCurrCategoryIdChange,
  handleOnReload,
}) {
  const categories = useSelector((states) => states.categories);

  return (
    <Box>
      <TabContext value={currCategoryId}>
        <TabList
          aria-label="Product Tabs"
          variant="scrollable"
          scrollButtons="auto"
          TabIndicatorProps={{ sx: { bgcolor: 'error.main' } }}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
          onChange={handleCurrCategoryIdChange}
        >
          <Tab
            label="All"
            value="0"
            sx={{ '&.Mui-selected': { color: 'error.main' } }}
          />
          {categories.map((category) => (
            <Tab
              key={category.id}
              label={category.name}
              value={`${category.id}`}
              sx={{ '&.Mui-selected': { color: 'error.main' } }}
            />
          ))}
        </TabList>
        <TabPanel value="0">
          <ProductList {...{ handleOnReload }} />
        </TabPanel>
        {categories.map((category) => (
          <TabPanel key={category.id} value={`${category.id}`}>
            <ProductList {...{ handleOnReload }} />
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
}

export default ProductCategoryTab;
