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
	title: {
		flexGrow: 1
	}
});

const Header = ({ history }) => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<AppBar position='static' color='default'>
				<Toolbar>
					<Typography variant='h4' className={classes.title}>
						CoronaVirus Counter
					</Typography>
					<div>
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
