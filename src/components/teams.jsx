import React from "react";
import "./teams.css";
import { animated, useSpring } from "react-spring";
import nbaLogo from "./images/pic1.png";

const Teams = () => {
	const props = useSpring({
		from: {
			opacity: "0",
			y: 20,
		},
		to: {
			opacity: "1",
			y: 0,
		},
	});
	return (
		<animated.div style={props} className="teamContainer">
			<img className="nba" src={nbaLogo} alt="NBA" />
			<h1 className="header">To be added soon!</h1>
		</animated.div>
	);
};

export default Teams;
