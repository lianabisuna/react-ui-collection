import { Outlet } from "react-router-dom";

export default function LayoutDashboard() {
	console.log('Dashboard');
	return (
		<div className="bg-red-500">
			<div>Dashboard</div>
			<Outlet />
		</div>
	);
}