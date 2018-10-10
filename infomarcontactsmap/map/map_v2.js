var mapBY = L.map('mapBY', {
            center: [53.5, -8.397],
			layers: [OpenStreetMap],
            zoom: 7,
            layersControl: true,
        });

var isTouchDevice = 'ontouchstart' in document.documentElement;

			if ($(window).width() < 480 ||isTouchDevice == true) {
			mapBY.setView([53.5, -8.5],6);
		}
			if ($(window).width() < 780 ||isTouchDevice == true) {
			mapBY.setView([53.5, -8.5],7);
		}
		
var baseMap = {
		"Oceans": base_EsriOceans,
		"Street Map": OpenStreetMap,
		"Imagery": base_EsriImagery,
};

var gsiIcon = L.icon({
    iconUrl: 'libs/images/gsi_v5.png',
    iconSize: [24, 43],
    iconAnchor: [12, 42],
    popupAnchor: [0, -46],
});
	
var miIcon = L.icon({
    iconUrl: 'libs/images/mi_v3.png',
    iconSize: [24, 43],
    iconAnchor: [12, 42],
    popupAnchor: [0, -46],
});
		


 L.marker ([53.336, -6.235], {icon: gsiIcon}).addTo(mapBY).bindPopup("<table class=\"tg\"><tr><th class=\"tg-9hbo\">Geological Survey Ireland</th><th class=\"tg-yw4l\"></th></tr><tr><td class=\"tg-yw4l\">Beggars Bush</td></tr><tr><td class=\"tg-yw4l\">Haddington Road</td></tr><tr><td class=\"tg-yw4l\">Dublin 4</td></tr><tr><td class=\"tg-yw4l\">D04 K7X4</td></tr></table>");
 
 L.marker ([53.248, -8.978], {icon: miIcon}).addTo(mapBY).bindPopup("<table class=\"tg\"><tr><th class=\"tg-9hbo\">Marine Institute</th><th class=\"tg-yw4l\"></th></tr><tr><td class=\"tg-yw4l\">Renville</td></tr><tr><td class=\"tg-yw4l\">Oranmore</td></tr><tr><td class=\"tg-yw4l\">Co. Galway</td></tr><tr><td class=\"tg-yw4l\">H91 R673</td></tr></table>");
				
	L.control.layers(baseMap, null).addTo(mapBY);
	L.control.scale().addTo(mapBY);
	L.control.mousePosition().addTo(mapBY);
	

