L.Control.bathyControl = L.Control.extend({
	options: {
		position: 'topright',
	},

onAdd: function (map) {
        var controlDiv = L.DomUtil.create('div', 'bathyButton myButton leaflet-bar');
        L.DomEvent
            .addListener(controlDiv, 'click', L.DomEvent.stopPropagation)
            .addListener(controlDiv, 'click', L.DomEvent.preventDefault)
        .addListener(controlDiv, 'click', function () {
            togglePanel('#depth-ranges');
        });
		
        var controlUI = L.DomUtil.create('a', 'bathyButton', controlDiv);
        controlUI.title = 'Edit Bathymetry display';
        controlUI.href = '#';
		return controlDiv;
},		
});

L.Control.srControl = L.Control.extend({
	options: {
		position: 'topright',
	},

onAdd: function (map) {
        var controlDiv = L.DomUtil.create('div', 'shadedReliefButton myButton leaflet-bar');
        L.DomEvent
            .addListener(controlDiv, 'click', L.DomEvent.stopPropagation)
            .addListener(controlDiv, 'click', L.DomEvent.preventDefault)
        .addListener(controlDiv, 'click', function () {
			$('#srInfo').hide();
            togglePanel('#form-Shading');
        });
		
        var controlUI = L.DomUtil.create('a', 'shadedReliefButton', controlDiv);
        controlUI.title = 'Edit Shaded Relief Layer';
        controlUI.href = '#';
		return controlDiv;
},		
});

//////Click on Map for Depths//////
L.Control.idDepth = L.Control.extend({
    options: {
        position: 'topleft',
		popupOptions: { 
      className: 'leaflet-measure-resultpopup',
      autoPanPadding: [10, 10]
	}
    },

onAdd: function (map) {
            var controlDiv = L.DomUtil.create('div', 'myButton leaflet-bar');		
        L.DomEvent
           	.addListener(controlDiv, 'click', L.DomEvent.stopPropagation)
            .addListener(controlDiv, 'click', L.DomEvent.preventDefault) 
       
   var controlUI = L.DomUtil.create('a', 'idepthButton myButton ', controlDiv);
        controlUI.title = 'Click Map for Depths';
        controlUI.href = '#';
		L.DomEvent.addListener(controlUI, 'click', function(){
			 iDepthStart();
			 controlUIClear.style.display = 'block';
		});
	var controlUIClear = L.DomUtil.create('a', 'clearidepthButton myButton', controlDiv);
		controlUIClear.title = 'Clear Map';
		controlUIClear.href = '#';
		controlUIClear.style.display = 'none';
			
		L.DomEvent.addListener(controlUIClear, 'click', function (){
			$('.leaflet-container').css('cursor','');
			map.removeLayer(depthMarker);
			depthMarker.clearLayers();
			map.off('click', iDepthClick);
			controlUIClear.style.display = 'none';	
		});		
			return controlDiv;	
		}
});

function iDepthStart(){
	$('.leaflet-container').css('cursor','crosshair');
	map.on('click', iDepthClick);
}
	
var depthPixelClick;
var depthPopup;
var depthPixel;
var depthMarker = new L.FeatureGroup();
var depthPopupContainer = L.DomUtil.create('div', '');

function iDepthClick(e) {

            Bathy.identify().at(e.latlng).run(function(error, results){
             depthPixelClick = results.pixel;   
            
            if(depthPixelClick.properties.value == 'NoData'){    
            depthPopup = depthPixelClick.properties.value;
            var depthPoint = L.marker(e.latlng);
			depthMarker.addLayer(depthPoint);
			}
            else{
            depthPixel = parseFloat(depthPixelClick.properties.value);  
            depthPopup =  depthPixel.toFixed(2) + 'm'; 
			 var depthPoint = L.marker(e.latlng);
			 depthMarker.addLayer(depthPoint);
            }
               
        depthPopupContainer.innerHTML = depthPopup;
        map.addLayer(depthMarker);
		depthPoint.bindPopup(depthPopupContainer).openPopup();		
     });
 }

// Watch position control///////////////////////////////////////////////////

L.Control.locateMeWatch = L.Control.extend({
	options: {
		position: 'topleft',
		popupOptions: { 
      className: 'leaflet-measure-resultpopup',
      autoPanPadding: [10, 10]
	}
	},

onAdd: function (map) {
        var controlDiv = L.DomUtil.create('div', 'myButton leaflet-bar');
        L.DomEvent
            .addListener(controlDiv, 'click', L.DomEvent.stopPropagation)
            .addListener(controlDiv, 'click', L.DomEvent.preventDefault)
        var controlUI = L.DomUtil.create('a','locateMeButtonWatch myButton', controlDiv);
        controlUI.title = 'Show my Location';
        controlUI.href = '#';
		L.DomEvent.addListener(controlUI, 'click', function(){
		checkGeolocationWatch();
		 controlUIClear.style.display = 'block';
		});
		
		var controlUIClear = L.DomUtil.create('a', 'stoplocateMeButtonWatch myButton', controlDiv);
		controlUIClear.title = 'Clear Map';
		controlUIClear.href = '#';
		controlUIClear.style.display = 'none';

		L.DomEvent.addListener(controlUIClear, 'click', function (){
		map.spin(false);
		map.removeLayer(locMarkerWatch);
		map.removeLayer(circleLocWatch);
		
		locMarkerWatch.clearLayers();
		circleLocWatch.clearLayers();
		controlUIClear.style.display = 'none';
		navigator.geolocation.clearWatch(id);	
		});
		return controlDiv;
}		
});

