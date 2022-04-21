import React, { useState, useEffect } from "react";
import Loading from "./loadingAnimation";
import { animated, useSpring } from "react-spring";
import axios from "axios";
import { useParams } from "react-router-dom";
import PlayerStats from "./PlayerStats";
import Image from "./Image";
import Question from "./images/questionMark.png";
import Unknown from "./images/unknown.png";
import { preload } from "./preloader";

const Player = () => {
	const { id, firstName, lastName, pos } = useParams();
	const [player, setPlayer] = useState(null);
	const [team, setTeam] = useState(null);
	const [isLoading, setLoading] = useState(true);
	const props = useSpring({
		opacity: isLoading ? "0" : "1",
		y: isLoading ? 50 : 0,
	});
	useEffect(() => {
		preload(`https://cdn.nba.com/headshots/nba/latest/1040x760/${id}.png`);
		async function fetchPlayer() {
			const { data } = await axios.get(
				`https://data.nba.net/data/10s/prod/v1/2021/players/${id}_profile.json`
			);
			console.log(data);
			setTeam(data.league.standard.teamId);
			if (data.league.standard.stats.latest.seasonStageId !== 4)
				setPlayer(data.league.standard.stats.latest);
			else setPlayer(data.league.standard.stats.regularSeason.season[0].total);
			setLoading(false);
		}
		fetchPlayer();
	}, [id]);
	return isLoading ? (
		<Loading />
	) : (
		<animated.div style={props} className="parentContainer">
			<div className="playerContainer">
				<Image
					src={`https://cdn.nba.com/logos/nba/${team}/global/L/logo.svg`}
					alt={Question}
					className={"background"}
				/>
				<div className="playerSection">
					<Image
						src={`https://cdn.nba.com/logos/nba/${team}/global/L/logo.svg`}
						alt={Question}
						className={"playerTeam"}
					/>
					<Image
						src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${id}.png`}
						alt={Unknown}
						className={"playerPic"}
					/>
					<h1 className="playerPosition">{pos}</h1>
					<p>
						{firstName} {lastName}
					</p>
				</div>
				<PlayerStats player={player} isLoading={isLoading} />
			</div>
		</animated.div>
	);
};

export default Player;
