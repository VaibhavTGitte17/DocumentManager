import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import CreateFolderIcon from '@mui/icons-material/CreateNewFolder';
import UploadIcon from '@mui/icons-material/CloudUpload';
import ConfigurationIcon from '@mui/icons-material/Settings';
import { NavLink } from 'react-router-dom';
import StarBorderIcon from '@mui/icons-material/StarBorder';


const drawerWidth = 240;

const styles = {
  '@keyframes ring': {
    '0%': { transform: 'rotate(0)' },
    '20%': { transform: 'rotate(30deg)' },
    '50%': { transform: 'rotate(-28deg)' },
    '70%': { transform: 'rotate(34deg)' },
    '100%': { transform: 'rotate(0)' },
  },
  ring: {
    display: 'inline-block',
    animation: 'ring 1s infinite',
    transformOrigin: 'center',
  },
};


export default function Header() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
        <StarBorderIcon sx={styles.ring} />
          <Typography variant="h6" noWrap component="div">
            DocumentManager
          </Typography>
          

        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {[
              { text: 'Home', icon: <HomeIcon />, path: '/' },
              { text: 'Create Folder', icon: <CreateFolderIcon />, path: '/create' },
              { text: 'Upload', icon: <UploadIcon />, path: '/upload' },
              { text: 'Configuration', icon: <ConfigurationIcon />, path: '/configure' },
            ].map((item, index) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton component={NavLink} to={item.path}>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Search'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton component={NavLink} to="/search">
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
  
      </Box>
    </Box>
  );
}