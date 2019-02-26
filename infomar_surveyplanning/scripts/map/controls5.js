//Login Control
L.Control.loginCtrl = L.Control.extend({
	options: {
		position: 'topleft',
		popupOptions: { 
      className: 'leaflet-measure-resultpopup',
      autoPanPadding: [10, 10],
	  }
	},

onAdd: function (map) {
	var controlDiv = L.DomUtil.create('div', 'myloginButton leaflet-bar noPrint');
	controlDiv.id = 'secureLoginDivID';
	controlDiv.style.marginTop = '0px';
	controlDiv.cursor = 'pointer';	
	
		var controlUI = L.DomUtil.create('a', 'myloginButton myButton', controlDiv);
		controlUI.id = 'secureLoginUI';
        controlUI.href = '#';
	
	
		var secureLogin = L.DomUtil.create('div', 'leaflet-bar', controlDiv);
		secureLogin.id = 'loginFormDiv';
		secureLogin.style.padding = 'padding: 10px 10px 0px 5px;';		
		secureLogin.style.display = 'none';
		secureLogin.style.backgroundColor = 'white'; 
		
		
		secureLogin.innerHTML = "<div><form action=\"#\" id=\"loginForm\" autocomplete=\"off\"><div>Login to access restricted layers:</div><div class=\"loginDiv\"><label for=\"usernameINFOMAR\">Username <input style=\"width:50%; text-align:right; margin-left: 25px;\" id=\"usernameINFOMAR\" type=\"text\" value=\'\' name=\'usernameINFOMAR\'></label></div><div class=\"loginDiv\"><label for=\"passwordINFOMAR\">Password <input style=\"width:50%; text-align:right; margin-left: 30px;\" id=\"passwordINFOMAR\" type=\"password\" value=\'\' name=\"passwordINFOMAR\"></label></div><input type=\"button\" value=\"Open Admiralty Layers\" onclick=\"loginClick()\"><p>  </p></form></div>";
		
		//<button style=\"marginLeft: 20px;\" onclick=\"loginOSIClick()\">Open OSI Layers</button>
		
		L.DomEvent.disableClickPropagation(controlDiv);
		L.DomEvent.disableScrollPropagation(controlDiv);
	
	    var showForm = function (){
				controlUI.style.display = 'none';
				secureLogin.style.display = 'block';
		};
		var hideForm = function (){
			if ($("#usernameINFOMAR").is(":focus")){
				return;
			}else if($("#passwordINFOMAR").is(":focus")){
				return;
			}else{
			controlUI.style.display = 'block';
			secureLogin.style.display = 'none';
		}
		}
		L.DomEvent.addListener(controlDiv, 'mouseover', showForm);
		//L.DomEvent.addListener(controlDiv, 'mouseout', hideForm);
		L.DomEvent.addListener(map, 'click', hideForm);
					 
		return controlDiv;
}
});	

function toggleLoginBtn(){
$('#loginFormDiv').css('display','none');
$('#secureLoginUI').css('display','block');
}	

L.Control.bathyControl = L.Control.extend({
	options: {
		position: 'topleft',
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
		controlUI.id = 'bathybuttonID';
        controlUI.href = '#';
		return controlDiv;
		
},		
});

L.Control.srControl = L.Control.extend({
	options: {
		position: 'topleft',
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
            var controlDiv = L.DomUtil.create('div', 'myButton leaflet-bar noPrint');		
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
               
        depthPopupContainer.innerHTML = 'Depth: ' +depthPopup + '<br>' + 'Lat: ' + Math.round((e.latlng.lat + 0.000001) * 1000)/1000 +'<br>' + 'Long: ' +  Math.round((e.latlng.lng + 0.000001) * 1000)/1000;
        map.addLayer(depthMarker);
		depthPoint.bindPopup(depthPopupContainer).openPopup();		
     });
 }

 
