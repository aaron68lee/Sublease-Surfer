import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { CustomMap } from './map';
//import {TrackingTrigger} from '@vrbo/react-event-tracking';
import '../styles/pictureScroll.css'

//=============================== EXPANDED POST CURRENTLY OBSELETE ===========================================

function ExpandedView(props){ //, name, picture, address, description, startDate, endDate, price, contact ) {
  //const { name, picture, address, description, startDate, endDate, price, contact } = props.post;
  
  //console.log("Props: " + JSON.stringify(props));

  // posting fields
  console.log("Name: " + JSON.stringify(props.post.name));
  
  const name = props.post.name;
  const picture = props.post.picture;
  const address = props.post.address;
  const description = props.post.description;
  const startDate = props.post.startDate;
  const endDate = props.post.endDate;
  const price = props.post.price;
  const contact = props.post.contact;
  
  return (
      
      <Modal show={props.showModal} onHide={props.handleCloseModal} centered>
        {/*<TrackingTrigger event="modal-opened"/>*/}
        <Modal.Header closeButton>
          <Modal.Title>Owner: {name}</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          <div className="picture-scroller">
            <div className="pictures">
              <img src={picture} alt='post image' />
            </div>
            <button className="scroll-button left">&lt;</button>
            <button className="scroll-button right">&gt;</button>
          </div>
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
