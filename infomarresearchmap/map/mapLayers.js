	//	<!-- var to initiate map only basmap is initiated -->
		var map = L.map('map', {
			center: [53.5, -10.397],
			zoom: 7,
			layersControl: true
		});
		map.attributionControl.addAttribution("&copy; <a href=http://www.infomar.ie>INFOMAR</a>");
	
		var base_EsriOceans = L.tileLayer('http://services.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}.png', {
        noWrap: true,
		attribution: '<a href="//www.esri.com">ESRI</a>'
		}).addTo(map);

 
		var base_EsriImagery = L.tileLayer('//server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        noWrap: true,
		attribution: '<a href="//www.esri.com">ESRI</a>'
		});


		var OpenStreetMap = L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '<a href="//openstreetmap.org/copyright">OpenStreetMap contributors</a> ',
		});

	var baseMap = {
    "Oceans": base_EsriOceans,
	"Street Map": OpenStreetMap,
    "Imagery": base_EsriImagery,
};

		
		var researchCallpts = L.geoJson(researchCalls, {
			onEachFeature: function (feature, layer) {
				var downloadLink = feature.properties.Publication;
				if (feature.properties.Year != "2015"){
						downloadLink = "//maps.marine.ie/infomarData/researchmap/reports/"+feature.properties.Year + '/'+feature.properties.Publication;
				}
		
				if (feature.properties && feature.properties.REF) {
				  if (feature.properties.Publication != "" ){
				layer.bindPopup(
				"<table class=\"tg\"><tr><th class=\"tg-9hbo\">Reference</th><th class=\"tg-yw4l\">" + feature.properties.REF + "</th></tr><tr><td class=\"tg-9hbo\">Title</td><td class=\"tg-yw4l\">"+ feature.properties.Title+ "</td></tr><tr><td class=\"tg-9hbo\">Organisation</td><td class=\"tg-yw4l\">"+ feature.properties.Organisation + "</td></tr><tr><td class=\"tg-9hbo\">Publication</td><td class=\"tg-yw4l\"><a target='blank' href=\'" + downloadLink + "\'> Download Publication</a></td></tr></table>")
				  } else {
				layer.bindPopup(
				"<table class=\"tg\"><tr><th class=\"tg-9hbo\">Reference</th><th class=\"tg-yw4l\">" + feature.properties.REF + "</th></tr><tr><td class=\"tg-9hbo\">Title</td><td class=\"tg-yw4l\">"+ feature.properties.Title+ "</td></tr><tr><td class=\"tg-9hbo\">Organisation</td><td class=\"tg-yw4l\">"+ feature.properties.Organisation + "</td></tr></table>")
				  }
				}
				}
		});
/* 			<tr><td class=\"tg-9hbo\">Project Leader</td><td class=\"tg-yw4l\">" + feature.properties.Project_Leader +"</td></tr> */
		var markers = L.markerClusterGroup();
		markers.addLayer(researchCallpts);
		map.addLayer(markers);
		
		<!-- var to load overlays into Layer Control -->
		var overlays = {
		"Research Centers": markers
		};
		
		L.control.layers(baseMap, overlays, {
		collapsed: true
		}).addTo(map);	

		L.control.scale().addTo(map);
		L.control.mousePosition().addTo(map);