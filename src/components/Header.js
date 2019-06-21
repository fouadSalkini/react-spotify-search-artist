import React from 'react';
import { Link } from 'react-router-dom';

import './css/style.css';
import Nav from './Nav'

const Header = (props) => {



	return (
		<header>
			<div className="container">
			    <div className="logo"><Link to="/"><img alt="Spotify" src="/assets/images/spotify-logo/spotify-logo-green.png" /></Link></div>
				<Nav loggedIn={props.loggedIn} />
			</div>
		</header>
		);
}

export default Header