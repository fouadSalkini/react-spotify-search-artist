import React, { Component } from 'react';
import AuthService from './services/AuthService';


class Login extends Component {

    login = () => {
        console.log(AuthService.AUTHORIZATION_URL);
        return AuthService.AUTHORIZATION_URL;
    };

    showUrl(){
        console.log(AuthService.AUTHORIZATION_URL);
    }

    render() {
        return (
            
                <div className="login-header">
                    <h5>
                        
                        <a href={this.login()} className="btn btn-default">
                            <img src="/assets/images/spotify-icon/spotify-icon-green.png" alt="Spotify Icon" className="spotify-icon"/>
                            Login with <span >Spotify</span>
                        </a>
                    </h5>
                </div>
                    
        );
    }
}

export default Login;
