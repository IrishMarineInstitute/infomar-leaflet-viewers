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
				 var popupHTML ="<table class=\"tg\"><tr><th class=\"tg-9hbo\">"+ feature.properties.Name + "</th><th class=\"tg-yw4l\"></th></tr><tr><td class=\"tg-yw4l\">"+ feature.properties.Address_1+ "</td></tr><tr><td class=\"tg-yw4l\">"+ feature.properties.Address_2+ "</td></tr><tr><td class=\"tg-yw4l\">"+ feature.properties.County+ "</td></tr><tr><td class=\"tg-yw4l\">"+ feature.properties.EirCode+ "</td></tr></table>";
				}
			layer.bindPopup(popupHTML);		
			}
		}).addTo(mapBY);
		
 var Overlays ={
	 'Locations' : locationPts
 }
 
 
	L.control.layers(baseMap, Overlays).addTo(mapBY);
	L.control.scale().addTo(mapBY);
	L.control.mousePosition().addTo(mapBY);
	

