import { AppButton, AppTooltip, AppTooltipTypes } from "@/components/app";
import { useToolbarStore } from "@/stores";
import { ToolbarItemsProp } from "@/stores/toolbarStore";
import { useEffect } from "react";

export default function TooltipPage() {
	const setItems = useToolbarStore(state => state.setItems);
	const items = useToolbarStore(state => state.items as ToolbarItemsProp<keyof AppTooltipTypes.Prop>[]);

	const initialItems: ToolbarItemsProp<keyof AppTooltipTypes.Prop>[] = [
		{
			type: 'select',
			prop: 'position',
			title: 'Position',
			value: 'top',
			options: [
				{ text: 'Top', value: 'top' },
				{ text: 'Right', value: 'right' },
				{ text: 'Bottom', value: 'bottom' },
				{ text: 'Left', value: 'left' },
			],
		},
		{
			type: 'select',
			prop: 'trigger',
			title: 'Trigger',
			value: 'text',
			options: [
				{ text: 'Button', value: 'button' },
				{ text: 'Text', value: 'text' },
				{ text: 'Icon', value: 'icon' },
				// { text: 'Input', value: 'input' },
				// { text: 'Card', value: 'card' },
			],
		},
		// {
		// 	type: 'toggle',
		// 	prop: ('hidearrow' as 'hideArrow'),
		// 	title: 'Hide Arrow',
		// 	value: false,
		// },
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

	const componentProps = (): AppTooltipTypes.Prop => {
		const props: AppTooltipTypes.Prop = {};
		items.map((item) => {
			props[item.prop] = item.value;
		})
		const { trigger, ...rest } = props;
		return rest;
	}

	const triggerValue = () => {
		const item = items.find((item) => item.prop==='trigger');
		return item?.value;
	}

	function TriggerElement() {
		const text = 'Tooltip';
		switch (triggerValue()) {
			case 'button':
				return (
					<AppButton
						color="blue-500"
					>
						{text}
					</AppButton>
				);
			case 'icon':
				return (
					<AppButton
						color="blue-500"
						icon="EnvelopeIcon"
					>
						{text}
					</AppButton>
				);
			case 'text': default:
				return (
					<p className="text-white font-medium">{text}</p>
				);
		}
	}
	
	return (
		<div>
			<AppTooltip
				trigger={<TriggerElement></TriggerElement>}
				{...componentProps()}
			>
			</AppTooltip>
		</div>
	);
}