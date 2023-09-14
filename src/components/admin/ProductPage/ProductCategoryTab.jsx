import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { useSelector } from 'react-redux';
import { useMuiNewValue } from '../../../hooks';
import ProductList from './ProductList';

function ProductCategoryTab() {
  const categories = useSelector((states) => states.categories);
  const [value, handleValueChange] = useMuiNewValue('0');

  return (
    <Box>
      <TabContext value={value}>
        <TabList
          aria-label="Product Tabs"
          variant="scrollable"
          scrollButtons="auto"
          TabIndicatorProps={{ sx: { bgcolor: 'error.main' } }}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
          onChange={handleValueChange}
        >
          <Tab
            label="All"
            value="0"
            sx={{ '&.Mui-selected': { color: 'error.main' } }}
          />
          {categories.map((category, index) => (
            <Tab
              key={category.id}
              label={category.name}
              value={`${index + 1}`}
              sx={{ '&.Mui-selected': { color: 'error.main' } }}
            />
          ))}
        </TabList>
        <TabPanel value="0">
          <ProductList />
        </TabPanel>
        {categories.map((category, index) => (
          <TabPanel key={category.id} value={`${index + 1}`}>
            <ProductList categoryId={category.id} />
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
}

export default ProductCategoryTab;
