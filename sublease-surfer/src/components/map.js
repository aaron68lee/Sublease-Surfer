import React, { useState, Component } from 'react';
import { GoogleMap, Map, GoogleApiWrapper, InfoWindow, Marker, withScriptjs, withGoogleMap } from 'google-maps-react';
import {useLoadScript, LoadScript, GoogleLoadScript} from '@react-google-maps/api';
import {decodeLocations} from './backend.js';
//import axios from 'axios';

//<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY"></script>

const apiKey = 'AIzaSyBLe0m-ln0Fs3fHExT2G5LqkG4voSqwBhQ';

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
  handleClick()
  {
    // hitbox includes full icon
    alert("marker clicked")
  };
    
  // auto resizes when new markers are added to map
  resize()
  {
    var points = [
      { lat: 42.02, lng: -77.01 },
      { lat: 42.03, lng: -77.02 },
      { lat: 41.03, lng: -77.04 },
      { lat: 42.05, lng: -77.02 }
    ]
    var bounds = new this.props.google.maps.LatLngBounds();
    for (var i = 0; i < points.length; i++) {
      this.state.bounds = bounds.extend(points[i]);
    }
  }


  // ========================== Render ===========================
  render() {
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

        <Marker 
            onClick={this.handleClick}
            location={this.state.locations[1]}    
            //key={index} 
            //position={marker.position} 
            name="seller name"
            title="post title"
            content="test content"
            
            icon={{
              url:"https://cdn.vox-cdn.com/thumbor/JCzDlDQzFM8CuSzG5smAE_dUwEI=/0x0:1220x813/1075x1075/filters:focal(513x310:707x504):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/56773485/shutterstock_566476819.0.1505928130.jpg",
              anchor: new window.google.maps.Point(0, 0),
              scaledSize: new window.google.maps.Size(100, 100)
            }}
            
        />
        
        <Marker
            title={'The marker`s title will appear as a tooltip.'}
            name={'SOMA'}
            position={{lat: 37.778519, lng: -122.405640}} />
        <Marker
          name={'Dolores park'}
          position={{lat: 37.759703, lng: -122.428093}} />
        <Marker />
        
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
