// Figure out what the date was 7 days ago
var sevenDaysAgo = new Date();
sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

// Show the "since" date in the title box
$('#startDate').html(sevenDaysAgo.toDateString());

// Create a SODA-ready date string for 7 days ago that looks like: YYYY-mm-dd
sevenDaysAgo = sevenDaysAgo.getFullYear() + '-' 
  + cleanDate((sevenDaysAgo.getMonth() + 1)) + '-' 
  + cleanDate((sevenDaysAgo.getDate() + 1));

// Call getData() and show spinner when the map is dragged
map.on('dragend', function(e) {
  $('#spinnerBox').fadeIn();
  getData();
});

// Call getData() once to get this API party started
getData();

function getData() {
  // Clear markers before getting new ones
  markers.clearLayers();

  // Get map bounds from Leaflet.  getBounds() returns an object
  var bbox = map.getBounds();
  console.log(bbox);

  // within_box() expects a bounding box that looks like: topLeftLat,topLeftLon,bottomRightLat,bottomRightLon, so we need to reorder the coordinates Leaflet returned
  var sodaQueryBox = [
    bbox._northEast.lat, 
    bbox._southWest.lng, 
    bbox._southWest.lat, 
    bbox._northEast.lng
  ];

  var sodaQuery = buildQuery(sevenDaysAgo, sodaQueryBox);
  
  function buildQuery(sevenDaysAgo, sodaQueryBox) {
  var query ="//maps.marine.ie/arcgis/rest/services/Infomar/SurveyCoverage/MapServer/0/query?where=YEAR%3E1990&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelContains&relationParam=&outFields=SURVEY%2CYEAR%2CPROJECT%2C+Nearest_co&returnGeometry=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&f=pjson";

  console.log(query);
  return query;
}

$.getJSON(sodaQuery, function(data) {
    //iterate over each 311 complaint, add a marker to the map
    for (var i = 0; i < data.length; i++) {

      var marker = data[i];
      var markerItem = L.circleMarker(
        [marker.location.latitude,marker.location.longitude], {
          radius: 5,
          fillColor: "steelblue",
          color: "#000",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8,
        });

      markerItem.bindPopup(
        '<h4>' + marker.complaint_type + '</h4>' 
        + (new Date(marker.created_date)).toDateString() 
        + ((marker.incident_address != null) ? '<br/>' + marker.incident_address : '')
      );

      markers.addLayer(markerItem);
    }
    //.addTo(map);
    map.addLayer(markers);

    //fade out the loading spinner
    $('#spinnerBox').fadeOut();
  })
} // End of getData()
