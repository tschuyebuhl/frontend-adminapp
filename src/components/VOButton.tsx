import { Button } from '@mui/material';
import { MouseEventHandler } from 'react';

type VOButtonProps = {
  title: string;
  //onClick: MouseEventHandler<HTMLButtonElement>;
  onClick: (...param: any) => void;
};

export const VOButton: React.FC<VOButtonProps> = ({ title, onClick }: VOButtonProps) => {
  return (
    <Button
      color="primary"
      variant="contained"
      style={{ marginTop: '20px' }}
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
