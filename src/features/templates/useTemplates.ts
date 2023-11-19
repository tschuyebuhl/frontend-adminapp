import { useState, useEffect } from 'react';
import { Template, getTemplates } from './Template';

export const useTemplates = (open: boolean) => {
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedTemplates = await getTemplates();

      setTemplates(fetchedTemplates.Templates);
    };

    if (open) {
      fetchData();
    }
  }, [open]);

  return { templates };
};
