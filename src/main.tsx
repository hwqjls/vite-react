import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import ErrorPage from './error-page';
import Root, { loader as rootLoader, action as rootAction } from './routes/root';
import Contact, { loader as contactLoader } from './routes/contact';
import EditContact, { action as editAction } from './routes/edit';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: 'contacts/:contactId',
        element: <Contact />,
        errorElement: <ErrorPage />,
        loader: contactLoader
      },
      {
        path: 'contacts/:contactId/edit',
        element: <EditContact />,
        errorElement: <ErrorPage />,
        loader: contactLoader,
        action: editAction
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
