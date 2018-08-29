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
		
/* 	 $('a').click(function(e) {
    e.preventDefault();  //stop the browser from following
    window.location.href = 'uploads/file.doc';
}); */
 
		function popup(feature, layer) {
			var baseLink = "//maps.marine.ie/infomarData/surveysmap/reports";
			var execSumLink = feature.properties.ExecutiveS;
			var surveyRepLink = "Explorer";
			
			if (feature.properties.SurveyRep !=""){
				if (feature.properties.VESSEL_NAM == "Celtic Voyager"){
					surveyRepLink = "Voyager";
				}else if (feature.properties.VESSEL_NAM == "RV Keary"){
					surveyRepLink = "Keary";
				}
			} 
			
			 var popupHTML ="<table class=\"tg\"><tr><th class=\"tg-9hbo\">Survey</th><th class=\"tg-yw4l\">" + feature.properties.SURVEY + "</th></tr><tr><td class=\"tg-9hbo\">Project</td><td class=\"tg-yw4l\">"+ feature.properties.PROJECT+ "</td></tr><tr><td class=\"tg-9hbo\">Vessel</td><td class=\"tg-yw4l\">" + feature.properties.VESSEL_NAM  +"</td></tr><tr><td class=\"tg-9hbo\">Year</td><td class=\"tg-yw4l\">"+  Math.round(feature.properties.YEAR) + "</td></tr>";
			 
			 if (feature.properties.ExecutiveS !='undefined' && feature.properties.ExecutiveS!=""){
				popupHTML +=  "<tr><td class=\"tg-9hbo\">Summary Report</td><td class=\"tg-yw4l\"><a target='blank' href=\'" + baseLink + "/ExecutiveReport/"+ feature.properties.ExecutiveS+".pdf'>"+ feature.properties.SURVEY + "</a></td></tr>";
			 }
			 
			 if (feature.properties.SurveyRep !='undefined' && feature.properties.SurveyRep!=""){
				 popupHTML +=  "<tr><td class=\"tg-9hbo\">Full Report</td><td class=\"tg-yw4l\"><a target='blank' href=\'" + baseLink + "/SurveyReport/"+surveyRepLink+"/"+ feature.properties.SurveyRep+"'>"+ feature.properties.SURVEY + "</a></td></tr>";
			 }
			
			
		<!-- TO DO : Can the 'if' be removed from this function?-->
		if (feature.properties && feature.properties.SURVEY) {
			layer.bindPopup(popupHTML)
			
		}

		};
		
		function popupPlanned (feature, layer){
			var popupHTML = "<table class=\"tg\"><tr><th class=\"tg-9hbo\">Survey</th><th class=\"tg-yw4l\">Planned Survey Area 2018</th></tr><tr><td class=\"tg-9hbo\">Survey Platform</td><td class=\"tg-yw4l\">"+ feature.properties.Vessel+ "</td></tr></table>";
			layer.bindPopup(popupHTML);
		};
		
		<!-- var to load GeoJSON in overlays -->
		var Surveys = L.geoJson (SurveyBdrys, {
		onEachFeature: popup,
		style:  function(feature) {
        switch (Math.round(feature.properties.YEAR)) {
            case 2000: return {color: "#0000ff",'weight': 1,'opacity': 1};
            case 2002: return {color: "#008141",'weight': 1,'opacity': 1};
			case 2003: return {color: "#008080",'weight': 1,'opacity': 1};
            case 2004: return {color: "#6b0021",'weight': 1,'opacity': 1};
			case 2005: return {color: "#e86800",'weight': 1,'opacity': 1};
			case 2007: return {color: "#a3a3a3",'weight': 1,'opacity': 1};
            case 2006: return {color: "#b24a59",'weight': 1,'opacity': 1};
			case 2008: return {color: "#daa520",'weight': 1,'opacity': 1};
            case 2009: return {color: "#FF8364",'weight': 1,'opacity': 1};
			case 2010: return {color: "#0074E4",'weight': 1,'opacity': 1};
            case 2011: return {color: "#ffff00",'weight': 1,'opacity': 1};
			case 2012: return {color: "#FFDD7E",'weight': 1,'opacity': 1};
            case 2013: return {color: "#7DC383",'weight': 1,'opacity': 1};
			case 2014: return {color: "#FFE37F",'weight': 1,'opacity': 1};
            case 2015: return {color: "#808080",'weight': 1,'opacity': 1};
			case 2016: return {color: "#35B0AB",'weight': 1,'opacity': 1};
            case 2017: return {color: "#C40018",'weight': 1,'opacity': 1};
			case 2018: return {color: "#2243B6",'weight': 1,'opacity': 1};
        }
    },
		simplifyFactor: 5,
		zIndex: 1000,
		precision: 1,
		//filter: mapFilter
		}).addTo(map);
		
		var plannedSurveys = L.geoJson (plannedSurveys2018, {
		onEachFeature: popupPlanned,
		style:  {color: "#9d00f9",'weight': 1,'opacity': 1, dashArray: '3'},
		simplifyFactor: 5,
		zIndex: 1000,
		precision: 1
		}).addTo(map);
		
			
		<!-- var to load overlays into Layer Control -->
		var overlays = {
		"Bathymetry" : 	bathy_Contours,
		"Backscatter": backscatter_int,
		"Surveys": Surveys,
		"Planned Surveys": plannedSurveys
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
		
		