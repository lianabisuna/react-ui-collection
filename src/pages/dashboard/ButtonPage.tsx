import { AppButton, AppFormSelect } from "@/components/app";
import { useState } from "react";

export default function ButtonPage() {
	const [select, setSelect] = useState<string|string[]>();
	const options = [
		{ text: 'Lenovo', value: 'lenovo' },
		{ text: 'HP', value: 'hp' },
		{ text: 'Acer', value: 'acer' },
		{ text: 'MSI', value: 'msi' },
		{ text: 'Dell', value: 'dell' },
	];
	
	return (
		<div className="bg-[#252525] flex flex-col gap-3 justify-center items-center w-full">
			<div>
				<AppButton
					color="purple-500"
				>
					Button
				</AppButton>
			</div>
			<div>
				<AppFormSelect
					items={options}
					modelValue={select}
					updateModelValue={(value)=>setSelect(value)}
					placeholder="Select an option"
					color="indigo-500"
				>
				</AppFormSelect>
			</div>
		</div>
	);
}