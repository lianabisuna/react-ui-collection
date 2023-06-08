import { useState } from "react";
import type { OptionProp, TailwindColor } from "./types";

export default function AppTab(props: Prop) {
	/** FILTERED ITEMS */

	const filteredItems = () => {
    if (!props.items) return;
		const _items = [ ...props.items as OptionProp[] ];
		return _items.map((item) => {
			if (typeof item === 'string')
				return { text: item, value: item }
			else
				return item
		})
	};


  const [active, setActive] = useState('');

  return (
    <div className="w-full border-b border-gray-200">
      <ul className="flex flex-wrap bg-transparent -mb-px">
        {filteredItems()?.map((item, key) => (
          <li
            key={key}
            className={`
              py-2 px-3 font-semibold inline-flex
              ${active===item.value
                  ? `border-b-2 border-${props.color} text-${props.color}`
                  : 'border-b text-gray-500 hover:border-b-2 hover:border-gray-300 hover:text-gray-600'
              }
            `}
            role="button"
            onClick={()=>setActive(item.value)}
          >
            {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Types
export type Prop = {
  items?: OptionProp[]|string[];
  color?: TailwindColor;
}