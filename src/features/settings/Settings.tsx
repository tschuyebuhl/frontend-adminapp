import { useState, useEffect } from 'react';
import { SSHKey, SSHKeyPageData, getSSHKeys, sshKeyColumns } from './models';
import { VOTable } from '../../components/VOTable';

export const Settings = () => {
  const [keys, setKeys] = useState<SSHKeyPageData>({ total: 0, data: [] });
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 1,
  });

  const offset = pagination.pageIndex * pagination.pageSize;
  const limit = pagination.pageSize;

  useEffect(() => {
    getSSHKeys({ offset, limit }).then((fetchedKeys) => {
      setKeys(fetchedKeys);
    });
  }, [offset, limit]);

  return (
    <>
      <VOTable<SSHKey>
        data={keys.data}
        totalItems={keys.total}
        pagination={pagination}
        setPagination={setPagination}
        title={'SSH Keys'}
        columns={sshKeyColumns}
        detailPath="/settings/ssh-keys/"
      />
    </>
  );
};
