
window.initMap = async () => {
    const data = await getData()
    console.log(data)
  
    // Create the map.
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: { lat: 31, lng: 112 },
      mapTypeId: 'terrain',
    })
  
  var heatMapData = [];
  var circles = [];
  
    // Construct the circle for each value in citymap.
    // Note: We scale the area of the circle based on the population.
    for (var i = 0; i < data.length; i++) {
      var lat = data[i].Lat;
      var long = data[i].Long;
      var numberOfPeople = data[i]['2/28/20'];
  
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
  
      circles[i] = cityCircle;
      
      heatMapData[i] = [{
        location: new google.maps.LatLng(10, 10), weight: 10
        //location: new google.maps.LatLng(cityCircle.center), weight: 10   //{lat: Number(lat), lng: Number(long)}), weight: Math.sqrt(numberOfPeople)
      }];
  
      console.log(heatMapData[i]);
  
      //if(numberOfPeople > 1000)
          //document.getElementById("console").innerHTML = "Coronavirus Infectious Map"; 
    }
    ////////////////////////////////////////   MAP CONTROL CODE //////////////////////////////////////////////
  
  
    var contentStringBackup = "Number Infected: " + "50" + "<br>"
    "Number Dead:" + "<br>"
    "Coordinates: (" + "100" + ", " + "200" + ")" + "<br>"
    "";
  
    // var contentString = "Number Infected: " + this.radius/50 + "<br>"
    // "Number Dead:" + "<br>"
    // "Coordinates: (" + this.center.Lat + ", " + this.center.Long + ")" + "<br>"
    // "";
  
  var infowindow = new google.maps.InfoWindow({
    content: contentStringBackup
  });
  
  // var marker = new google.maps.Marker({
  //   position: myLatLng,
  //   map: map,
  //   title: "City"
  // });
  
  //var HeatmapLayer = new google.maps.HeatmapLayer();
  
  var heatmap =  new google.maps.visualization.HeatmapLayer({
    data: heatMapData,
    radius: 10,
    map: map
  });
  
  heatmap.setMap(map);
  
  google.maps.event.addListener(cityCircle, 'mouseOver',function(){
    infowindow.open(map);
    alert("hi");
  });
  
  
  var markers = [];
  
    //overlay.setMap(map)
  function marker()
  {
    for(var i = 0; i < data.length; i++){
      var marker = new google.maps.Marker({
        position: circles[i].center,
        map: map,
        title: Math.round(Math.pow(circles[i].radius/100000, 8)) + " infected \n" + circles[i].center
      });
      markers[markers.length] = marker;
      
    }
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