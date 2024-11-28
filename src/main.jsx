import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CartContent from './Components/CartContent/CartContent.jsx';
import App from './App.jsx';
import ContextProvider from './Context/Context.jsx';
import Login from './Components/Login/Login.jsx'; 
import Register from './Components/Login/Register.jsx'; 
import Admin from './Components/Admin/Admin.jsx'; 
import NewProduct from './Components/Admin/NewProduct.jsx';
import EditProduct from './Components/Admin/EditProduct.jsx';  
import UserManagement from './Components/Admin/UserManagement.jsx';
import './index.css';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
    },
    {
      path: '/cart',
      element: <CartContent />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/admin',
      element: <Admin />,
    },
    {
      path: '/admin/new',
      element: <NewProduct />,
    },
    {
      path: '/admin/edit/:productId',
      element: <EditProduct />,
    },
    {
      path: '/admin/usermanagement',
      element: <UserManagement/>,
    },
  ],
  {
    future: {
      v7_startTransition: true, 
    },
  }
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </StrictMode>,
);
