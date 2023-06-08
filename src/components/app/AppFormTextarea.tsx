import { FormEvent, HtmlHTMLAttributes } from "react";
import AppFormContainer from "./AppFormContainer";
import { InputVariant, TailwindColor } from "./types";

export default function AppFormInput(props: Prop) {
	/** CONTAINER PROPS */

	const containerProps = () => {
		const { color, error, success, label, required, message, disabled, size, variant, float, block } = props;

		return { color, error, success, label, required, message, disabled, size, variant, float, block };
	}


	/** TEXTAREA PROPS */

	const textareaProps = () => {
		const { name, placeholder, disabled, autoFocus, readOnly, updateModelValue } = props;

		return { name, placeholder, disabled, autoFocus, readOnly, updateModelValue };
	}


	/** UPDATE MODEL VALUE */
	
	function updateModelValue(event: FormEvent<HTMLTextAreaElement>) {
		const target = event.target as HTMLTextAreaElement
		if (target.value !== undefined) {
			props.updateModelValue && props.updateModelValue(target.value);
		}
	}

	return (
		// Container
		<AppFormContainer
			{...containerProps()}
		>
			<textarea
				value={props.modelValue}
				onInput={updateModelValue}
				{...textareaProps()}
				className={`
					bg-transparent outline-none w-full
					${props.disabled ? 'opacity-75' : ''}
					${props.block ? 'w-full' : ''}
				`}
			>
			</textarea>
		</AppFormContainer>
	);
}

// Types
export type InputSize = 'xs'|'sm'|'md'|'lg'|'xl';

export interface Prop extends HtmlHTMLAttributes<unknown> {
  modelValue?: string
  autoFocus?: boolean
  readOnly?: boolean
  name?: string
  placeholder?: string
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
	/** Emits */
	updateModelValue?: (value: string)=>void
}

