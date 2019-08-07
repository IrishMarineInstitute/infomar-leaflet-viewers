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
			
  var surveyURL =  'https://maps.marine.ie/arcgis/rest/services/Infomar/SurveyCoverage_TEST/MapServer';
  var surveyID = L.esri.dynamicMapLayer({url: surveyURL, layers: [0] }).addTo(map); 

map.on('click', function(e){
surveyID.bindPopup(
function (err, featureCollection, response){
        	var baseLink = "//maps.marine.ie/infomarData/surveysmap/reports";
			var surveyRepLink = "Explorer";
			var props = featureCollection.features["0"].properties;
			var downloadType = 'Report';
			console.log(props);
        
		if (featureCollection.features.length > 0) { 
			 var popupHTML ="<div id=\"popupText\"><table class=\"tg\"><tr><th class=\"tg-9hbo\">Survey</th><th class=\"tg-yw4l\">" + props.SURVEY + "</th></tr><tr><td class=\"tg-9hbo\">Project</td><td class=\"tg-yw4l\">"+ props.PROJECT+ "</td></tr><tr><td class=\"tg-9hbo\">Vessel</td><td class=\"tg-yw4l\">" + props.VesselName  +"</td></tr><tr><td class=\"tg-9hbo\">Start Date</td><td class=\"tg-yw4l\">"+  props.Start_Date + "</td></tr><tr><td class=\"tg-9hbo\">End Date</td><td class=\"tg-yw4l\">"+  props.End_Date + "</td></tr><tr><td class=\"tg-9hbo\">Multibeam System</td><td class=\"tg-yw4l\">"+  props.SYSTEM + "</td></tr><tr><td class=\"tg-9hbo\">IHO Standard Data</td><td class=\"tg-yw4l\">"+  props.IHO_Stand + "</td></tr>";
            
            var otherD =[];
            if (props.Maggy == 1){
                otherD.push("Magnetometer");
            }
            if (props.Subbottom ==1){
                otherD.push(" Subbottom");
            }
            if (props.Gravity ==1){
                otherD.push(" Gravity");
            }
            
            if (otherD.length >=1){
            popupHTML +="<tr><td class=\"tg-9hbo\">Other Datasets Acquired</td><td class=\"tg-yw4l\">"+  otherD + "</td></tr>";
            }
            
			 if(props.VesselName == "Celtic Voyager"){
				 surveyRepLink = "Voyager";
				}else if (props.VesselName == "RV Keary"){
				 surveyRepLink = "Keary";
				}
				
			  if (props.ExecutiveS !='undefined' && props.ExecutiveS!=""){
				popupHTML +=  "<tr><td class=\"tg-9hbo\">Summary Report</td><td class=\"tg-yw4l\"><a onclick='googleAnalyticsDownload(\"" + downloadType + "\",\""+props.ExecutiveS + "\");'target='blank' href=\'" + baseLink + "/ExecutiveReport/"+ props.ExecutiveS+".pdf'>"+ props.SURVEY + "</a></td></tr>";
			 }
			  if (props.SurveyRep !='undefined' && props.SurveyRep!=""){
				 popupHTML +=  "<tr><td class=\"tg-9hbo\">Full Report</td><td class=\"tg-yw4l\"><a onclick='googleAnalyticsDownload(\"" + downloadType + "\",\""+props.SurveyRep + "\");' target='blank' href=\'" + baseLink + "/SurveyReport/"+surveyRepLink+"/"+ props.SurveyRep+"'>"+ props.SURVEY + "</a></td></tr>";
			 }
			popupHTML +="</table></div>";
            
            var times =[];
            var names = [];
                    
         if (props.Operations != 0){
            names.push('Operational');    
            times.push(props.Operations);
            }
            if (props.Weather != 0){
            names.push('Weather Downtime');    
            times.push(props.Weather);
              }
            if (props.Port_Call != 0){
            names.push('Port Call');    
            times.push(props.Port_Call);
            }
             if (props.Mobilise != 0){
            names.push('Mobilisation');    
            times.push(props.Mobilise);
             }
           if (props.Transit != 0){
            names.push('Transiting');    
            times.push(props.Transit);
             }
             if (props.SurveyDown != 0){
            names.push('Survey Down');    
            times.push(props.SurveyDown);
             }
            if (props.VesselDown != 0){
            names.push('Vessel Down');    
            times.push(props.VesselDown);
            }
            if (props.Standby != 0){
            names.push('Standby');    
            times.push(props.Standby);
              }
            
            if(times.length> 0){
                popupHTML += "<div id=\"divPopup\"><i class=\"arrow down\"></i><a href='#' onClick=\'pieChart(\"" + names + "\",\""+times + "\");return false;\'>View Survey Statistics</a></div><div><canvas id=\"chartContainer\" width=\"260\" height=\"400\"></canvas></div>";
               }
        }
        var popupSurvey = L.popup().setLatLng(e.latlng)
		.setContent(popupHTML)
		.openOn(map); 
    });
});

    function popupPlanned (feature, layer){
			var popupHTML = "<table class=\"tg\"><tr><th class=\"tg-9hbo\">Survey</th><th class=\"tg-yw4l\">Planned Survey Area " + feature.properties.Year + "</th></tr><tr><td class=\"tg-9hbo\">Survey Platform</td><td class=\"tg-yw4l\">"+ feature.properties.Vessel+ "</td></tr></table>";
			layer.bindPopup(popupHTML);
		};
	
		var plannedSurveyAreas = L.geoJson (plannedSurveys, {
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
		//"Surveys": surveyTiles,
        "Surveys Test" : surveyID,    
		"Planned Surveys": plannedSurveyAreas,
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
		
