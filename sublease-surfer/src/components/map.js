import React, { useState } from 'react';
import { GoogleMap, Map, GoogleApiWrapper, InfoWindow, Marker, withScriptjs, withGoogleMap } from 'react-google-maps';
import {useLoadScript, LoadScript, GoogleLoadScript} from '@react-google-maps/api';
//import axios from 'axios';

//<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY"></script>

const apiKey = 'AIzaSyBLe0m-ln0Fs3fHExT2G5LqkG4voSqwBhQ';

function CustomMap() {
  const [markers, setMarkers] = useState([]); // collection of all marker locations

  const mapStyles = { // temp styling for map
    height: "100vh",
    width: "100%",
    zoomControlOptions: {
      //position: google.maps.ControlPosition.RIGHT_CENTER,
    },
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  const handleMapClick = (event) => {
    setMarkers(markers.concat({
      position: event.latLng,
    }));
  };

  // some internal error in loading map with API key
  if (loadError)
    return <div>Map cannot be loaded.</div>;

  if (!isLoaded)
    return <div>...Loading in progress...</div>
  else
  {
    /*
    const onLoad = React.useCallback(
      
      return (
        <GoogleMap
          defaultZoom={8}
          defaultCenter={{ lat: -34.397, lng: 150.644 }}
          mapContainerStyle={mapStyles}
          onClick={handleMapClick}
        >
        {
          // additional map components
        }
        </GoogleMap>
      );
      
    )*/
    
    /*
    return (
      <LoadScript
        googleMapsApiKey = {apiKey}>
        <GoogleMap
          defaultZoom={8}
          defaultCenter={{ lat: -34.397, lng: 150.644 }}
          mapContainerStyle={mapStyles}
          onClick={handleMapClick}
        >


        <Marker
          icon={{
            url:"../../assets/img/carz.png",
            anchor: new window.google.maps.Point(10, 10),
            scaledSize: new window.google.maps.Size(20, 20)
          }}
        />

          {markers.map((marker, index) => (
            <Marker 
              key={index} 
              position={marker.position} 
              name = "seller name"
              title = "post title"
              content = "test content"
              icon={{
                url:"../../assets/img/carz.png",
                anchor: new window.google.maps.Point(10, 10),
                scaledSize: new window.google.maps.Size(20, 20)
              }}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    );
    */
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
