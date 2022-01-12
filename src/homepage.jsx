import React from "react";
import { animated, useSpring } from "react-spring";
import nbaLogo from "./components/images/pic1.png";

const styles = {
	mainLogo: {
		width: "clamp(12rem, 60vw, 20rem)",
		alignSelf: "center",
	},
	div: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: "-25px",
		marginTop: "0vh",
	},
	messageDiv: {
		display: "flex",
		justifyContent: "center",
		marginTop: "30px",
	},
	text: {
		color: "white",
		textAlign: "center",
		fontSize: "clamp(2rem, 3.5vw, 3rem)",
		paddingLeft: "2vw",
		paddingRight: "2vw",
	},
	buttonDiv: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "100px",
	},
	button: {
		alignSelf: "center",
		borderRadius: "25px",
		width: "clamp(8rem, 20vw, 13rem)",
		height: "75px",
		backgroundColor: "#ED174B",
		borderColor: "#ED174B",
	},
	buttonText: {
		fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
		fontFamily: "'Abel', Poppins",
		textAlign: "center",
	},
	overflow: {
		overflowY: "hidden",
		overflowX: "hidden",
		height: "450px",
		display: "flex",
		alignItems: "center",
		flexDirection: "column",
		gap: "25px",
		paddingTop: "20px",
	},
};

function Homepage(props) {
	const logoProps = useSpring({
		to: { x: 0, opacity: 1 },
		from: { x: 1000, opacity: 0 },
		config: { friction: 30 },
	});
	const textProps = useSpring({
		to: { opacity: 1, y: 0 },
		from: { opacity: 0, y: -20 },
		delay: 100,
		config: { friction: 30 },
	});
	const buttonProps = useSpring({
		to: { y: 0, opacity: 1 },
		from: { y: -20, opacity: 0 },
		delay: 200,
	});
	return (
		<div style={styles.overflow}>
			<animated.div style={logoProps}>
				<div style={styles.div}>
					<img style={styles.mainLogo} src={nbaLogo} alt="nbalogo" />
				</div>
			</animated.div>
			<animated.div style={textProps}>
				<div style={styles.messageDiv}>
					<h1 style={styles.text}>Welcome to the NBA database!</h1>
				</div>
			</animated.div>
			<animated.div style={buttonProps}>
				<div style={styles.buttonDiv}>
					<button
						type="button"
						onClick={() => props.history.push("/players")}
						style={styles.button}
						className="btn btn-primary btn-lg"
					>
						<h2 style={styles.buttonText}>Navigate</h2>
					</button>
				</div>
			</animated.div>
		</div>
	);
}

export default Homepage;
