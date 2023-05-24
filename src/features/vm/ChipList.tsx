import { Paper, ListItem, Chip } from "@mui/material";

interface ChipListProps {
  chipData: readonly ChipData[];
}

export const ChipList: React.FC<ChipListProps> = ({ chipData }) => (
  <Paper 
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
    ))}
  </Paper>
);
