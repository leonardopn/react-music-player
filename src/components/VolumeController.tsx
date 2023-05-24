import { MouseEvent, useMemo } from "react";
import { Iconify } from "./Iconify";

interface VolumeControllerProps {
	volume: number;
	setCurrentVolume: (percent: number) => void;
}

export function VolumeController({ volume, setCurrentVolume }: VolumeControllerProps) {
	function handleCalculateClickPositionVolumePercentage(e: MouseEvent<HTMLDivElement>) {
		const bounding = e.currentTarget.getBoundingClientRect();
		const positionLength = e.clientX - bounding.left;
		const percentage = positionLength / bounding.width;

		setCurrentVolume(percentage > 1 ? 1 : percentage < 0 ? 0 : percentage);
	}

	const progressVolumePercentage = useMemo(() => {
		const currentVolume = volume || 0;

		return currentVolume * 100;
	}, [volume]);

	return (
		<div className="flex justify-between items-center gap-3 w-[80%] self-center">
			<Iconify icon="ph:speaker-simple-none-fill" className="text-white w-7 h-7" />
			<div
				className="h-2 w-full bg-gray-500 rounded-md cursor-pointer flex items-center "
				onClick={handleCalculateClickPositionVolumePercentage}>
				<div
					className="h-full bg-white rounded-md flex justify-end items-center "
					style={{ width: `${progressVolumePercentage}%` }}
				/>
				<div draggable="true" className="bg-white h-4 w-4 rounded-full -m-2" />
			</div>
			<Iconify icon="ph:speaker-simple-high-fill" className="text-white w-7 h-7" />
		</div>
	);
}
