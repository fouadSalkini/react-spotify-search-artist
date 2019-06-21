import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import AuthService from './services/AuthService';

import Header from './Header';
import Footer from './Footer';
import Error from "./Error";
import Login from './Login';
import Search from './Search';
import ArtistInfo from './ArtistInfo';

class Root extends Component {

	state = {
        isLoggedIn: AuthService.isLoggedIn() //AuthService.isLoggedIn()
    };

    componentDidMount() {
    	//console.log('mounted');
        const token = AuthService.getAccessTokenFromRedirect();
        if (token) {
            this.setAccessToken(token);
        }
    }

    setAccessToken(token) {
        AuthService.setAccessToken(token);
        this.setState({
            isLoggedIn: true
        });
    }

    logout = () => {
        AuthService.logout();
        this.setState({
            isLoggedIn: false
        });
    };

	render() {
		
		return (
			<div className="content">
				<Header loggedIn={this.state.isLoggedIn} />
				<div className="container page-content">
					<div className="row">
						<div className="col-md-12 col-md-offset-1">
							 {this.props.children}
							<Switch>
					            <Route exact path="/" render={props => (
	                                this.state.isLoggedIn ?
	                                    <div className="search-container">
	                                        <Search />
	                                    </div>
	                                    :
	                                    <Login/>
	                            )}/>

					            <Route exact path="/search" render={props => (
                                this.state.isLoggedIn ? <Search /> : <div>Access Denied</div>
	                            )}/>

	                            <Route exact path="/artistInfo/:id/" render={(props) =>  (
	                                this.state.isLoggedIn ? <ArtistInfo /> : <div>Access Denied</div>
	                            )}/>

	                            <Route exact path="/artist/:id/albums" render={props => (
	                                this.state.isLoggedIn ? <div>Albums</div> : <div>Access Denied</div>
	                            )}/>

					            <Route component={Error} />
					        </Switch>
						</div>
					</div>
				</div>
				<Footer />
			</div>

			)
	}
}

export default Root;
