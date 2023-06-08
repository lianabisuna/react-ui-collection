// Imports
import { AppButton } from "@/components/app";
import { OptionProp } from "@/components/app/types";
import { CardScreen } from "@/components/cards";
import { useNavStore, useToolbarStore } from "@/stores";
import { ScreenSize } from "@/stores/navStore";
import { ToolbarItemsProp } from "@/stores/toolbarStore";
import { MinusIcon } from "@heroicons/react/20/solid";
import * as HeroIcons from '@heroicons/react/24/outline'
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
import { Link, Outlet, matchPath, useLocation } from "react-router-dom";

// Dynamic Icon
const DynamicHeroIcon = ({ icon, classList }: IconProps) => {
	const SingleIcon = HeroIcons[icon];

	return (
		<SingleIcon className={classList} />
	);
};

// Provider
const SidebarContext = createContext<SidebarContext|undefined>(undefined);

// Router Links
const menuItems = [
	{
		title: 'Actions',
		icon: 'CursorArrowRaysIcon',
		items: [
			{ component: 'Button', to: '/button', disabled: false },
			{ component: 'Button Group', to: '/', disabled: true },
			{ component: 'Accordion', to: '/', disabled: true },
			{ component: 'Pagination', to: '/pagination', disabled: false },
			{ component: 'Breadcrumb', to: '/', disabled: true },
			{ component: 'Speed Dial', to: '/', disabled: true },
		],
	},
	{
		title: 'Text Inputs',
		icon: 'LanguageIcon',
		items: [
			{ component: 'Input', to: '/input', disabled: false },
			{ component: 'Textarea', to: '/textarea', disabled: false },
			{ component: 'File', to: '/', disabled: true },
			{ component: 'Dropzone', to: '/', disabled: true },
			{ component: 'OTP', to: '/', disabled: true },
			{ component: 'Rating', to: '/', disabled: true },
		],
	},
	{
		title: 'Communication',
		icon: 'SignalIcon',
		items: [
			{ component: 'Badge', to: '/', disabled: true },
			{ component: 'Progress Bar', to: '/', disabled: true },
			{ component: 'Spinner', to: '/', disabled: true },
			{ component: 'Toast', to: '/', disabled: true },
			{ component: 'Alert', to: '/', disabled: true },
			{ component: 'Notification', to: '/', disabled: true },
			{ component: 'Stepper', to: '/', disabled: true },
			{ component: 'Skeleton', to: '/', disabled: true },
		],
	},
	{
		title: 'Containment',
		icon: 'Square2StackIcon',
		items: [
			{ component: 'Card', to: '/', disabled: true },
			{ component: 'Tooltip', to: '/tooltip', disabled: false },
			{ component: 'Popover', to: '/', disabled: true },
			{ component: 'Modal', to: '/', disabled: true },
			{ component: 'Sheet', to: '/', disabled: true },
			{ component: 'List Group', to: '/', disabled: true },
			{ component: 'Carousel', to: '/', disabled: true },
			{ component: 'Table', to: '/', disabled: true },
			{ component: 'Form', to: '/', disabled: true },
		],
	},
	{
		title: 'Navigation',
		icon: 'MapPinIcon',
		items: [
			{ component: 'Tab', to: '/tab', disabled: false },
			{ component: 'Search', to: '/', disabled: true },
			{ component: 'Navigation Drawer', to: '/', disabled: true },
			{ component: 'Floating Label', to: '/', disabled: true },
			{ component: 'Avatar', to: '/', disabled: true },
			{ component: 'Keyboard', to: '/', disabled: true },
			{ component: 'Timeline', to: '/', disabled: true },
		],
	},
	{
		title: 'Selection',
		icon: 'ListBulletIcon',
		items: [
			{ component: 'Checkbox', to: '/', disabled: true },
			{ component: 'Chip', to: '/chip', disabled: false },
			{ component: 'Date Picker', to: '/', disabled: true },
			{ component: 'Time Picker', to: '/', disabled: true },
			{ component: 'Radio Button', to: '/', disabled: true },
			{ component: 'Dropdown', to: '/', disabled: true },
			{ component: 'Range', to: '/', disabled: true },
			{ component: 'Switch', to: '/', disabled: true },
			{ component: 'Select', to: '/select', disabled: false },
		],
	},
] as const;

