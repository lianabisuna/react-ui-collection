import { AppFormSelect, type AppFormSelectTypes } from "@/components/app";
import { useToolbarStore } from "@/stores";
import { type ToolbarItemsProp } from "@/stores/toolbarStore";
import { useEffect, useState } from "react";

export default function ButtonPage() {
	const [select, setSelect] = useState<string|string[]>('');
	const setItems = useToolbarStore(state => state.setItems);
	const items = useToolbarStore(state => state.items as ToolbarItemsProp<keyof AppFormSelectTypes.Prop>[]);

	const initialItems: ToolbarItemsProp<keyof AppFormSelectTypes.Prop>[] = [
		{
			type: 'segment',
			prop: 'multiple',
			title: 'Selection',
			value: false,
			options: [
				{ text: 'Single', value: false },
				{ text: 'Multiple', value: true },
			],
		},
		{
			type: 'toggle',
			prop: 'chip',
			title: 'Chip',
			value: false,
		},
		{
			type: 'input',
			prop: 'placeholder',
			title: 'Placeholder',
			value: 'Select item',
		},
		{
			type: 'input',
			prop: 'emptyText',
			title: 'Empty Text',
			value: 'No data',
		},
		{
			type: 'multiple-input',
			prop: 'items',
			title: 'Options',
			value: [
				{ text: 'Item 1', value: 'Item 1' },
				{ text: 'Item 2', value: 'Item 2' },
				{ text: 'Item 3', value: 'Item 3' },
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

	const componentProps = (): AppFormSelectTypes.Prop => {
		const props: AppFormSelectTypes.Prop = {};
		items.map((item) => {
			props[item.prop] = item.value;
		})
		return props;
	}
	
	return (
		<div>
			<AppFormSelect
				modelValue={select}
				updateModelValue={setSelect}
				{...componentProps()}
				block
			>
			</AppFormSelect>
		</div>
	);
}