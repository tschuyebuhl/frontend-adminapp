import { useState, useEffect } from 'react';
import { Host, fetchHosts } from './Host';
import { Folder, fetchFolders } from './Folder';

export const useFetchHostsAndFolders = (open: boolean) => {
  const [hosts, setHosts] = useState<Host[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [datastores, setDatastores] = useState<Folder[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedHosts = await fetchHosts();
      const fetchedFolders = await fetchFolders();

      setHosts(fetchedHosts);
      setFolders(fetchedFolders);
    };

    if (open) {
      fetchData();
    }
  }, [open]);

  return { hosts, folders };
};
