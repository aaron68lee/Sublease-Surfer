import React, { useState, Component } from 'react';
import { GoogleMap, Map, GoogleApiWrapper, InfoWindow, Marker, withScriptjs, withGoogleMap } from 'google-maps-react';
import {useLoadScript, LoadScript, GoogleLoadScript} from '@react-google-maps/api';
import {decodeLocations, getLocationFromAddress} from './backend.js';
//import axios from 'axios';

//<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY"></script>

const apiKey = 'AIzaSyBLe0m-ln0Fs3fHExT2G5LqkG4voSqwBhQ';
const size = 100;
const style = {
  
  width: '100%',
  height: '100%'

}

// ========================== Custom Map Component ===========================

export class CustomMap extends Component{

  // initialize object constructor
  constructor(props)
  {
    super(props);
    
    this.state = {
      count: 0,
      bounds: 
      {
        lat: 10,
        lng: 10
      },

      locations:
      [
        {
          name: "Location 1",
          location: { 
            lat: 37.778519, 
            lng: -122.40564
          },
        },
        {
          name: "Location 2",
          location: { 
            lat: 41.3917,
            lng: 2.1649
          },
        },
      ],
    };
    this.handleClick = this.handleClick.bind(this);
  }

  // marker onclick function
  async handleClick(index) // index keeps track of which marker i
  {
    // hitbox includes full icon
    alert("Marker Clicked")
    console.log("HELLO")
    //decodeLocations();
    /*
    const distance = await calculateDistance("1600 Amphitheatre Parkway, Mountain View, CA", "1 Infinite Loop, Cupertino, CA");
    console.log(`Distance: ${distance} meters`);
    */

    /*
    let location = await getLocationFromAddress("330 De Neve Drive", apiKey)
      .then((location) => {
        //console.log(location);
      })
      .catch((error) => {
        console.error(error);
      });
    */
  };
  
  // auto resizes when new markers are added to map
  resize()
  {
    var points = [];
    
    const places = this.state.locations.map((location, index) => {
      points.push(location.location);
    });
    
    var bounds = new this.props.google.maps.LatLngBounds();
    for (var i = 0; i < points.length; i++) {
      this.state.bounds = bounds.extend(points[i]);
    }
  }

  // ========================== Load Locations ===========================
  async getLocations()
  {
    //this.setState({locations: decodeLocations()});
    
  }
 
  // ========================== Render ===========================
  render() {
    // set map bounds and load locations of all posts from database
    //this.resize()    
    //this.getLocations();
    /*
    const places = this.state.locations.map((location, index) => {
      console.log("Location: " + index + " " + location.location);
    });
    */
    /*const markers = this.state.locations.map((location, index) => (
      //console.log("Location: " + index + " " + location.location),
      <Marker
        key={index}
        onClick={this.handleClick()}
        position={location.location}
        title="post title"
        content="test content"
        icon={{
          url:"https://cdn.vox-cdn.com/thumbor/JCzDlDQzFM8CuSzG5smAE_dUwEI=/0x0:1220x813/1075x1075/filters:focal(513x310:707x504):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/56773485/shutterstock_566476819.0.1505928130.jpg",
          anchor: new window.google.maps.Point(size/2, size/2),
          scaledSize: new window.google.maps.Size(size, size)
        }}
      />
    ));
    */

    return (
        <Map 
          google={this.props.google} 
          zoom={14}
          style={style}
          /*
          initialCenter={{
            lat: this.state.locations[1].location.lat,
            lng: this.state.locations[1].location.lng,
          }}*/
        >

        {this.state.locations.map((location, index) => (
      <Marker
        key={index}
        onClick={this.handleClick()}
        position={location.location}
        title="post title"
        content="test content"
        icon={{
          url:"https://cdn.vox-cdn.com/thumbor/JCzDlDQzFM8CuSzG5smAE_dUwEI=/0x0:1220x813/1075x1075/filters:focal(513x310:707x504):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/56773485/shutterstock_566476819.0.1505928130.jpg",
          anchor: new window.google.maps.Point(size/2, size/2),
          scaledSize: new window.google.maps.Size(size, size)
        }}
      />
        ))};
    
        
        {/*}
        <Marker
            title={'The marker`s title will appear as a tooltip.'}
            name={'SOMA'}
            position={{lat: 37.778519, lng: -122.405640}} />
        <Marker
          name={'Dolores park'}
          position={{lat: 37.759703, lng: -122.428093}} />
        <Marker />
          */}

        <InfoWindow visible={true}>
            <div>
              <h1>Here is a place.</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: apiKey
})(CustomMap)

export {
  apiKey,
}