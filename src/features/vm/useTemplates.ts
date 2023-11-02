import { useState, useEffect } from 'react';
import { Host, fetchHosts } from '../../models/Host';
import { Folder, fetchFolders } from '../../models/Folder';
import { Template, getTemplates } from '../templates/Template';

export const useTemplates = (open: boolean) => {
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = (await getTemplates({ offset: 0, limit: 5 })).Templates;

      setTemplates(data);
    };

    if (open) {
      fetchData();
    }
  }, [open]);

  return templates;
};
