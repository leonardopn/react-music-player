import { PlayerActionButton } from "@/components/PlayerActionButton";
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
				<div className="flex justify-between">
					<PlayerActionButton variant="previous" />
					<PlayerActionButton variant="play" />
					<PlayerActionButton variant="next" />
				</div>
				<div className="flex flex-col gap-2">
					<div className="h-2 w-full bg-gray-500 rounded-md overflow-hidden">
						<div className="h-full w-2/3 bg-white rounded-md" />
					</div>
					<div className="flex justify-between">
						<p className="text-gray-400 font-sans text-sm ">03:20</p>
						<p className="text-gray-400 font-sans text-sm ">00:12</p>
					</div>
				</div>
			</div>
		</main>
	);
}
