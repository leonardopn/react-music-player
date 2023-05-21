"use client";

import { SyntheticEvent, useEffect, useMemo, useRef, useState, MouseEvent } from "react";
import { PlayerActionButton } from "./PlayerActionButton";
import dayjs from "dayjs";

export function AudioController() {
	const audioRef = useRef<HTMLAudioElement | null>(null);

	const [isPlaying, setIsPlaying] = useState(false);

	const [musicDuration, setMusicDuration] = useState(0);
	const [timeRest, setTimeRest] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);

	useEffect(() => {
		if (audioRef.current) setTimeRest(audioRef.current.duration);
	}, []);

	function handleTogglePlay() {
		if (audioRef.current) {
			if (isPlaying) {
				audioRef.current.pause();
			} else {
				audioRef.current.play();
			}
		}
	}

	function handleOnStartMusic(e: SyntheticEvent<HTMLAudioElement>) {
		setTimeRest(e.currentTarget.duration);
		setMusicDuration(e.currentTarget.duration);
		handleSetIsPlaying();
	}

	function handleSetIsPlaying() {
		setIsPlaying(oldValue => !oldValue);
	}

	function handleTimeUpdate(e: SyntheticEvent<HTMLAudioElement, Event>) {
		setCurrentTime(e.currentTarget.currentTime);
		setTimeRest(e.currentTarget.duration - e.currentTarget.currentTime);
	}

	function handleCalculateClickPositionPercentage(e: MouseEvent<HTMLDivElement>) {
		const bounding = e.currentTarget.getBoundingClientRect();
		const positionLength = e.clientX - bounding.left;
		const percentage = positionLength / bounding.width;

		if (audioRef.current) {
			audioRef.current.currentTime = audioRef.current.duration * percentage;
		}
	}

	const scrollMusicPercentage = useMemo(() => {
		if (musicDuration === 0) return 0;

		return (currentTime * 100) / musicDuration;
	}, [currentTime, musicDuration]);

	return (
		<div className="flex flex-col gap-7">
			<div className="flex justify-between">
				<PlayerActionButton variant="previous" />
				<PlayerActionButton
					variant={isPlaying ? "pause" : "play"}
					onClick={handleTogglePlay}
				/>
				<PlayerActionButton variant="next" />
				<audio
					src={"/music.mp3"}
					ref={audioRef}
					onCanPlay={e => setTimeRest(e.currentTarget.duration)}
					onPlay={handleOnStartMusic}
					onPause={handleSetIsPlaying}
					onTimeUpdate={handleTimeUpdate}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<div
					className="h-2 w-full bg-gray-500 rounded-md overflow-hidden cursor-pointer"
					onClick={handleCalculateClickPositionPercentage}>
					<div
						className="h-full bg-white rounded-md"
						style={{ width: `${scrollMusicPercentage}%` }}
					/>
				</div>
				<div className="flex justify-between">
					<p className="text-gray-400 font-sans text-sm ">
						{dayjs(currentTime * 1000).format("mm:ss")}
					</p>
					<p className="text-gray-400 font-sans text-sm ">
						{dayjs(timeRest * 1000).format("mm:ss")}
					</p>
				</div>
			</div>
		</div>
	);
}
