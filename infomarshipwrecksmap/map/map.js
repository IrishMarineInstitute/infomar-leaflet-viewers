	//	<!-- var to initiate map only basmap is initiated -->
		var map = L.map('map', {
			center: [53.5, -10.397],
			zoom: 7,
			maxZoom:18,
			layersControl: true
		});
map.attributionControl.addAttribution("&copy; <a href=http://www.infomar.ie>INFOMAR</a>");

var isTouchDevice = 'ontouchstart' in document.documentElement;
var myshipwreckObject = new Array();
			if ($(window).width() < 480 ||isTouchDevice == true) {
			map.setView([53.5, -8.5],6);
		}
			if ($(window).width() < 780 ||isTouchDevice == true) {
			map.setView([53.5, -8.5],7);
		}
var shipwreckPts = L.geoJson (shipwrecks, {
			pointToLayer: function (feature, latlng) {
                myshipwreckObject.push(feature);
				var wreckMarker;
				var vesselTitle = "Unidentified Vessel";
				if (typeof feature.properties.VESSELNAME != 'undefined' && feature.properties.VESSELNAME != " ") {
                    vesselTitle = feature.properties.VESSELNAME;
				};
		
				if (typeof feature.properties.URL3DMODEL != 'undefined' && feature.properties.URL3DMODEL != "") {
					wreckMarker = L.marker(latlng, { 
					icon: wreckIcon2, 
					title: vesselTitle,
					riseOnHover: true
					});
				}else if (typeof feature.properties.URL_PDF != 'undefined' && feature.properties.URL_PDF != "" && feature.properties.URL_PDF != "No") {
					wreckMarker = L.marker(latlng, { 
					icon: wreckIcon4, 
					title: vesselTitle,
					riseOnHover: true
					});
				}else if (typeof feature.properties.URL_IMAGE != 'undefined' && feature.properties.URL_IMAGE != "") {
					wreckMarker = L.marker(latlng, { 
					icon: wreckIcon3, 
					title: vesselTitle,
					riseOnHover: true
					});
				}
				else {
					wreckMarker = L.marker(latlng, { 
					icon: wreckIcon,
					title: vesselTitle,
					riseOnHover: true
					});
				}
				return wreckMarker;
			},
			onEachFeature: function(feature, layer){
                var popupContent = createWreckPopup(feature, layer);
                layer.bindPopup(popupContent);                
            },
            attribution: '<a href="http://www.infomar.ie">INFOMAR</a>'    
				});
		
		var shipMarkers = L.markerClusterGroup();
		shipMarkers.addLayer(shipwreckPts);
		map.addLayer(shipMarkers);
		
		var baseMap = {
			"Oceans": base_EsriOceans,
			"Street Map": OpenStreetMap,
			"Imagery": base_EsriImagery,
		};
		map.addLayer(base_EsriOceans);
		
		var overlays = {
		"Bathymetry": bathy_Contours,	
		"Shipwrecks": shipMarkers
		};
		map.addLayer(bathy_Contours);

		L.control.layers(baseMap, overlays, {
		collapsed: true
		}).addTo(map);	
        map.addControl(new L.Control.mapLegend());
		L.control.scale().addTo(map);
		L.control.mousePosition().addTo(map);

    

