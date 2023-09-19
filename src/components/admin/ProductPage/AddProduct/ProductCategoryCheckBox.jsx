import {
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';

function ProductCategoryCheckBox({
  selectedCategories,
  handleSelectedCategories,
}) {
  const categories = useSelector((states) => states.categories);

  return (
    <Stack>
      <Typography variant="h6">Select Category</Typography>
      <List>
        {categories.map((category) => (
          <ListItem key={category.id} disablePadding>
            <ListItemButton
              onClick={() => handleSelectedCategories(category.id)}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  tabIndex={-1}
                  value={category.id}
                  checked={selectedCategories.indexOf(category.id) !== -1}
                />
              </ListItemIcon>
              <ListItemText primary={category.name} />
            </ListItemButton>
          </ListItem>
        ))}
        {categories.length === 0 && <ListItem>no category found</ListItem>}
      </List>
    </Stack>
  );
}

export default ProductCategoryCheckBox;
