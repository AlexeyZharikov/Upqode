function initMap() {
    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: {lat: 42.37192738854035, lng:-71.05121256546929}
    });
  
    setMarkers(map);
  }