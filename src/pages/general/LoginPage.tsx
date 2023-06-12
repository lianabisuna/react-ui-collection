import { ArrowLongRightIcon } from "@heroicons/react/20/solid";
import ReactLogo from '@/assets/images/react.png';
import TypescriptLogo from '@/assets/images/typescript.png';
import TailwindLogo from '@/assets/images/tailwind.png';
import { Link } from "react-router-dom";

export default function LoginPage() {
	return (
		<div className="bg-dotted w-full h-full flex justify-center items-center">
			<div className="h-full w-full max-h-[300px] max-w-[450px] flex flex-col justify-center items-center p-5 md:p-10 gap-8 bg-eerie rounded-lg md:mx-0 mx-3">
					<div className="mx-auto">
						<p className="font-bold text-white text-4xl text-center">Web UI Collection</p>
					</div>
					<div className="flex justify-center items-center gap-5 opacity-80">
						<img
							src={ReactLogo}
							alt="react-logo"
							className="max-h-10 max-w-10 object-contain grayscale"
						/>
						<img
							src={TypescriptLogo}
							alt="typescript-logo"
							className="max-h-10 max-w-10 object-contain grayscale"
						/>
						<img
							src={TailwindLogo}
							alt="tailwind-logo"
							className="max-h-10 max-w-10 object-contain grayscale"
						/>
					</div>
					<Link
						to="/button"
						className="py-3 font-bold text-lg w-full px-6 text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 animate-glow active:opacity-80 rounded-lg flex ml-auto justify-center items-center"
					>
						Explore
						<ArrowLongRightIcon className="h-7 w-7 path-stroke-3 ml-2" />
					</Link>
			</div>
		</div>
	);
}