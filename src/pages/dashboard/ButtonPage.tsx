import { AppButton, type AppButtonTypes } from "@/components/app";
import { useToolbarStore } from "@/stores";
import { type ToolbarItemsProp } from "@/stores/toolbarStore";
import { useEffect } from "react";

export default function ButtonPage() {
	const setItems = useToolbarStore(state => state.setItems);
	const items = useToolbarStore(state => state.items as ToolbarItemsProp<keyof AppButtonTypes.Prop>[]);

	const initialItems: ToolbarItemsProp<keyof AppButtonTypes.Prop>[] = [
		{
			type: 'input',
			prop: 'children',
			title: 'Text',
			value: 'Button',
		},
		{
			type: 'select',
			prop: 'variant',
			title: 'Variant',
			value: '',
			options: [
				{ text: 'Solid', value: 'solid' },
				{ text: 'Outlined', value: 'outlined' },
				{ text: 'Text', value: 'text' },
			],
		},
		{
			type: 'toggle',
			prop: 'disabled',
			title: 'Disabled',
			value: false,
		},
		{
			type: 'toggle',
			prop: 'loading',
			title: 'Loading',
			value: false,
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
			type: 'segment',
			prop: 'tone',
			title: 'Tone',
			value: 'dark',
			options: [
				{ text: 'Light', value: 'light' },
				{ text: 'Dark', value: 'dark' },
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
			],
		},
		{
			type: 'color',
			prop: 'color',
			title: 'Color',
			value: 'blue-500',
		},
		{
			type: 'icon',
			prop: 'icon',
			title: 'Icon',
			value: '',
		},
	];
	
	useEffect(() => {
		setItems(initialItems);
	}, []);

	const buttonProps = (): AppButtonTypes.Prop => {
		const props: AppButtonTypes.Prop = {};
		items.map((item) => {
			props[item.prop] = item.value;
		})
		return props;
	}
	
	return (
		<div className="bg-[#252525] flex flex-col gap-3 justify-center items-center w-full">
			<div>
				<AppButton
					color="purple-500"
					{...buttonProps()}
				>
				</AppButton>
			</div>
			{/* <div>
				<AppFormSelect
					items={options}
					modelValue={select}
					updateModelValue={(value)=>setSelect(value)}
					placeholder="Select an option"
					color="indigo-500"
				>
				</AppFormSelect>
			</div> */}
		</div>
	);
}