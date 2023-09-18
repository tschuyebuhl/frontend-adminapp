import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LayersIcon from '@mui/icons-material/Layers';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import { Link } from 'react-router-dom';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/ipam/subnets">
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Subnets" />
    </ListItemButton>
    <ListItemButton component={Link} to="/ipam/ip-addresses">
      <ListItemIcon>
        <DeviceHubIcon />
      </ListItemIcon>
      <ListItemText primary="IP Addresses" />
    </ListItemButton>
    <ListItemButton component={Link} to="/ipam/portgroups">
      <ListItemIcon>
        <SettingsEthernetIcon />
      </ListItemIcon>
      <ListItemText primary="Portgroups" />
    </ListItemButton>
  </React.Fragment>
);


