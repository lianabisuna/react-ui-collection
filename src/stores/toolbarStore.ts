import { OptionProp } from '@/components/app/types';
import { type StateCreator, create } from 'zustand';

interface Toolbar<P extends string> {
	items: ToolbarItemsProp<P>[]
	setItems: (newItem: ToolbarItemsProp<P>[]) => void
	setValue: (prop: string, value: any) => void
}

export const useToolbarStore = create(<P extends string>(set: Parameters<StateCreator<Toolbar<P>>>[0]): Toolbar<P> => ({
	items: [],
	setItems: async (newItems) => {
		set({ items: newItems })
	},
	setValue: async (prop, value) => {
		set((state) => {
			const newItems = [...state.items].map((item) => {
				if (item.prop===prop) item.value = value;
				return item;
			});
			return { 
				items: newItems
			}
		});
	},
}));

export type ToolbarItemType = 'input'|'select'|'toggle'|'segment';

export interface ToolbarItemsProp<P extends string=''> {
	type: ToolbarItemType
	prop: P
	title: string
	value: string|boolean
	options?: OptionProp[]|string[]
}

// input
// multiple-input
// select/range
// button-group
// color
// icon
// checkbox

// items
// 	type - input
// 	prop - placeholder
// 	title - Placeholder
// 	value - ''

// 	type - multiple-input
// 	prop - placeholder
// 	title - Placeholder
// 	value - ['','','']

// 	type - select, button-group
// 	prop - variant
// 	title - Variant
// 	value - {} | ''
// 	options - [1,2,3]

// 	type - color, icon
// 	prop - color
// 	title - Color
// 	value - ''
// 	*options - ['','','']

// 	type - checkbox
// 	prop - disabled
// 	title - Disabled
// 	value - true/false