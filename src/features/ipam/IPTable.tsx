import { Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import { DeleteIPAddressRequest, IPAddress } from './models';

type IPTableProps = {
  data?: IPAddress[];
  deleteIP: (values: DeleteIPAddressRequest) => void;
  setSnackbarOpen: (value: boolean) => void;
};

export const IPTable = ({ data, deleteIP, setSnackbarOpen }: IPTableProps) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>IP Address</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Hostname</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.map((ipAddress) => (
          <TableRow key={ipAddress.ID}>
            <TableCell>{ipAddress.IPAddress + '/' + ipAddress.PrefixLength}</TableCell>
            <TableCell>{ipAddress.Description}</TableCell>
            <TableCell>{ipAddress.Hostname}</TableCell>
            <TableCell>
              <Button
                title={'Delete'}
                variant="contained"
                color="error"
                onClick={() => {
                  const values: DeleteIPAddressRequest = {
                    id: ipAddress.ID,
                    network: ipAddress.NetworkID,
                  };
                  deleteIP(values);
                  setSnackbarOpen(true);
                }}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
