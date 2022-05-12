import React from "react";

const Score = ({ game }) => {
	return (
		<div className="game">
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
};

export default Score;
