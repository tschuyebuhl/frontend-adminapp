import { Divider, Drawer, IconButton, List, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import React from 'react';

interface SidebarProps {
  listItems: React.ReactNode;
  allowHiding: boolean;
  title: string;
}

export function Sidebar({ listItems, title, allowHiding }: SidebarProps) {
  const drawerWidth = 240;
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    if (allowHiding) {
      setOpen(!open);
    }
  };

  return (
    <React.Fragment>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          height: '100vh',
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
            justifyContent: 'space',
            px: [1],
          }}
        >
          <Typography
            display="flex"
            variant="h5"
            align={'center'}
            sx={{ display: open ? 'block' : 'none' }}
          >
            {title}
          </Typography>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon
              sx={{
                display: allowHiding ? 'block' : 'none',
                transform: open ? 'rotate(0deg)' : 'rotate(180deg)',
                transition: 'transform 0.3s',
              }}
            />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">{listItems}</List>
      </Drawer>
    </React.Fragment>
  );
}
