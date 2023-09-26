import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { VirtualMachinesList } from '../features/vm/VirtualMachinesList';
import { VirtualMachineDetails } from '../features/vm/VirtualMachineDetails';
import { TicketList } from '../features/ticket/TicketList';
import ErrorPage from '../pages/ErrorPage';
import ProjectList from '../features/project/ProjectList';
import { IPAM } from '../features/ipam/IPAM';
import VMConsole from '../features/vm/VMConsole';
import ProjectDetails from '../features/project/ProjectDetails';
import { NetworkDetails } from '../features/ipam/NetworkDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>Hello!</h1>,
    errorElement: <ErrorPage />,
  },
  {
    path: 'virtual-machines',
    element: <VirtualMachinesList />,
  },
  {
    path: 'virtual-machines/:name',
    element: <VirtualMachineDetails />,
  },
  {
    path: 'tickets',
    element: <TicketList />,
  },
  {
    path: 'projects',
    element: <ProjectList />,
  },
  {
    path: 'projects/:code',
    element: <ProjectDetails />,
  },
  {
    path: 'ipam',
    element: <IPAM />,
    /* children: [
      {
        path: ':name',
        element: <NetworkDetails />,
      },
    ],*/
  },
  {
    path: 'ipam/:name',
    element: <NetworkDetails />,
  },
  {
    path: '/virtual-machines/:name/console',
    element: <VMConsole />,
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
