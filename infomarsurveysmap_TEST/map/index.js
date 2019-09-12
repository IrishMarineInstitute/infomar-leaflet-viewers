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
			
var surveypoly = L.esri.featureLayer({
    url: 'https://maps.marine.ie/arcgis/rest/services/SurveyCoverage_TEST/MapServer/0',
    simplifyFactor: 2,
	precision: 5
});

function surveyPopup(layer){
        var props = layer.features[0].properties;
  //       var startDate = formatDate(props.Start_Date);
   //     var endDate = formatDate(props.End_Date);

         if(props.SURVEY == 'undefined' || props.SURVEY == ""){
              return false;
         }else{
        	var baseLink = "//maps.marine.ie/infomarData/surveysmap/reports";
			var surveyRepLink = "Explorer";
			var downloadType = 'Report';
			
             var popupHTML ="<div id=\"popupText\"><table class=\"tg\"><tr><th class=\"tg-9hbo\">Survey</th><th class=\"tg-yw4l\">" + props.SURVEY + "</th></tr><tr><td class=\"tg-9hbo\">Project</td><td class=\"tg-yw4l\">"+ props.Project+ "</td></tr><tr><td class=\"tg-9hbo\">Vessel</td><td class=\"tg-yw4l\">" + props.VesselName  +"</td></tr><tr><td class=\"tg-9hbo\">Start Date</td><td class=\"tg-yw4l\">"+  props.Start_Date + "</td></tr><tr><td class=\"tg-9hbo\">End Date</td><td class=\"tg-yw4l\">"+ props.End_Date + "</td></tr><tr><td class=\"tg-9hbo\">Multibeam System</td><td class=\"tg-yw4l\">"+  props.SYSTEM + "</td></tr>";
            
             if (props.IHO_Stand !='undefined' && props.IHO_Stand!=""){
             popupHTML += "<tr><td class=\"tg-9hbo\">IHO Standard Data</td><td class=\"tg-yw4l\">"+  props.IHO_Stand + "</td></tr>";
             }
             if (props.Samples !='undefined' && props.Samples!="0"){
				popupHTML +=  "<tr><td class=\"tg-9hbo\">Samples</td><td class=\"tg-yw4l\">"+  props.Samples + "</td></tr>";
			 }
            if (props.Shipwrecks !='undefined' && props.Shipwrecks!="0"){
				popupHTML +=  "<tr><td class=\"tg-9hbo\">Shipwrecks</td><td class=\"tg-yw4l\">"+  props.Shipwrecks + "</td></tr>";
			 }
            
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
                   
            var stats =[];
   
         if (props.Operations != 0){
            stats.push('Operational', props.Operations, "#7dcea0");    
            }
            if (props.Weather != 0){
            stats.push('Weather Downtime', props.Weather, "#d98880");    
			}
            if (props.Port_Call != 0){
            stats.push('Port Call', props.Port_Call, "#c39bd3");    
            }
            if (props.Mobilise != 0){
            stats.push('Mobilisation', props.Mobilise, "#7fb3d5");   
             }
           if (props.Transit != 0){
            stats.push('Transiting', props.Transit, "#f7dc6f");    
             }
             if (props.SurveyDown != 0){
            stats.push('Survey Down', props.SurveyDown, "#FF6F00");    
             }
            if (props.VesselDown != 0){
            stats.push('Vessel Down', props.VesselDown, "#E21B06");
            }
            if (props.Standby != 0){
            stats.push('Standby', props.Standby, "#F39C12");
              }
			if (props.SupportOps != 0){
            stats.push('Support Operations', props.SupportOps, "#2E86C1");
              }
            
            if(stats.length> 0){
                popupHTML += "<div id=\"divPopup\"><i class=\"arrow down\"></i><a href='#' onClick=\'pieChart(\"" + stats + "\");return false;\'>View Survey Statistics</a></div><div><canvas id=\"chartContainer\" width=\"260\" height=\"400\"></canvas></div>";
               }
         return popupHTML;
    }
 }

var surveyTiles = L.esri.tiledMapLayer({
    url: 'https://maps.marine.ie/arcgis/rest/services/SurveyCoverage_TEST/MapServer',
    maxZoom: 13
    }).addTo(map);

map.on('click', function(e){
    L.esri.identifyFeatures({
        url: 'https://maps.marine.ie/arcgis/rest/services/SurveyCoverage_TEST/MapServer'
    }).on(this).at(e.latlng).run(function (error, featureCollection, response) {
        if (error) {
            console.log(error);
            return;
        }
            var popupCont = surveyPopup(featureCollection);
            map.openPopup(popupCont, e.latlng);
    });
});

function popupPlanned (feature, layer){
			var popupHTML = "<table class=\"tg\"><tr><th class=\"tg-9hbo\">Survey</th><th class=\"tg-yw4l\">Planned Survey Area " + feature.properties.Year + "</th></tr><tr><td class=\"tg-9hbo\">Survey Platform</td><td class=\"tg-yw4l\">"+ feature.properties.Vessel+ "</td></tr></table>";
			layer.bindPopup(popupHTML);
}
	
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
		map.addLayer(bathy_Contours);
		
function formatDate(dateF){
    var d = new Date(dateF);
     
    var x = d.getDate();
    var y = d.getMonth() + 1;
    var z = d.getFullYear();
    
    return (x +"/" + y + "/" + z);
}