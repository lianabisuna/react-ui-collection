import { ChangeEvent, ReactNode } from "react";
import { TailwindColor } from "./types";

export default function AppFormSwitch(props: Prop) {

  /** UPDATE MODEL VALUE */
  
  const updateModelValue = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    props.updateModelValue && props.updateModelValue(target.checked);
  }

  return (
    <label className="flex cursor-pointer select-none items-center">
      {/* Switch */}
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
                relative flex items-center justify-center bg-gray-300 h-8 w-14 rounded-full [&_span]:left-0 peer-checked:[&_span]:translate-x-full
                peer-checked:bg-${props.color}
                ${props.disabled ? 'opacity-75 pointer-events-none' : ''}
              `}
            >
              <span
                className={`
                  transition absolute rounded-full h-6 w-6 mx-1 bg-white
                  bg-${props.color}
                `}
              >
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
export type SwitchSize = 'xs'|'sm'|'lg'|'xl';

export type Prop = {
  children?: ReactNode;
  modelValue?: boolean;
	updateModelValue?: (value: boolean)=>void;
  size?: SwitchSize;
  color?: TailwindColor;
  disabled?: boolean;
  label?: string;
}