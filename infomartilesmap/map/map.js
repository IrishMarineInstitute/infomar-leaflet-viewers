var mapBY = L.map('mapBY', {
            center: [53.5, -10.397],
			layers: [base_EsriOceans,bathy_Contours],
            zoom: 7,
            maxZoom: 14,
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
            pointToLayer: function (feature, latlng) {
				var sampleMarker;
                var iconName;
                var propsfolk = feature.properties.FOLK_CLASS;
                var strFolk = propsfolk.toUpperCase();
                
                if(strFolk =='SAND'){
                    iconName = sandIcon;
                }else if (strFolk =='MUD'){
                    iconName =mudIcon;
                }else if (strFolk =='GRAVEL' || strFolk =='GRAVELLY SAND' || strFolk =='SANDY GRAVEL'){
                    iconName = gravelIcon;
                }else if (strFolk =='SANDY MUD'|| strFolk =='MUDDY SAND'){
                    iconName = mudSandIcon;
                }else if (strFolk =='GRAVELLY MUD' || strFolk =='GRAVELLY MUDDY SAND' || strFolk =='MUDDY GRAVEL' || strFolk =='MUDDY SANDY GRAVEL'){
                    iconName = mixedSedIcon;
                }else {
                    iconName = noPSAIcon;
                }
            
               sampleMarker = L.marker(latlng, { 
					icon: iconName, 
					title: feature.properties.FOLK_CLASS,
					riseOnHover: true
					}); 
              
				return sampleMarker;
			},
			onEachFeature: function (feature, layer) {
				//var imageLink = "//maps.marine.ie/infomar/" + year +"/"+ feature.properties.IMG_URL +"jpg";
				var props = feature.properties;
                               
                if (props && props.SAMPLE_ID) {
				 var popupHTML ="<div id=popupTitle><table class=\"tg\"><tr><th class=\"tg-9hbo\">Sample ID</th><td class=\"tg-yw4l\">" + props.SAMPLE_ID + "</td></tr>";
                }
                if(props.VESSEL != 'undefined' && props.VESSEL != ""){
				    popupHTML += "<tr><th class=\"tg-9hbo\">Vessel</th><td class=\"tg-yw4l\">" + props.VESSEL +"</td></tr></table></div>";
				    }
                    popupHTML += sampleInfo(props); 
                                
                if(props.FOLK_CLASS != 'undefined' && props.FOLK_CLASS != ""){
                    popupHTML += "<div id=\"divPopup\"><table class=\"tg\"><tr><th class=\"tg-9hbo\">Folk Classification:</th><td class=\"tg-yw4l\">"+ props.FOLK_CLASS + "</td></tr>";
		            popupHTML += "<tr><th class=\"tg-9hbo\">Description:</th><td class=\"tg-yw4l\">"+ props.PSA_DSCRPT + "</td></tr></table><i class=\"arrow up\"></i><canvas id=\"chartContainer\"></canvas><a href='#' onclick=\"$('#popupContent').show().fadeIn(1000);$('#divPopup').hide();\">Show Sample Collection Details</a></div>";
                    } 

			     layer.bindPopup(popupHTML);		
			}
		});
		
		var markers = L.markerClusterGroup({disableClusteringAtZoom:14});
		markers.addLayer(samplePoints);
		mapBY.addLayer(markers);

markers.on("click", function(e){
    var props = e.layer.feature.properties;
    
    setTimeout(function(){
        if(props.FOLK_CLASS != "" && props.FOLK_CLASS!='undefined'){
                    var sedClasses =[];
                    var sedValues = [];

                 if (props.MUD != 0){
                    sedClasses.push('Mud');    
                    sedValues.push(props.MUD);
                    }
                    if (props.SAND != 0){
                    sedClasses.push('Sand');    
                    sedValues.push(props.SAND);
                      }
                    if (props.GRAVEL != 0){
                    sedClasses.push('Gravel');    
                    sedValues.push(props.GRAVEL);
                    }
                pieChart(sedClasses, sedValues, props.FOLK_CLASS, props.PSA_DSCRPT);
        }else {
             $('#popupContent').css("display","block").hide().fadeIn();
        }
    }, 200)    
});

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


mapBY.on('click', function(e){
	if(mapBY.hasLayer(seabedClassFolk)){
	seabedClassFolk.identify().on(mapBY).at(e.latlng).returnGeometry(false)
	 .run(function(error, featureCollection, response){
		if (featureCollection.features.length > 0) { 
		var popupSeabed = L.popup().setLatLng(e.latlng)
		.setContent("<table class=\"tg\"><tr><td class=\"tg-9hbo\">Folk Substrate Class</td><td>" + featureCollection.features[0].properties.Folk_5 + "</td></tr><tr><td class=\"tg-9hbo\">Sediment Classification Source</td><td>" + featureCollection.features[0].properties.Source + "</td></tr><tr></td></tr><tr><td class=\"tg-9hbo\">Sediment Classification Resolution</td><td>" + featureCollection.features[0].properties.Resolution + "</td></tr><tr></td></tr></table>")
		.openOn(mapBY); 
	//	mapBY.flyTo(e.latlng, 10);
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
	 'Sediment Classification' : seabedClassFolk,
	 'EEZ Boundary' : EEZ_bdry,
	 'Designated Area Boundary' : DesigArea_bdry
 }
 
 
	L.control.layers(baseMap, Overlays).addTo(mapBY);
	L.control.scale().addTo(mapBY);
	L.control.mousePosition().addTo(mapBY);
    mapBY.addControl(new L.Control.mapLegend());
	mapBY.addControl(new L.Control.syncMap());  
    mapBY.addControl(new L.Control.queryTool());
    
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

