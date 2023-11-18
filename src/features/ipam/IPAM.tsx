import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getNetworks } from './Network';
import { VOTable } from '../../components/VOTable';
import { networkColumns } from './Columns';
import { Network } from './models';

export function IPAM() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 25,
  });

  const offset = pagination.pageIndex * pagination.pageSize;
  const limit = pagination.pageSize;

  const networksQuery = useQuery({
    queryKey: ['virtualMachines', { offset, limit }],
    queryFn: () => getNetworks({ offset, limit }),
    refetchOnWindowFocus: false,
  });

  const { refetch } = networksQuery;

  useEffect(() => {
    refetch();
  }, [pagination, refetch]); // refetch when pagination changes

  const title: string = 'IPAM';

  //TODO make portgroup be fetched
  //List of IP Addresses on Details
  //Maybe a map of the network?
  return (
    <VOTable<Network>
      columns={networkColumns}
      data={networksQuery.data?.networks || []}
      totalItems={networksQuery.data?.total || 0}
      pagination={pagination}
      setPagination={setPagination}
      title={'SSH Keys'}
      detailPath="/ipam"
    />
  );
}
