import { MouseEvent } from "react";

interface SliderProps {
	onClick?: (e: MouseEvent<HTMLDivElement>) => void;
	value: number;
}

export function Slider({ onClick, value }: SliderProps) {
	return (
		<div
			className="h-2 w-full bg-gray-500 rounded-md cursor-pointer flex items-center "
			onClick={onClick}>
			<div
				className="h-full bg-white rounded-md flex justify-end items-center "
				style={{ width: `${value}%` }}
			/>
			<div draggable="true" className="bg-white h-4 w-4 rounded-full -m-2" />
		</div>
	);
}
