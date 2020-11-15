import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './App';

const history = createBrowserHistory();

ReactDOM.render(
	<Router history={history}>
		<CssBaseline>
			<App />
		</CssBaseline>
	</Router>,
	document.getElementById('root')
);
