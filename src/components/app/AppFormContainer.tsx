import { HtmlHTMLAttributes, useRef } from "react";
import type { InputVariant, TailwindColor } from "./types";
import AppFormLabel from "./AppFormLabel";
import AppFormMessage from "./AppFormMessage";

export default function AppFormContainer(props: Prop) {
	/** CLASSES */

	const bgClass = () => {
		switch (props.variant) {
			case 'outlined': case 'underlined': return 'bg-transparent dark:bg-transparent'
			case 'filled': return 'bg-gray-100 dark:bg-gray-700'
			default: return 'bg-white dark:bg-gray-800'
		}
	}

	const textClass = () => {
		return 'text-gray-800 dark:text-gray-100'
	}

	const borderClass = () => {
		switch (props.variant) {
			case 'filled': return 'border-none'
			case 'underlined': return 'border-b'
			case 'outlined': default:
				if (props.error) return 'border border-red-500'
				else if (props.success) return 'border border-green-500'
				else return 'border border-gray-400 focus-within:border-gray-800 dark:border-gray-600 dark:focus-within:border-gray-100'
		}
	}

	const groupFocusClass = () => {
		if (props.error) return 'group-focus-within:border-red-500'
		else if (props.success) return 'group-focus-within:border-green-500'
		else return `group-focus-within:border-${props.color}`
	}

	const paddingYClass = () => {
		if (props.float) {
			switch (props.variant) {
				case 'outlined':
					switch (props.size) {
						case 'xs': return 'py-3'
						case 'sm': return 'py-3.5'
						case 'lg': return 'py-[1.125rem]'
						case 'xl': return 'py-5'
						default: return 'py-4'
					}
				case 'underlined':
					switch (props.size) {
						case 'xs': return 'pt-4 pb-1'
						case 'sm': return 'pt-5 pb-1'
						case 'lg': return 'pt-7 pb-1'
						case 'xl': return 'pt-8 pb-1'
						default: return 'pt-6 pb-1'
					}
				case 'filled': default:
					switch (props.size) {
						case 'xs': return 'pt-4 pb-1'
						case 'sm': return 'pt-5 pb-1.5'
						case 'lg': return 'pt-7 pb-2.5'
						case 'xl': return 'pt-8 pb-3'
						default: return 'pt-6 pb-2'
					}
			}
		} else {
			switch (props.size) {
				case 'xs': return 'py-1'
				case 'sm': return 'py-1.5'
				case 'lg': return 'py-2.5'
				case 'xl': return 'py-3'
				default: return 'py-2'
			}
		}
	}

	const paddingXClass = () => {
		if (props.variant === 'underlined') return 'px-0'
		else {
			switch (props.size) {
				case 'xs': return 'px-2'
				case 'sm': return 'px-2.5'
				case 'lg': return 'px-3.5'
				case 'xl': return 'px-4'
				default: return 'px-3'
			}
		}
	}

	const classList = [
		bgClass(),
		textClass(),
		borderClass(),
		groupFocusClass(),
		paddingYClass(),
		paddingXClass()
	].join(' ');


	/** FOCUS ON INPUT UPON CLICKING CONTAINER */
	
	// Data
	const containerRef = useRef<HTMLDivElement>(null);
	
	// Function
	const handleClick: typeof props.onClick = (event) => {
		props.onClick && props.onClick(event);
		if (!containerRef.current) return;
		containerRef.current.querySelector('input')?.focus();
	}


	/** LABEL PROPS */

	const labelProps = () => {
		const { required, color, error, success, size } = props;
		return { required, color, error, success, size };
	}


	/** FLOATING LABEL PROPS */

	const floatingLabelProps = () => {
		const { required, color, error, success, size, float, variant } = props;
		return { required, color, error, success, size, float, variant };
	}


	/** MESSAGE PROPS */

	const messageProps = () => {
		const { error, success } = props;
		return { error, success };
	}

  return (
		<div
			ref={containerRef}
			className={`
				group flex flex-col
				${props.block ? 'w-full' : ''}
			`}
			onClick={handleClick}
		>
			{/* Label */}
			{(props.label && !props.float) && (
				<AppFormLabel
					{...labelProps()}
				>
					{props.label}
				</AppFormLabel>
			)}
			{/* Input Container */}
			<div
				className={`
					${classList} relative flex items-center cursor-text justify-between
					${props.variant !== 'underlined' ? 'rounded' : ''}
					${props.disabled ? 'opacity-75 pointer-events-none' : ''}
					${props.block ? 'w-full' : ''}
				`}
			>
				{props.children}
				{/* Floating Label */}
				{props.float && (
					<AppFormLabel
						{...floatingLabelProps()}
					>
						{props.label}
					</AppFormLabel>
				)}
			</div>
			{/* Message */}
			<AppFormMessage
				{...messageProps()}
			>
				{props.message}
			</AppFormMessage>
		</div>
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