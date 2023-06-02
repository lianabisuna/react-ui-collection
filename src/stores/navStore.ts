import { create } from 'zustand';

interface Nav {
	menu: boolean
	setMenu: (newMenu: boolean) => void
	screen: ScreenSize
	setScreen: (newScreen: ScreenSize) => void
	
}

export const useNavStore = create<Nav>((set) => ({
	menu: false,
	setMenu: async (newMenu) => {
		set({ menu: newMenu })
	},
	screen: 'desktop',
	setScreen: async (newScreen) => {
		set({ screen: newScreen })
	}
}));

export type ScreenSize = 'mobile'|'tablet'|'desktop';