import { useState, useEffect } from 'react';
import { SSHKey, getSSHKeys } from '../features/settings/models';

export const useSSHKeys = (open: boolean) => {
  const [SSHKeys, setSSHKeys] = useState<SSHKey[]>([]);

  useEffect(() => {
    if (open) {
      getSSHKeys({ offset: 0, limit: 100 }).then(response => {
        setSSHKeys(response.data);
      }).catch(error => {
        console.error('Failed to fetch networks:', error);
      });
    }
  }, [open]);

  return SSHKeys;
};
