import { ButtonHTMLAttributes } from "react";
import { ColorTone, RoundedSize, TailwindColor } from "./types";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import * as HeroIcons from '@heroicons/react/24/outline'
import { IconName, IconProps } from "@/layouts/LayoutDashboard";

export default function AppButton(props: Prop) {
  const DynamicHeroIcon = ({ icon, classList }: IconProps) => {
    const SingleIcon = HeroIcons[icon] || 'CogIcon';
  
    return (
      <SingleIcon className={classList} />
    );
  };

  /** CLASSES */

  const sizeClass = () => {
    if (props.icon) {
      switch (props.size) {
        case 'xs': return 'aspect-square p-2';
        case 'sm': return 'aspect-square p-2.5';
        case 'md': default: return 'aspect-square p-3';
        case 'lg': return 'aspect-square p-3.5';
        case 'xl': return 'aspect-square p-4';
      }
    }
    else {
      switch (props.size) {
        case 'xs': return 'px-3 py-2 text-xs';
        case 'sm': return 'px-3 py-2 text-sm';
        case 'md': default: return 'px-5 py-2.5 text-base';
        case 'lg': return 'px-5 py-3 text-lg';
        case 'xl': return 'px-6 py-3.5 text-xl';
      }
    }
  }
  
  const bgClass = () => {
    switch (props.variant) {
      case 'outlined': return `bg-transparent hover:bg-${props.color} active:bg-${props.color}/75`;
      case 'text': return 'bg-transparent';
      case 'solid': default: return `bg-${props.color} hover:bg-${props.color}/90 active:bg-${props.color}/75`;
    }
  }
  
  const textClass = () => {
    switch (props.variant) {
      case 'outlined': return `text-${props.color} hover:text-gray-100`;
      case 'text':
        switch (props.tone) {
          case 'light': default: return 'text-gray-800 hover:text-opacity-50';
          case 'dark': return 'text-gray-100 hover:text-opacity-50';
        }
      case 'solid': default:
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
      case 'solid': default: return ''
    }
  }

  const roundedClass = () => {
    if (props.rounded) return `rounded-${props.rounded}`
    else return 'rounded'
  }

  const classList = [
    sizeClass(),
    bgClass(),
    textClass(),
    borderClass(),
    roundedClass()
  ].join(' ');


  /** INPUT PROPS */

  const componentProps = () => {
    const { children, size, color, icon, variant, tone, loading, rounded, ...rest } = props;
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
      {...componentProps()}
      className={`
        ${classList}
        inline-flex items-center justify-center text-center font-medium
        ${props.disabled || props.loading ? 'opacity-50 pointer-events-none' : ''}
        ${props.icon ? 'aspect-square' : ''}
        ${props.variant==='text' ? '' : 'active:shadow'}
      `}
    >
      {props.loading && <ArrowPathIcon className="h-5 w-5 mr-2" />}
      {props.icon && typeof props.icon === 'string'
        ? (<DynamicHeroIcon icon={props.icon} classList="h-5 w-5 path-stroke-2" />)
        : props.children
      }
    </button>
  );
}

// Types
export type ButtonSize = 'xs'|'sm'|'md'|'lg'|'xl'
export type ButtonVariant = 'solid'|'outlined'|'text'

type ConditionalExtendProp = ButtonHTMLAttributes<unknown>

// type ConditionalExtendProp<To, Href> =
//   To extends string
//     ? AnchorHTMLAttributes<unknown>
//     : Href extends string
//       ? LinkHTMLAttributes<unknown>
//       : ButtonHTMLAttributes<unknown>

export type Prop = {
  disabled?: boolean
  size?: ButtonSize
  color?: TailwindColor
  icon?: boolean|IconName
  variant?: ButtonVariant
  tone?: ColorTone
  loading?: boolean
  rounded?: RoundedSize
} & ConditionalExtendProp