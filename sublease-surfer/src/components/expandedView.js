import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ExpandedView(props){ //, name, picture, address, description, startDate, endDate, price, contact ) {
  //const { name, picture, address, description, startDate, endDate, price, contact } = props.post;
  
  //onsole.log(props);

  // posting fields
  
  const name = props.post.name;
  const picture = props.post.picture;
  const address = props.post.address;
  const description = props.post.description;
  const startDate = props.post.startDate;
  const endDate = props.post.endDate;
  const price = props.post.price;
  const contact = props.post.contact;
  console.log(address)
  
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
