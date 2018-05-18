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
						popupHTML += "<tr><td class=\"tg-yw4l\"</td><td><img src='" + imageLink + "' width='100%' /></td></tr></table>";
				  } 
				}
			layer.bindPopup(popupHTML);		
			}
		});
		
		var markers = L.markerClusterGroup();
		markers.addLayer(samplePoints);
		mapBY.addLayer(markers);
		

var baseMap = {
		"Oceans": base_EsriOceans,
		"Street Map": OpenStreetMap,
		"Imagery": base_EsriImagery,
};
		
 var Overlays ={
	 'Bathymetry' : bathy_Contours,
	 'Backscatter' : backscatter_int,
	 'Sample Points' : markers
 }
 
 
	L.control.layers(baseMap, Overlays).addTo(mapBY);
	L.control.scale().addTo(mapBY);
	L.control.mousePosition().addTo(mapBY);
	mapBY.addControl(new L.Control.syncMap());
	
	if (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0)){
		mapBY.addControl(new L.Control.locateMeWatch());	
		mapBY.addControl(new L.Control.Compass());
	 }
