import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import $ from 'jquery'; 
import AuthService from './services/AuthService';
import Album from './Album';
import Loading from './Loading';

class ArtistInfo extends Component {

	state = {
		activeArtistId:this.props.match.params.id,
		artistInfo:null,
		artistName:'',
		artistAlbums:[],
		gettingData: false
	};

	componentDidMount(){
	  console.log('redirected to ArtistInfo');
	  this.getArtistInfo(this.state.activeArtistId);
	}

	getArtistInfo(id) {
		const that = this;
		that.setState({
		    gettingData: true
		});
		$.ajax({
	  		url:'https://api.spotify.com/v1/artists/'+id,
	  		type:'get',
	  		data:{
	  			id:id,
	  		},
	  		headers: {
			    "Authorization": "Bearer "+AuthService.getAccessToken()
			  },
	  		dataType:'json',
	  		success:function(data){
	  			console.log(data);
	  			that.setState({
				    artistInfo: data,
					artistName:data.name,
				});
				that.getArtistAlbums(id);
	  		},
	  		error:function(error){
	  			console.log(error);
	  			that.setState({
				    gettingData: false,
				});
	  			if(error.status === 401)
	  			{
	  				//not authorized..
	  				AuthService.logout();
	  				window.location.href="/";
	  			}

	  		}

	  	});
	}

	getArtistAlbums(id) {
		const that = this;

		$.ajax({
	  		url:'https://api.spotify.com/v1/artists/'+id+'/albums',
	  		type:'get',
	  		data:{
	  			id:id,
	  		},
	  		headers: {
			    "Authorization": "Bearer "+AuthService.getAccessToken()
			  },
	  		dataType:'json',
	  		success:function(data){
	  			console.log(data);
	  			that.setState({
				    artistAlbums: data.items,
				    gettingData: false
				});
	  		},
	  		error:function(error){
	  			console.log(error);
	  			that.setState({
				    gettingData: false
				});
	  			if(error.status === 401)
	  			{
	  				//not authorized..
	  				AuthService.logout();
	  				window.location.href="/";
	  			}

	  		}

	  	});
	}

	render() {
		return (
			<div>
				<h1>{this.state.artistName}</h1>
				<h3>Albums</h3>
				{this.state.gettingData? <Loading /> :
				<ul className="artist-albums list-artists">
					{
		                    this.state.artistAlbums.map((item, key) => {
		                        return <Album key={item.id} data={item} />
		                    })
		            }
				</ul>
			     }
			</div>
			);
	}
}

export default withRouter(ArtistInfo)