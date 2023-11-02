import { useState, useEffect } from 'react';
import { Network } from '../ipam/models';
import { getNetworks } from '../ipam/Network';

export const useNetworks = (open: boolean) => {
  const [networks, setNetworks] = useState<Network[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getNetworks({ offset: 0, limit: 100 }); //TODO INFINITE SCROLL :D 
      setNetworks(data.networks);
    };

    if (open) {
      fetchData();
    }
  }, [open]);

  return networks;
};
