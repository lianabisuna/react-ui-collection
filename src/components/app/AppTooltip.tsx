import { ReactNode } from "react";
import { TailwindColor } from "./types";

export default function AppTooltip(props: Prop) {

  /** CLASSES */

  const positionClass = () => {
    switch (props.position) {
      case 'right': return 'ml-3 left-full top-1/2 -translate-y-1/2'
      case 'bottom': return 'mt-3 top-full left-1/2 -translate-x-1/2'
      case 'left': return 'mr-3 right-full top-1/2 -translate-y-1/2'
      case 'top': default: return 'mb-3 bottom-full left-1/2 -translate-x-1/2'
    }
  }

  const arrowClass = () => {
    if (props.hideArrow) return
    switch (props.position) {
      case 'top': return ''
      case 'right': return ''
      case 'bottom': return ''
      case 'left': return ''
      default: return ''
    }
  }

  const classList = [
    positionClass(),
    arrowClass()
  ].join(' ');

  return (
    <div className="relative inline-block group">
      {props.trigger}
      <div
        className={`
          ${classList}
          absolute whitespace-nowrap rounded py-2 px-3 font-semibold text-white opacity-0 group-hover:opacity-100
          bg-${props.color}
        `}
      >
        {props.children}
      </div>
    </div>
  );
}

// Types
export type TooltipPosition = 'top'|'right'|'bottom'|'left';

export type Prop = {
  position?: TooltipPosition;
  color?: TailwindColor;
  hideArrow?: boolean;
  trigger?: ReactNode;
  children?: ReactNode;
}