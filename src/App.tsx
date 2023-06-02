import { Outlet } from "react-router-dom";

export default function App() {
  return (
		<div className="flex h-full w-full overflow-hidden">
			<Outlet />
		</div>
  );
}