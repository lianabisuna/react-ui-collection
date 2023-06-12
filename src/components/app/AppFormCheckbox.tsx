import { ChangeEvent, ReactNode } from "react";
import { TailwindColor } from "./types";

export default function AppFormCheckbox(props: Prop) {

	/** UPDATE MODEL VALUE */
	
  const updateModelValue = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    props.updateModelValue && props.updateModelValue(target.checked);
  }

  return (
    <label className="flex cursor-pointer select-none items-center">
			{/* Checkbox */}
			<div className="relative">
			{/* Hidden */}
				<input
          type="checkbox"
          checked={props.modelValue}
          onChange={updateModelValue}
          className="peer sr-only"
          disabled={props.disabled}
				/>
				{/* Display */}
        {props.children
          ? props.children
          : (
						<div
							className={`
								bg-transparent flex h-5 w-5 items-center justify-center rounded border border-gray-400 [&_span]:opacity-0 peer-checked:[&_span]:opacity-100 peer-checked:text-white fill-white
								peer-checked:bg-${props.color} peer-checked:border-${props.color}
                ${props.disabled ? 'opacity-75 pointer-events-none' : ''}
							`}
						>
							<span className="h-3 w-3">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
									<path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/>
								</svg>
							</span>
						</div>
					)
				}
			</div>
			{/* Label */}
			<span className="ml-2">{props.label}</span>
		</label>
  );
}

// Types
export type CheckboxSize = 'xs'|'sm'|'lg'|'xl';

export type Prop = {
  children?: ReactNode;
  modelValue?: boolean;
	updateModelValue?: (value: boolean)=>void;
  size?: CheckboxSize;
  color?: TailwindColor;
  disabled?: boolean;
  label?: string;
}