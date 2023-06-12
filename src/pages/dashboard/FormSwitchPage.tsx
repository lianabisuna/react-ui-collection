import { AppFormInput, type AppFormInputTypes } from "@/components/app";
import { ToolbarItemsProp, useToolbarStore } from "@/stores/toolbarStore";
import { useEffect, useState } from "react";

export default function FormSwitchPage() {
	const [input, setInput] = useState<string|number>('');

	const setItems = useToolbarStore(state => state.setItems);
	const items = useToolbarStore(state => state.items as ToolbarItemsProp<keyof AppFormInputTypes.Prop>[]);

	const initialItems: ToolbarItemsProp<keyof AppFormInputTypes.Prop>[] = [
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