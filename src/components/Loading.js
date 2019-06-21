import React from 'react';

const Loading = (props) => {
  return (
    <div className="loading">
      <svg className="circular" viewBox="25 25 50 50">
			<circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"></circle>
	  </svg>
    </div>
  );
};

export default Loading;