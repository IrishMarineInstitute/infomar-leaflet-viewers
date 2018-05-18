var mapBY = L.map('mapBY', {
            center: [53.5, -8.397],
			layers: [base_EsriOceans],
            zoom: 7,
            layersControl: true,
        });
		
var baseMap = {
		"Oceans": base_EsriOceans,
		"Street Map": OpenStreetMap,
		"Imagery": base_EsriImagery,
};

 var locationPts = L.geoJson(locations, {
			onEachFeature: function (feature, layer) {
				if (feature.properties) {
				 var popupHTML ="<table class=\"tg\"><tr><th class=\"tg-9hbo\">"+ feature.properties.Name + "</th><th class=\"tg-yw4l\"></th></tr><tr><td class=\"tg-9hbo\">Eircode</td><td class=\"tg-yw4l\">"+ feature.properties.EirCode+ "</td></tr></table>";
				}
			layer.bindPopup(popupHTML);		
			}
		}).addTo(mapBY);
		
 var Overlays ={
	 'Bathymetry' : bathy_Contours,
	 'Backscatter' : backscatter_int,
	 'Locations' : locationPts
 }
 
 
	L.control.layers(baseMap, Overlays).addTo(mapBY);
	L.control.scale().addTo(mapBY);
	L.control.mousePosition().addTo(mapBY);
	
	if (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0)){
		mapBY.addControl(new L.Control.locateMeWatch());	
		mapBY.addControl(new L.Control.Compass());
	 }
