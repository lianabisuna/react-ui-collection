import { OptionProp } from '@/components/app/types';
import { type StateCreator, create } from 'zustand';

interface Toolbar<P extends string> {
	items: ToolbarItemsProp<P>[]
	setItems: (newItem: ToolbarItemsProp<P>[]) => void
	setValue: (prop: string, value: any) => void
	setArrayValue: (prop: string, textValue: string, index: number) => void
	addArrayValue: (prop: string, textValue: string) => void
	removeArrayValue: (prop: string, index: number) => void
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
	setArrayValue: async (prop, textValue, index) => {
		set((state) => {
			const newItems = [...state.items].map((item) => {
				if (item.prop===prop) {
					item.value.map((val: any, key: number) => {
						if (key === index) {
							val.text = textValue;
							val.value = textValue;
						}
					})
				}
				return item;
			});
			return { 
				items: newItems
			}
		});
	},
	addArrayValue: async (prop, textValue) => {
		set((state) => {
			const newItems = [...state.items].map((item) => {
				if (item.prop===prop) {
					item.value.push({
						text: textValue,
						value: textValue
					})
				}
				return item;
			});
			return { 
				items: newItems
			}
		});
	},
	removeArrayValue: async (prop, index) => {
		set((state) => {
			const newItems = [...state.items].map((item) => {
				if (item.prop===prop) {
					item.value.splice(index, 1);
				}
				return item;
			});
			return { 
				items: newItems
			}
		});
	},
}));

export type ToolbarItemType = 'input'|'select'|'toggle'|'segment'|'color'|'icon'|'multiple-input';

export interface ToolbarItemsProp<P extends string=''> {
	type: ToolbarItemType
	prop: P
	title: string
	value: any // string|boolean
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