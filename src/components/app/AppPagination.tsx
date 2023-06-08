import { ReactNode } from "react";
import AppButton, { type ButtonSize } from "./AppButton";
import { TailwindColor } from "./types";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function AppPagination(props: Prop) {
  /** UPDATE MODEL VALUE */

  const updateModelValue = (value: number) => {
    props.updateModelValue && props.updateModelValue(value);
  }


  /** CONVERT LENGTH TO ARRAY */

  const lengthInArr = () => {
    if (!props.length) return;
    const arr: number[] = [];
    for (let num = 1; num <= props.length; num++) {
      arr.push(num);
    }
    return arr;
  }

  return (
    <>
      <div
        className="flex flex-wrap items-center gap-2"
        // v-bind="$attrs"
      >
        {/* Previous */}
        <AppButton
          icon={!props.previous}
          color="white"
          text-color="gray-800"
          disabled={props.modelValue===1}
          tone="light"
          size={props.size}
          onClick={()=>{
            if (props.modelValue) updateModelValue(props.modelValue-1)
          }}
        >
          {props.previous
            ? props.previous
            : (<ChevronLeftIcon className="h-5 w-5" />)
          }
        </AppButton>
        {/* Items */}
        {lengthInArr()?.map((item) => (
          <AppButton
            key={item}
            icon
            color={props.modelValue === item ? props.color : 'white'}
            tone={props.modelValue === item ? 'dark' : 'light'}
            size={props.size}
            onClick={()=>updateModelValue(item)}
          >
            <div className="h-5 w-5 flex items-center justify-center relative">
              <span className="absolute">{item}</span>
            </div>
          </AppButton>
        ))}
        {/* Next */}
        <AppButton
          icon={!props.next}
          color="white"
          text-color="gray-800"
          disabled={props.modelValue===props.length}
          tone="light"
          size={props.size}
          onClick={()=>{
            if (props.modelValue) updateModelValue(props.modelValue+1)
          }}
        >
          {props.next
            ? props.next
            : (<ChevronRightIcon className="h-5 w-5" />)
          }
        </AppButton>
      </div>
    </>
  );
}

// Types
export type Prop = {
  children?: ReactNode
  modelValue?: number
  length?: number
  color?: TailwindColor
  size?: ButtonSize
  /** Emits */
	updateModelValue?: (value: number)=>void
  /** Slots */
  previous?: ReactNode
  next?: ReactNode
  /** Additional */
  icon?: boolean
}