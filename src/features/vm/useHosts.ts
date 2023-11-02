import { useState, useEffect } from 'react';
import { Host, fetchHosts } from '../../models/Host';

export const useHosts = (open: boolean) => {
  const [hosts, setHosts] = useState<Host[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedHosts = await fetchHosts();
      setHosts(fetchedHosts);
    };

    if (open) {
      fetchData();
    }
  }, [open]);

  return hosts;
};
