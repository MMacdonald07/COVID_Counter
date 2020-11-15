import React, { useEffect, useState } from 'react';
import axios from 'axios';
import numeral from 'numeral';
import moment from 'moment';
import Header from './Header';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { CircularProgress, MenuItem } from '@material-ui/core';

const StyledTableCell = withStyles(theme => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
		fontSize: 20
	},
	body: {
		fontSize: 14
	}
}))(TableCell);

const useStyles = makeStyles({
	title: {
		textAlign: 'center'
	},
	tableContainer: {
		padding: '5rem 0',
		marginBottom: '5rem',
		minWidth: 650,
		maxWidth: '75vw',
		margin: '0 auto'
	},
	table: {
		minWidth: 650,
		maxWidth: '90%',
		margin: '0 auto'
	}
});

const Home = () => {
	const [globalData, setGlobalData] = useState({});
	const [countryData, setCountryData] = useState({});
	const [filter, setFilter] = useState('');
	const [sortType, setSortType] = useState('name');
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
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

	useEffect(() => {
		const sortArray = type => {
			const types = {
				name: 'name',
				confirmed: 'confirmed',
				deaths: 'deaths',
				recovered: 'recovered'
			};
			const sortProperty = types[type];
			if (sortProperty === 'name') {
				const sorted = [...Object.values(countryData)].sort((a, b) => a[sortProperty].localeCompare(b[sortProperty]));
				setCountryData(sorted);
			} else {
				const sorted = [...Object.values(countryData)].sort((a, b) => b[sortProperty] - a[sortProperty]);
				setCountryData(sorted);
			}
		};
		sortArray(sortType);
	}, [sortType]);

	const handleChangePage = (e, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = e => {
		setRowsPerPage(+e.target.value);
		setPage(0);
	};

	const getTableRow = ({ name, confirmed, deaths, recovered }) => (
		<TableRow hover key={name}>
			<TableCell component='th' scope='row'>
				{name}
			</TableCell>
			<TableCell align='center'>{numeral(confirmed).format('0,0')}</TableCell>
			<TableCell align='center'>{numeral(deaths).format('0,0')}</TableCell>
			<TableCell align='center'>{numeral(recovered).format('0,0')}</TableCell>
		</TableRow>
	);

	return (
		<div>
			<Header />
			{countryData && globalData ? (
				<>
					<Typography variant='h5' color='initial' className={classes.title}>
						As of {time} GMT, there have been {numeral(globalData.TotalConfirmed).format('0,0')} confirmed coronavirus cases.
					</Typography>
					<Typography variant='h6' color='initial'>
						Deaths: {numeral(globalData.TotalDeaths).format('0,0')}
					</Typography>
					<Typography variant='h6' color='initial'>
						Recovered: {numeral(globalData.TotalRecovered).format('0,0')}
					</Typography>

					<TextField label='Country' variant='standard' onChange={e => setFilter(e.target.value)} />
					<InputLabel shrink id='sort-by'>
						Sort by
					</InputLabel>
					<Select labelId='sort-by' id='sort-by' value={sortType} onChange={e => setSortType(e.target.value)}>
						<MenuItem value='name'>Name</MenuItem>
						<MenuItem value='confirmed'>Confirmed</MenuItem>
						<MenuItem value='deaths'>Deaths</MenuItem>
						<MenuItem value='recovered'>Recovered</MenuItem>
					</Select>
					<Paper color='black' className={classes.tableContainer}>
						<TableContainer component={Paper} className={classes.table}>
							<Table>
								<TableHead>
									<TableRow>
										<StyledTableCell>Country</StyledTableCell>
										<StyledTableCell align='center'>Confirmed Cases</StyledTableCell>
										<StyledTableCell align='center'>Total Deaths</StyledTableCell>
										<StyledTableCell align='center'>Total Recovered</StyledTableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{Object.values(countryData)
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map(country => country.name.toLowerCase().includes(filter.toLowerCase()) && getTableRow(country))}
								</TableBody>
							</Table>
							<TablePagination
								rowsPerPageOptions={[10, 25, 100]}
								component='div'
								count={Object.values(countryData).length}
								rowsPerPage={rowsPerPage}
								page={page}
								onChangePage={handleChangePage}
								onChangeRowsPerPage={handleChangeRowsPerPage}
							/>
						</TableContainer>
					</Paper>
				</>
			) : (
				<>
					<CircularProgress />
				</>
			)}
		</div>
	);
};

export default Home;
