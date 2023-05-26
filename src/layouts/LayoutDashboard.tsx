// Imports
import { AppButton } from "@/components/app";
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
		<header className="flex items-center justify-between h-14 w-full bg-[#111111] px-5">
			<ul className="flex gap-3 items-center">
				<li>
					<AppButton
						icon
						size="xs"
						color="eerie"
						tone="dark"
						variant="text"
					>
						<CubeIcon className="h-5 w-5" />
					</AppButton>
				</li>
				<li>
					<AppButton
						size="xs"
						color="eerie"
						tone="dark"
					>
						<span>Button</span>
						<ChevronDownIcon className="h-3 w-3 ml-3 path-stroke-2" />
					</AppButton>
				</li>
			</ul>
			<ul className="flex gap-3">
				<li>
					<AppButton
						icon
						size="xs"
						color="eerie"
						tone="dark"
						variant={sidebar?'solid':'text'}
						onClick={()=>setSidebar(!sidebar)}
					>
						<Bars3Icon
							className={`
								h-5 w-5 transform duration-200 path-stroke-2
								${sidebar ? 'rotate-90' : ''}
							`}
						/>
					</AppButton>
				</li>
			</ul>
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
	const [active, setActive] = useState(false);

	return (
		<div className="fixed bg-[#111111] rounded-lg h-14 bottom-5 left-1/2 -translate-x-1/2 flex justify-center items-center px-3">
			<ul className="flex gap-3">
				<li>
					<AppButton
						icon
						size="xs"
						color="eerie"
						tone="dark"
						variant="text"
					>
						<ChevronLeftIcon className="h-5 w-5" />
					</AppButton>
				</li>
				<li>
					<AppButton
						icon
						size="xs"
						color="eerie"
						tone="dark"
						variant={active?'solid':'text'}
						onClick={()=>setActive(!active)}
					>
						<DevicePhoneMobileIcon className="h-5 w-5" />
					</AppButton>
				</li>
				<li>
					<AppButton
						icon
						size="xs"
						color="eerie"
						tone="dark"
						variant={active?'solid':'text'}
						onClick={()=>setActive(!active)}
					>
						<ComputerDesktopIcon className="h-5 w-5" />
					</AppButton>
				</li>
				<li>
					<AppButton
						icon
						size="xs"
						color="eerie"
						tone="dark"
						variant={active?'solid':'text'}
						onClick={()=>setActive(!active)}
					>
						<DeviceTabletIcon className="h-5 w-5" />
					</AppButton>
				</li>
				<li>
					<AppButton
						icon
						size="xs"
						color="eerie"
						tone="dark"
						variant="text"
					>
						<ChevronRightIcon className="h-5 w-5" />
					</AppButton>
				</li>
			</ul>
		</div>
	);
}