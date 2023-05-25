import { Box, Card, CardContent, Typography, Paper, ListItem, Chip, CardActions, Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getVirtualMachine } from "./VirtualMachine";
import { VMCard } from "./VMCard";
import { ChipList } from "./ChipList";
import { useParams } from "react-router-dom";
import InsetDividers from "../../components/InsetDivider";

export default function VMInfo() { 

const testVm = {
  Name: 'test',
  MemoryMB: 1024,
  NumCpus: 2,
  Project: 'M4B',
  Network: '172 - Common',
  IP: '10.16.72.201',
  Disk: '100 GB',
  PowerState: 'true',
  installedSoftware: ['zabbix','docker','postgresql','nginx']
}

const [chipData, setChipData] = useState<readonly ChipData[]>([
  { key: 0, label: 'Zabbix' },
  { key: 1, label: 'Docker' },
  { key: 2, label: 'PostgreSQL' },
  { key: 3, label: 'nginx' },
  { key: 4, label: 'Vector' },
]);

const { name } = useParams<string>();
const results = useQuery(['name', name], getVirtualMachine);
const virtualMachine = results.data;


return (
  <Box sx={{display: 'flex', flexDirection: 'row', mt: 2}}> 
    <VMCard title="Hardware">
      <Typography>vCPU: {testVm.NumCpus}</Typography>
      <Typography>RAM: {testVm.MemoryMB} MB</Typography>
      <Typography>Disk: {testVm.Disk}</Typography>
      <Typography>Network: {testVm.Network}, IP Address: {testVm.IP}</Typography>
      <Typography>Power State: {testVm.PowerState ? 'On' : 'Off'}</Typography>
      {/*<Typography>RAM: {virtualMachine?.MemoryMB ? virtualMachine.MemoryMB / 1024 : null} GB</Typography>
      <Typography>vCPU: {virtualMachine?.NumCpus}</Typography> */}
    </VMCard>

    <VMCard title="Project">
      <Typography>{testVm.Project}</Typography>
      <ChipList chipData={chipData} />
    </VMCard>
    <VMCard title="Incidents">
      <InsetDividers />
    </VMCard>
    </Box>
);
};