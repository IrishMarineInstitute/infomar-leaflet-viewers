	//	<!-- var to initiate map only basmap is initiated -->
var map = L.map('map', {
			center: [53.5, -10.397],
			zoom: 7,
			layersControl: true
		});
		map.attributionControl.addAttribution("&copy; <a href=http://www.infomar.ie>INFOMAR</a>");

var isTouchDevice = 'ontouchstart' in document.documentElement;

	if ($(window).width() < 480 ||isTouchDevice == true) {
			map.setView([53.5, -8.5],6);
}
	if ($(window).width() < 780 ||isTouchDevice == true) {
			map.setView([53.5, -8.5],7);
}

function style100(feature) {
    return {
        weight: 2,
        opacity: 1,
		color: '#00b300',
       // color: '#52AD1F',
        dashArray: '3',
        fillOpacity: 0.05
    };
}

function style50(feature) {
    return {
        weight: 2,
        opacity: 1,
        color: '#FF6600',
        dashArray: '3',
        fillOpacity: 0.05
    };
}
function style200(feature) {
    return {
        weight: 2,
        opacity: 1,
        color: '#0000ff',
        dashArray: '3',
        fillOpacity: 0.05
    };
}

		var coastal100k = L.geoJson (coastal_100k, {
		onEachFeature: createChartPopup,
		style: style200,
		filter: function(feature, layer){
			return feature.properties.Status == "Complete";
		}
		}).addTo(map);
	
		var chartsLayer100 = L.geoJson (charts100, {
		onEachFeature: createChartPopup,
		style: style100
		}).addTo(map); 
		
		var chartsLayer50 = L.geoJson (charts50, {
		onEachFeature: createChartPopup,
		style: style50
		});
		
		var overlays = {
		"Bathymetry" : 	bathy_Contours,
		"Coastal Chart Series: 1:100k": coastal100k,
		"Priority Bay Charts: 1:100k": chartsLayer100,
		"Priority Bay Charts: 1:50k" : chartsLayer50,
		};
		
		var baseMap = {
		"Oceans": base_EsriOceans,
		"Street Map": OpenStreetMap,
		"Imagery": base_EsriImagery,
};
		map.addLayer(base_EsriOceans);
		map.addLayer(bathy_Contours);
	
		var layersControl = L.control.layers(baseMap, overlays, {
		collapsed: true
		}).addTo(map);	

/* 		$( document ).ready(function() {
			 if ($(window).width() > 600){
				 $("div.leaflet-control-layers.leaflet-control").addClass('leaflet-control-layers-expanded');
			  }
		 }); */
		 	
		L.control.scale().addTo(map);
		L.control.mousePosition().addTo(map);
