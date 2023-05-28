import { useState, useEffect } from 'react';
import { Datastore, fetchDatastores} from './Datastore'

export const useDatastores = (open: boolean) => {
  const [datastores, setDatastores] = useState<Datastore[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedDatastores = await fetchDatastores();

      setDatastores(fetchedDatastores);
    };

    if (open) {
      fetchData();
    }
  }, [open]);

  return { datastores };
};
