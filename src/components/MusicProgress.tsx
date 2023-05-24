import dayjs from "dayjs";
import { MouseEvent, useMemo } from "react";
import { Slider } from "./Slider";

interface MusicProgressProps {
	currentTime: number;
	musicDuration: number;
	setCurrentTime: (percent: number) => void;
}

export function MusicProgress({
	currentTime,
	musicDuration = 0,
	setCurrentTime,
}: MusicProgressProps) {
	const timeRest = useMemo(() => musicDuration - currentTime, [currentTime, musicDuration]);

	const currentTimeFormatted = useMemo(
		() => dayjs(currentTime * 1000 || 0).format("mm:ss"),
		[currentTime]
	);
	const timeRestFormatted = useMemo(
		() => dayjs(timeRest * 1000 || 0).format("mm:ss"),
		[timeRest]
	);

	function handleCalculateClickPositionMusicPercentage(e: MouseEvent<HTMLDivElement>) {
		const bounding = e.currentTarget.getBoundingClientRect();
		const positionLength = e.clientX - bounding.left;
		const percentage = positionLength / bounding.width;

		setCurrentTime(percentage);
	}

	const progressMusicPercentage = useMemo(() => {
		if (musicDuration === 0) return 0;

		return (currentTime * 100) / musicDuration;
	}, [currentTime, musicDuration]);

	return (
		<div className="flex flex-col gap-2">
			<Slider
				value={progressMusicPercentage}
				onClick={handleCalculateClickPositionMusicPercentage}
			/>
			<div className="flex justify-between">
				<p className="text-gray-400 font-sans text-sm ">{currentTimeFormatted}</p>
				<p className="text-gray-400 font-sans text-sm ">{timeRestFormatted}</p>
			</div>
		</div>
	);
}
