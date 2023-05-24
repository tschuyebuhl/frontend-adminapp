import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import DomainIcon from '@mui/icons-material/Domain';
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
    <ListItemButton component={Link} to="/ipam/sites">
      <ListItemIcon>
        <DomainIcon />
      </ListItemIcon>
      <ListItemText primary="Sites" />
    </ListItemButton>
    <ListItemButton component={Link} to="/ipam/portgroups">
      <ListItemIcon>
        <SettingsEthernetIcon />
      </ListItemIcon>
      <ListItemText primary="Portgroups" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton component={Link} to="/reports/current-month">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton component={Link} to="/reports/last-quarter">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton component={Link} to="/reports/year-end-sale">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);
