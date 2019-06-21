import React from 'react';

const Rating = (props) => {
	const popularity = props.popularity;

  const list = [];
	for (let i = 1; i <= 5; i++)
    {
        list.push(
          <li key={i} className="start">
            <i className={i<=popularity? 'fa fa-star active' : 'fa fa-star'}></i>
          </li>
          );
    }

  return (
        <ul className="rating">
          {
              list.map((item, key) => {
                  return item
              })
          }
        </ul>
  );
};

export default Rating;