// Watch position control///
L.Control.locateMeWatch = L.Control.extend({
	options: {
		position: 'topleft',
		popupOptions: { 
      className: 'leaflet-measure-resultpopup',
      autoPanPadding: [10, 10]
	}
	},

onAdd: function (map) {
        var controlDiv = L.DomUtil.create('div', 'myButton leaflet-bar noPrint');
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
	var controlDiv = L.DomUtil.create('div', 'printButton  myButton leaflet-bar noPrint');

		  var showLegend = function (){
			var zoomLevel = map.getZoom();
			if (zoomLevel<=8 && map.hasLayer(Overall_Bathy_Contours)){
				$('#colorLeg').attr('src',"images/0_5000m.png");
			}else if (zoomLevel>=9 && map.hasLayer(Overall_Bathy_Contours)){
				$('#colorLeg').attr('src',"images/0_250m_Legend.png");		
				$('#printlegend').css({'display':'block','left':'0px'});
			}
		};
		
		L.DomEvent.disableClickPropagation(controlDiv);
		L.DomEvent.disableScrollPropagation(controlDiv);
		L.DomEvent.addListener(controlDiv, 'mouseover', showLegend);
		L.DomEvent.addListener(controlDiv, 'click', function () {
			if (map.hasLayer(Overall_Bathy_Contours)){
				printMap();
				resetMap();
			} else{
				alert ("Print control is for printing INFOMAR Shaded Bathymetry & Contours layer with legend <br> Otherwise you can use print screen to print");
			}
		});
		L.DomEvent.addListener(map, 'click', function(){
						resetMap();
			});
	    

        var controlUI = L.DomUtil.create('a', 'printButton', controlDiv);
        controlUI.href = '#';
		return controlDiv;
}
});


 				
	var resetMap = function(){
    $("body").css({ "width": '100%', "height": '100%' });	
//	$('#printlegend').css('display','block');
	$('#printlegend').css('display','none');
//	$('.symbolDivClass').remove();
//	$('#ptlayers').remove();
	$('div.leaflet-control-scale.leaflet-control').appendTo('div.leaflet-bottom.leaflet-left');
	};


//Track Control version 2
L.Control.trackCtrl = L.Control.extend({
	options: {
		position: 'topleft',
		popupOptions: { 
      className: 'leaflet-measure-resultpopup',
      autoPanPadding: [10, 10],
	  }
	},

onAdd: function (map) {
	var controlDiv = L.DomUtil.create('div', 'uploadGISButton leaflet-bar noPrint');
	controlDiv.id = 'trackDivID';
	controlDiv.cursor = 'pointer';	
	
		var controlUI = L.DomUtil.create('a', 'uploadGISButton myButton', controlDiv);
		controlUI.id = 'trackUI';
        controlUI.href = '#';
	
	
		var trackDiv = L.DomUtil.create('div', 'leaflet-bar', controlDiv);
		trackDiv.id = 'trackDiv';
		trackDiv.title = 'Upload a gpx, kml, txt, geoJSON, csv file of points.\n Click Play to enable live updates if actively acquiring location.'
		trackDiv.style.padding = 'padding: 10px 10px 0px 5px;';		
		trackDiv.style.display = 'none';
		trackDiv.style.backgroundColor = 'white'; 
				
			  trackDiv.innerHTML ="<div><form id=\"file-form\" action=\"upload.php\" method=\"POST\" enctype=\"multipart/form-data\"><input type=\"file\" id=\"uploadinput\" name=\"SendFile\" style=\"display: none\" onchange=\"addTrack()\"/><label for=\"uploadinput\"><img src=\'scripts/libs/leaflet-1.0.0-b1/images/upload2.png\'></img></label>  </form></div>";  
		
		L.DomEvent.disableClickPropagation(controlDiv);
		L.DomEvent.disableScrollPropagation(controlDiv);
	
	    var showForm = function (){
				controlUI.style.display = 'none';
				trackDiv.style.display = 'block';
		};
		var hideForm = function (){
			controlUI.style.display = 'block';
			trackDiv.style.display = 'none';
		};			
		L.DomEvent.addListener(controlDiv, 'mouseover', showForm);
		L.DomEvent.addListener(controlDiv, 'mouseout', hideForm);
		
	var controlUIClear = L.DomUtil.create('a', 'cleartrackButton myButton', controlDiv);
		controlUIClear.title = 'Clear Map';
		controlUIClear.href = '#';
		controlUIClear.style.display = 'none';
		controlUIClear.id = 'clearTrackID';
		
		L.DomEvent.addListener(controlUIClear, 'click', function(e) {

$('#uploadinput').val("");

  	if (map.hasLayer(trackLayer)){
			map.removeLayer(trackLayer);
			control.removeLayer(trackLayer);
} 

liveupdate.stopUpdating();
$('#liveUpdateID').css('display', 'none');
$('#clearTrackID').css('display', 'none');
		});
		return controlDiv;
	}
});	

