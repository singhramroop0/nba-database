import "./App.css";
import axios from "axios";
import Navbar from "./components/navbar";
import { Route, Switch } from "react-router-dom";
import Homepage from "./homepage";
import Players from "./components/players";
import Player from "./components/player";
import LiveScores from "./components/liveScores";
import { useState } from "react";
import Loading from "./components/loadingAnimation";
import { preload } from "./components/preloader";
import nbaLogo from "./components/images/pic1.png";

const fetchTeams = setLoading => {
	async function fetch() {
		preload("https://bwd.us/Portals/0/Clients/Logo/nba.png");
		preload(nbaLogo);
		const { data } = await axios.get(
			`https://data.nba.net/data/10s/prod/v1/2021/teams.json`
		);
		const { standard } = data.league;
		standard.forEach(team =>
			preload(`https://cdn.nba.com/logos/nba/${team.teamId}/global/L/logo.svg`)
		);
		setLoading(false);
	}
	fetch();
};

const App = () => {
	const [loading, setLoading] = useState(true);
	fetchTeams(setLoading);
	return loading ? (
		<Loading />
	) : (
		<>
			<Navbar />
			<Switch>
				<Route exact path="/" component={props => <Homepage {...props} />} />
				<Route path="/players" component={Players} />
				<Route
					path="/player/:id/:firstName/:lastName/:pos"
					component={Player}
				/>
				<Route path="/games" component={LiveScores} />
			</Switch>
		</>
	);
};

export default App;
