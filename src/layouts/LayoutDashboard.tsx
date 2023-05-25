// Imports
import { Bars3Icon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { type SetStateAction, createContext, useContext, useState, type Dispatch } from "react";
import { Outlet } from "react-router-dom";

// Provider
const SidebarContext = createContext<SidebarContext|undefined>(undefined);

export default function LayoutDashboard() {
	const [sidebar, setSidebar] = useState<boolean|null>(null);

	return (
		<SidebarContext.Provider value={{sidebar, setSidebar}}>
			<main className="flex flex-col w-full">
				<Header />
				<div className="flex flex-1">
					<Outlet />
					<Sidebar />
				</div>
			</main>
			</SidebarContext.Provider>
	);
}

// Types
interface SidebarContext {
  sidebar: boolean|null;
  setSidebar: Dispatch<SetStateAction<boolean|null>>;
}

function Header() {
	const sidebarContext = useContext(SidebarContext);
	const setSidebar = sidebarContext ? sidebarContext.setSidebar : ()=>({});
	const sidebar = sidebarContext ? sidebarContext.sidebar : false;

	return (
		<header className="flex items-center justify-between h-12 w-full bg-[#111111] px-5">
			<div>
				<button className="flex text-sm font-semibold text-white">
					<span>Button</span>
					<ChevronDownIcon className="h-5 w-5 text-white ml-1.5" />
				</button>
			</div>
			<div>
				<button
					className="bg-transparent outline-none group"
					onClick={() => setSidebar(!sidebar)}
				>
					<Bars3Icon
						className={`
							h-5 w-5 text-white transform duration-200
							${sidebar ? 'rotate-90' : ''}
						`}
					/>
				</button>
			</div>
		</header>
	);
}

function Sidebar() {
	const onboardingContext = useContext(SidebarContext);
	const sidebar = onboardingContext ? onboardingContext.sidebar : false;

	return (
			<aside
				className={`
					xs:w-80 xs:border-0 absolute z-40 inset-y-0 right-0 w-full shrink-0 md:static md:border-t md:border-[#252525] bg-[#111111]
					${sidebar ? '' : 'max-w-0'}
				`}
			>
				<div className="px-5 py-3.5">
					<p className="text-sm font-medium text-white mb-3">Size</p>
					<ul className="flex flex-col">
						<li className="px-3 py-2 rounded-lg text-sm font-medium bg-[#252525] text-white">Small</li>
						<li className="px-3 py-2 rounded-lg text-sm font-medium text-[#999999]">Medium</li>
						<li className="px-3 py-2 rounded-lg text-sm font-medium text-[#999999]">Large</li>
					</ul>
				</div>
			</aside>
	);
}