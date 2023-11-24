import { useState, useEffect } from 'react';
import {
  GenerateSSHKeyRequest,
  SSHKey,
  SSHKeyPageData,
  generateSSHKey,
  getSSHKeys,
  sshKeyColumns,
  sshKeyFormColumns,
} from './models';
import { VOTable } from '../../components/VOTable';
import GenerateSSHKeyModal from './GenerateSSHKeyModal';

const generateKey = async (values: GenerateSSHKeyRequest) => {
  await generateSSHKey(values);
};

export const Settings = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [keys, setKeys] = useState<SSHKeyPageData>({ total: 0, data: [] });
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 1,
  });

  const offset = pagination.pageIndex * pagination.pageSize;
  const limit = pagination.pageSize;

  useEffect(() => {
    refetch();
  }, [offset, limit]);

  const refetch = () => {
    getSSHKeys({ offset, limit }).then((fetchedKeys) => {
      setKeys(fetchedKeys);
    });
  };
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
        actionText="Create a New SSH Key"
        actionOnClick={() => setModalOpen(true)}
        actionEnabled
      />
      <GenerateSSHKeyModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={generateKey}
        columns={sshKeyFormColumns}
        onCompletion={refetch}
      />
    </>
  );
};
