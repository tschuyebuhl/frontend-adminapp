import { useState, useEffect } from 'react';
import { Host, fetchHosts } from '../../models/Host';
import { Folder, fetchFolders } from '../../models/Folder';

export const useFetchHostsAndFolders = (open: boolean) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);

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
