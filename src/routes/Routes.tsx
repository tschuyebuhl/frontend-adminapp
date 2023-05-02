import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { VirtualMachinesList } from '../features/vm/VirtualMachinesList';
import { VirtualMachineDetails } from '../features/vm/VirtualMachineDetails';
import { TicketList } from '../features/ticket/TicketList';
import ErrorPage from '../pages/ErrorPage';
import {CreateProject} from "../features/project/CreateProject";
import ProjectList from "../features/project/ProjectList";

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
    element: <ProjectList />
  }
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