var trackLayer;

var refreshTrack = function (){
	setTimeout("addTrack()",5000);
}

function addTrack(){
	$('#liveUpdateID').css('display', 'block');
		
	if (map.hasLayer(trackLayer)){
			map.removeLayer(trackLayer);
			control.removeLayer(trackLayer);
		} 
		
	var path = document.getElementById('uploadinput').files[0]; 
	var pathExt = path.name.split('.').pop();	
	
	 if (pathExt == 'gpx' || pathExt == 'kml' || pathExt == 'txt' || pathExt == 'geojson' || pathExt == 'csv'){
	   var reader = new FileReader(); 
	   reader.readAsText(path);
	   reader.onloadend = function (thefile) {
		   if(pathExt == 'gpx'){
			  var track = L.geoJson(null, {
				onEachFeature: getDepth
			  });			  
		  trackLayer = omnivore.gpx.parse(thefile.target.result, null, track).addTo(map);
		  } else if (pathExt =='kml'){
			  var track = L.geoJson(null, {
				onEachFeature: getDepth
			  });			  
			  trackLayer = omnivore.kml.parse(thefile.target.result, null, track).addTo(map);
		  } else {
			  var filetxt = JSON.parse(thefile.target.result);
			 trackLayer = L.geoJson(filetxt, {
				 onEachFeature: getDepth
			 }).addTo(map); 
		  }
		  map.flyToBounds(trackLayer.getBounds());
		control.addOverlay( trackLayer, "Your Track", {groupName : "Recorded Tracks"} ); 
		$('#clearTrackID').css('display', 'block');
	   }
	 } else{
		alert('Valid file formats: gpx, kml, txt, geoJSON, csv.');
		resetFormElement($('#uploadinput'));
				return;
	} 
	   
	   reader.onerror = function (evt){
		       switch(evt.target.error.code) {
      case evt.target.error.NOT_FOUND_ERR:
        alert('File Not Found!');
        break;
      case evt.target.error.NOT_READABLE_ERR:
        alert('File is not readable');
        break;
      case evt.target.error.ABORT_ERR:
        break; // noop
      default:
        alert('An error occurred reading this file.');
    };
		   
	   }
    }

function getDepth(feature, layer){
	console.log(feature.geometry.type);
	if(feature.geometry.type!= 'Point'){
		return;
	}else{
	var lng = feature.geometry.coordinates["0"];
	var lat = feature.geometry.coordinates["1"];
	var latlng = [lat,lng];
	
 Bathy.identify().at(latlng).run(function(error, results){
	var locatePixel = results.pixel;
	console.log(locatePixel);
	if(locatePixel.properties.value == 'NoData'){
		var popupLocContent = "<p style=\"margin-bottom:5px;\">Lat: " + Math.round((lat + 0.000001) * 1000)/1000 + ", Long:" + Math.round((lng + 0.000001) * 1000)/1000 + "</p><p style=\"margin-bottom:5px; margin-top:5px;\"></p><p style=\"margin-bottom:5px; margin-top:5px;\"><b>Depth/Elevation: No Data\"</b></p><p style=\"color:red;margin-bottom:5px; margin-top:5px;\"> NOT TO BE USED FOR NAVIGATION</p>" 
	layer.bindPopup('No Data');
	}else{
		var locPixel = parseFloat(locatePixel.properties.value);  
		var locPopup =  locPixel.toFixed(2);
		var popupLocContent = "<p style=\"margin-bottom:5px;\">Lat: " + Math.round((lat + 0.000001) * 1000)/1000 + ", Long:" + Math.round((lng + 0.000001) * 1000)/1000 + "</p><p style=\"margin-bottom:5px; margin-top:5px;\"></p><p style=\"margin-bottom:5px; margin-top:5px;\"><b>Depth/Elevation: " + locPopup + "m </b></p><p style=\"color:red;margin-bottom:5px; margin-top:5px;\"> NOT TO BE USED FOR NAVIGATION</p>" 
		layer.bindPopup(popupLocContent);
	}
	
});
 }
}
	
var resetFormElement = function(e) {
  e.wrap('<form>').closest('form').get(0).reset();
  e.unwrap();

  	if (map.hasLayer(trackLayer)){
			map.removeLayer(trackLayer);
			control.removeLayer(trackLayer);
} 
liveupdate.stopUpdating();
}
