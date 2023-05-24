import { ReactNode, ReactElement } from "react";

type ButtonColor = "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined;

export interface VMActionButtonProps {
  label: string;
  onClick?: () => void;
  loading?: boolean;
  icon: React.ElementType;
  color?: ButtonColor;
}

