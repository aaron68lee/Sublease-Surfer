import React, {Component } from 'react';
import { GoogleMap, Map, GoogleApiWrapper, InfoWindow, Marker, withScriptjs, withGoogleMap } from 'google-maps-react';
//import {useLoadScript, LoadScript, GoogleLoadScript} from '@react-google-maps/api';
import {decodeLocations, calculateDistance} from './backend.js';


const apiKey = 'AIzaSyBLe0m-ln0Fs3fHExT2G5LqkG4voSqwBhQ';
const size = 100;
const style = {
  width: '100%',
  height: '100%'
}

const campusCoord = {
  lat: 34.070366,
  lng: -118.44411,
}
const campusAddress = "308 Westwood Plaza";

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
          name: "Location 3",
          location: { 
            lat: 39.778519, 
            lng: -123.40564
          },
        },
        {
          name: "Location 2",
          location: { 
            lat: 41.3917,
            lng: -125.1649
          },
        },
      ],
    };
    this.handleClick = this.handleClick.bind(this);
  }

  // function automatically called once CustomMap comnponent is mounted  (BUILT IN)
  async componentDidMount() {
    const locations = await this.getLocations();
    this.setState({ locations: locations });
  }

  // called when component state changes for LOCATION field: resizes the map to include all markers
  componentDidUpdate(prevProps, prevState) {
    if (this.state.locations !== prevState.locations) {
      //this.resize();
    }
  }

  // marker onclick function
  async handleClick(index) // index keeps track of which marker i
  {
    // hitbox includes full icon
    alert("Marker Clicked")
    //decodeLocations();
    
    const distance = await calculateDistance(this.state.locations[index].address, campusAddress);
    console.log(`Distance: ${distance} miles`);
    
  };
  
  // auto resizes when new markers are added to map
  resize()
  {
    const points = this.state.locations.map(location => location.location);
    const bounds = new this.props.google.maps.LatLngBounds();
    for (let i = 0; i < points.length; i++) {
      bounds.extend(points[i]);
    }
    this.setState({ bounds });
  }

  // ========================== Load Locations ===========================
  async getLocations()
  {
    const locations = await decodeLocations(apiKey);
    //console.log("Decoded Locations: " + JSON.stringify(locations));
    this.setState({locations: locations});
    return locations;
  }
 
  // ========================== Render ===========================
  render() {
    // set map bounds and load locations of all posts from database
    //this.resize()    
    console.log("ALL LOCATIONS: " + JSON.stringify(this.state.locations));

    const markers = this.state.locations.map((location, index) => (
      console.log("Location: " + index + " " + JSON.stringify(location)),
      <Marker
        key={index}
        onClick={() => this.handleClick(index)}
        position={location.location}
        title="post title"
        content="test content"
        /*
        icon={{
          url:"https://cdn.vox-cdn.com/thumbor/JCzDlDQzFM8CuSzG5smAE_dUwEI=/0x0:1220x813/1075x1075/filters:focal(513x310:707x504):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/56773485/shutterstock_566476819.0.1505928130.jpg",
          anchor: new window.google.maps.Point(size/2, size/2),
          scaledSize: new window.google.maps.Size(size, size)
        }}*/
      />
    ));
    

    return (
        <Map 
          google={this.props.google} 
          zoom={14}
          style={style}
          initialCenter={campusCoord} // an obj of coords
        >
   
        {markers}

        {/*
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