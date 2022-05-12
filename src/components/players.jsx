import React, { useEffect, useState } from "react";
import { animated, useSpring } from "react-spring";
import axios from "axios";
import Loading from "./loadingAnimation";
import { Link } from "react-router-dom";
import Question from "./images/questionMark.png";

function filterArray(players, searchTerm) {
	if (searchTerm.length < 3) return [];
	const updated = [];
	for (let player of players) {
		let name = `${player.firstName.toLowerCase()} ${player.lastName.toLowerCase()}`;
		if (name.includes(searchTerm.toLowerCase())) updated.push(player);
	}
	return updated;
}

function Players() {
	const [search, changeSearch] = useState("");
	const [players, setPlayers] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const searchProps = useSpring({
		y: search === "" ? 200 : 0,
		opacity: isLoading ? "0" : "1",
		delay: 50,
	});
	const delayed = useSpring({ opacity: search.length < 3 ? "0" : "1" });

	useEffect(() => {
		fetchData();
	}, []);

	async function fetchData() {
		const { data } = await axios.get(
			"https://data.nba.net/data/10s/prod/v1/2021/players.json"
		);
		const { league } = data;
		setPlayers([...league.standard]);
		setLoading(false);
	}

	const updatedPlayers = filterArray(players, search);
	return isLoading ? (
		<Loading />
	) : (
		<animated.div style={searchProps} className="container">
			<div className="inputContainer">
				<input
					className="input"
					placeholder="Search... (ex. LeBron James)"
					onChange={event => {
						changeSearch(event.target.value);
					}}
				/>
				<p>🔍</p>
			</div>
			<animated.div style={delayed} className="searchResults">
				{updatedPlayers.map(player => (
					<div className="result" key={Math.random()}>
						<Link
							to={`/player/${player.personId}/${player.firstName}/${player.lastName}/${player.pos}`}
						>
							<strong>{player.pos === "" ? "-" : player.pos}</strong>
							<p>
								{player.firstName} {player.lastName}
							</p>
						</Link>
						<img
							src={`https://cdn.nba.com/logos/nba/${player.teamId}/global/L/logo.svg`}
							alt="team"
							onError={({ currentTarget }) => {
								currentTarget.onerror = null;
								currentTarget.src = Question;
							}}
						/>
					</div>
				))}
			</animated.div>
			{search.length < 3 ? <div>Minimum 3 Letters</div> : null}
		</animated.div>
	);
}

export default Players;
