"use client";

import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { MusicProgress } from "./MusicProgress";
import { PlayerActionButton } from "./PlayerActionButton";
import { VolumeController } from "./VolumeController";

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
			setVolume(1);
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

	function handleSetCurrentTime(percent: number) {
		if (audioRef.current) {
			audioRef.current.currentTime = percent * audioRef.current.duration;
		}
	}

	function handleSetCurrentVolume(percent: number) {
		if (audioRef.current) {
			audioRef.current.volume = percent;
		}
	}

	return (
		<div className="flex flex-col gap-7 ">
			<VolumeController volume={volume} setCurrentVolume={handleSetCurrentVolume} />
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
