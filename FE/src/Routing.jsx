import { createBrowserRouter, RouterProvider, Route, Routes } from 'react-router-dom';
import App from './App';
import Landing from '../src/landing';
import SignIn from './auth/signIn';
import Dashboard from './admin';
import ProtectedRoute from './ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Landing />,
      },
      {
        path: '/dashboard',
        element: <ProtectedRoute component={Dashboard} />,
      },
      {
        path: '/signIN',
        element: <SignIn />,
      },
    ],
  },
]);

export default router;
