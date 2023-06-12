import { ChangeEvent, ReactNode } from "react";
import { TailwindColor } from "./types";

export default function AppFormRadio(props: Prop) {

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
          type="radio"
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
								bg-transparent flex h-5 w-5 items-center justify-center rounded-full border border-gray-400 [&_span]:opacity-0 peer-checked:[&_span]:opacity-100 peer-checked:text-white fill-white p-1
								peer-checked:border-${props.color}
                ${props.disabled ? 'opacity-75 pointer-events-none' : ''}
							`}
						>
							<span>
								<div
									className={`
									rounded-full h-3 w-3
										bg-${props.color}
									`}
								>
								</div>
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
export type RadioSize = 'xs'|'sm'|'lg'|'xl';

export type Prop = {
  children?: ReactNode;
  modelValue?: boolean;
	updateModelValue?: (value: boolean)=>void;
  size?: RadioSize;
  color?: TailwindColor;
  disabled?: boolean;
  label?: string;
}