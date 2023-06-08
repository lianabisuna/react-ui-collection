import { FormEvent, HtmlHTMLAttributes, ReactNode } from "react";
import AppFormContainer from "./AppFormContainer";
import { ClassBinding, InputVariant, TailwindColor } from "./types";

export default function AppFormInput(props: Prop) {
	/** CONTAINER PROPS */

	const containerProps = () => {
		const { color, error, success, label, required, message, disabled, size, variant, float, block } = props;

		return { color, error, success, label, required, message, disabled, size, variant, float, block };
	}


	/** INPUT PROPS */

	const inputProps = () => {
		const { name, type, disabled, autofocus, readOnly, updateModelValue } = props;

		return { name, type, disabled, autofocus, readOnly, updateModelValue };
	}


	/** UPDATE MODEL VALUE */
	
	function updateModelValue(event: FormEvent<HTMLInputElement>) {
		const target = event.target as HTMLInputElement
		if (target.value !== undefined) {
			props.updateModelValue && props.updateModelValue(target.value);
		}
	}


	/** CLASSES */
	
	const sizeClass = () => {
		switch (props.size) {
			case 'xs': return 'text-xs'
			case 'sm': return 'text-sm'
			case 'lg': return 'text-lg'
			case 'xl': return 'text-xl'
			default: return 'text-base'
		}
	}

	const classList = [
    sizeClass(),
		props.inputClass
  ].join(' ');

	return (
		// Container
		<AppFormContainer
			{...containerProps()}
		>
			{/* Prepend */}
			{props.prepend}
			{/* Input */}
			<input
				value={props.modelValue}
				onInput={updateModelValue}
				placeholder={props.float ? ' ' : props.placeholder}
				{...inputProps()}
				className={`
					${classList} peer flex flex-1 bg-transparent outline-none
					${props.prepend ? 'ml-2' : ''}
					${props.append ? 'mr-2' : ''}
					${props.float ? 'placeholder-gray-400 placeholder-opacity-0' : ''}
					${props.block ? 'w-full' : ''}
				`}
			/>
			{/* Append */}
			{props.append}
		</AppFormContainer>
	);
}

// Types
export type HTMLInputType = 'email'|'number'|'password'|'reset'|'search'|'submit'|'tel'|'text'|'url';
export type InputSize = 'xs'|'sm'|'md'|'lg'|'xl';

export interface Prop extends HtmlHTMLAttributes<unknown> {
  modelValue?: string|number
  autofocus?: boolean
  readOnly?: boolean
  name?: string
  placeholder?: string
  type?: HTMLInputType
  inputClass?: ClassBinding
	/** Form Container */
	required?: boolean
	color?: TailwindColor
	error?: boolean
	success?: boolean
	label?: string
	message?: string
	disabled?: boolean
	size?: InputSize
	variant?: InputVariant
	float?: boolean
	block?: boolean
	/** Slots */
	prepend?: ReactNode
	append?: ReactNode
	/** Emits */
	updateModelValue?: (value: string|number)=>void
}