export default function LayoutDashboard() {
	const [sidebar, setSidebar] = useState<boolean|null>(null);
  const menu = useNavStore((state) => state.menu);

	return (
		<SidebarContext.Provider value={{sidebar, setSidebar}}>
			<main className="flex flex-col w-full">
				<Header />
				<div className="flex flex-1 overflow-hidden mx-auto max-w-8xl w-full">
					<div className="relative flex justify-center w-full bg-dotted">
						<CardScreen>
							<Outlet />
						</CardScreen>
						<Footer />
					</div>
					<Sidebar />
				</div>
				{menu && <Menu />}
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

  const menu = useNavStore((state: { menu: boolean }) => state.menu);
  const setMenu = useNavStore((state) => state.setMenu);
	
	const location = useLocation();

	const routeComponentName = () => {
		let routeComponentName = '';
		menuItems.map((menuItem) => {
			menuItem.items.findIndex((item) => {
				if (matchPath(location.pathname, item.to)) {
					routeComponentName = item.component;
					return;
				}
			});
		});
		return routeComponentName;
	}

	return (
		<header className="flex items-center h-14 w-full bg-[#111111]">
			<div className="flex shrink-0 items-center justify-between w-full mx-auto max-w-8xl px-3">
				<ul className="flex gap-3 items-center mx-auto max-w-8xl w-full">
					<li>
						<button
							className="aspect-square p-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 animate-glow active:opacity-80 rounded"
						>
							<CubeIcon className="h-5 w-5 text-white" />
						</button>
					</li>
					<li>
						<AppButton
							size="sm"
							color="eerie"
							tone="dark"
							onClick={()=>setMenu(!menu)}
						>
							<span>{routeComponentName()}</span>
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
			</div>
		</header>
	);
}

function Sidebar() {
	const sidebarContext = useContext(SidebarContext);
	const sidebar = sidebarContext ? sidebarContext.sidebar : false;


	/** HANDLE TOOLBAR ITEMS */

	const items = useToolbarStore((state) => state.items);
	const setValue = useToolbarStore((state) => state.setValue);
	const setArrayValue = useToolbarStore((state) => state.setArrayValue);
	const addArrayValue = useToolbarStore((state) => state.addArrayValue);
	const removeArrayValue = useToolbarStore((state) => state.removeArrayValue);


	/** TOOLBAR ITEM COMPONENT */

	function ToolbarItem<P extends string=''>(params: ToolbarItemsProp<P>) {
		const { type, prop, value, componentProps } = params;
		const filteredOptions = () => {
			const _options = 'options' in params ? [ ...params.options as OptionProp[] ] : [];
			return _options?.map((option: OptionProp) => {
				if (typeof option === 'string')
					return { text: option, value: option }
				else
					return option
			})
		};

		const colors = [
			'blue-500',
			'red-500',
			'green-500',
			'amber-500',
			'indigo-500',
			'pink-500',
			'purple-500',
			'lime-500',
			'yellow-500',
			'rose-500',
			'emerald-500',
			'fuchsia-500',
		];

		const icons = [
			'',
			'BoltIcon',
			'BuildingOfficeIcon',
			'CameraIcon',
			'Cog6ToothIcon',
			'EnvelopeIcon',
			'ExclamationTriangleIcon',
			'EyeIcon',
			'GiftIcon',
			'HeartIcon',
			'HomeIcon',
			'LightBulbIcon',
			'MagnifyingGlassIcon',
			'MicrophoneIcon',
			'SpeakerWaveIcon',
		] as const;

		switch (type) {
			case 'input':
				return (
					<input
						type="text"
						className="outline-none bg-eerie w-full px-3 py-2 rounded text-white font-medium"
						value={`${value}`}
						onChange={(e)=>setValue(prop, e.target.value)}
						{...componentProps}
					/>
				);
			case 'select':
				return (
					<select
						value={`${value}`}
						onChange={(e)=>setValue(prop, e.currentTarget.value)}
						className="outline-none bg-eerie w-full px-2 py-2 rounded text-white font-medium"
					>
						{filteredOptions()?.map((option, key) => <option key={key} value={option.value}>{option.text}</option>)}
					</select>
				);
			case 'toggle':
				return (
					<div className="grid grid-cols-2 gap-0.5 rounded bg-eerie p-0.5">
						<button
							className={`${value ? 'bg-neutral-500' : 'bg-transparent'} text-white rounded placeholder:before:font-medium py-1.5`}
							onClick={()=>setValue(prop, true)}
						>
							Yes
						</button>
						<button
							className={`${value ? 'bg-transparent' : 'bg-neutral-500'} text-white rounded font-medium py-1.5`}
							onClick={()=>setValue(prop, false)}
						>
							No
						</button>
					</div>
				);
			case 'segment':
				return (
					<div className={`grid grid-cols-${filteredOptions() ? filteredOptions().length : 'none'} gap-0.5 rounded bg-eerie p-0.5`}>
						{filteredOptions()?.map((option, key) => {
							return (
								<button
									key={key}
									className={`${value===option.value ? 'bg-neutral-500' : 'bg-transparent'} text-white rounded font-medium py-1.5`}
									onClick={()=>setValue(prop, typeof option.value === 'boolean' ? option.value : `${option.value}`)}
								>
									{option.text}
								</button>
							)
						})}
					</div>
				);
				case 'color':
					return (
						<div className="grid grid-cols-6 gap-1.5">
							{colors.map((color, key) => {
								return (
									<button
										key={key}
										className={`${value===color ? 'border-2 border-battle' : ''} rounded-full p-0.5 h-8 w-8`}
										onClick={()=>setValue(prop, `${color}`)}
									>
										<div
											className={`bg-${color} rounded-full aspect-square`}
										>
										</div>
									</button>
								)
							})}
						</div>
					);
					case 'icon':
						return (
							<div className="grid grid-cols-5 gap-1.5">
								{icons.map((icon, key) => {
									return (
										<button
											key={key}
											className={`${value===icon ? 'bg-battle' : ''} text-white rounded p-0.5 h-9 w-9 border border-eerie flex items-center justify-center`}
											onClick={()=>setValue(prop, `${icon}`)}
										>
											{icon
												? (<DynamicHeroIcon icon={icon} classList="h-5 w-5 path-stroke-2" />)
												: (<div></div>)
											}
										</button>
									)
								})}
							</div>
						);
					case 'multiple-input':
						return (
							<div className="flex flex-col gap-3">
								{value?.map((item: any, key: number) => {
									return (
										<div key={key} className="flex">
											<input
												type="text"
												className="outline-none bg-eerie w-full px-3 py-2 rounded text-white font-medium"
												value={`${item.value}`}
												onChange={(e)=>setArrayValue(prop, e.target.value, key)}
											/>
											<AppButton
												icon
												size="xs"
												color="eerie"
												tone="dark"
												variant="text"
												onClick={()=>removeArrayValue(prop, key)}
											>
												<MinusIcon className="h-5 w-5" />
											</AppButton>
										</div>
									)
								})}
								{value.length<5 && (
									<button
										className="bg-eerie hover:bg-eerie/90 w-full px-3 py-2 rounded text-white font-medium"
										onClick={()=>addArrayValue(prop, '')}
									>
										Add
									</button>
								)}
							</div>
						);
			default:
				break;
		}
	}

	return (
		<aside
			className={`
				xs:w-80 xs:border-0 absolute z-40 inset-y-0 right-0 w-full shrink-0 md:static md:border-t md:border-[#252525] bg-[#111111] overflow-hidden top-14
				${sidebar ? '' : 'max-w-0'}
			`}
		>
			<div className="p-3 flex flex-col gap-3 overflow-y-auto overflow-x-hidden scrollbar h-full">
				{items?.map((item, key) => {
					return (
						<div key={key} className="grid grid-cols-3">
							<div className="col-span-1 text-sm font-medium text-battle flex items-start pt-2">{item.title}</div>
							<div className="col-span-2">
								{ToolbarItem(item)}
							</div>
						</div>
					)
				})}
			</div>
		</aside>
	);
}

function Footer() {
	const screen = useNavStore((state: { screen: ScreenSize }) => state.screen);
  const setScreen = useNavStore((state) => state.setScreen);

	return (
		<div className="absolute bg-[#111111] rounded h-14 bottom-5 left-1/2 -translate-x-1/2 flex justify-center items-center px-3">
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
				<li className="hidden md:block">
					<AppButton
						icon
						size="xs"
						color="eerie"
						tone="dark"
						variant={screen==='desktop'?'solid':'text'}
						onClick={()=>setScreen('desktop')}
					>
						<ComputerDesktopIcon className="h-5 w-5" />
					</AppButton>
				</li>
				<li className="hidden md:block">
					<AppButton
						icon
						size="xs"
						color="eerie"
						tone="dark"
						variant={screen==='tablet'?'solid':'text'}
						onClick={()=>setScreen('tablet')}
					>
						<DeviceTabletIcon className="h-5 w-5" />
					</AppButton>
				</li>
				<li className="hidden md:block">
					<AppButton
						icon
						size="xs"
						color="eerie"
						tone="dark"
						variant={screen==='mobile'?'solid':'text'}
						onClick={()=>setScreen('mobile')}
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
						variant="text"
					>
						<ChevronRightIcon className="h-5 w-5" />
					</AppButton>
				</li>
			</ul>
		</div>
	);
}

function Menu() {
	const location = useLocation();

	return (
	<div className="bg-[#111111] absolute top-14 left-0 w-full flex-1 h-[calc(100%-3.5rem)] border-t border-[#252525] py-5 z-50 overflow-y-auto overflow-x-hidden scrollbar">
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto max-w-8xl w-full gap-y-5 gap-x-3 md:gap-y-3 md:gap-x-3">
			{menuItems.map((menuItem,key) =>
				<div key={key}>
					<div className="flex mb-3 px-6">
						<DynamicHeroIcon icon={menuItem.icon} classList="h-5 w-5 text-white mr-1.5" />
						<p className="text-white text-sm font-medium">{menuItem.title}</p>
					</div>
					<div className="flex flex-col pr-6">
						{menuItem.items.map((item, key) =>
							<Link
								key={key}
								to={item.to}
								className={`
									py-2 rounded text-sm font-medium mx-3 px-3 w-full text-start mr-6
									${matchPath(location.pathname, item.to) ? 'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 animate-glow text-white' : 'text-battle hover:text-white'} ${item.disabled ? 'line-through pointer-events-none opacity-25' : ''}
								`}
							>
								{item.component}
							</Link>
						)}
					</div>
				</div>
			)}
		</div>
		</div>
	);
}

export type IconName = keyof typeof HeroIcons;
export interface IconProps {
	icon: IconName;
	classList: string;
}