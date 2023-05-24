"use client";

import { MouseEvent, SyntheticEvent, useEffect, useMemo, useRef, useState } from "react";
import { Iconify } from "./Iconify";
import { MusicProgress } from "./MusicProgress";
import { PlayerActionButton } from "./PlayerActionButton";

export function AudioController() {
	const audioRef = useRef<HTMLAudioElement | null>(null);

	const [, setInitialDUration] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);

	const [currentTime, setCurrentTime] = useState(0);
	const [volume, setVolume] = useState(0);

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = 1;
			setInitialDUration(audioRef.current.duration);
		}
	}, []);

	function handleTogglePlay() {
		if (audioRef.current) {
			if (isPlaying) {
				audioRef.current.pause();
				setIsPlaying(false);
			} else {
				audioRef.current.play();
				setIsPlaying(true);
			}
		}
	}

	function onTimeUpdate(e: SyntheticEvent<HTMLAudioElement, Event>) {
		setCurrentTime(e.currentTarget.currentTime);

		if (e.currentTarget.currentTime === e.currentTarget.duration) {
			setIsPlaying(false);
		}
	}

	function onVolumeChange(e: SyntheticEvent<HTMLAudioElement, Event>) {
		setVolume(e.currentTarget.volume);
	}

	function handleCalculateClickPositionVolumePercentage(e: MouseEvent<HTMLDivElement>) {
		const bounding = e.currentTarget.getBoundingClientRect();
		const positionLength = e.clientX - bounding.left;
		const percentage = positionLength / bounding.width;

		if (audioRef.current) {
			audioRef.current.volume = percentage;
		}
	}

	function handleSetCurrentTime(percent: number) {
		if (audioRef.current) {
			audioRef.current.currentTime = percent * audioRef.current.duration;
		}
	}

	const progressVolumePercentage = useMemo(() => {
		const currentVolume = volume || 0;

		return currentVolume * 100;
	}, [volume]);

	return (
		<div className="flex flex-col gap-7 ">
			<div className="flex justify-between items-center gap-3 w-[80%] self-center">
				<Iconify icon="ph:speaker-simple-none-fill" className="text-white w-7 h-7" />
				<div
					className="h-2 w-full bg-gray-500 rounded-md cursor-pointer"
					onClick={handleCalculateClickPositionVolumePercentage}>
					<div
						className="h-full bg-white rounded-md flex justify-end items-center min-w-[10%]"
						style={{ width: `${progressVolumePercentage}%` }}>
						<div draggable="true" className="bg-white h-4 w-4 rounded-full" />
					</div>
				</div>
				<Iconify icon="ph:speaker-simple-high-fill" className="text-white w-7 h-7" />
			</div>
			<div className="flex justify-between">
				<PlayerActionButton variant="previous" />
				<PlayerActionButton
					variant={isPlaying ? "pause" : "play"}
					onClick={handleTogglePlay}
				/>
				<PlayerActionButton variant="next" />
			</div>
			<MusicProgress
				currentTime={currentTime}
				musicDuration={audioRef.current?.duration || 0}
				setCurrentTime={handleSetCurrentTime}
			/>
			<audio
				src={"/music.mp3"}
				ref={audioRef}
				onTimeUpdate={onTimeUpdate}
				onPlay={() => setIsPlaying(true)}
				onPause={() => setIsPlaying(false)}
				onVolumeChange={onVolumeChange}
			/>
		</div>
	);
}
