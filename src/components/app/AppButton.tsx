import { ButtonHTMLAttributes } from "react";

export default function AppButton(props: Props) {
  return (
    <button
      { ...props }
    >
      {props.children}
    </button>
  );
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean
  size?: ButtonSize
  variant?: ButtonVariant
}

export type ButtonSize = 'xs'|'sm'|'lg'|'xl'
export type ButtonVariant = 'outlined'|'text'