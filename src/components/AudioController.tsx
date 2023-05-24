"use client";

import { MouseEvent, SyntheticEvent, useEffect, useMemo, useRef, useState } from "react";
import { Iconify } from "./Iconify";
import { MusicProgress } from "./MusicProgress";
import { PlayerActionButton } from "./PlayerActionButton";

export function AudioController() {
	const audioRef = useRef<HTMLAudioElement | null>(null);

	const [isPlaying, setIsPlaying] = useState(false);

	const [musicDuration, setMusicDuration] = useState(0);
	const [timeRest, setTimeRest] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);
	const [volume, setVolume] = useState(0);

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = 1;
			setTimeRest(audioRef.current.duration);
			setMusicDuration(audioRef.current.duration);
		}
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

	function onPlayMusic(e: SyntheticEvent<HTMLAudioElement>) {
		setTimeRest(e.currentTarget.duration);
		setMusicDuration(e.currentTarget.duration);
		onPauseMusic();
	}

	function onPauseMusic() {
		setIsPlaying(oldValue => !oldValue);
	}

	function onTimeUpdate(e: SyntheticEvent<HTMLAudioElement, Event>) {
		setCurrentTime(e.currentTarget.currentTime);
		setTimeRest(e.currentTarget.duration - e.currentTarget.currentTime);
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
			audioRef.current.currentTime = percent * musicDuration;
		}
	}

	const progressVolumePercentage = useMemo(() => {
		const currentVolume = volume || 0;

		return currentVolume * 100;
	}, [volume]);

	return (
		<div className="flex flex-col gap-7 ">
			<div className="flex justify-between items-center gap-3">
				<Iconify icon="ph:speaker-simple-none-fill" className="text-white w-7 h-7" />
				<div
					className="h-2 w-full bg-gray-500 rounded-md  cursor-pointer"
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
				<audio
					src={"/music.mp3"}
					ref={audioRef}
					onPlay={onPlayMusic}
					onPause={onPauseMusic}
					onTimeUpdate={onTimeUpdate}
					onVolumeChange={onVolumeChange}
				/>
			</div>
			<MusicProgress
				currentTime={currentTime}
				musicDuration={musicDuration}
				timeRest={timeRest}
				setCurrentTime={handleSetCurrentTime}
			/>
		</div>
	);
}
