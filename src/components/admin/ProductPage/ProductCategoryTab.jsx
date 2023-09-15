import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { useSelector } from 'react-redux';
import { useMuiNewValue } from '../../../hooks';
import ProductList from './ProductList';

function ProductCategoryTab() {
  const categories = useSelector((states) => states.categories);
  const [currCategoryTab, handleCurrCategoryTabChange] = useMuiNewValue('0');

  return (
    <Box>
      <TabContext value={currCategoryTab}>
        <TabList
          aria-label="Product Tabs"
          variant="scrollable"
          scrollButtons="auto"
          TabIndicatorProps={{ sx: { bgcolor: 'error.main' } }}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
          onChange={handleCurrCategoryTabChange}
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
          <ProductList {...{ currCategoryTab }} />
        </TabPanel>
        {categories.map((category, index) => (
          <TabPanel key={category.id} value={`${index + 1}`}>
            <ProductList {...{ currCategoryTab }} />
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
}

export default ProductCategoryTab;
