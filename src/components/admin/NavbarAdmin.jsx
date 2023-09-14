import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { MenuRounded, NotificationsRounded } from '@mui/icons-material';
import { useState } from 'react';
import SidebarAdmin from './SidebarAdmin';

function NavbarAdmin() {
  const authUser = useSelector((states) => states.authUser);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: 'white' }}>
        <Toolbar>
          <IconButton onClick={() => setIsSidebarOpen(true)}>
            <MenuRounded />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" spacing={1}>
            <IconButton>
              <Avatar sx={{ bgcolor: '#EEF2F6' }}>
                <NotificationsRounded className="text-[#121926]" />
              </Avatar>
            </IconButton>
            <Stack direction="column" spacing={0}>
              <Typography variant="h6" align="right" color="black">
                {authUser.fullname}
              </Typography>
              <Typography variant="body2" align="right" color="#697586">
                {authUser.isCashier ? 'Admin' : 'Admin | Cashier'}
              </Typography>
            </Stack>
            <IconButton>
              <Avatar
                alt={authUser.fullname}
                src="/test"
                sx={{ bgcolor: 'skyblue' }}
              />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
      <SidebarAdmin
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </>
  );
}
export default NavbarAdmin;
