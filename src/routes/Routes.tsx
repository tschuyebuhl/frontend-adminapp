import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { VirtualMachinesList } from '../pages/VirtualMachinesList';
import { VirtualMachineDetails } from '../pages/VirtualMachineDetails';
import { TicketList } from '../pages/TicketList';
import ErrorPage from '../pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div />,
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
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
