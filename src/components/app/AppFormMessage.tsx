import { HtmlHTMLAttributes } from "react";

export default function AppFormMessage(props: Prop) {
  /** CLASSES */

  const textClass = () => {
    if (props.error) return 'text-red-500'
    else if (props.success) return 'text-green-500'
    else return 'text-gray-600 dark:text-gray-300'
  }

  const classList = [
    textClass()
  ].join(' ');

  return (
		<div
      className={`
        ${classList} text-xs mt-1.5
      `}
    >
      {props.children}
    </div>
  );
}

// Types
export type ContainerSize = boolean|'xs'|'sm'|'md'|'lg'|'xl'

interface Prop extends HtmlHTMLAttributes<unknown> {
	error?: boolean
	success?: boolean
}