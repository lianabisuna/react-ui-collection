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
			type: 'toggle',
			prop: 'disabled',
			title: 'Disabled',
			value: false,
		},
		// {
		// 	type: 'toggle',
		// 	prop: 'float',
		// 	title: 'Floating Label',
		// 	value: false,
		// },
		{
			type: 'select',
			prop: 'variant',
			title: 'Variant',
			value: '',
			options: [
				{ text: 'Filled', value: 'filled' },
				{ text: 'Outlined', value: 'outlined' },
				{ text: 'Underlined', value: 'underlined' },
			],
		},
		{
			type: 'segment',
			prop: 'size',
			title: 'Size',
			value: 'md',
			options: [
				{ text: 'XS', value: 'xs' },
				{ text: 'S', value: 'sm' },
				{ text: 'M', value: 'md' },
				{ text: 'L', value: 'lg' },
				{ text: 'XL', value: 'xl' },
			],
		},
		{
			type: 'input',
			prop: 'label',
			title: 'Label',
			value: '',
		},
		{
			type: 'input',
			prop: 'message',
			title: 'Helper Text',
			value: '',
		},
		{
			type: 'input',
			prop: 'placeholder',
			title: 'Placeholder',
			value: 'Select item',
		},
		{
			type: 'input',
			prop: ('emptytext' as 'emptyText'),
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