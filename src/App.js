import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';

function App() {
	return (
		<div className='App'>
			<Switch>
				<Route path='/' exact render={props => <Home {...props} />} />
				<Route path='/about' render={props => <About {...props} />} />
			</Switch>
		</div>
	);
}

export default App;
