import { ReactNode } from "react";
import { ClassBinding, DialogPosition } from "./types"
import { AppButton } from ".";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function AppModal(props: Prop) {

  /** UPDATE MODEL VALUE */

  const updateModelValue = (value: boolean) => {
    if (!props.persistent) props.updateModelValue && props.updateModelValue(value);
  }


  /** CLASSES */

  const sizeClass = () => {
    switch (props.size) {
      case 'xs': return 'md:w-1/4'
      case 'sm': return 'md:w-1/3'
      case 'lg': return 'md:w-3/5'
      case 'xl': return 'md:w-3/4'
      case 'md': default: return 'w-2/5'
    }
  }

  return (
    <>
      {props.modelValue && (
        <div
          className={`
            fixed top-0 left-0 z-50 flex items-center justify-center w-full min-h-screen group
            ${props.hideBackdrop ? '' : 'bg-black bg-opacity-25'}
            ${props.backdropClass}
          `}
          onClick={()=>updateModelValue(false)} // click.self
        >
          <div
            className={`
              relative max-w-[95vw] max-h-[98vh] overflow-y-auto scrollbar overflow-x-hidden bg-white rounded shadow dark:bg-gray-800
              ${props.persistent ? 'group-active:animate-shake' : ''}
              ${sizeClass()}
            `}
          >
            {props.header}
            {props.children}
            {props.footer}
            {props.closeIcon && (
              <div className="absolute top-3 right-2.5">
                <AppButton
                  icon
                  variant="text"
                  onClick={()=>updateModelValue(false)}
                >
                  <XMarkIcon className="w-5 h-5" />
                </AppButton>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// Types
export type ModalSize = 'xs'|'sm'|'md'|'lg'|'xl'

export type Prop = {
  children?: ReactNode;
  modelValue?: boolean;
  persistent?: boolean;
  hideBackdrop?: boolean;
  backdropClass?: ClassBinding;
  size?: ModalSize;
  position?: DialogPosition;
  closeIcon?: boolean;
  fullscreen?: boolean;
  /** Emits */
	updateModelValue?: (value: boolean)=>void;
  /** Slots */
  header?: ReactNode;
  footer?: ReactNode;
}