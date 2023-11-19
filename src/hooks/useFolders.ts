import { useState, useEffect } from 'react';
import { Folder, fetchFolders } from '../models/Folder';

export const useFolders = (open: boolean) => {
  const [folders, setFolders] = useState<Folder[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedFolders = await fetchFolders();
      setFolders(fetchedFolders);
    };

    if (open) {
      fetchData();
    }
  }, [open]);

  return folders;
};
