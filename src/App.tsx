import { Link, Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="h-full w-full min-h-screen bg-green-200">
			<nav>
			<Link to="/">Home</Link>
				<Link to="/button">Button</Link>
				<Link to="/login">Login</Link>
			</nav>
			<main>
				<Outlet />
			</main>
		</div>
  );
}