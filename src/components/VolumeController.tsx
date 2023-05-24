import { MouseEvent, useMemo } from "react";
import { Iconify } from "./Iconify";
import { Slider } from "./Slider";

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
			<Slider
				value={progressVolumePercentage}
				onClick={handleCalculateClickPositionVolumePercentage}
			/>
			<Iconify icon="ph:speaker-simple-high-fill" className="text-white w-7 h-7" />
		</div>
	);
}
