var mapBY = L.map('mapBY', {
            center: [53.5, -10.397],
			layers: [base_EsriOceans,bathy_Contours],
            zoom: 7,
            layersControl: true,
        });
	
var samplePoints = L.geoJson(samplePts, {
			onEachFeature: function (feature, layer) {
				var imageLink = "//maps.marine.ie/infomar/" + feature.properties.IMG_URL;
						
				if (feature.properties && feature.properties.VESSELYEAR) {
				 var popupHTML ="<table class=\"tg\"><tr><th class=\"tg-9hbo\">Vessel Year</th><th class=\"tg-yw4l\">" + feature.properties.VESSELYEAR + "</th></tr><tr><td class=\"tg-9hbo\">Label</td><td class=\"tg-yw4l\">"+ feature.properties.LABEL+ "</td></tr><tr><td class=\"tg-9hbo\">Date</td><td class=\"tg-yw4l\">" + feature.properties.DATE +"</td></tr><tr><td class=\"tg-9hbo\">Latitude</td><td class=\"tg-yw4l\">"+ Math.round(feature.properties.LAT * 100)/100+ "</td></tr><tr><td class=\"tg-9hbo\">Longitude</td><td class=\"tg-yw4l\">"+ Math.round(feature.properties.LONG * 100)/100 + "</td></tr><tr><td class=\"tg-9hbo\">Depth</td><td class=\"tg-yw4l\">"+ feature.properties.DEPTH + "m</td></tr>";
				
					if(feature.properties.DESCRIPT != 'undefined' && feature.properties.DESCRIPT != ""){
						popupHTML += "<tr><td class=\"tg-9hbo\">Description</td><td class=\"tg-yw4l\">"+ feature.properties.DESCRIPT + "</td></tr>";
				 }
					if(feature.properties.COMMENT != 'undefined' && feature.properties.COMMENT != ""){
				 		popupHTML += "<tr><td class=\"tg-9hbo\">Comment</td><td class=\"tg-yw4l\">"+ feature.properties.COMMENT + "</td></tr>";
					}
				 	if(feature.properties.IMG_URL != 'undefined' && feature.properties.IMG_URL != ""){
						popupHTML += "<tr><td colspan=\"2\"><img src='" + imageLink + "' width='100%' /></td></tr>";
				  }
					popupHTML +="</table>"
				}
			layer.bindPopup(popupHTML);		
			}
		});
		
		var markers = L.markerClusterGroup();
		markers.addLayer(samplePoints);
		mapBY.addLayer(markers);
	
var seabedClass = L.esri.dynamicMapLayer({
	url: 'https://maps.marine.ie/arcgis/rest/services/Infomar/SeabedClassificationAllAreas/MapServer',
	opacity: 0.7
});	

var highlightBdry;
mapBY.on('click', function(e){
	if(seabedClass){
	seabedClass.identify().on(mapBY).at(e.latlng)
	 .run(function(error, featureCollection, response){
		if (featureCollection.features.length > 0) { 
      var popupSeabed = L.popup()
		.setLatLng(e.latlng)
		.setContent("<table class=\"tg\"><tr><td class=\"tg-9hbo\">Folk Class</td><td>" + featureCollection.features[0].properties.Folk_modif + "</td></tr><tr><td class=\"tg-9hbo\">EUNIS Class</td><td>" + featureCollection.features[0].properties.EUNIS + "</td></tr><tr><td class=\"tg-9hbo\">Comment</td><td>" + featureCollection.features[0].properties.Comment + "</td></tr><tr><td class=\"tg-9hbo\">Classification Method</td><td>" + featureCollection.features[0].properties.Clsfcation + "</td></tr><tr><td class=\"tg-9hbo\">Survey Code</td><td>" + featureCollection.features[0].properties.SurveyCode + "</td></tr><tr><td class=\"tg-9hbo\">Data Source</td><td>" + featureCollection.features[0].properties.Dat_source + "</td></tr><tr><td class=\"tg-9hbo\">Data Owner</td><td>" + featureCollection.features[0].properties.Dat_owner + "</td></tr></table>")
		.openOn(mapBY);
		
		var boundaryPts = [];
		for(var i = 0; i < featureCollection.features[0].geometry.coordinates[0].length; i++){
			boundaryPts.push([featureCollection.features[0].geometry.coordinates[0][i][1],featureCollection.features[0].geometry.coordinates[0][i][0]]);
		}

		highlightBdry = L.polygon(boundaryPts, {
		 color: 'red'
		});
		mapBY.addLayer(highlightBdry);	
		mapBY.flyToBounds(highlightBdry.getBounds());	
	}
});
		
}
});


mapBY.on('popupclose', function(e){
	if(highlightBdry){
	mapBY.removeLayer(highlightBdry);
	}
});

var baseMap = {
		"Oceans": base_EsriOceans,
		"Street Map": OpenStreetMap,
		"Imagery": base_EsriImagery,
};
		
 var Overlays ={
	 'Bathymetry' : bathy_Contours,
	 'Backscatter' : backscatter_int,
	 'Sample Points' : markers,
	 'Seabed Classification' : seabedClass
 }
 
 
	L.control.layers(baseMap, Overlays).addTo(mapBY);
	L.control.scale().addTo(mapBY);
	L.control.mousePosition().addTo(mapBY);
	mapBY.addControl(new L.Control.syncMap());
	
	if (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0)){
		mapBY.addControl(new L.Control.locateMeWatch());	
		mapBY.addControl(new L.Control.Compass());
	 }
