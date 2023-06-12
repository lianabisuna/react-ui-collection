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
			{
				index: true,
				element: lazyLoadRoute(() => import('@/pages/general/LoginPage.tsx')),
			},
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
						path: '/button',
						element: lazyLoadRoute(() => import('@/pages/dashboard/ButtonPage.tsx')),
					},
					{
						path: '/chip',
						element: lazyLoadRoute(() => import('@/pages/dashboard/ChipPage.tsx')),
					},
					{
						path: '/input',
						element: lazyLoadRoute(() => import('@/pages/dashboard/FormInputPage.tsx')),
					},
					{
						path: '/textarea',
						element: lazyLoadRoute(() => import('@/pages/dashboard/FormTextareaPage.tsx')),
					},
					{
						path: '/select',
						element: lazyLoadRoute(() => import('@/pages/dashboard/FormSelectPage.tsx')),
					},
					{
						path: '/pagination',
						element: lazyLoadRoute(() => import('@/pages/dashboard/PaginationPage.tsx')),
					},
					{
						path: '/tab',
						element: lazyLoadRoute(() => import('@/pages/dashboard/TabPage.tsx')),
					},
					{
						path: '/tooltip',
						element: lazyLoadRoute(() => import('@/pages/dashboard/TooltipPage.tsx')),
					},
					{
						path: '/checkbox',
						element: lazyLoadRoute(() => import('@/pages/dashboard/FormCheckboxPage.tsx')),
					},
					{
						path: '/file',
						element: lazyLoadRoute(() => import('@/pages/dashboard/FormFilePage.tsx')),
					},
					{
						path: '/radio',
						element: lazyLoadRoute(() => import('@/pages/dashboard/FormRadioPage.tsx')),
					},
					{
						path: '/switch',
						element: lazyLoadRoute(() => import('@/pages/dashboard/FormSwitchPage.tsx')),
					},
					{
						path: '/modal',
						element: lazyLoadRoute(() => import('@/pages/dashboard/ModalPage.tsx')),
					},
					{
						path: '/otp',
						element: lazyLoadRoute(() => import('@/pages/dashboard/OtpPage.tsx')),
					},
					{
						path: '/table',
						element: lazyLoadRoute(() => import('@/pages/dashboard/TablePage.tsx')),
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