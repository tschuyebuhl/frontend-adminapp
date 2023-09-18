import { useState } from 'react';

import Drawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { mainListItems } from './listItems';
const drawerWidth = 240;

export function IPAM() {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };
  
  return (
    <Drawer
    variant="permanent"
    open={open}
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: open ? drawerWidth : '72px',
        boxSizing: 'border-box',
        transition: '.3s',
        position: 'relative',
        whiteSpace: 'nowrap',
        overflowX: 'hidden',
      },
    }}
  >
    <Toolbar
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: [1],
      }}
    >
      <IconButton onClick={toggleDrawer}>
        <ChevronLeftIcon sx={{ transform: open ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.3s' }} />
      </IconButton>
    </Toolbar>
    <Divider />
    <List component="nav">
      {mainListItems}
    </List>
  </Drawer>
  )
}



