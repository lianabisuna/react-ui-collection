import { type RouteObject, createBrowserRouter } from "react-router-dom";
import { lazyLoadRoute } from "./RouteSuspense.tsx";
import App from '../App.tsx';

const routes: RouteObject[] = [
  {
    path: '/',
		element: <App />,
    children: [
      {
        path: '/login',
        element: lazyLoadRoute(() => import('@/pages/general/LoginPage.tsx')),
      },
      {
        path: '/button',
        element: lazyLoadRoute(() => import('@/pages/dashboard/ButtonPage.tsx')),
      },
    ],
  },
  {
    path: '*',
    element: lazyLoadRoute(() => import('@/pages/utility/ErrorPage.tsx')),
  },
];


const router =  createBrowserRouter([
  ...routes,
]);

export default router;