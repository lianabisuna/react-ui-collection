import { AppFormSwitch, type AppFormSwitchTypes } from "@/components/app";
import { ToolbarItemsProp, useToolbarStore } from "@/stores/toolbarStore";
import { useEffect, useState } from "react";

export default function FormSwitchPage() {
	const [active, setActive] = useState(false);

	const setItems = useToolbarStore(state => state.setItems);
	const items = useToolbarStore(state => state.items as ToolbarItemsProp<keyof AppFormSwitchTypes.Prop>[]);

	const initialItems: ToolbarItemsProp<keyof AppFormSwitchTypes.Prop>[] = [
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

	const componentProps = (): AppFormSwitchTypes.Prop => {
		const props: AppFormSwitchTypes.Prop = {};
		items.map((item) => {
			props[item.prop] = item.value;
		})
		const { modelValue, updateModelValue, ...rest } = props;
		return rest;
	}
	
	return (
		<div>
			<AppFormSwitch
				modelValue={active}
				updateModelValue={setActive}
				{...componentProps()}
			>
			</AppFormSwitch>
		</div>
	);
}