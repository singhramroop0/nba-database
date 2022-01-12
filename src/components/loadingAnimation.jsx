import { animated, useSpring } from "react-spring";

function Loading() {
	const loadingProps = useSpring({
		loop: true,
		from: { rotateZ: 0 },
		to: { rotateZ: 180 },
	});
	return (
		<div className="animation">
			<animated.div
				style={{
					width: 80,
					height: 80,
					backgroundColor: "#ED174B",
					borderRadius: 16,
					...loadingProps,
				}}
			/>
		</div>
	);
}

export default Loading;
