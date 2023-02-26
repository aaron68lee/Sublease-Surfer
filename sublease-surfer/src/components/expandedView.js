import React from 'react';

function ExpandedView(props) {
  const { name, picture, address, description, startDate, endDate, price, contact } = props.post;

  return (
    <div className='post-expanded'>
      <h2>Owner: {name}</h2>
      <img src={picture} alt='post image' />
      <p>Address: {address}</p>
      <p>Details: {description}</p>
      <p>Dates: {startDate} to {endDate}</p>
      <p>Price: {price}</p>
      <p>Contact: {contact}</p>
    </div>
  );
}

export default ExpandedView;
