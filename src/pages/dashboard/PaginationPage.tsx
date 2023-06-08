import { AppPagination, type AppPaginationTypes } from "@/components/app";
import { useToolbarStore } from "@/stores";
import { type ToolbarItemsProp } from "@/stores/toolbarStore";
import { useEffect, useState } from "react";

export default function ButtonPage() {
  const [activePage, setActivePage] = useState(1);

	const setItems = useToolbarStore(state => state.setItems);
	const items = useToolbarStore(state => state.items as ToolbarItemsProp<keyof AppPaginationTypes.Prop>[]);

	const initialItems: ToolbarItemsProp<keyof AppPaginationTypes.Prop>[] = [
		{
			type: 'input',
			prop: 'length',
			title: 'Pages',
			value: 3,
      componentProps: {
        type: 'number',
        max: 5
      }
		},
		{
			type: 'color',
			prop: 'color',
			title: 'Color',
			value: 'blue-500',
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
			prop: 'icon',
			title: 'Navigation',
			value: true,
			options: [
				{ text: 'Icon', value: true },
				{ text: 'Text', value: false },
			],
		},
	];
	
	useEffect(() => {
		setItems(initialItems);
	}, []);

	const componentProps = (): AppPaginationTypes.Prop => {
		const props: AppPaginationTypes.Prop = {};
		items.map((item) => {
			props[item.prop] = item.value;
		})
    const { modelValue, updateModelValue, icon, length, ...rest } = props;
		return rest;
	}

  const iconValue = () => {
		const item = items.find((item) => item.prop==='icon');
		return item?.value;
	}

  const lengthValue = () => {
		const item = items.find((item) => item.prop==='length');
		return item?.value;
	}
	
	return (
		<div>
			<AppPagination
        modelValue={activePage}
        updateModelValue={setActivePage}
        length={
          lengthValue()>5
            ? 5
            : lengthValue()<1
              ? 1
              : lengthValue()
        }
        previous={iconValue() ? '' : 'Previous'}
        next={iconValue() ? '' : 'Next'}
				{...componentProps()}
			>
			</AppPagination>
		</div>
	);
}