	//	<!-- var to initiate map only basmap is initiated -->
		var map = L.map('map', {
			center: [53.5, -10.397],
			zoom: 7,
			maxZoom:18,
			layersControl: true
		});

		var isTouchDevice = 'ontouchstart' in document.documentElement;

			if ($(window).width() < 480 ||isTouchDevice == true) {
			map.setView([53.5, -8.5],6);
		}
			if ($(window).width() < 780 ||isTouchDevice == true) {
			map.setView([53.5, -8.5],7);
		}
			var shipwreckPts = L.geoJson (shipwrecks, {
			pointToLayer: function (feature, latlng) {
				var wreckMarker;
				var vesselTitle = "Unidentified Vessel";
				if (typeof feature.properties.VESSEL_NAM != 'undefined' && feature.properties.VESSEL_NAM != " ") {
				vesselTitle = feature.properties.VESSEL_NAM;
				};
			
				if (typeof feature.properties.LINK3DMODE != 'undefined' && feature.properties.LINK3DMODE != "") {
					wreckMarker = L.marker(latlng, { 
					icon: wreckIcon2, 
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
			onEachFeature:  createWreckPopup,
            attribution: '<a href="http://www.infomar.ie">INFOMAR</a>'    
				});
		
		var markers = L.markerClusterGroup();
		markers.addLayer(shipwreckPts);
		map.addLayer(markers);
		
		var baseMap = {
			"Oceans": base_EsriOceans,
			"Street Map": OpenStreetMap,
			"Imagery": base_EsriImagery,
		};	
		map.addLayer(base_EsriOceans);
	//	map.addLayer(bathy_Contours);
		
		var overlays = {
	//	"Bathymetry": bathy_Contours,	
		"Shipwrecks": markers
		};
		
		L.control.layers(baseMap, overlays, {
		collapsed: true
		}).addTo(map);	

		L.control.scale().addTo(map);
		L.control.mousePosition().addTo(map);