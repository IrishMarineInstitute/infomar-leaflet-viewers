var mapBY = L.map('mapBY', {
            center: [53.5, -10.397],
			layers: [base_EsriOceans,bathy_Contours],
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
	
var samplePoints = L.geoJson(samplePts, {
			onEachFeature: function (feature, layer) {
				var imageLink = "//maps.marine.ie/infomar/" + feature.properties.IMG_URL;
						
				if (feature.properties && feature.properties.VESSELYEAR) {
				 var popupHTML ="<table class=\"tg\"><tr><th class=\"tg-9hbo\">Vessel Year</th><th class=\"tg-yw4l\">" + feature.properties.VESSELYEAR + "</th></tr>"
				 if(feature.properties.LABEL != 'undefined' && feature.properties.LABEL != ""){
				 popupHTML += "<tr><td class=\"tg-9hbo\">Label</td><td class=\"tg-yw4l\">"+ feature.properties.LABEL+ "</td></tr>"
				}
				 if(feature.properties.DATE != 'undefined' && feature.properties.DATE != ""){
				 popupHTML += "<tr><td class=\"tg-9hbo\">Date</td><td class=\"tg-yw4l\">" + feature.properties.DATE +"</td></tr>"
				 }
				 popupHTML += "<tr><td class=\"tg-9hbo\">Latitude</td><td class=\"tg-yw4l\">"+ Math.round(feature.properties.LAT * 100)/100+ "</td></tr><tr><td class=\"tg-9hbo\">Longitude</td><td class=\"tg-yw4l\">"+ Math.round(feature.properties.LONG * 100)/100 + "</td></tr>"
				 
				 	if(feature.properties.DEPTH != 'undefined' && feature.properties.DEPTH != "" && feature.properties.DEPTH != "0"){
					popupHTML +=  "<tr><td class=\"tg-9hbo\">Depth</td><td class=\"tg-yw4l\">"+ feature.properties.DEPTH + "m</td></tr>";
					}
					if(feature.properties.DESCRIPT != 'undefined' && feature.properties.DESCRIPT != ""){
						popupHTML += "<tr><td class=\"tg-9hbo\">Description</td><td class=\"tg-dddd\">"+ feature.properties.DESCRIPT + "</td></tr>";
				 }
					if(feature.properties.COMMENT != 'undefined' && feature.properties.COMMENT != ""){
				 		popupHTML += "<tr><td class=\"tg-9hbo\">Comment</td><td class=\"tg-dddd\">"+ feature.properties.COMMENT + "</td></tr>";
					}
				 	if(feature.properties.IMG_URL != 'undefined' && feature.properties.IMG_URL != ""){
						popupHTML += "<tr><td class=\"tg-img\" colspan=\"2\"><img src='" + imageLink + "' width='100%' /></td></tr>";
				  }
					popupHTML +="</table>"
				}
			layer.bindPopup(popupHTML);		
			}
		});
		
		var markers = L.markerClusterGroup();
		markers.addLayer(samplePoints);
		mapBY.addLayer(markers);
	
function style200(feature) {
    return {
        weight: 2,
        opacity: 1,
        color: '#FCFF33',
        dashArray: '3',
        fillOpacity: 0.05
    };
}
function style50(feature) {
    return {
        weight: 2,
        opacity: 1,
         color: '#990000',
        dashArray: '3',
        fillOpacity: 0.05
    };
}

var EEZ_bdry = L.geoJson(EEZbdry, {
 		style: style200,		
		simplifyFactor: 5,
		zIndex: 0,
		precision: 1
}); 

var DesigArea_bdry = L.geoJson(DesigArea, {
 		style: style50,		
		simplifyFactor: 5,
		zIndex: 0,
		precision: 1
}); 

var seabedClassOut = L.geoJson(INF_Sub, {
 		style: {weight: 0, fillOpacity: 0, stroke : 0},		
		simplifyFactor: 5,
		zIndex: 0,
		precision: 1
}); 

seabedClass.on('add', (e)=>{
	setTimeout(function(){seabedClassOut.addTo(mapBY);}, 500)
});

mapBY.on('layerremove', (e)=>{
	if (e.layer.options.id == 'seabedClassID'){
		setTimeout(function(){mapBY.removeLayer(seabedClassOut);}, 500)
	}
});

mapBY.on('click', function(e){
	if(mapBY.hasLayer(seabedClass)){
	seabedClass.identify().on(mapBY).at(e.latlng).returnGeometry(false)
	 .run(function(error, featureCollection, response){
		if (featureCollection.features.length > 0) { 
		var popupSeabed = L.popup().setLatLng(e.latlng)
		.setContent("<table class=\"tg\"><tr><td class=\"tg-9hbo\">Substrate Class</td><td>" + featureCollection.features[0].properties.INF_Class + "</td></tr><tr><td class=\"tg-9hbo\">Area</td><td>" + featureCollection.features[0].properties.Area + "</td></tr><tr></td></tr></table>")
		.openOn(mapBY); 
		mapBY.flyTo(e.latlng, 10);
	}	});
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
	 'Seabed Classification' : seabedClass,
	 'EEZ Boundary' : EEZ_bdry,
	 'Designated Area Boundary' : DesigArea_bdry
 }
 
 
	L.control.layers(baseMap, Overlays).addTo(mapBY);
	L.control.scale().addTo(mapBY);
	L.control.mousePosition().addTo(mapBY);
	mapBY.addControl(new L.Control.syncMap());
	
	if (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0)){
		mapBY.addControl(new L.Control.locateMeWatch());	
		mapBY.addControl(new L.Control.Compass());
	 }

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

