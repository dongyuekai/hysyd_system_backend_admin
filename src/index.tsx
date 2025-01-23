import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Index, ErrorPage, Login, UserManage } from './pages/index.tsx'
import { Menu } from './pages/Menu/Menu.tsx'
import { ModifyMenu } from './pages/ModifyMenu/ModifyMenu.tsx';
import { InfoModify } from './pages/InfoModify/InfoModify.tsx'
import { PasswordModify } from './pages/PasswordModify/PasswordModify.tsx'

const routes = [
  {
    path: '/',
    element: <Index />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Menu />,
        children: [
          {
            path: 'user_manage',
            element: <UserManage />
          }
        ]
      },
      {
        path: '/user',
        element: <ModifyMenu />,
        children: [
          {
            path: 'info_modify',
            element: <InfoModify />
          },
          {
            path: 'password_modify',
            element: <PasswordModify />
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

export const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<RouterProvider router={router} />);
