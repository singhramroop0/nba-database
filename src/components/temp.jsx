import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Grid } from '@mui/material';
import { makeStyles, theme } from '@mui/styles';

const styles = {
	images: {
		height: '8vh',
		display: 'inline',
	},
	teamImages: {
		height: '4vh',
		display: 'block',
		marginTop: '2vh',
		marginLeft: '1vh'
	}
}

const useStyles = makeStyles((theme) => ({
	table: {
		borderRadius: 15,
		margin: '10px 10px'
	},
	tableHeaderCell: {
		backgroundColor: '#006BB7'
	}
}))

function Players() {
	const [players, setPlayers] = useState([]);
	useEffect(() => {
		fetchData();
	}, []);
	async function fetchData() {
		const { data } = await axios.get(
			"https://data.nba.net/data/10s/prod/v1/2021/players.json"
		);
		const { league } = data;
		setPlayers([
			...league.sacramento,
			...league.standard,
			...league.utah,
			...league.vegas,
		]);
	}
	const classes = useStyles();

	return (
		<div>
			{console.log(players)}
			<Grid container justifyContent="center" className="mt-4">
				<TableContainer component={Paper} sx={{ width: 3 / 4 }} className={classes.table}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell className={classes.tableHeaderCell}></TableCell>
								<TableCell className={classes.tableHeaderCell}><Typography>Name</Typography></TableCell>
								<TableCell className={classes.tableHeaderCell} style={{ textAlign: 'center' }}>Position</TableCell>
								<TableCell className={classes.tableHeaderCell}>Name</TableCell>
								<TableCell className={classes.tableHeaderCell}>Name</TableCell>
								<TableCell className={classes.tableHeaderCell}>Name</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{players.map((row) => (
								<TableRow
									key={Math.random()}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell style={{ marginRight: '-40px' }}>
										<Grid container spacing={2}>
											<Grid item xs={3} md={3}>
												<img
													src={`https://cdn.nba.com/logos/nba/${row.teamId}/global/L/logo.svg`}
													style={styles.teamImages}
												/>
											</Grid>
											<Grid item xs={9} md={9}>
												<img
													style={styles.images}
													src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${row.personId}.png`}
													onError={(e) => {
														e.target.src = 'https://static.thenounproject.com/png/547804-200.png'
													}}

												/>
											</Grid>
										</Grid>
									</TableCell>
									<TableCell component="th" scope="row">
										<a target="_blank" href={`https://www.nba.com/player/${row.personId}`}>{`${row.firstName} ${row.lastName}`}</a>
									</TableCell>
									<TableCell style={{ textAlign: 'center' }}>{row.pos}</TableCell>
									<TableCell>{row.fat}</TableCell>
									<TableCell>{row.carbs}</TableCell>
									<TableCell>{row.protein}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Grid>
		</div >
	);
}

export default Players;