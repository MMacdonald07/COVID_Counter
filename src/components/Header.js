import React from 'react';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
	root: {
		flexGrow: 1
	},
	appBar: {
		paddingBottom: '0.5rem',
		width: '100%'
	},
	title: {
		flexGrow: 1,
		paddingTop: '0.25rem',
		paddingLeft: '3rem'
	},
	navButtons: {
		paddingRight: '3rem',
		paddingTop: '0.25rem'
	}
});

const Header = ({ history }) => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<AppBar position='static' color='inherit' className={classes.appBar}>
				<Toolbar>
					<Typography variant='h4' className={classes.title}>
						<strong>CoronaVirus Counter</strong>
					</Typography>
					<div className={classes.navButtons}>
						<Button variant='text' color='default' onClick={() => history.push('/')}>
							Home
						</Button>
						<Button variant='text' color='default' onClick={() => history.push('/about')}>
							About
						</Button>
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default withRouter(Header);
