import { AppFormCheckbox, type AppFormCheckboxTypes } from "@/components/app";
import { ToolbarItemsProp, useToolbarStore } from "@/stores/toolbarStore";
import { useEffect, useState } from "react";

export default function FormCheckboxPage() {
	const [active, setActive] = useState(false);

	const setItems = useToolbarStore(state => state.setItems);
	const items = useToolbarStore(state => state.items as ToolbarItemsProp<keyof AppFormCheckboxTypes.Prop>[]);

	const initialItems: ToolbarItemsProp<keyof AppFormCheckboxTypes.Prop>[] = [
		// {
		// 	type: 'segment',
		// 	prop: 'size',
		// 	title: 'Size',
		// 	value: 'md',
		// 	options: [
		// 		{ text: 'XS', value: 'xs' },
		// 		{ text: 'S', value: 'sm' },
		// 		{ text: 'M', value: 'md' },
		// 		{ text: 'L', value: 'lg' },
		// 		{ text: 'XL', value: 'xl' },
		// 	],
		// },
		{
			type: 'toggle',
			prop: 'disabled',
			title: 'Disabled',
			value: false,
		},
		{
			type: 'input',
			prop: 'label',
			title: 'Label',
			value: '',
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

	const componentProps = (): AppFormCheckboxTypes.Prop => {
		const props: AppFormCheckboxTypes.Prop = {};
		items.map((item) => {
			props[item.prop] = item.value;
		})
		const { modelValue, updateModelValue, ...rest } = props;
		return rest;
	}
	
	return (
		<div>
			<AppFormCheckbox
				modelValue={active}
				updateModelValue={setActive}
				{...componentProps()}
			>
			</AppFormCheckbox>
		</div>
	);
}