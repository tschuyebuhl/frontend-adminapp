import { Button } from '@mui/material';

type VOButtonProps = {
  title: string;
  onClick: () => void;
};

export const VOButton: React.FC<VOButtonProps> = ({ title, onClick }: VOButtonProps) => {
  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      onClick={onClick}
      sx={{
        //space it a little bit between left and right edges
        margin: '0 10px',
      }}
    >
      {title}
    </Button>
  );
};
