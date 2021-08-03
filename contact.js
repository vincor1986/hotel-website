// Initialize and add the map
function initMap() {
  // The location of Avenue Montaigne
  const paris = { lat: 48.866, lng: 2.304 };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: paris,
  });
  // The marker, positioned at paris
  const marker = new google.maps.Marker({
    position: paris,
    map: map,
  });
}
