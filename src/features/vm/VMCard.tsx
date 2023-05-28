import { Card, CardContent, Typography } from "@mui/material";
import { ReactNode } from "react";

interface VMCardProps {
  title: string;
  children: ReactNode;
}

const cardStyle = {
  border: 1,
  width: '33.33%',
  margin: '0.5rem',
}
export const VMCard: React.FC<VMCardProps> = ({ title, children }) => (
  <Card sx={cardStyle}>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {title}
      </Typography>
      {children}
    </CardContent>
  </Card>
);
