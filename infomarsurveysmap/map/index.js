//initiate map
		var map = L.map('map', {
			center: [52.5, -13.1],
			zoom: 7,
			layersControl: true
        });
map.attributionControl.addAttribution("&copy; <a href=http://www.infomar.ie>INFOMAR</a>");		
	
		var isTouchDevice = 'ontouchstart' in document.documentElement;

			if ($(window).width() < 480 ||isTouchDevice == true) {
					map.setView([53.5, -8.5],5);
		}
			if ($(window).width() < 780 ||isTouchDevice == true) {
					map.setView([53.5, -8.5],7);
		}



//load survey tiles
/*var surveyTiles = L.esri.tiledMapLayer({
            url: 'https://maps.marine.ie/arcgis/rest/services/Infomar/SurveyCoverage/MapServer',
            maxZoom: 14,
            minZoom: 5,
            opacity: 0.8
     }).addTo(map);*/

var surveyTiles = L.esri.dynamicMapLayer({
            url: 'https://maps.marine.ie/arcgis/rest/services/Infomar/SurveyCoverageViewer/MapServer',
            maxZoom: 14,
            minZoom: 5,
            opacity: 0.8
     }).addTo(map);


surveyTiles.bindPopup(
  function(err, featureCollection, response){
         if(featureCollection.features.length == 0){
              return false;
         }else{
            var props = featureCollection.features[0].properties; 
        	var baseLink = "//maps.marine.ie/infomarData/surveysmap/reports";
			var surveyRepLink = "Explorer";
			var downloadType = 'Report';
			
             var popupHTML ="<div id=\"popupText\"><table class=\"tg\"><tr><th class=\"tg-9hbo\">Survey</th><th class=\"tg-yw4l\">" + props.SURVEY + "</th></tr><tr><td class=\"tg-9hbo\">Project</td><td class=\"tg-yw4l\">"+ props.PROJECT + "</td></tr><tr><td class=\"tg-9hbo\">Vessel</td><td class=\"tg-yw4l\">" + props.VESSELNAME  +"</td></tr><tr><td class=\"tg-9hbo\">Start Date</td><td class=\"tg-yw4l\">"+  props.START_DATE + "</td></tr><tr><td class=\"tg-9hbo\">End Date</td><td class=\"tg-yw4l\">"+ props.END_DATE + "</td></tr><tr><td class=\"tg-9hbo\">Multibeam System</td><td class=\"tg-yw4l\">"+  props.SYSTEM + "</td></tr>";
            
             if (props.IHO_STAND !='undefined' && props.IHO_STAND!=""){
             popupHTML += "<tr><td class=\"tg-9hbo\">IHO Standard Data</td><td class=\"tg-yw4l\">"+  props.IHO_STAND + "</td></tr>";
             }
             if (props.SAMPLES !='undefined' && props.SAMPLES!="0"){
				popupHTML +=  "<tr><td class=\"tg-9hbo\">Samples</td><td class=\"tg-yw4l\">"+  props.SAMPLES + "</td></tr>";
			 }
            if (props.SHIPWRECKS !='undefined' && props.SHIPWRECKS!="0"){
				popupHTML +=  "<tr><td class=\"tg-9hbo\">Shipwrecks</td><td class=\"tg-yw4l\">"+  props.SHIPWRECKS + "</td></tr>";
			 }
            
            var otherD =[];
            if (props.MAGGY == 1){
                otherD.push("Magnetometer");
            }
            if (props.SUBBOTTOM ==1){
                otherD.push(" Subbottom");
            }
            if (props.GRAVITY ==1){
                otherD.push(" Gravity");
            }
            
            if (otherD.length >=1){
            popupHTML +="<tr><td class=\"tg-9hbo\">Other Datasets Acquired</td><td class=\"tg-yw4l\">"+  otherD + "</td></tr>";
            }
            
			 if(props.VESSELNAME == "RV Celtic Voyager"){ 
				    surveyRepLink = "Voyager";
				}else if (props.VESSELNAME == "RV Keary" || props.VESSELNAME == "RV Geo" || props.VESSELNAME == "RV Tonn" || props.VESSELNAME == "Cosantoir Bradan"){
				    surveyRepLink = "KRYGeoCBTonn";
				} else if (props.VESSELNAME == "LADS" || props.VESSELNAME == "BLOMS" || props.VESSELNAME == "PELYDRYN Hawk Eye II"){
                    surveyRepLink = "Lidar";
                } 

               if (props.SUMMARYREP!=" " && props.SUMMARYREP !='undefined' && props.SUMMARYREP!=""){
				popupHTML +=  "<tr><td class=\"tg-9hbo\">Summary Report</td><td class=\"tg-yw4l\"><a onclick='googleAnalyticsDownload(\"" + downloadType + "\",\""+props.SUMMARYREP + "\");'target='blank' href=\'"+ props.SUMMARYREP+"'>"+ props.SURVEY + "</a></td></tr>";
			 }

             if (props.SURVEYREP !=" " && props.SURVEYREP !='undefined' && props.SURVEYREP !=""){
				 popupHTML +=  "<tr><td class=\"tg-9hbo\">Full Report</td><td class=\"tg-yw4l\"><a onclick='googleAnalyticsDownload(\"" + downloadType + "\",\""+props.SURVEYREP + "\");' target='blank' href=\'"+ props.SURVEYREP+"'>"+ props.SURVEY + "</a></td></tr>";
			 }
            var prelimTxt ="PRELIM";
             if (props.SURVEY.toUpperCase().includes(prelimTxt)){
                 popupHTML +=  "<tr><td class=\"tg-yw4l\" colspan=\"2\">**The data collected on this survey is currently being processed. It will be made available once processing and quality checks are complete.**</td></tr>";
             }
			popupHTML +="</table></div>";
                   
            var stats =[];
   
         if (props.OPERATION != 0){
            stats.push('Operational', props.OPERATION, "#7dcea0");    
            }
            if (props.WEATHER != 0){
            stats.push('Weather Downtime', props.WEATHER, "#d98880");    
			}
            if (props.PORT_CALL != 0){
            stats.push('Port Call', props.PORT_CALL, "#c39bd3");    
            }
            if (props.MOBILISE != 0){
            stats.push('Mobilisation', props.MOBILISE, "#7fb3d5");   
             }
             if (props.SUPPORTOPS != 0){
            stats.push('Support Operations', props.SUPPORTOPS, "#2E86C1");
              }
           if (props.TRANSIT != 0){
            stats.push('Transiting', props.TRANSIT, "#f7dc6f");    
             }
              if (props.STANDBY != 0){
            stats.push('Standby', props.STANDBY, "#97ebdb");
              }
             if (props.SURVEYDOWN != 0){
            stats.push('Survey Down', props.SURVEYDOWN, "#FF6F00");    
             }
            if (props.VESSELDOWN != 0){
            stats.push('Vessel Down', props.VESSELDOWN, "#E21B06");
            }
			
       if(stats.length> 0){
                popupHTML += "<div id=\"divPopup\"><i class=\"arrow down\"></i><a href='#' onClick=\'pieChart(\"" + stats + "\");return false;\'>View Survey Statistics</a></div><div><canvas id=\"chartContainer\" width=\"260\" height=\"400\"></canvas></div>";
               }
         return popupHTML;
    }
});


