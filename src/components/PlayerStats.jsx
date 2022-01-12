import React from "react";
import { animated, useSpring } from "react-spring";

const PlayerStats = ({ player }) => {
	const statsAnimate = useSpring({
		from: {
			opacity: "0",
			y: 20,
		},
		to: {
			opacity: "1",
			y: 0,
		},
		delay: 100,
	});
	return (
		<animated.div style={statsAnimate} className="statsParent">
			<div className="statsContainer">
				<div className="stat">
					<strong>PPG</strong>
					<p>{player.ppg}</p>
				</div>
				<div className="stat">
					<strong>APG</strong>
					<p>{player.apg}</p>
				</div>
				<div className="stat">
					<strong>RPG</strong>
					<p>{player.rpg}</p>
				</div>
				<div className="stat">
					<strong>BPG</strong>
					<p>{player.bpg}</p>
				</div>
				<div className="stat">
					<strong>SPG</strong>
					<p>{player.spg}</p>
				</div>
				<div className="stat">
					<strong>TOPG</strong>
					<p>{player.topg}</p>
				</div>
			</div>
		</animated.div>
	);
};

export default PlayerStats;
