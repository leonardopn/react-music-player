import { AudioController } from "@/components/AudioController";
import Image from "next/image";
import defaultCover from "../assets/cover.png";

export default function Home() {
	return (
		<main className="flex bg-background h-screen w-screen justify-center items-center">
			<div className="bg-primary w-[352px] rounded-xl px-9 py-12 flex flex-col gap-7">
				<Image src={defaultCover} alt="" width={200} height={200} className="w-full" />
				<div>
					<h1 className="text-white font-sans text-2xl font-bold">Acorda Devinho</h1>
					<p className="text-gray-400 font-sans text-lg">Banda Rocketseat</p>
				</div>

				<AudioController />
			</div>
		</main>
	);
}
