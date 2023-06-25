import { Paper, ListItem, Chip, Avatar } from "@mui/material";

interface ChipListProps {
  chipData: readonly ChipData[];
}

export const ChipList: React.FC<ChipListProps> = ({ chipData }) => (
  <>
  {/* <Paper 
    sx={{
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      listStyle: 'none',
      p: 0.5,
      m: 0,
    }}
    component="ul"
  >
   {chipData.map((data) => (
      <ListItem key={data.key}>
        <Chip label={data.label} />
      </ListItem>
    ))} *
   </Paper> */}

      <Chip avatar={<Avatar src="/nginx.png"/>} label={'nginx'} />
      <Chip avatar={<Avatar src="/apache.png"/>} label={'Apache HTTP Server'} />
      <Chip avatar={<Avatar src="/apache.png"/>} label={'Aurea BPM'} />
      <Chip avatar={<Avatar src="/docker.png"/>} label={'Docker'} />
      <Chip avatar={<Avatar src="/postgres.png"/>} label={'PostgreSQL'} />
      <Chip avatar={<Avatar src="/zabbix.png"/>} label={'Zabbix'} />
</>
);
