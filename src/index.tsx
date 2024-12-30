import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom'

function Index() {
  return <div>index<Outlet></Outlet></div>
}
function ErrorPage() {
  return <div>Error Page</div>
}

function UserManage() {
  return <div>user manage</div>
}

function Login() {
  return <div>login</div>
}

const routes = [
  {
    path: '/',
    element: <Index />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'user_manage',
        element: <UserManage />
      }
    ]
  },
  {
    path: 'login',
    element: <Login />
  }
]

const router = createBrowserRouter(routes)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(<RouterProvider router={router} />)