function checkGeolocationWatch() {

 if('geolocation' in navigator){
		var options = {
		enableHighAccuracy: true, 
		timeout: 2000,  
		maximumAge: 0 
		};
		id = navigator.geolocation.watchPosition(onSuccessWatch, onErrorWatch, options); 
		map.spin(true);
		
	}else{
		alert('Your device does not support this function');
		navigator.geolocation.clearWatch(id);
		map.spin(false);
}
}	

	var locMarkerWatch = new L.FeatureGroup();
	var circleLocWatch = new L.FeatureGroup();
	var popupLocWatch = L.DomUtil.create('div', 'popupLoc');	
	var gpsCount = 0;
	
function onSuccessWatch(e){
	gpsCount++;
		 		
	var lng = e.coords.longitude;
	var lat = e.coords.latitude;
	var latlng = [lat,lng];
	var radius =  e.coords.accuracy;
	
	if (gpsCount > 2 || navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
		 gpsCount = 0;

	if(radius < 1000) {
	
	var greenIcon = L.icon({
    iconUrl: 'scripts/libs/leaflet-1.0.0-b1/images/mymarker-icon.png',
    shadowUrl: 'scripts/libs/leaflet-1.0.0-b1/images/marker-shadow.png',

    iconSize:     [25, 41], // size of the icon
    shadowSize:   [30, 35], // size of the shadow
    iconAnchor:   [12, 40], // point of the icon which will correspond to marker's location
    shadowAnchor: [8, 34],  // the same for the shadow
    popupAnchor:  [0, -41] // point from which the popup should open relative to the iconAnchor
});	
	Bathy.identify().at(latlng).run(function(error, results){
	var locatePixel = results.pixel;
	
	if(locatePixel.properties.value == 'NoData'){
	var marker = L.marker(latlng, {icon: greenIcon});
	locMarkerWatch.addLayer(marker);
	var popupLocContent = "<p style=\"margin-bottom:5px;\">Lat: " + Math.round((lat + 0.000001) * 1000)/1000 + ", Long:" + Math.round((lng + 0.000001) * 1000)/1000 + "</p><p style=\"margin-bottom:5px; margin-top:5px;\">(You are within " + Math.round((radius + 0.000001) * 1000)/1000 + " meters of this point.)</p><p><b>No INFOMAR data for this location.</b></p><p style=\"color:red;\"> NOT TO BE USED FOR NAVIGATION</p>" 
	}
	else{
	var locPixel = parseFloat(locatePixel.properties.value);  
    var locPopup =  locPixel.toFixed(2); 	
	var marker = L.marker(latlng, {icon: greenIcon});
	locMarkerWatch.addLayer(marker); 
	var popupLocContent = "<p style=\"margin-bottom:5px;\">Lat: " + Math.round((lat + 0.000001) * 1000)/1000 + ", Long:" + Math.round((lng + 0.000001) * 1000)/1000 + "</p><p style=\"margin-bottom:5px; margin-top:5px;\">(You are within " + Math.round((radius + 0.000001) * 1000)/1000 + " meters <br>of this point.)</p><p style=\"margin-bottom:5px; margin-top:5px;\"><b>Depth/Elevation: " + locPopup + "m </b></p><p style=\"color:red;margin-bottom:5px; margin-top:5px;\"> NOT TO BE USED FOR NAVIGATION</p>" 
	}
	popupLocWatch.innerHTML = popupLocContent;
	map.addLayer(locMarkerWatch);
	marker.bindPopup(popupLocWatch).openPopup();
	circle = L.circle(latlng, radius, {fillOpacity: 0.1, color: '#4DECB2'});
	circleLocWatch.addLayer(circle);
	map.addLayer(circleLocWatch);
	map.fitBounds(circleLocWatch.getBounds(), {padding:[50, 50]});	
	navigator.geolocation.clearWatch(id);
	map.spin(false);
	});
	}
	else{
		navigator.geolocation.clearWatch(id);
		map.spin(false);
		alert("Position unavailable.");
	 }
}
}		

