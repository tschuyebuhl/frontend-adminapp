export interface AlertSnackbarProps {
  open: boolean;
  handleClose: () => void;
  severity: "error" | "warning" | "info" | "success";
  message: string;
}
