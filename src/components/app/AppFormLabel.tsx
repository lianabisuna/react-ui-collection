import { HtmlHTMLAttributes } from "react"
import { InputVariant, TailwindColor } from "./types"

export default function AppFormLabel(props: Prop) {
  /** CLASSES */

  const textClass = () => {
    if (props.error) return 'text-red-500 group-focus-within:text-red-500'
    else if (props.success) return 'text-green-500 group-focus-within:text-green-500'
    else {
      if (props.float) return 'text-gray-600 dark:text-gray-400'
      else return 'text-gray-800 dark:text-gray-100'
    }
  }

  const sizeClass = () => {
    switch (props.size) {
      case 'xs': return 'text-xs'
      case 'sm': return 'text-sm'
      case 'lg': return 'text-lg'
      case 'xl': return 'text-xl'
      default: return 'text-base'
    }
  }

  const positionClass = () => {
    if (!props.float) return
    switch (props.variant) {
      case 'outlined': return 'top-0 -translate-y-1/2 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-0 px-1.5 peer-placeholder-shown:px-0 peer-focus:px-1.5'
      case 'underlined': return 'bottom-full translate-y-full peer-placeholder-shown:bottom-1 peer-placeholder-shown:translate-y-0 peer-focus:bottom-full peer-focus:translate-y-full'
      case 'filled': default: return 'top-0.5 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-0.5 peer-focus:translate-y-0'
      
    }
  }

  const bgClass = () => {
    if (!props.float) return
    switch (props.variant) {
      case 'outlined': return 'bg-white peer-placeholder-shown:bg-transparent peer-focus:bg-white dark:bg-gray-900 dark:peer-placeholder-shown:bg-transparent dark:peer-focus:bg-gray-900'
      case 'filled': case 'underlined': default: return ''
    }
  }

  const classList = [
    bgClass(),
    sizeClass(),
    textClass(),
    positionClass()
  ].join(' ');

  return (
		<label
      className={`
        ${classList}
        ${props.float ? 'absolute z-10 scale-75 peer-focus:scale-75 peer-placeholder-shown:scale-100 origin-[0] transform duration-300 cursor-text' : 'mb-1.5'}
        group-focus-within:text-${props.color}
      `}
    >
      {props.children}
      {props.required && (<span className="ml-px text-red-500">*</span>)}
    </label>
  );
}

// Types
export type ContainerSize = boolean|'xs'|'sm'|'md'|'lg'|'xl'

interface Prop extends HtmlHTMLAttributes<unknown> {
  required?: boolean
	color?: TailwindColor
	error?: boolean
	success?: boolean
	label?: string
	message?: string
	disabled?: boolean
	size?: ContainerSize
	variant?: InputVariant
	float?: boolean
	block?: boolean
}