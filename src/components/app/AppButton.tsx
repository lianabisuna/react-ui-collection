import { ButtonHTMLAttributes } from "react";
import { ColorTone, TailwindColor } from "./types";
import { ArrowPathIcon } from "@heroicons/react/20/solid";

export default function AppButton<To, Href>(props: Prop<To, Href>) {
  /** CLASSES */

  const sizeClass = () => {
    if (props.icon) {
      switch (props.size) {
        case 'xs': return 'aspect-square p-2';
        case 'sm': return 'aspect-square p-2.5';
        case 'lg': return 'aspect-square p-3.5';
        case 'xl': return 'aspect-square p-4';
        default: return 'aspect-square p-3';
      }
    }
    else {
      switch (props.size) {
        case 'xs': return 'px-3 py-2 text-xs';
        case 'sm': return 'px-3 py-2 text-sm';
        case 'lg': return 'px-5 py-3 text-lg';
        case 'xl': return 'px-6 py-3.5 text-xl';
        default: return 'px-5 py-2.5 text-base';
      }
    }
  }
  
  const bgClass = () => {
    switch (props.variant) {
      case 'outlined': return `bg-transparent hover:bg-${props.color} active:bg-${props.color}/75`;
      case 'text': return 'bg-transparent hover:bg-gray-200 active:bg-transparent/10';
      default: return `bg-${props.color} hover:bg-${props.color}/90 active:bg-${props.color}/75`;
    }
  }
  
  const textClass = () => {
    switch (props.variant) {
      case 'outlined': return `text-${props.color} hover:text-gray-100`;
      case 'text': return 'text-gray-800';
      default:
        switch (props.tone) {
          case 'light': return 'text-gray-800';
          case 'dark': default: return 'text-gray-100';
        }
    }
  }
  
  const borderClass = () => {
    switch (props.variant) {
      case 'outlined': return `border border-${props.color} active:border-blue-500/0`
      case 'text': return ''
      default: return ''
    }
  }

  const classList = [
    sizeClass(),
    bgClass(),
    textClass(),
    borderClass()
  ].join(' ');


  /** INPUT PROPS */

  const inputProps = () => {
    const { children, size, color, icon, variant, tone, loading, ...rest } = props;
    return rest;
  }


  /** TO DO: DYNAMIC COMPONENT */

  // const Component = props.to
  // ? 'Link'
  // : props.href
  //   ? 'a'
  //   : 'button';

  // const Component HTMLElement = () => createElement(DynamicTag, {}, '...')

  return (
    <button
      {...inputProps()}
      className={`
        ${classList}
        inline-flex items-center justify-center text-center rounded font-medium active:shadow
        outline-${props.color}/50
        ${props.disabled || props.loading ? 'opacity-50 pointer-events-none' : ''}
        ${props.icon ? 'aspect-square' : ''}
      `}
    >
      {props.loading && <ArrowPathIcon className="h-5 w-5 mr-2" />}
      {props.children}
    </button>
  );
}

// Types
export type ButtonSize = 'xs'|'sm'|'lg'|'xl'
export type ButtonVariant = 'outlined'|'text'

type ConditionalExtendProp = ButtonHTMLAttributes<unknown>

// type ConditionalExtendProp<To, Href> =
//   To extends string
//     ? AnchorHTMLAttributes<unknown>
//     : Href extends string
//       ? LinkHTMLAttributes<unknown>
//       : ButtonHTMLAttributes<unknown>

type Prop<To, Href> = {
  href?: To
  to?: Href
  disabled?: boolean
  size?: ButtonSize
  color?: TailwindColor
  icon?: boolean
  variant?: ButtonVariant
  tone?: ColorTone
  loading?: boolean
} & ConditionalExtendProp