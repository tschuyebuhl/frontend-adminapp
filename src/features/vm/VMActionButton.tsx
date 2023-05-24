import { Button, CircularProgress } from "@mui/material";
import { VMActionButtonProps } from "./VMActionButtonProps";

const buttonStyle = {
  marginBottom: '8px',
  marginRight: '4px',
  width: '171px',
};

export const VMActionButton: React.FC<VMActionButtonProps> = ({
  label,
  onClick,
  loading = false,
  icon: Icon,
  color = "primary",
}) => {
  return (
    <Button
      sx={buttonStyle}
      aria-label={label}
      variant="contained"
      color={color}
      onClick={onClick}
      disabled={loading}
    >
      <Icon />
      {loading ? <CircularProgress size={24} /> : label}
    </Button>
  );
};
