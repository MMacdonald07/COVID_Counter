import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import Header from './Header';
import Typography from '@material-ui/core/Typography';

const Home = () => {
	const [globalData, setGlobalData] = useState({});
	const [countryData, setCountryData] = useState({});

	const time = moment().format('MMMM Do YYYY, h:mm:ss a');

	useEffect(() => {
		axios.get('https://api.covid19api.com/summary').then(function (res) {
			const { data } = res;
			const newGlobalData = data.Global;
			setGlobalData(newGlobalData);

			// const resCountryData = data.Countries;
			// const newCountryData = {};
			// resCountryData.forEach((country, index) => {
			// 	newCountryData[index + 1] = {
			// 		name: country.Country,
			// 		confirmed: country.TotalConfirmed,
			// 		deaths: country.TotalDeaths,
			// 		recovered: country.TotalRecovered
			// 	};
			// });

			// setCountryData(newCountryData);
		});
	}, []);

	return (
		<div>
			<Header />
			<Typography variant='h5' color='initial'>
				As of {time}, the total number of coronavirus cases is {globalData.TotalConfirmed}.
			</Typography>
			<Typography variant='h6' color='initial'>
				Deaths: {globalData.TotalDeaths}
			</Typography>
			<Typography variant='h6' color='initial'>
				Recovered: {globalData.TotalRecovered}
			</Typography>
		</div>
	);
};

export default Home;
