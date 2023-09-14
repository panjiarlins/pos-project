import { DashboardRounded, StoreRounded } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';

function SidebarAdmin({ isSidebarOpen, setIsSidebarOpen }) {
  return (
    <Drawer
      anchor="left"
      open={isSidebarOpen}
      onClose={() => setIsSidebarOpen(false)}
    >
      <Stack direction="column">
        <IconButton disabled>
          <Avatar>
            <StoreRounded />
          </Avatar>
        </IconButton>
        <Box>
          <Typography variant="body2">MANAGE</Typography>
          <List>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <ListItemAvatar>
                    <Avatar>
                      <DashboardRounded />
                    </Avatar>
                  </ListItemAvatar>
                </ListItemIcon>
                <ListItemText primary="1" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Stack>
    </Drawer>
  );
}

export default SidebarAdmin;
