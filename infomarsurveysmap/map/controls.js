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
        var controlUI = L.DomUtil.create('a', 'locateMeButtonWatch myButton', controlDiv);
        controlUI.title = 'Show my Location';
        controlUI.href = '#';
        L.DomEvent.addListener(controlUI, 'click', function () {
            checkGeolocationWatch();
            controlUIClear.style.display = 'block';
        });

        var controlUIClear = L.DomUtil.create('a', 'stoplocateMeButtonWatch myButton', controlDiv);
        controlUIClear.title = 'Clear Map';
        controlUIClear.href = '#';
        controlUIClear.style.display = 'none';

        L.DomEvent.addListener(controlUIClear, 'click', function () {
         //   map.spin(false);
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

    if ('geolocation' in navigator) {
        var options = {
            enableHighAccuracy: true,
            timeout: 2000,
            maximumAge: 0
        };
        id = navigator.geolocation.watchPosition(onSuccessWatch, onErrorWatch, options);
     //   map.spin(true);

    } else {
        alert('Your device does not support this function');
        navigator.geolocation.clearWatch(id);
     //  map.spin(false);
    }
}

var locMarkerWatch = new L.FeatureGroup();
var circleLocWatch = new L.FeatureGroup();
var popupLocWatch = L.DomUtil.create('div', 'popupLoc');
var gpsCount = 0;

function onSuccessWatch(e) {
    gpsCount++;
console.log(e);
    var lng = e.coords.longitude;
    var lat = e.coords.latitude;
    var latlng = [lat, lng];
    var radius = e.coords.accuracy;

    if (gpsCount > 2 || navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
        gpsCount = 0;

        if (radius < 1000) {

/*             var greenIcon = L.icon({
                iconUrl: 'scripts/libs/leaflet-1.0.0-b1/images/mymarker-icon.png',
                shadowUrl: 'scripts/libs/leaflet-1.0.0-b1/images/marker-shadow.png',

                iconSize: [25, 41], // size of the icon
                shadowSize: [30, 35], // size of the shadow
                iconAnchor: [12, 40], // point of the icon which will correspond to marker's location
                shadowAnchor: [8, 34],  // the same for the shadow
                popupAnchor: [0, -41] // point from which the popup should open relative to the iconAnchor
            }); */
            Bathy.addTo(map);
            Bathy.identify().at(latlng).run(function (error, results) {
                var locatePixel = results.pixel;

                 if (locatePixel.properties.value == 'NoData') {
					var marker = L.boatMarker(latlng, {
					color: '#f22333',
					idleCircle: false
					});
					marker.setHeading(e.coords.heading);
					marker.setSpeed(e.coords.speed);
                    locMarkerWatch.addLayer(marker);
                    var popupLocContent = "<p style=\"margin-bottom:5px;\">Lat: " + Math.round((lat + 0.000001) * 1000) / 1000 + ", Long:" + Math.round((lng + 0.000001) * 1000) / 1000 + "</p><p style=\"margin-bottom:5px; margin-top:5px;\">(You are within " + Math.round((radius + 0.000001) * 1000) / 1000 + " meters of this point.)</p><p><b>No INFOMAR data for this location.</b></p><p style=\"color:red;\"> NOT TO BE USED FOR NAVIGATION</p>"
                } 
   /*                  var marker = L.marker(latlng, { icon: greenIcon });
                    locMarkerWatch.addLayer(marker);
                    var popupLocContent = "<p style=\"margin-bottom:5px;\">Lat: " + Math.round((lat + 0.000001) * 1000) / 1000 + ", Long:" + Math.round((lng + 0.000001) * 1000) / 1000 + "</p><p style=\"margin-bottom:5px; margin-top:5px;\">(You are within " + Math.round((radius + 0.000001) * 1000) / 1000 + " meters of this point.)</p><p><b>No INFOMAR data for this location.</b></p><p style=\"color:red;\"> NOT TO BE USED FOR NAVIGATION</p>"
                } */
                else {
                    var locPixel = parseFloat(locatePixel.properties.value);
                    var locPopup = locPixel.toFixed(2);
                    //var marker = L.marker(latlng, { icon: greenIcon });
					var marker = L.boatMarker(latlng, {
					color: '#f22333',
					idleCircle: false
					});
					marker.setHeading(e.coords.heading);
					marker.setSpeed(e.coords.speed);
                    locMarkerWatch.addLayer(marker);
                    var popupLocContent = "<p style=\"margin-bottom:5px;\">Lat: " + Math.round((lat + 0.000001) * 1000) / 1000 + ", Long:" + Math.round((lng + 0.000001) * 1000) / 1000 + "</p><p style=\"margin-bottom:5px; margin-top:5px;\">(You are within " + Math.round((radius + 0.000001) * 1000) / 1000 + " meters <br>of this point.)</p><p style=\"margin-bottom:5px; margin-top:5px;\"><b>Depth/Elevation: " + locPopup + "m </b></p><p style=\"color:red;margin-bottom:5px; margin-top:5px;\"> NOT TO BE USED FOR NAVIGATION</p>"
                }
                popupLocWatch.innerHTML = popupLocContent;
                map.addLayer(locMarkerWatch);
                marker.bindPopup(popupLocWatch).openPopup();
                circle = L.circle(latlng, radius, { fillOpacity: 0.1, color: '#4DECB2' });
                circleLocWatch.addLayer(circle);
                map.addLayer(circleLocWatch);
                map.fitBounds(circleLocWatch.getBounds(), { padding: [50, 50] });
                navigator.geolocation.clearWatch(id);
           //     map.spin(false);
            });
       }
         else {
            navigator.geolocation.clearWatch(id);
        //    map.spin(false);
            alert("Unable to obtain accurate location.");
        } 
    }
}

//function onLocationError(e) {
function onErrorWatch(e) {
/* 	console.log("test");
    if (err.code == 1) {
        alert("User denied geolocation.");
        navigator.geolocation.clearWatch(id);
   //     map.spin(false);
    }
    else if (err.code == 2) {
        alert("Position unavailable.");
        navigator.geolocation.clearWatch(id);
    //    map.spin(false);
    }
    else if (err.code == 3) {
        alert("Timeout expired.");
        navigator.geolocation.clearWatch(id);
      //  map.spin(false);
    }
    else {
        alert("ERROR:" + err.message);
        navigator.geolocation.clearWatch(id);
     //   map.spin(false);
    } */
}

// Link to IWDDS///
L.Control.linkIWDDS = L.Control.extend({
    options: {
        position: 'topleft',
        popupOptions: {
            className: 'leaflet-measure-resultpopup',
            autoPanPadding: [10, 10]
        }
    },

    onAdd: function (map) {
		var areaSelect;
        var controlDiv = L.DomUtil.create('div', 'myButton leaflet-bar noPrint');
        L.DomEvent
            .addListener(controlDiv, 'click', L.DomEvent.stopPropagation)
            .addListener(controlDiv, 'click', L.DomEvent.preventDefault)
        var controlUI = L.DomUtil.create('a', 'downloadButton myButton', controlDiv);
        controlUI.title = 'Download Data';
        controlUI.href = '#';
        L.DomEvent.addListener(controlUI, 'click', function () {
            areaSelect = L.areaSelect({width:200, height:300});
			areaSelect.addTo(map);
			controlUI.style.display = 'none';
			controlUIOpen.style.display = 'block';
            controlUIClear.style.display = 'block';
        });

        var controlUIOpen = L.DomUtil.create('a', 'downloadOpenButton myButton', controlDiv);
        controlUIOpen.title = 'Position and resize the box to desired location and click this button to open download site';
        controlUIOpen.href = '#';
        controlUIOpen.style.display = 'none';

        L.DomEvent.addListener(controlUIOpen, 'click', function () {
		//	listSurveys(areaSelect);
			openIWDDS(areaSelect);
         });
		
		var controlUIClear = L.DomUtil.create('a', 'downloadClearButton myButton', controlDiv);
        controlUIClear.title = 'Remove box';
        controlUIClear.href = '#';
        controlUIClear.style.display = 'none';

        L.DomEvent.addListener(controlUIClear, 'click', function () {
			areaSelect.remove();
			controlUIOpen.style.display = 'none';
            controlUIClear.style.display = 'none';
			controlUI.style.display = 'block';
         });
		
        return controlDiv;
    }
});




