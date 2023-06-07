import { XMarkIcon } from "@heroicons/react/24/outline";
import { ColorTone, RoundedSize, TailwindColor } from "./types";
import { ReactNode } from "react";

export default function AppButton(props: Prop) {

  /** CLASSES */
  
  const sizeClass = () => {
    switch (props.size) {
      case 'xs': return 'px-1.5 py-1 text-[10px]'
      case 'sm': return 'px-2.5 py-1 text-sm'
      case 'lg': return 'px-3 py-1 text-lg'
      case 'xl': return 'px-3 py-1.5 text-xl'
      default: return 'px-2.5 py-1 text-base'
    }
  }
  
  const bgClass = () => {
    if (props.outlined) return `bg-transparent hover:bg-${props.color}/5`
    else return `bg-${props.color} hover:bg-${props.color}/90`
  }
  
  const textClass = () => {
    if (props.outlined) {
      return `text-${props.color}`
    }
    else {
      switch (props.tone) {
        case 'light': return 'text-gray-800'
        case 'dark': default: return 'text-gray-100'
      }
    }
  }
  
  const roundedClass = () => {
    if (props.rounded) return `rounded-${props.rounded}`
    else return 'rounded'
  }
  
  const borderClass = () => {
    if (!props.outlined) return
    return `border border-${props.color}`
  }

  const classList = [
    bgClass(),
    sizeClass(),
    textClass(),
    borderClass(),
    roundedClass()
  ].join(' ');

  return (
    <div
      className={`
        ${classList}
        inline-flex items-center justify-center text-center font-medium
        outline-${props.color}/50
      `}
    >
      {props.children}
      {props.closable && (
        <button
          type="button"
          className={`
            ml-1.5 rounded-full outline-none p-px flex items-center justify-center
            ${
              props.outlined
                ? `text-${props.color} hover:bg-${props.color}/20`
                : 'text-white hover:bg-black/10'
            }
          `}
        >
          <XMarkIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

// Types
export type ComponentSize = 'xs'|'sm'|'md'|'lg'|'xl';

export type Prop = {
  children?: ReactNode;
  size?: ComponentSize;
  rounded?: RoundedSize;
  color?: TailwindColor;
  outlined?: boolean;
  closable?: boolean;
  tone?: ColorTone;
}