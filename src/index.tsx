import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Index, ErrorPage, Login, UserManage } from './pages/index.tsx'
import { Menu } from './pages/Menu/Menu.tsx'

const routes = [
  {
    path: '/',
    element: <Index />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Menu></Menu>,
        children: [
          {
            path: 'user_manage',
            element: <UserManage />
          }
        ]
      }
    ]
  },
  {
    path: 'login',
    element: <Login />
  }
]

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<RouterProvider router={router} />);
