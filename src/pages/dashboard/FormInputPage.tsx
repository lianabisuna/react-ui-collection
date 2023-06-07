import { AppFormInput, type AppFormInputTypes } from "@/components/app";
import { ToolbarItemsProp, useToolbarStore } from "@/stores/toolbarStore";
import { useEffect, useState } from "react";

export default function FormInputPage() {
	const [input, setInput] = useState<string|number>('');

	const setItems = useToolbarStore(state => state.setItems);
	const items = useToolbarStore(state => state.items as ToolbarItemsProp<keyof AppFormInputTypes.Prop>[]);

	const initialItems: ToolbarItemsProp<keyof AppFormInputTypes.Prop>[] = [
		{
			type: 'toggle',
			prop: ('readonly' as 'readOnly'),
			title: 'Read Only',
			value: false,
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
			value: '',
		},
		{
			type: 'select',
			prop: 'type',
			title: 'Type',
			value: 'text',
			options: [
				{ text: 'Text', value: 'text' },
				{ text: 'Number', value: 'number' },
				{ text: 'Email', value: 'email' },
				{ text: 'Search', value: 'search' },
				{ text: 'Number', value: 'number' },
				{ text: 'Password', value: 'password' },
				{ text: 'Telephone', value: 'tel' },
				{ text: 'URL', value: 'url' },
			],
		},
		{
			type: 'color',
			prop: 'color',
			title: 'Color',
			value: 'blue-500',
		},
		{
			type: 'toggle',
			prop: 'disabled',
			title: 'Disabled',
			value: false,
		},
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
			type: 'input',
			prop: 'prepend',
			title: 'Prepend',
			value: '',
		},
		{
			type: 'input',
			prop: 'append',
			title: 'Append',
			value: '',
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
	];
	
	useEffect(() => {
		setItems(initialItems);
	}, []);

	const componentProps = (): AppFormInputTypes.Prop => {
		const props: AppFormInputTypes.Prop = {};
		items.map((item) => {
			props[item.prop] = item.value;
		})
		const { modelValue, updateModelValue, ...rest } = props;
		return rest;
	}
	
	return (
		<div>
			<AppFormInput
				modelValue={input}
				updateModelValue={setInput}
				{...componentProps()}
			>
			</AppFormInput>
		</div>
	);
}