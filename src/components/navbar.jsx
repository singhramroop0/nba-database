import { Link, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/js/src/collapse.js";

const styles = {
	image: {
		height: "50px",
	},
	item: {
		fontSize: "18px",
	},
};
const Navbar = () => {
	return (
		<nav
			className="navbar navbar-expand-lg navbar-dark sticky-top"
			style={{ backgroundColor: "black" }}
		>
			<div className="container-fluid">
				<Link to="/">
					<img
						src="https://bwd.us/Portals/0/Clients/Logo/nba.png"
						alt="NBA"
						className="mx-4 my-4"
						style={styles.image}
					/>
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						<li style={styles.item} className="nav-item">
							<NavLink className="nav-link active" aria-current="page" to="/">
								Home
							</NavLink>
						</li>
						<li style={styles.item} className="nav-item">
							<NavLink className="nav-link" to="/players">
								Players
							</NavLink>
						</li>
						<li style={styles.item} className="nav-item">
							<NavLink className="nav-link" to="/games">
								Games
							</NavLink>
						</li>
						<li style={styles.item} className="nav-item">
							<NavLink className="nav-link" to="/teams">
								Teams
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
