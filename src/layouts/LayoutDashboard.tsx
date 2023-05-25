// Imports
import {
	Bars3Icon,
	ChevronDownIcon,
	CubeIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	DevicePhoneMobileIcon,
	DeviceTabletIcon,
	ComputerDesktopIcon
} from "@heroicons/react/24/outline";
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
				<Footer />
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

function Footer() {
	return (
		<div className="fixed bg-[#111111] rounded-lg h-12 bottom-5 left-1/2 -translate-x-1/2 flex justify-center items-center px-3">
			<ul className="flex gap-3">
				<li>
					<button className="rounded-lg p-1.5">
						<ChevronLeftIcon className="h-5 w-5 text-white" />
					</button>
				</li>
				<li>
					<button className="rounded-lg p-1.5">
						<CubeIcon className="h-5 w-5 text-white" />
					</button>
				</li>
				<li>
					<button className="rounded-lg p-1.5">
						<DevicePhoneMobileIcon className="h-5 w-5 text-white" />
					</button>
				</li>
				<li>
					<button className="bg-[#252525] rounded-lg p-1.5">
						<DeviceTabletIcon className="h-5 w-5 text-white" />
					</button>
				</li>
				<li>
					<button className="rounded-lg p-1.5">
						<ComputerDesktopIcon className="h-5 w-5 text-white" />
					</button>
				</li>
				<li>
					<button className="rounded-lg p-1.5">
						<ChevronRightIcon className="h-5 w-5 text-white" />
					</button>
				</li>
			</ul>
		</div>
	);
}