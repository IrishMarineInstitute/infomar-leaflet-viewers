	//	<!-- var to initiate map only basmap is initiated -->
		var map = L.map('map', {
			center: [53.5, -13.1],
			zoom: 7,
			layersControl: true
		});
	
		var isTouchDevice = 'ontouchstart' in document.documentElement;

			if ($(window).width() < 480 ||isTouchDevice == true) {
					map.setView([53.5, -8.5],5);
		}
			if ($(window).width() < 780 ||isTouchDevice == true) {
					map.setView([53.5, -8.5],7);
		}
		
var surveyTiles = L.tileLayer('//maps.marine.ie/INFOMAR_Tiles/surveys/{z}/{x}/{y}.png', {
            maxZoom: 14,
            minZoom: 6,
            opacity: 0.9,
            attribution: '<a href="http://www.infomar.ie">INFOMAR</a>'
        }).addTo(map);	
 
 
 var surveyURL =  'https://maps.marine.ie/arcgis/rest/services/Infomar/SurveyCoverage/MapServer';
  var surveyID = L.esri.dynamicMapLayer({url: surveyURL, layers: [0]}); 
 
 
 map.on('click', function(e){
	if(map.hasLayer(surveyTiles)){
	surveyID.identify().on(map).at(e.latlng).returnGeometry(false)
	 .run(function(error, featureCollection, response){
		 
		 	var baseLink = "//maps.marine.ie/infomarData/surveysmap/reports";
			var surveyRepLink = "Explorer";
			var props = featureCollection.features["0"].properties;
			var downloadType = 'Report';
			
		if (featureCollection.features.length > 0) { 
			 var popupHTML ="<table class=\"tg\"><tr><th class=\"tg-9hbo\">Survey</th><th class=\"tg-yw4l\">" + props.SURVEY + "</th></tr><tr><td class=\"tg-9hbo\">Project</td><td class=\"tg-yw4l\">"+ props.PROJECT+ "</td></tr><tr><td class=\"tg-9hbo\">Vessel</td><td class=\"tg-yw4l\">" + props.VESSEL_NAM  +"</td></tr><tr><td class=\"tg-9hbo\">Year</td><td class=\"tg-yw4l\">"+  Math.round(props.YEAR) + "</td></tr>";
			 if(props.VESSEL_NAM == "Celtic Voyager"){
				 surveyRepLink = "Voyager";
				}else if (props.VESSEL_NAM == "RV Keary"){
				 surveyRepLink = "Keary";
				}
				
			  if (props.ExecutiveS !='undefined' && props.ExecutiveS!=""){
				popupHTML +=  "<tr><td class=\"tg-9hbo\">Summary Report</td><td class=\"tg-yw4l\"><a onclick='googleAnalyticsDownload(\"" + downloadType + "\",\""+props.ExecutiveS + "\");'target='blank' href=\'" + baseLink + "/ExecutiveReport/"+ props.ExecutiveS+".pdf'>"+ props.SURVEY + "</a></td></tr>";
			 }
			  if (props.SurveyRep !='undefined' && props.SurveyRep!=""){
				 popupHTML +=  "<tr><td class=\"tg-9hbo\">Full Report</td><td class=\"tg-yw4l\"><a onclick='googleAnalyticsDownload(\"" + downloadType + "\",\""+props.SurveyRep + "\");' target='blank' href=\'" + baseLink + "/SurveyReport/"+surveyRepLink+"/"+ props.SurveyRep+"'>"+ props.SURVEY + "</a></td></tr>";
			 }
		
		map.flyTo(e.latlng, 10,{
			animate: true,
			duration: 1.5
		});
		
		var popupSurvey = L.popup().setLatLng(e.latlng)
		.setContent(popupHTML)
		.openOn(map); 
	}	
	});
}
});   

		
		var surveysOutline = L.geoJson (surveysOutline, {
		style:  {weight: 0, fillOpacity: 0, stroke : 0},
		simplifyFactor: 5,
		zIndex: 1000,
		precision: 1
		}).addTo(map);


		surveyTiles.on('add', function(e){
			setTimeout(function(){surveysOutline.addTo(map);}, 500)
		});

			map.on('layerremove', function(e){
				if (e.layer._url == '//maps.marine.ie/INFOMAR_Tiles/surveys/{z}/{x}/{y}.png'){
				setTimeout(function(){map.removeLayer(surveysOutline);}, 500)
			}
		});
				
		function popupPlanned (feature, layer){
			var popupHTML = "<table class=\"tg\"><tr><th class=\"tg-9hbo\">Survey</th><th class=\"tg-yw4l\">Planned Survey Area 2018</th></tr><tr><td class=\"tg-9hbo\">Survey Platform</td><td class=\"tg-yw4l\">"+ feature.properties.Vessel+ "</td></tr></table>";
			layer.bindPopup(popupHTML);
		};

	
		var plannedSurveys = L.geoJson (plannedSurveys2018, {
		onEachFeature: popupPlanned,
		style:  {color: "#9d00f9",'weight': 1,'opacity': 1, dashArray: '3'},
		simplifyFactor: 5,
		zIndex: 1000,
		precision: 1
		}).addTo(map);
		
		var tracklines = L.esri.dynamicMapLayer({url: 'https://maps.marine.ie/arcgis/rest/services/Infomar/Tracklines/MapServer'}); 
		
		<!-- var to load overlays into Layer Control -->
		var overlays = {
		"Bathymetry" : 	bathy_Contours,
		"Backscatter": backscatter_int,
		"Surveys": surveyTiles,
		"Planned Surveys": plannedSurveys,
		"Tracklines" : tracklines
		};
		
		var baseMap = {
		"Oceans": base_EsriOceans,
		"Street Map": OpenStreetMap,
		"Imagery": base_EsriImagery,
		};

		L.control.layers(baseMap, overlays, {
		collapsed: true
		}).addTo(map);
		
		map.addLayer(base_EsriOceans);
		map.addLayer(bathy_Contours);
		
		