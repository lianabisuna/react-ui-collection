import { AppButton, AppModal, type AppModalTypes } from "@/components/app";
import { ToolbarItemsProp, useToolbarStore } from "@/stores/toolbarStore";
import { useEffect, useState } from "react";

export default function ModalPage() {
	const [modal, setModal] = useState(false);

	const setItems = useToolbarStore(state => state.setItems);
	const items = useToolbarStore(state => state.items as ToolbarItemsProp<keyof AppModalTypes.Prop>[]);

	const initialItems: ToolbarItemsProp<keyof AppModalTypes.Prop>[] = [
		// {
		// 	type: 'select',
		// 	prop: 'position',
		// 	title: 'Position',
		// 	value: 'top',
		// 	options: [
		// 		{ text: 'Top', value: 'top' },
		// 		{ text: 'Right', value: 'right' },
		// 		{ text: 'Bottom', value: 'bottom' },
		// 		{ text: 'Left', value: 'left' },
		// 	],
		// },
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
			type: 'toggle',
			prop: 'persistent',
			title: 'Persistent',
			value: false,
		},
		{
			type: 'toggle',
			prop: 'closeIcon',
			title: 'Closable',
			value: false,
		},
		{
			type: 'segment',
			prop: 'hideBackdrop',
			title: 'Backdrop',
			value: false,
			options: [
				{ text: 'Yes', value: false },
				{ text: 'No', value: true },
			],
		},
		{
			type: 'input',
			prop: 'header',
			title: 'Header',
			value: 'Header',
		},
		{
			type: 'textarea',
			prop: 'children',
			title: 'Body',
			value: 'Body',
		},
		{
			type: 'input',
			prop: 'footer',
			title: 'Footer',
			value: 'Footer',
		},
	];
	
	useEffect(() => {
		setItems(initialItems);
	}, []);

	const componentProps = (): AppModalTypes.Prop => {
		const props: AppModalTypes.Prop = {};
		items.map((item) => {
			props[item.prop] = item.value;
		})
		const { modelValue, updateModelValue, header, children, footer, ...rest } = props;
		return rest;
	}

  const headerValue = () => {
		const item = items.find((item) => item.prop==='header');
		return item?.value;
	}

  const childrenValue = () => {
		const item = items.find((item) => item.prop==='children');
		return item?.value;
	}

  const footerValue = () => {
		const item = items.find((item) => item.prop==='footer');
		return item?.value;
	}
	
	return (
		<div>
			<AppButton
				color="blue-500"
				onClick={()=>setModal(!modal)}
			>
				Modal
			</AppButton>
			<AppModal
				modelValue={modal}
				updateModelValue={setModal}
				{...componentProps()}
			>
				<div className="p-5 flex flex-col gap-3">
					<div className="text-xl">{headerValue()}</div>
					<div>{childrenValue()}</div>
					<div>{footerValue()}</div>
				</div>
			</AppModal>
		</div>
	);
}