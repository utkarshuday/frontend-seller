import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import UserProvider from './context/UserContext';
import AppLayout from './components/AppLayout';
import AuthLayout from './components/AuthLayout';
import CreateSeller from './pages/CreateSeller';
import Admin from './pages/Admin';
import AddProduct from './pages/AddProduct';
import AddSeller from './pages/AddSeller';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { element: <Login />, index: true },
      {
        element: <AuthLayout />,
        children: [
          {
            element: <CreateSeller />,
            path: '/create-seller',
          },
          {
            element: <Admin />,
            path: '/admin',
            children: [
              {
                path: 'add-product',
                element: <AddProduct />,
              },
              {
                path: 'add-seller',
                element: <AddSeller />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
