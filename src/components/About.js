import React from 'react';
import Header from './Header';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	container: {
		margin: '2rem 0 0 4.5rem'
	},
	text: {
		marginBottom: '1rem'
	},
	link: {
		textDecoration: 'none',
		color: 'green',
		'&:hover': {
			borderBottom: '2px solid green'
		}
	}
});

const About = () => {
	const classes = useStyles();
	return (
		<div>
			<Header />
			<div className={classes.container}>
				<Typography variant='h5' color='initial' className={classes.text}>
					Coronavirus is an infectious strain of the flu.
				</Typography>
				<Typography variant='h5' color='initial' className={classes.text}>
					Most people infected with the virus will experience mild to moderate respiratory illness and recover without requiring
					special treatment. Older people, and those with underlying medical problems like cardiovascular disease, diabetes,
					chronic respiratory disease, and cancer are more likely to develop serious illness.
				</Typography>
				<Typography variant='h6' color='initial' className={classes.text}>
					For more information please use the following resources:
				</Typography>
				<Typography variant='h6' color='initial'>
					<a href='https://www.who.int/health-topics/coronavirus' target='_blank' rel='noreferrer' className={classes.link}>
						World Health Organisation
					</a>
				</Typography>
				<Typography variant='h6' color='initial'>
					<a href='https://www.nhs.uk/conditions/coronavirus-covid-19/' target='_blank' rel='noreferrer' className={classes.link}>
						NHS
					</a>
				</Typography>
			</div>
		</div>
	);
};

export default About;
