import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import { VirtualMachinesList } from '../pages/VirtualMachinesList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <VirtualMachinesList />,
      },
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
