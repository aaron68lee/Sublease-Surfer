import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ExpandedView(props){ //, name, picture, address, description, startDate, endDate, price, contact ) {
  const { name, picture, address, description, startDate, endDate, price, contact } = props.post;

  // posting fields
  /*
  name = props.name;
  picture = props.picture;
  address = props.address;
  description = props.description;
  startDate = props.startDate;
  endDate = props.endDate;
  price = props.price;
  contact = props.contact;
  */
  /*
  // posting fields
  name = post.name;
  picture = post.picture;
  address = post.address;
  description = post.description;
  startDate = post.startDate;
  endDate = post.endDate;
  price = post.price;
  contact = post.contact;
  */

  
  return (
   
    <Modal show={props.showModal} onHide={props.handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Owner: {name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={picture} alt='post image' />
        <p>Address: {address}</p>
        <p>Details: {description}</p>
        <p>Dates: {startDate} to {endDate}</p>
        <p>Price: {price}</p>
        <p>Contact: {contact}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={props.handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
  
}

export default ExpandedView;
