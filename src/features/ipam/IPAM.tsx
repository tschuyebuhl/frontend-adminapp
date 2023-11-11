import { useEffect, useState } from 'react';
import { SidebarItems } from './SidebarItems';
import { Sidebar } from '../../components/Sidebar';
import { useQuery } from '@tanstack/react-query';
import { getNetworks } from './Network';
import Box from '@mui/material/Box';
import { NetworksList } from './NetworksList';

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
    refetchOnWindowFocus: false
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
    <NetworksList
      networks={networksQuery.data?.networks || []}
      totalNetworks={networksQuery.data?.total || 0}
      pagination={pagination}
      setPagination={setPagination}
    />
  );
}
