import { ChangeEvent, HtmlHTMLAttributes, ReactNode, useRef } from "react";
import AppFormContainer from "./AppFormContainer";
import { InputVariant, TailwindColor } from "./types";
import AppChip from "./AppChip";
import { fileHelper } from "@/helpers";

export default function AppFormInput(props: Prop) {
	/** CONTAINER PROPS */

	const containerProps = () => {
		const { color, error, success, label, required, message, disabled, size, variant, float, block } = props;

		return { color, error, success, label, required, message, disabled, size, variant, float, block };
	}


	/** TRIGGER INPUT CLICK */

	// Data
	const inputRef = useRef<HTMLInputElement>(null);

	// Function
	const onInputClick = () => {
		inputRef.current?.addEventListener('click', (_event: MouseEvent) => {
			_event.stopPropagation()
		})
		inputRef.current?.click()
	}


	/** CONVERT FILE LIST TO ARRAY */
	const formatFileList = (fileList: FileList): FileProp[] => {
		const fileArray = Array.from(fileList).map((file) => {
			if (props.maxSize && props.maxSize > 0 && file.size > props.maxSize) {
				return {}
			}
			else return {
				lastModified: file.lastModified,
				name: file.name,
				size: file.size,
				type: file.type,
				webkitRelativePath: file.webkitRelativePath,
			}
		}).filter((file) => file)
		return fileArray;
	}


	/** UPDATE MODEL VALUE */

	// Function: Update model value
	const updateModelValue = (event: ChangeEvent<HTMLInputElement>) => {
		const target = event.target as HTMLInputElement
		if (target && target.files) {
			const fileArray = formatFileList(target.files)
			props.updateModelValue && props.updateModelValue(fileArray);
		}
	}

	// Function: Remove file from list
	const removeFile = (index: number) => {
		if (!props.modelValue) return;
		const updatedModelValue = props.modelValue.filter((file, key) => key !== index)
		props.updateModelValue && props.updateModelValue(updatedModelValue);
	}


	/** FILTER MODEL VALUE */

	const filteredModelValue = () => {
		if (!props.modelValue?.length) return
		if (props.dropzone) return props.modelValue.map((file: any) => {
			return {
				...file,
				formattedSize: fileHelper.formatBytes(file.size)
			}
		})
		else return props.modelValue.map((file: any) => {
			const formattedSize = fileHelper.formatBytes(file.size)
			return props.showSize ? `${file.name} (${formattedSize})` : file.name
		})
	}


	/** HANDLE DRAG AND DROP FILES */

	// Data
	const isDragging = false;

	// Function
	const onFileDrop = (event: DragEvent) => {
		event.stopPropagation()
		const target = event.dataTransfer
		if (target && target.files) {
			const fileArray = formatFileList(target.files)
			props.updateModelValue && props.updateModelValue(fileArray);
		}
	}

	return (
		// Container
		<AppFormContainer
			{...containerProps()}
			onClick={onInputClick}
		>
			{/* Prepend */}
			{props.prepend}
			{/* Hidden */}
			<input
				ref={inputRef}
				onChange={updateModelValue}
				type="file"
				disabled={props.disabled}
				accept={props.accept}
				multiple={props.multiple}
				className="peer sr-only"
			/>
			{props.chip
				? (
					<div>
						<input
							defaultValue={filteredModelValue()}
							className="sr-only"
						/>
						{/* Placeholder */}
						{!filteredModelValue || !filteredModelValue?.length && (
							<div className="text-gray-400">
								{props.placeholder}
							</div>
						)
						}
						
						{/* Multiple */}
						{Array.isArray(filteredModelValue) && (
							<div className="flex flex-wrap gap-1.5">
								{filteredModelValue()?.map((item, key) => {
									return (
										<AppChip
											key={key}
											size="xs"
										>
											{item}
										</AppChip>
									)
								})}
							</div>
						)}
						{/* Single */}
						{!Array.isArray(filteredModelValue) && (
							<div>
								<AppChip size="xs">
									{filteredModelValue()}
								</AppChip>
							</div>
						)}
					</div>
				)
				: (
					<input
						defaultValue={filteredModelValue()}
						placeholder={props.float ? ' ' : props.placeholder}
						disabled={props.disabled}
						readOnly
						className={`
							bg-transparent outline-none cursor-text
							${props.prepend ? 'ml-2' : ''}
							${props.append ? 'mr-2' : ''}
							${props.float ? 'placeholder-gray-400 placeholder-opacity-0' : ''}
							${props.block ? 'w-full' : ''}
						`}
					/>
				)
			}
			{/* Append */}
			{props.append}
		</AppFormContainer>
	);
}

// Types
export type InputSize = 'xs'|'sm'|'md'|'lg'|'xl';
export interface FileProp {
	lastModified?: number;
	name?: string;
	size?: number;
	type?: string;
	webkitRelativePath?: string;
}

export interface Prop extends HtmlHTMLAttributes<unknown> {
  modelValue?: FileProp[];
  name?: string;
  placeholder?: string;
  chip?: boolean;
  single?: boolean;
  multiple?: boolean;
  dropzone?: boolean;
  accept?: string;
  maxSize?: number;
  showSize?: boolean;
	/** Form Container */
	required?: boolean;
	color?: TailwindColor;
	error?: boolean;
	success?: boolean;
	label?: string;
	message?: string;
	disabled?: boolean;
	size?: InputSize;
	variant?: InputVariant;
	float?: boolean;
	block?: boolean;
	/** Slots */
	prepend?: ReactNode
	append?: ReactNode
	/** Emits */
	updateModelValue?: (value: FileProp[])=>void;
}