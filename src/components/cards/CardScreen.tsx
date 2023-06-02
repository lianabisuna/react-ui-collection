import { useNavStore } from "@/stores";
import { ScreenSize } from "@/stores/navStore";
import { ReactNode } from "react";

export default function CardScreen({ children }: Prop) {
	const screen = useNavStore((state: { screen: ScreenSize }) => state.screen);
	const screenSizeClass = screen=='mobile'
		? 'max-w-[384px]'
		: screen=='tablet'
			? 'max-w-[512px]'
			: 'max-w-full';

	return (
		<div className={`bg-[#252525] bg-red flex justify-center items-center w-full ${screenSizeClass}`}>
			{children}
		</div>
	);
}

export type Prop = {
	children?: ReactNode
}