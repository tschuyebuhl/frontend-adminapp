import { Box, Card, Divider, Grid, Paper, Tooltip, Typography } from '@mui/material';
import { IPAddress, Network } from './models';

export const NetworkBoard: React.FC<{
  ipAddresses: IPAddress[];
  totalIPs: number;
  network: Network;
}> = ({ network, ipAddresses, totalIPs }) => {
  return (
    console.log('NetworkBoard.tsx: NetworkBoard: ipAddresses: ', ipAddresses, 'network: ', network),
    <Card sx={{}}>
      <Typography marginTop={5}>Visual subnet display</Typography>
      <Divider />
      <Grid marginTop={2} marginBottom={2} container spacing={1.11}>
        {Array.from({ length: totalIPs }).map((_, index) => {
          const ipNumber = index + 1; // start from .1

          const isOccupied = ipAddresses.some((ip) => ip.IPAddress.endsWith(`.${ipNumber}`));
          return (
            <Grid item key={ipNumber}>
              <Tooltip title={isOccupied ? `IP .${ipNumber} in use` : `IP .${ipNumber} available`}>
                <Paper
                  style={{
                    width: 30,
                    height: 30,
                    backgroundColor: isOccupied ? 'green' : 'gray',
                  }}
                >
                  <Box display="flex" justifyContent="center" alignItems="center">
                    {ipNumber}
                  </Box>
                </Paper>
              </Tooltip>
            </Grid>
          );
        })}
      </Grid>
    </Card>
  );
};
