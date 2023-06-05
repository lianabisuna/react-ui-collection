import { type RouteObject, createBrowserRouter } from "react-router-dom";
import { lazyLoadRoute } from "./RouteSuspense.tsx";
import App from '../App.tsx';
import LayoutDefault from "@/layouts/LayoutDefault.tsx";
import LayoutDashboard from "@/layouts/LayoutDashboard.tsx";

const routes: RouteObject[] = [
	{
		path: '/',
		element: <App />,
		children: [
			// {
			//   index: true,
			//   element: lazyLoadRoute(() => import('')),
			// },
			{
				path: '/login',
				element: <LayoutDefault />,
				children: [
					{
						index: true,
						element: lazyLoadRoute(() => import('@/pages/general/LoginPage.tsx')),
					},
				],
			},
			{
				path: '/',
				element: <LayoutDashboard />,
				children: [
					{
						index: true,
						element: lazyLoadRoute(() => import('@/pages/dashboard/ButtonPage.tsx')),
					},
					{
						path: '/select',
						element: lazyLoadRoute(() => import('@/pages/dashboard/FormSelectPage.tsx')),
					},
				],
			},
			{
				path: '*',
				element: lazyLoadRoute(() => import('@/pages/utility/ErrorPage.tsx')),
			},
		],
	},
];


const router =  createBrowserRouter([
	...routes,
]);

export default router;