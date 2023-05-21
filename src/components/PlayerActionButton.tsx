import { Iconify } from "./Iconify";

interface PlayerActionButtonProps {
	variant: "next" | "previous" | "play" | "pause";
}

export function PlayerActionButton({ variant }: PlayerActionButtonProps) {
	const icon = {
		next: "ph:caret-double-right-fill",
		previous: "ph:caret-double-left-fill",
		play: "ph:play-fill",
		pause: "ph:pause-fill",
	};

	return (
		<Iconify
			icon={icon[variant]}
			className="text-white w-7 h-7 cursor-pointer active:text-white/70 transition-colors"
		/>
	);
}
