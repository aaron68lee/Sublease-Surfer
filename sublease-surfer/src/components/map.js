import React, { useState } from 'react';
import { GoogleMap, Map, GoogleApiWrapper, InfoWindow, Marker, withScriptjs, withGoogleMap } from 'react-google-maps';
import {useLoadScript, LoadScript, GoogleLoadScript} from '@react-google-maps/api';
//import axios from 'axios';

const apiKey = 'AIzaSyBLe0m-ln0Fs3fHExT2G5LqkG4voSqwBhQ';

function CustomMap() {
  const [markers, setMarkers] = useState([]); // collection of all marker locations

  const mapStyles = { // temp styling for map
    height: "100vh",
    width: "100%"
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
  });


  const handleMapClick = (event) => {
    setMarkers(markers.concat({
      position: event.latLng,
    }));
  };

  if (!isLoaded)
    return <div>...Loading...</div>
  else
  {
    return (
      <LoadScript
        googleMapsApiKey = {apiKey}>
        <GoogleMap
          defaultZoom={8}
          defaultCenter={{ lat: -34.397, lng: 150.644 }}
          mapContainerStyle={mapStyles}
          onClick={handleMapClick}
        >
          {markers.map((marker, index) => (
            <Marker 
              key={index} 
              position={marker.position} 
              name = "seller name"
              title = "post title"
              content = "test content"
            />
          ))}
        </GoogleMap>
      </LoadScript>
    );
  }
  
};

/*
window.initMap = async () => {
      //const data = await getData()
      //console.log(data)
    
      // Create the map.
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: { lat: 31, lng: 112 },
        mapTypeId: 'terrain',
      })
    
    var circles = [];
    
    
        // Add the circle for this city to the map.
        var cityCircle = new google.maps.Circle({
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35,
          map: map,
          center: {lat: Number(lat), lng: Number(long)},
          radius: Math.pow(numberOfPeople, 1/8) * 100000,
        })
    

    var contentString = "Map Marker Popup Description Here";
    
    var infowindow = new google.maps.InfoWindow({
      content: contentString,
    });
    
    // var marker = new google.maps.Marker({
    //   position: myLatLng,
    //   map: map,
    //   title: "City"
    // });
    
    google.maps.event.addListener(cityCircle, 'mouseOver',function(){
      infowindow.open(map);
      alert("hi");
    });
    
    // ==================================== Aggregate All Posts on Single Map ==============================
    var markers = [];
    
    
    function marker()
    {
      
    }

    //marker();
    
    var newCircle = new google.maps.Circle({
      strokeColor: '#FFFFFF',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FFFFFF',
      fillOpacity: 0.35,
      map: map,
      center: {lat: 10, lng: 10},
      radius: 500
    })
    
    console.log(newCircle);
  
}
*/
export default CustomMap;
