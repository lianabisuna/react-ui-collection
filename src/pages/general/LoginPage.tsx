import { ArrowLongRightIcon } from "@heroicons/react/20/solid";
import ReactLogo from '@/assets/images/react.png';
import TypescriptLogo from '@/assets/images/typescript.png';
import TailwindLogo from '@/assets/images/tailwind.png';
import { Link } from "react-router-dom";

export default function LoginPage() {
	return (
		<div className="bg-dotted w-full h-full flex justify-center items-center">
			<div className="h-full w-full max-h-[300px] max-w-[600px] flex flex-col justify-center items-start p-5 md:p-10 gap-8">
					<div className="w-5/6 md:w-9/12 mx-auto">
						<p className="font-bold text-white text-3xl">A sandbox of user interface components created for the web</p>
						<p className="text-xs mt-3 font-medium text-battle">Take a tour of buttons, dropdowns, input fields, and everything visible on the web—made interactive.</p>
					</div>
					<div className="flex gap-5 opacity-80">
						<img
							src={ReactLogo}
							alt="react-logo"
							className="max-h-10 max-w-10 grayscale object-contain"
						/>
						<img
							src={TypescriptLogo}
							alt="typescript-logo"
							className="max-h-10 max-w-10 grayscale object-contain"
						/>
						<img
							src={TailwindLogo}
							alt="tailwind-logo"
							className="max-h-10 max-w-10 grayscale object-contain"
						/>
					</div>
					<Link
						to="/button"
						className="py-2 text-sm font-medium px-6 text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 animate-glow active:opacity-80 rounded flex ml-auto mr-5 md:mr-10"
					>
						Explore
						<ArrowLongRightIcon className="h-5 w-5 path-stroke-2 ml-2" />
					</Link>
			</div>
		</div>
	);
}