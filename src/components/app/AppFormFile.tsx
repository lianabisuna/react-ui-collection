import { ChangeEvent, DragEvent, HtmlHTMLAttributes, ReactNode, useRef, useState } from "react";
import AppFormContainer from "./AppFormContainer";
import { InputVariant, TailwindColor } from "./types";
import AppChip from "./AppChip";
import { fileHelper } from "@/helpers";
import { ArrowUpTrayIcon, DocumentIcon, XMarkIcon } from "@heroicons/react/24/outline";

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
			const isValidSize = props.maxSize && props.maxSize > 0 && file.size <= props.maxSize;
			if (isValidSize) return {};
			else return {
				lastModified: file.lastModified,
				name: file.name,
				size: file.size,
				type: file.type,
				webkitRelativePath: file.webkitRelativePath,
				formattedSize: fileHelper.formatBytes(file.size),
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
		const updatedModelValue = props.modelValue.filter((_, key) => key !== index)
		props.updateModelValue && props.updateModelValue(updatedModelValue);
	}


	/** FILTER MODEL VALUE */

	const filteredModelValue = () => {
		if (!props.modelValue?.length) return;
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
	const [isDragging, setIsDragging] = useState(false);

	// Function
	const onFileDrop = (event: DragEvent<HTMLDivElement>) => {
		event.stopPropagation()
		const target = event.dataTransfer
		if (target && target.files) {
			const fileArray = formatFileList(target.files)
			props.updateModelValue && props.updateModelValue(fileArray);
		}
	}

	return (
		<>
			{props.dropzone
				? (
					<div
						className={`
							flex flex-col w-full
							${props.block ? 'w-full' : ''}
						`}
					>
						{/* Box */}
						<div
							className={`
								flex flex-col h-[200px] border-dashed border-2 rounded-lg cursor-pointer bg-gray-100 border-gray-300 hover:bg-gray-200/70 text-gray-500 dark:bg-gray-600 dark:border-gray-500 dark:hover:bg-gray-600/80 dark:text-gray-300
								${isDragging ? 'bg-gray-200/70 dark:bg-gray-600/80' : ''}
								${props.disabled ? 'opacity-75 pointer-events-none' : ''}
							`}
							onClick={onInputClick}
							onDragEnter={(e)=>{
								e.preventDefault();
								setIsDragging(true);
							}}
							onDragOver={(e)=>{
								e.preventDefault();
								setIsDragging(true);
							}}
							onDragLeave={(e)=>{
								e.preventDefault();
								setIsDragging(false);
							}}
							onDrop={(e)=>{
								e.preventDefault();
								onFileDrop(e);
							}}
						>
							<input
								ref={inputRef}
								onChange={updateModelValue}
								type="file"
								disabled={props.disabled}
								accept={props.accept}
								multiple={props.multiple}
								className="peer sr-only"
							/>
							<div className="flex flex-col justify-center items-center h-full gap-3">
								<ArrowUpTrayIcon className="h-6 w-6 path-stroke-2" />
								<p className="text-sm font-medium">Drop files here <span className="font-normal">or</span> click to upload</p>
							</div>
						</div>
						{/* List */}
						{filteredModelValue() && (
							<ul className="flex flex-col gap-3 mt-5">
								{filteredModelValue()?.map((file, key) => (
									<li
										key={key}
										className="flex gap-3 border rounded p-3 border-gray-400 text-gray- dark:border-gray-600 dark:text-gray-100"
									>
										<div className="flex flex-shrink justify-center items-center">
											<div
												className="flex justify-center items-center h-12 w-12 p-1.5 rounded bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-200"
											>
												<DocumentIcon className="h-7 w-7" />
											</div>
										</div>
										<div className="flex flex-grow flex-col items-start justify-center">
											<div className="font-semibold mb-1">{file.name}</div>
											<div className="text-sm text-gray-500">{file.formattedSize}</div>
										</div>
										<div className="flex flex-shrink-1 gap-1.5">
											<button
												className="flex justify-center items-center bg-transparent outline-none rounded px-1.5"
												onClick={()=>removeFile(key)}
											>
												<XMarkIcon className="h-5 w-5" />
											</button>
										</div>
									</li>
								))}
							</ul>
						)}
					</div>
				)
				: (
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
				)
			}
		</>
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
	formattedSize?: string;
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