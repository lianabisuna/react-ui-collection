import { AppTab, type AppTabTypes } from "@/components/app";
import { ToolbarItemsProp, useToolbarStore } from "@/stores/toolbarStore";
import { useEffect } from "react";

export default function TabPage() {
	const setItems = useToolbarStore(state => state.setItems);
	const items = useToolbarStore(state => state.items as ToolbarItemsProp<keyof AppTabTypes.Prop>[]);

	const initialItems: ToolbarItemsProp<keyof AppTabTypes.Prop>[] = [
		{
			type: 'multiple-input',
			prop: 'items',
			title: 'Options',
			value: [
				{ text: 'Tab 1', value: 'Tab 1' },
				{ text: 'Tab 2', value: 'Tab 2' },
				{ text: 'Tab 3', value: 'Tab 3' },
			],
		},
		{
			type: 'color',
			prop: 'color',
			title: 'Color',
			value: 'blue-500',
		},
	];
	
	useEffect(() => {
		setItems(initialItems);
	}, []);

	const componentProps = (): AppTabTypes.Prop => {
		const props: AppTabTypes.Prop = {};
		items.map((item) => {
			props[item.prop] = item.value;
		})
		return props;
	}
	
	return (
		<div>
			<AppTab
				{...componentProps()}
			>
			</AppTab>
		</div>
	);
}