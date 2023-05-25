import { Outlet } from "react-router-dom";

export default function LayoutDefault() {
	return (
		<div className="bg-blue-200">
			<h1>Default Layout</h1>
			<Outlet />
		</div>
	);
}