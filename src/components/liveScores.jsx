import React, { useEffect, useState } from "react";
import { animated, useSpring } from "react-spring";
import axios from "axios";
import "./Scores.css";
import Loading from "./loadingAnimation";

function getDate(date) {
	const year = date.getFullYear();
	const month =
		date.getMonth() + 1 < 10
			? "0" + (date.getMonth() + 1)
			: date.getMonth() + 1;
	const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
	return "" + year + month + day;
}

function prevDate(date) {
	const newDay = new Date(date);
	newDay.setDate(newDay.getDate() - 1);
	return newDay;
}

function nextDate(date) {
	const newDay = new Date(date);
	newDay.setDate(newDay.getDate() + 1);
	return newDay;
}

const LiveScores = () => {
	const [loading, setLoading] = useState(true);
	const [date, setDate] = useState(new Date());
	const [games, setGames] = useState(null);
	const props = useSpring({
		opacity: loading ? "0" : "1",
		y: loading ? 30 : 0,
	});
	const prevDay = prevDate(date);
	const nextDay = nextDate(date);

	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	function incrementDate() {
		setLoading(true);
		const updatedDay = new Date(date);
		updatedDay.setDate(updatedDay.getDate() + 1);
		setDate(updatedDay);
	}

	function decrementDate() {
		setLoading(true);
		const updatedDay = new Date(date);
		updatedDay.setDate(updatedDay.getDate() - 1);
		setDate(updatedDay);
	}

	useEffect(() => {
		async function fetchGames() {
			const { data } = await axios.get(
				`https://data.nba.net/data/10s/prod/v1/${getDate(date)}/scoreboard.json`
			);
			setGames(data.games);
			setLoading(false);
		}
		fetchGames();
		let interval = setInterval(fetchGames, 3000);
		return () => {
			clearInterval(interval);
		};
	}, [date, loading]);

	return loading ? (
		<Loading />
	) : (
		<>
			<div className="title">Scores</div>
			<div className="message">
				<div onClick={() => decrementDate()}>
					{monthNames[prevDay.getMonth()]} {prevDay.getDate()}
				</div>
				<p className="today">
					{monthNames[date.getMonth()]} {date.getDate()}
				</p>
				<div onClick={() => incrementDate()}>
					{monthNames[nextDay.getMonth()]} {nextDay.getDate()}
				</div>
			</div>
			<animated.div style={props} className="parent">
				<div className="grid">
					{games.map(game => {
						return (
							<div className="game" key={Math.random()}>
								<div className="team1">
									<div>
										<img
											alt="team"
											src={`https://cdn.nba.com/logos/nba/${game.hTeam.teamId}/global/L/logo.svg`}
										/>
										{game.hTeam.triCode}
									</div>
									{game.hTeam.score}
								</div>
								<div className="team2">
									<div>
										<img
											alt="team"
											src={`https://cdn.nba.com/logos/nba/${game.vTeam.teamId}/global/L/logo.svg`}
										/>
										{game.vTeam.triCode}
									</div>
									{game.vTeam.score}
								</div>
								<div className="time">
									{game.statusNum === 1 ? <p>{game.startTimeEastern}</p> : null}
									{game.statusNum === 2 && !game.period.isEndOfPeriod ? (
										<p>
											Q{game.period.current} {game.clock}
										</p>
									) : null}
									{game.statusNum === 2 &&
									game.period.isEndOfPeriod &&
									!game.period.isHalftime ? (
										<p>Q{game.period.current} END</p>
									) : null}
									{game.period.isHalftime ? <p>Halftime</p> : null}
									{game.statusNum === 3 ? <p>Final</p> : null}
								</div>
							</div>
						);
					})}
				</div>
			</animated.div>
		</>
	);
};

export default LiveScores;
