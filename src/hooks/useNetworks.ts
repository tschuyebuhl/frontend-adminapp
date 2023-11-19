import { useState, useEffect } from 'react';
import { Network } from '../features/ipam/models';
import { getNetworks } from '../features/ipam/Network';

export const useNetworks = (open: boolean) => {
  const [networks, setNetworks] = useState<Network[]>([]);

  useEffect(() => {
    if (open) {
      getNetworks({ offset: 0, limit: 100 }).then(response => {
        setNetworks(response.networks);
      }).catch(error => {
        console.error('Failed to fetch networks:', error);
      });
      console.log('useNetworks: ', networks[0])
    }
  }, [open]);

  return networks;
};