//function onLocationError(e) {
function onErrorWatch(e){
		if(err.code==1)
			{
				alert("User denied geolocation.");
				navigator.geolocation.clearWatch(id);
				map.spin(false);
			}
			else if(err.code==2)
			{
				alert("Position unavailable.");
				navigator.geolocation.clearWatch(id);
				map.spin(false);
			}
			else if(err.code==3)
			{
				alert("Timeout expired.");
				navigator.geolocation.clearWatch(id);
				map.spin(false);
			}
			else
			{
				alert("ERROR:"+ err.message);
				navigator.geolocation.clearWatch(id);
				map.spin(false);
			}
		}
		
//Print Map Control
L.Control.printMap = L.Control.extend({
	options: {
		position: 'topleft',
		popupOptions: { 
      className: 'leaflet-measure-resultpopup',
      autoPanPadding: [10, 10]
	}
	},

onAdd: function (map) {
	var controlDiv = L.DomUtil.create('div', 'printButton  myButton leaflet-bar');
	
		L.DomEvent.disableClickPropagation(controlDiv);
		L.DomEvent.disableScrollPropagation(controlDiv);
		L.DomEvent.addListener(controlDiv, 'click', function () {
				printMap();
				resetMap();
				L.DomEvent.addListener(map, 'click', function(){
						resetMap();
				});
	         });
	         
		
        var controlUI = L.DomUtil.create('a', 'printButton', controlDiv);
        controlUI.href = '#';
		return controlDiv;
}
});

var printMap = function(){
if(window.print) {	 
			$('#printlegend').css({'display':'block','left':'0px'});
			$('div.leaflet-control-scale.leaflet-control').appendTo('#printlegend');
			$('#maxPrint').text(endDepthInput.value +"m"); 	
			$('#minPrint').text(startDepthInput.value +"m");
			
			 $('#anglePrint').text("Altitude:"+ altitudeInput.value+"\xB0,"); 
			  $('#azimuthPrint').text("Azimuth:" +azimuthInput.value + '\xB0,');
			 $('#vertPrint').text("Vertical Exaggeration:"+ zfactorInput.value); 
			 
			var screenHeight = window.innerHeight;
			var screenWidth = window.innerWidth;
			$("body").css({ "width": screenWidth, "height": screenHeight -50});	
	        window.print(); 
			
}else {
	alert('Android browser does not support printing this map \n Open the map in a browser such as Chrome or Firefox to print');
}
				};
				
	var resetMap = function(){
    $("body").css({ "width": '100%', "height": '100%' });	
	$('#printlegend').css('display','none');
	$('div.leaflet-control-scale.leaflet-control').appendTo('div.leaflet-bottom.leaflet-left');
	};

	
//Upload File Control
L.Control.uploadFile = L.Control.extend({
	options: {
		position: 'topleft',
		popupOptions: { 
      className: 'leaflet-measure-resultpopup',
      autoPanPadding: [10, 10],
	  }
	},

onAdd: function (map) {
	myUploadCallback(map);
	myUploadCSVCallback(map);
	
	var controlDiv = L.DomUtil.create('div', 'myUploadButton leaflet-bar');
	controlDiv.id = 'uploadControlDivID';
				
		var controlUI = L.DomUtil.create('a', 'uploadGISButton myButton', controlDiv);
        controlUI.href = '#';
	
		var uploadDiv = L.DomUtil.create('div', 'leaflet-bar', controlDiv);
		uploadDiv.id = 'uploadDivID';
		uploadDiv.style.padding = 'padding: 10px 10px 0px 5px;';		
		uploadDiv.style.display = 'none';
		uploadDiv.style.backgroundColor = 'white'; 
		
		uploadDiv.innerHTML = "<div style=\"padding:15px;\">Upload Files to the map and layer control: \n<hr style=\"width:90%\"><ul class=\"myList\"><li><img src=\"scripts/tools/leaflet-measure/dist/images/start.png\" /><button class=\"myUpButton\" onclick='uploadCSVFile();'>Add markers from CSV Text File</button><br><span style=\"padding:15px;\">Marker Format: Latitude, Longitude, Name<br></span></li><hr style=\"width:90%\"><li> <img src= \"scripts/tools/leaflet-measure/dist/images/start.png\" /><button class=\"myUpButton\" onclick='uploadGeoFile()'>Add GeoJSON, TopoJSON,or <br>or a Zipped Shapefile</button>\n</li></ul> <\div>";
		L.DomEvent.disableClickPropagation(controlDiv);
		L.DomEvent.disableScrollPropagation(controlDiv);
			
		 L.DomEvent.addListener(controlDiv, 'click', function () {
				controlUI.style.display = 'none';
				uploadDiv.style.display = 'block';
				L.DomEvent.addListener(map, 'click', function(){
					controlUI.style.display = 'block';
					uploadDiv.style.display = 'none';
				});
	         });
			 
		return controlDiv;
}
});		

var uploadGeoFile = function(){
	 $('#layerUploadDialog').click();	 
}
var uploadCSVFile = function(){
	 $('#layerUploadDialogCSV').click();	 
}
