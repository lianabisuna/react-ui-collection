import { AppChip, type AppChipTypes } from "@/components/app";
import { ToolbarItemsProp, useToolbarStore } from "@/stores/toolbarStore";
import { useEffect } from "react";

export default function OtpPage() {
	const setItems = useToolbarStore(state => state.setItems);
	const items = useToolbarStore(state => state.items as ToolbarItemsProp<keyof AppChipTypes.Prop>[]);

	const initialItems: ToolbarItemsProp<keyof AppChipTypes.Prop>[] = [
		{
			type: 'segment',
			prop: 'outlined',
			title: 'Selection',
			value: false,
			options: [
				{ text: 'Solid', value: false },
				{ text: 'Outlined', value: true },
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
			type: 'select',
			prop: 'rounded',
			title: 'Rounded',
			value: '',
			options: [
				{ text: 'None', value: 'none' },
				{ text: 'Small', value: 'sm' },
				{ text: 'Default', value: '' },
				{ text: 'Large', value: 'lg' },
				{ text: 'Full', value: 'full' },
			],
		},
		{
			type: 'toggle',
			prop: 'closable',
			title: 'Closable',
			value: false,
		},
		{
			type: 'input',
			prop: 'children',
			title: 'Text',
			value: 'Chip',
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

	const componentProps = (): AppChipTypes.Prop => {
		const props: AppChipTypes.Prop = {};
		items.map((item) => {
			props[item.prop] = item.value;
		})
		return props;
	}
	
	return (
		<div>
			<AppChip
				{...componentProps()}
			>
			</AppChip>
		</div>
	);
}