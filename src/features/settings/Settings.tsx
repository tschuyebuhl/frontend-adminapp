import { useState, useEffect } from 'react';
import {
  GenerateSSHKeyRequest,
  SSHKey,
  SSHKeyPageData,
  generateSSHKey,
  getSSHKeys,
  sshKeyColumns,
  sshkeyFormColumns,
} from './models';
import { VOTable } from '../../components/VOTable';
import FormModal from '../../components/FormModal';

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
        actionText="Create a New SSH Key"
        actionOnClick={() => setModalOpen(true)}
        actionEnabled
      />
      <FormModal<GenerateSSHKeyRequest>
        title={'Add IP'}
        open={modalOpen}
        //onClose={() => setModalOpen(false)}
        onSubmit={generateKey}
        columns={sshkeyFormColumns}
        initialValues={{} as GenerateSSHKeyRequest}
        validate={(values) => {
          const errors: { [key in keyof GenerateSSHKeyRequest]?: string } = {};
          if (!values.name) {
            errors.name = 'Required';
          }
          if (!values.type) {
            errors.type = 'Required';
          }
          return errors;
        }}
      />
    </>
  );
};
