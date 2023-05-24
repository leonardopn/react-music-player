import { AudioController } from "@/components/AudioController";
import Image from "next/image";
import defaultCover from "../assets/cover.png";

export default function Home() {
	return (
		<main className="flex bg-background h-screen w-screen justify-center items-center">
			<div className="bg-primary justify-between w-full h-full px-9 py-12 flex flex-col gap-7 sm:w-[352px] sm:h-fit sm:rounded-xl sm:justify-start">
				<div className="flex flex-col gap-3 items-center flex-1 justify-center">
					<Image
						src={defaultCover}
						alt=""
						width={200}
						height={200}
						className="w-full max-w-xs"
					/>
					<div className="flex flex-col items-center sm:self-start sm:items-start">
						<h1 className="text-white font-sans text-2xl font-bold">Acorda Devinho</h1>
						<p className="text-gray-400 font-sans text-lg">Banda Rocketseat</p>
					</div>
				</div>

				<AudioController />
			</div>
		</main>
	);
}
