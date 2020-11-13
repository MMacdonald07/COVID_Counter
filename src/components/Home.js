import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import Header from './Header';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles({
	table: {
		minWidth: 650
	}
});

const Home = () => {
	const [globalData, setGlobalData] = useState({});
	const [countryData, setCountryData] = useState({});
	const [filter, setFilter] = useState('');
	const classes = useStyles();
	const time = moment().format('MMMM Do YYYY, h:mm:ss a');

	useEffect(() => {
		axios.get('https://api.covid19api.com/summary').then(function (res) {
			const { data } = res;
			const newGlobalData = data.Global;
			setGlobalData(newGlobalData);

			const resCountryData = data.Countries;
			const newCountryData = {};
			resCountryData.forEach((country, index) => {
				newCountryData[index + 1] = {
					name: country.Country,
					confirmed: country.TotalConfirmed,
					deaths: country.TotalDeaths,
					recovered: country.TotalRecovered
				};
			});
			setCountryData(newCountryData);
		});
	}, []);

	const getTableRow = ({ name, confirmed, deaths, recovered }) => (
		<TableRow key={name}>
			<TableCell component='th' scope='row'>
				{name}
			</TableCell>
			<TableCell align='right'>{confirmed}</TableCell>
			<TableCell align='right'>{deaths}</TableCell>
			<TableCell align='right'>{recovered}</TableCell>
		</TableRow>
	);

	return (
		<div>
			<Header />
			{countryData && globalData ? (
				<>
					<Typography variant='h5' color='initial'>
						As of {time}, the total number of coronavirus cases is {globalData.TotalConfirmed}.
					</Typography>
					<Typography variant='h6' color='initial'>
						Deaths: {globalData.TotalDeaths}
					</Typography>
					<Typography variant='h6' color='initial'>
						Recovered: {globalData.TotalRecovered}
					</Typography>

					<TextField label='Country' variant='standard' onChange={e => setFilter(e.target.value)} />

					<TableContainer component={Paper}>
						<Table className={classes.table}>
							<TableHead>
								<TableRow>
									<TableCell>Country</TableCell>
									<TableCell align='right'>Confirmed Cases</TableCell>
									<TableCell align='right'>Total Deaths</TableCell>
									<TableCell align='right'>Total Recovered</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{Object.values(countryData).map(
									country => country.name.toLowerCase().includes(filter.toLowerCase()) && getTableRow(country)
								)}
							</TableBody>
						</Table>
					</TableContainer>
				</>
			) : (
				<CircularProgress />
			)}
		</div>
	);
};

export default Home;