//load planned surveys and popup
function popupPlanned (feature, layer){
			var popupHTML = "<table class=\"tg\"><tr><th class=\"tg-9hbo\">Survey</th><th class=\"tg-yw4l\">Planned Survey Area " + feature.properties.YEAR + "</th></tr><tr><td class=\"tg-9hbo\">Survey Platform</td><td class=\"tg-yw4l\">"+ feature.properties.VESSELNAME+ "</td></tr></table>";
			layer.bindPopup(popupHTML);
}
	
var plannedSurveyAreas = L.geoJson (plannedSurveys, {
		onEachFeature: popupPlanned,
		style:  {color: "#A94442", weight: 1,opacity: 1, dashArray: '3', fillOpacity: 0.6},
		simplifyFactor: 5,
		zIndex: 1000,
		precision: 1
		}).addTo(map);
		
var tracklines = L.esri.dynamicMapLayer({url: 'https://maps.marine.ie/arcgis/rest/services/Infomar/Tracklines/MapServer'}); 
		
//load overlays into Layer Control
		var overlays = {
		"Bathymetry" : 	bathy_Contours,
		"Backscatter": backscatter_int,
        "Surveys": surveyTiles,    
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
	//	map.addLayer(bathy_Contours);
		map.addControl(new L.Control.mapLegend());
        map.addControl(new L.Control.searchSurveys());
