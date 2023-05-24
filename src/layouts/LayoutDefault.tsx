import { Outlet } from "react-router-dom";

export default function LayoutDefault() {
	console.log('Default');
	return (
		<div className="bg-blue-500">
			<div>Default</div>
			<Outlet />
		</div>
	);
}