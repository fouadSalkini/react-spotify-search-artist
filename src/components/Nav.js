import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from './services/AuthService';
import './css/style.css';



class Nav extends Component {

	logoutEvent() {
		if(AuthService.isLoggedIn())
		{
			AuthService.logout();
			window.location.href="/";
		}
			
		
	}
	
    render(){
    		return (
				<nav className="navbar navbar-default">
					<div className="navbar-header">
						<ul className="nav navbar-nav">
							<li><Link to="/" onClick={() => this.logoutEvent()}>{AuthService.isLoggedIn()? <span>Logout</span>  : <span>Login</span> }</Link></li>
						</ul>
					</div>
				</nav>
				
			);
    	}
	
}

export default Nav