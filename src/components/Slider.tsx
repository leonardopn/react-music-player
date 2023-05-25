import { DragEvent, MouseEvent, useEffect, useRef, useState } from "react";

interface SliderProps {
	onClick?: (e: MouseEvent<HTMLDivElement>) => void;
	value: number;
}

export function Slider({ onClick, value }: SliderProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [currentValue, setCurrentValue] = useState(value);

	useEffect(() => {
		setCurrentValue(value);
	}, [value]);

	function onDrag(e: DragEvent<HTMLDivElement>) {
		const bounding = e.currentTarget.getBoundingClientRect();
		const positionLength = e.clientX - bounding.left;
		const containerWidth = containerRef.current?.clientWidth;
		if (containerWidth) {
			console.log(containerWidth);
			const percentage = (positionLength / containerWidth) * 100;
			setCurrentValue(percentage);
		}
	}

	return (
		<div
			ref={containerRef}
			className="h-2 w-full bg-gray-500 rounded-md cursor-pointer flex items-center "
			onClick={onClick}>
			<div
				className="h-full bg-white rounded-md flex justify-end items-center "
				style={{ width: `${currentValue}%` }}
			/>
			<div draggable="true" className="bg-white h-4 w-4 rounded-full -m-2" onDrag={onDrag} />
		</div>
	);
}
