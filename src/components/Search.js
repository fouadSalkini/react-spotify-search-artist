import React, { Component } from 'react';
import $ from 'jquery'; 
import AuthService from './services/AuthService';
import Artist from './Artist';
import Loading from './Loading';

class Home extends Component {

	constructor() {
	    super();
	    this.state = {
	    	queryString: AuthService.getSearchString(),
	        artists: AuthService.getSearchData(),
	        gettingData:false,
	    };



    	//this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    	console.log('mounted search');        
    }

 getSearchedArtist(){
  	const that = this;
  	const val = $('#search-artist').val();
  	

  	if(val==='')
  	{
  		that.setState({
		    artists: []
		});
  		console.log('no data entry');
  		return;
  	}
  	that.setState({
	    gettingData: true
	});
  	$.ajax({
  		url:'https://api.spotify.com/v1/search',
  		type:'get',
  		data:{
  			type:'artist',
  			q:val,
  		},
  		headers: {
		    "Authorization": "Bearer "+AuthService.getAccessToken()
		  },
  		dataType:'json',
  		success:function(data){
  			console.log(data);
  			that.updateArtistsList(val,data.artists.items);  			
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

  updateArtistsList(value,data){
  	this.setState({
	    artists: data,
	    gettingData: false,
	    queryString:value,
	});

	AuthService.storeArtistSearchData(value, data);
  }
	
	render() {
		return (
			<div>
				<h1>Artist Search</h1>
				<div className="search-input">
					<input autoComplete="off" defaultValue={this.state.queryString} id="search-artist" className="form-control" type="search" placeholder="Search for Artist" onKeyUp={ () => this.getSearchedArtist()} />
				</div>
				<div className="artists-result">
				    {this.state.gettingData? <Loading /> : 
					<ul className="list-artists">
						{
		                    this.state.artists.map((item, key) => {
		                        return <Artist key={item.id} data={item} />
		                    })
		                }
					</ul>
				    }
				</div>
			</div>
			)
	}
}

export default Home