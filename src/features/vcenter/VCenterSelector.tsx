import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { useVCenterContext } from './vCenterContext';

const VCenterSelector = () => {
  const { selectedVCenter, setSelectedVCenter, vCenters, fetchVCenters } = useVCenterContext();

  useEffect(() => {
    fetchVCenters();
  }, []);

  const handleChange = (event) => {
    setSelectedVCenter(event.target.value);
  };

  return (
    <FormControl variant="standard" sx={{ minWidth: 120 }}>
      <InputLabel id="vcenter-label">vCenter</InputLabel>
      <Select
        labelId="vcenter-label"
        id="vcenter-select"
        value={selectedVCenter}
        onChange={handleChange}
        label="vCenter"
      >
        {vCenters.map((vCenter) => (
          <MenuItem key={vCenter.id} value={vCenter.id}>
            {vCenter.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default VCenterSelector;
