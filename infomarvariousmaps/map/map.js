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
        color: '#52AD1F',
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

function style50(feature) {
    return {
        weight: 2,
        opacity: 1,
        color: '#FF6600',
        dashArray: '3',
        fillOpacity: 0.05
    };
}
function style300(feature) {
    return {
        weight: 2,
        opacity: 1,
        color: '#990000',
        dashArray: '3',
        fillOpacity: 0.05
    };
}

function style400(feature) {
    return {
        weight: 2,
        opacity: 1,
        color: '#FCFF33  ',
        dashArray: '3',
        fillOpacity: 0.05
    };
}
function style500(feature) {
    return {
        weight: 2,
        opacity: 1,
        color: '#FFFF00  ',
        dashArray: '3',
        fillOpacity: 0.05
    };
}


		
		var surveyCoveragePoly = L.geoJson (coveragePoly, {
		onEachFeature: createCoveragePopup,
		style: style50
		}); 
		
		var realMapIrePoly = L.geoJson (realMapIrePoly, {
		onEachFeature: createRealMapPopup,
		style: style100
		});
		
		var realMapSmallPoly = L.geoJson (realMapSmallPoly, {
		onEachFeature: createRealMapPopup,
		style: style100
		});		
		
		var greyscaleMaps = L.geoJson (greyscaleMaps, {
		onEachFeature: createChartPopup,
		style: style200
		}).addTo(map);
		
		var kmzOutline = L.geoJson (kmzOutlines, {
		onEachFeature: createkmzPopup,
		style: style300
		}).addTo(map);
		
		var kmzOverview = L.geoJson (overviewkmzs, {
		onEachFeature: createkmzPopup,
		style: style400
		});
		
		var PADINSSINFOMARmaps = L.geoJson (PADINSSINFOMAR, {
		onEachFeature: createPADChartPopup,
		style: style500
		});
		
		var baseMap = {
		"Oceans": base_EsriOceans,
		"Street Map": OpenStreetMap,
		"Imagery": base_EsriImagery,
};		

		var overlays = {
		"Google Earth Coastal KMZ" : kmzOutline,	
		"Google Earth Overview KMZ" : kmzOverview,
		"Greyscale Maps": greyscaleMaps,
		"Survey Coverage Map": surveyCoveragePoly,
		"Real Map of Ireland" : realMapIrePoly,
		"Small Area 3d Maps" :	realMapSmallPoly,
		"PAD INSS INFOMAR Map": PADINSSINFOMARmaps
		};
		
		map.addLayer(base_EsriOceans);
		map.addLayer(bathy_Contours);
		
		var layersControl = L.control.layers(baseMap, overlays, {
		collapsed: true
		}).addTo(map);	

		L.control.scale().addTo(map);
		L.control.mousePosition().addTo(map);
		
/* 		$( document ).ready(function() {
			 if ($(window).width() > 600){
				 $("div.leaflet-control-layers.leaflet-control").addClass('leaflet-control-layers-expanded');
			  }
		 }); */
		 
		 