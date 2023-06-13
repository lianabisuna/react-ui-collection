import { AppFormFile, type AppFormFileTypes } from "@/components/app";
import { FileProp } from "@/components/app/AppFormFile";
import { ToolbarItemsProp, useToolbarStore } from "@/stores/toolbarStore";
import { useEffect, useState } from "react";

export default function FormFilePage() {
	const [input, setInput] = useState<FileProp[]>([]);

	const setItems = useToolbarStore(state => state.setItems);
	const items = useToolbarStore(state => state.items as ToolbarItemsProp<keyof AppFormFileTypes.Prop>[]);

	const initialItems: ToolbarItemsProp<keyof AppFormFileTypes.Prop>[] = [
		{
			type: 'toggle',
			prop: 'disabled',
			title: 'Disabled',
			value: false,
		},
		{
			type: 'toggle',
			prop: 'showSize',
			title: 'Details',
			value: false,
		},
		// {
		// 	type: 'toggle',
		// 	prop: 'float',
		// 	title: 'Floating Label',
		// 	value: false,
		// },
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
			type: 'select',
			prop: 'maxSize',
			title: 'Size',
			value: 100,
			options: [
				{ text: 'Unlimited', value: '' },
				{ text: '1 KB', value: 100 },
				{ text: '3 MB', value: 3000 },
				{ text: '10 MB', value: 10000 },
				{ text: '512 MB', value: 512000 },
				{ text: '1 GB', value: 1000000 },
			],
		},
		{
			type: 'select',
			prop: 'accept',
			title: 'Format',
			value: '',
			options: [
				{ text: 'All', value: '' },
				{ text: 'Image', value: 'image/*' },
				{ text: 'Audio', value: 'audio/*' },
				{ text: 'Video', value: 'video/*' },
				{ text: 'Application', value: 'application/*' },
				{ text: 'Font', value: 'application/*' },
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

	const componentProps = (): AppFormFileTypes.Prop => {
		const props: AppFormFileTypes.Prop = {};
		items.map((item) => {
			props[item.prop] = item.value;
		})
		const { modelValue, updateModelValue, single, multiple, ...rest } = props;
		return rest;
	}

  const multipleValue = () => {
		const item = items.find((item) => item.prop==='multiple');
		return item?.value;
	}
	
	return (
		<div>
			<AppFormFile
				modelValue={input}
				updateModelValue={setInput}
				multiple={multipleValue()}
				{...componentProps()}
			>
			</AppFormFile>
		</div>
	);
}