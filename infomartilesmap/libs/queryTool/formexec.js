        
var showOrig = document.querySelector('input[id="origSamples"]');

var showINF = document.querySelector('input[id="INFMarkers"]');
var clusterMarkers = document.querySelector('input[id="cluster"]');
var unclusterMarkers = document.querySelector('input[id="uncluster"]');
var mapRefresh = document.querySelector(".refresh");

var folkClassMarkers = document.querySelector('input[id="folkClassMarkers"]');
var togglefolkClassMkrs = document.querySelectorAll('input[name="togglefolkClassMkrs"]'); 
var clusterFolk = document.querySelector('input[id="clusterFolk"]');
var unclusterFolk = document.querySelector('input[id="unclusterFolk"]');

var selectfolkClassMkrs = document.querySelector('#selectFolk'); 
var displaySelectFolk = document.querySelector('#displaySelectFolk');
var toggleSelfolkClassMkrs = document.querySelectorAll('input[name="toggleSelectedfolk"]'); 
var clusterSelFolk = document.querySelector('input[id="clusterSelFolk"]');
var unclusterSelFolk = document.querySelector('input[id="unclusterSelFolk"]');

var enableQuery2 = document.querySelector("#addQuery2");
var disableQuery2 = document.querySelector("#removeQuery2");
var percent = parseFloat(document.querySelector('#Percent').value);

var toggleQueryMkrs  = document.querySelectorAll('input[name="toggleQueryMkrs"]'); 
var clusterQueryPSA = document.querySelector('input[id="clusterQueryMkrs"]');
var unclusterQueryPSA = document.querySelector('input[id="unclusterQueryMkrs"]');
var displayQueryPSA = document.querySelector('input[id="QueryPSAMarkers"]');   

var markersClustPSA;
var markersPSA;
var makersclustINF;
var markersINF;
var samplePSA; 

var markersClustFOLK;
var markersFOLK;
var sampleFOLK; 

var markersClustSel;
var markersSel;
var sampleFOLKSel;
 

    
var tempiconbaseURL = 'libs/queryTool/icons/'

var gravellyMudIcon = new psaIcon({
    iconUrl: tempiconbaseURL + 'marker-icon-gM.png',
});  

var gravellyMuddySandIcon = new psaIcon({
    iconUrl: tempiconbaseURL + 'marker-icon-gmS.png',
});

var gravellySandIcon = new psaIcon({
    iconUrl: tempiconbaseURL + 'marker-icon-gS.png',
});

var muddyGravelIcon = new psaIcon({
    iconUrl: tempiconbaseURL + 'marker-icon-mG.png',
});

var muddySandIcon = new psaIcon({
    iconUrl: tempiconbaseURL + 'marker-icon-mS.png',
});

var muddysandyGravelIcon = new psaIcon({
    iconUrl: tempiconbaseURL + 'marker-icon-msG.png',
});

var sandyGravelIcon = new psaIcon({
    iconUrl: tempiconbaseURL + 'marker-icon-sG.png',
});

var sandyMudIcon = new psaIcon({
    iconUrl: tempiconbaseURL + 'marker-icon-sM.png',
});

submitPSAQuery.addEventListener('click', function(e){
       e.preventDefault();     
    e.stopPropagation();
            if (mapBY.hasLayer(markers)){
                        mapBY.removeLayer(markers); 
                    }
            if (mapBY.hasLayer(markersClustPSA)){
                             mapBY.removeLayer(markersClustPSA); 
                }
            if (mapBY.hasLayer(markersPSA)){
                             mapBY.removeLayer(markersPSA); 
                }
                                          
    
            samplePSA = L.geoJson(samplePts, {
            pointToLayer: makeMarkers,
			onEachFeature: buildPopup,
            filter: filterQueryMarkers
        });
   
            markersClustPSA = L.markerClusterGroup({disableClusteringAtZoom:14});
            markersClustPSA.addLayer(samplePSA);
            mapBY.addLayer(markersClustPSA); 
            markersClick(markersClustPSA);
            enableRadioButtons(clusterQueryPSA, unclusterQueryPSA, 'INF_Legend');
            displayQueryPSA.disabled = false;
            $("label[for='QueryPSAMarkers']").removeClass('disableLabel');
            displayQueryPSA.checked = true;
           
         unclusterQueryPSA.addEventListener("change", function(event) {
                     var item = event.target.value;
                     
                    if(item == 'unclusterQueryMkrs'){
                        mapBY.removeLayer(markersClustPSA);
                        markersPSA = L.featureGroup();
                        markersPSA.addLayer(samplePSA);
                        mapBY.addLayer(markersPSA);
                        markersClick(markersPSA);
                    }
                        e.stopPropagation();   
                    });
                        
        clusterQueryPSA.addEventListener("change", function(event) {
                var item = event.target.value;
                        if(item == 'clusterQueryMkrs'){
                        mapBY.removeLayer(markersPSA);
                        mapBY.addLayer(markersClustPSA);
                    }
                           e.stopPropagation();   
                        });
    
    
        displayQueryPSA.addEventListener('click', function(e){
                    if(displayQueryPSA.checked == true){
                        if(mapBY.hasLayer(markers)){
                            mapBY.removeLayer(markers);
                        }
                           mapBY.addLayer(markersClustPSA); 
                            markersClick(markersClustPSA);
                            enableRadioButtons(clusterQueryPSA, unclusterQueryPSA, 'INF_Legend');
                        
                    } else if(displayQueryPSA.checked == false){
                        
                          if(mapBY.hasLayer(markersClustPSA)){ 
                            mapBY.removeLayer(markersClustPSA);
                        }else if(mapBY.hasLayer(markersPSA)){
                            mapBY.removeLayer(markersPSA); 
                        }
                        mapBY.addLayer(markers);
                    disableRadioButtons(clusterQueryPSA, unclusterQueryPSA,  'INF_Legend');
                }
                e.stopPropagation();   
              }); 
        mapRefresh.addEventListener('click', function(e){
                clearMap();
                resetPSAForm();
            displayQueryPSA.disabled = true;
            $("label[for='QueryPSAMarkers']").addClass('disableLabel');
                mapBY.addLayer(markers);
        })
     
    });



enableQuery2.addEventListener('click', function(e){
    $("#query2").css('display', 'block'); 
    $('#addQuery2').addClass('hideQuerybtn2');
    $('#removeQuery2').removeClass('hideQuerybtn2');
    });

disableQuery2.addEventListener('click', function(e){
    $("#query2").css('display', 'none'); 
    $('#addQuery2').removeClass('hideQuerybtn2');
    $('#removeQuery2').addClass('hideQuerybtn2');
    
    document.querySelector('#Percent1').value = '';
    document.querySelector('#selectSediment1').value = 'Sediment type';
    document.querySelector('#selectOperator1').value = 'Choose an operator';
    });


showINF.addEventListener('click', function(e) {
    
        clearMap();
        resetPSAForm();
    
        samplePSA = L.geoJson(samplePts, {
            pointToLayer: makeMarkers,
			onEachFeature: buildPopup,
            filter: filterMarkers
        });
               
	      makersclustINF = L.markerClusterGroup({disableClusteringAtZoom:14});
            makersclustINF.addLayer(samplePSA);
            mapBY.addLayer(makersclustINF); 
            markersClick(makersclustINF);
            enableRadioButtons(cluster, uncluster, showOrig, 'INF_Legend');
       
                        
           e.stopPropagation();   
        });

folkClassMarkers.addEventListener('click', function(e) {
    
        clearMap();
        resetPSAForm();
    
        sampleFOLK = L.geoJson(samplePts, {
            pointToLayer: makeFolkMarkers,
			onEachFeature: buildPopup,
            filter: filterMarkers
        });
            

            markersClustFOLK = L.markerClusterGroup({disableClusteringAtZoom:14});
            markersClustFOLK.addLayer(sampleFOLK);
            mapBY.addLayer(markersClustFOLK);
            markersClick(markersClustFOLK);
           enableRadioButtons(cluster, uncluster, showOrig, 'Folk_Legend');
         
           e.stopPropagation();   

            });

selectfolkClassMkrs.addEventListener("change", function(e){
      
      clearMapSelect();
         resetPSAForm();    
    
            markersSel = L.geoJson(samplePts, {
            pointToLayer: makeFolkMarkers,
			onEachFeature: buildPopup,
            filter: selectFolkClassMarkers
        });
    
            markersClustSel = L.markerClusterGroup({disableClusteringAtZoom:14});
            markersClustSel.addLayer(markersSel);
            mapBY.addLayer(markersClustSel); 
            markersClick(markersClustSel);
            enableRadioButtons(cluster, uncluster, showOrig, 'Folk_Legend');
            displaySelectFolk.disabled = false;
            displaySelectFolk.checked = true;
          
            
                    e.stopPropagation();  
                });


 unclusterMarkers.addEventListener('change', function(e) {
             if(mapBY.hasLayer(makersclustINF)){
                        mapBY.removeLayer(makersclustINF);
                        markersINF = L.featureGroup();
                        markersINF.addLayer(samplePSA);
                        mapBY.addLayer(markersINF);
                        markersClick(markersINF);
                }
            if(mapBY.hasLayer(markersClustFOLK)){
                        mapBY.removeLayer(markersClustFOLK);
                        markersFOLK = L.featureGroup();
                        markersFOLK.addLayer(sampleFOLK);
                        mapBY.addLayer(markersFOLK);
                        markersClick(markersFOLK);
                }
            if(mapBY.hasLayer(markersClustSel)){
                        mapBY.removeLayer(markersClustSel);
                        sampleFOLKSel = L.featureGroup();
                         sampleFOLKSel.addLayer(markersSel);
                       mapBY.addLayer(sampleFOLKSel);
                        markersClick(sampleFOLKSel);
                }
     
                   e.stopPropagation();   
              });
                  
clusterMarkers.addEventListener("change", function(e) {
                    
    if(mapBY.hasLayer(markersINF)){
                        mapBY.removeLayer(markersINF);
                         mapBY.addLayer(makersclustINF);
                }
            if(mapBY.hasLayer(markersFOLK)){
                                mapBY.removeLayer(markersFOLK);
                                mapBY.addLayer(markersClustFOLK);
                }
            if(mapBY.hasLayer(sampleFOLKSel)){
                                mapBY.removeLayer(sampleFOLKSel);
                               mapBY.addLayer(markersClustSel);
                }
                   
                     e.stopPropagation();   
                });

showOrig.addEventListener("change", function(e){
        clearMap();
        resetPSAForm();   
    disableRadioButtons(cluster, uncluster, 'Folk_Legend');
        mapBY.addLayer(markers);
})

function makeMarkers(feature, latlng){
				var sampleMarker;
                var iconName;
                var propsfolk = feature.properties.FOLK_CLASS;
                var strFolk = propsfolk.toUpperCase();

                if(strFolk =='SAND'){
                    iconName = sandIcon;
                }else if (strFolk =='MUD'){
                    iconName =mudIcon;
                }else if (strFolk =='GRAVEL' || strFolk =='GRAVELLY SAND' || strFolk =='SANDY GRAVEL'){
                    iconName = gravelIcon;
                }else if (strFolk =='SANDY MUD'|| strFolk =='MUDDY SAND'){
                    iconName = mudSandIcon;
                }else if (strFolk =='GRAVELLY MUD' || strFolk =='GRAVELLY MUDDY SAND' || strFolk =='MUDDY GRAVEL' || strFolk =='MUDDY SANDY GRAVEL'){
                    iconName = mixedSedIcon;
                }else {
                    iconName = noPSAIcon;
                }
            
               sampleMarker = L.marker(latlng, { 
					icon: iconName, 
					title: feature.properties.FOLK_CLASS,
					riseOnHover: true
					}); 
              
				return sampleMarker;
}

function makeFolkMarkers(feature, latlng){
				var sampleMarker;
                var iconName;
                var propsfolk = feature.properties.FOLK_CLASS;
                var strFolk = propsfolk.toUpperCase();

    
                if(strFolk =='SAND'){
                    iconName = sandIcon;
                }else if (strFolk =='MUD'){
                    iconName =mudIcon;
                }else if (strFolk =='GRAVEL'){
                    iconName = gravelIcon;
                }else if(strFolk =='GRAVELLY SAND'){
                     iconName = gravellySandIcon;
                }else if(strFolk =='SANDY GRAVEL'){
                    iconName = sandyGravelIcon;
                }else if (strFolk =='SANDY MUD'){
                    iconName = sandyMudIcon;
                }else if(strFolk =='MUDDY SAND'){
                    iconName = muddySandIcon;
                }else if (strFolk =='GRAVELLY MUD'){
                    iconName = gravellyMudIcon;
                }else if(strFolk =='GRAVELLY MUDDY SAND'){
                    iconName = gravellyMuddySandIcon;
                }else if(strFolk =='MUDDY GRAVEL'){
                    iconName = muddyGravelIcon;
                }else if(strFolk =='MUDDY SANDY GRAVEL'){
                    iconName = muddysandyGravelIcon;
                }else {
                    iconName = noPSAIcon;
                }
            
            
               sampleMarker = L.marker(latlng, { 
					icon: iconName, 
					title: feature.properties.FOLK_CLASS,
					riseOnHover: true
					}); 
              
				return sampleMarker;
}


function buildPopup(feature, layer){
				var props = feature.properties;
                               
                if (props && props.SAMPLE_ID) {
				 var popupHTML ="<div id=popupTitle><table class=\"tg\"><tr><th class=\"tg-9hbo\">Sample ID</th><td class=\"tg-yw4l\">" + props.SAMPLE_ID + "</td></tr>";
                }
                if(props.VESSEL != 'undefined' && props.VESSEL != ""){
				    popupHTML += "<tr><th class=\"tg-9hbo\">Vessel</th><td class=\"tg-yw4l\">" + props.VESSEL +"</td></tr></table></div>";
				    }
                    popupHTML += sampleInfo(props); 
                                
                if(props.FOLK_CLASS != 'undefined' && props.FOLK_CLASS != ""){
                    popupHTML += "<div id=\"divPopup\"><table class=\"tg\"><tr><th class=\"tg-9hbo\">Folk Classification:</th><td class=\"tg-yw4l\">"+ props.FOLK_CLASS + "</td></tr>";
		            popupHTML += "<tr><th class=\"tg-9hbo\">Description:</th><td class=\"tg-yw4l\">"+ props.PSA_DSCRPT + "</td></tr></table><i class=\"arrow up\"></i><canvas id=\"chartContainer\"></canvas><a href='#' onclick=\"$('#popupContent').show().fadeIn(1000);$('#divPopup').hide();\">Show Sample Collection Details</a></div>";
                    } 

			     layer.bindPopup(popupHTML);
    
}

function filterMarkers(feature, layer){
      return feature.properties.SAND != 0 && feature.properties.GRAVEL != 0 && feature.properties.MUD != 0;
}

function filterQueryMarkers(feature, layer){
    if (feature.properties.SAND == 0 && feature.properties.GRAVEL == 0 && feature.properties.MUD == 0){
            return;
    } else { 
    var formID = event.target.form.id;
    var sedTypes = event.target.form[0];
    var sedType;
    var operatorTypes = event.target.form[1];
    var opteratorType;
    var percent = event.target.form[2].value;
    var sedTypes1 = event.target.form[3];
    var sedType1;
    var operatorTypes1 = event.target.form[4];
    var opteratorType1;
    var percent1 = event.target.form[5].value;
    var selectedPts = "";
    
        
          for(var i=0; i< sedTypes.options.length; i++){ 
                    var opt = sedTypes.options[i];
                    if(opt.selected){
                        sedType = sedTypes.options[i].innerHTML;
                    }
                }
                for(var i=0; i< operatorTypes.options.length; i++){    
                    var opt = operatorTypes.options[i];
                    if(opt.selected){
                        operatorType = operatorTypes.options[i].innerHTML;
                    }
                }

                var sed = "feature.properties." + sedType;
                var compOp;
                                
                if(operatorType == "Greater than or Equal to (&gt;=)"){
                    compOp = ">=";
                }else if(operatorType == "Less than or Equal to (&lt;=)"){
                    compOp = "<=";
                }else if(operatorType == "Equal to"){
                    compOp = "==";
                }

                var selectedPts = String(sed) +" " + String(compOp) +" " + percent;
    
                if(percent1 != ""){
                   for(var i=0; i<sedTypes1.options.length; i++){    
                            var opt1 = sedTypes1.options[i];
                            if(opt1.selected){
                                sedType1 = sedTypes1.options[i].innerHTML;
                            }
                        }
                        for(var i=0; i<operatorTypes1.options.length; i++){    
                            var opt1 = operatorTypes1.options[i];
                            if(opt1.selected){
                                operatorType1 = operatorTypes1.options[i].innerHTML;
                            }
                        } 
                    
                    var sed1 = "feature.properties." + sedType1;
                    var compOp1;

                    if(operatorType1 == "Greater than or Equal to (&gt;=)"){
                        compOp1 = ">=";
                    }else if(operatorType1 == "Less than or Equal to (&lt;=)"){
                        compOp1 = "<=";
                    }else if(operatorType1 == "Equal to"){
                        compOp1 = "==";
                    }

                    selectedPts += " && " +String(sed1)+" " + String(compOp1)+ " "+ percent1;
                }
               
                return eval(selectedPts);
        }
 }

function selectFolkClassMarkers(feature, layer){
   var markersClustFOLK = document.querySelector('#selectFolk').value;
    
      return feature.properties.FOLK_CLASS == markersClustFOLK;
}

function markersClick(markers){
    
markers.on("click", function(e){
    var props = e.layer.feature.properties;
    
    setTimeout(function(){
        if(props.FOLK_CLASS != "" && props.FOLK_CLASS!='undefined'){
                    var sedClasses =[];
                    var sedValues = [];

                 if (props.MUD != 0){
                    sedClasses.push('Mud');    
                    sedValues.push(props.MUD);
                    }
                    if (props.SAND != 0){
                    sedClasses.push('Sand');    
                    sedValues.push(props.SAND);
                      }
                    if (props.GRAVEL != 0){
                    sedClasses.push('Gravel');    
                    sedValues.push(props.GRAVEL);
                    }
                pieChart(sedClasses, sedValues, props.FOLK_CLASS, props.PSA_DSCRPT);
        }else {
             $('#popupContent').css("display","block").hide().fadeIn();
        }
    }, 200)    
});
}    

function enableRadioButtons(btn1, btn2, btn3, leg){
            btn1.disabled = false;
            btn2.disabled = false;
            btn3.disabled = false;
            btn1.checked = true;
 
            $("label[for='"+ btn1.id+"']").removeClass('disableLabel').addClass('clusterbtn');
            $("label[for='"+ btn2.id+"']").removeClass('disableLabel').addClass('clusterbtn');
            $("label[for='"+ btn3.id+"']").removeClass('disableLabel');
            $('#radioBtns').addClass('radioBtnsHighlight');
           $("#"+leg+"").slideDown("slow");
}

function disableRadioButtons(btn1, btn2, leg){
            btn1.disabled = true;
            btn2.disabled = true;
            $("label[for='"+ btn1.id+"']").addClass('disableLabel');
            $("label[for='"+ btn2.id+"']").addClass('disableLabel');
     $('#radioBtns').removeClass('radioBtnsHighlight');
            $("#"+leg+"").slideUp("slow");
}

function resetPSAForm(){
    $('#queryPSA').trigger('reset');
    $('#QueryPSAMarkers').prop("checked", false);
    disableRadioButtons(clusterQueryPSA, unclusterQueryPSA);
    
}


function clearMap(){
                  if (mapBY.hasLayer(markers)){
                   
                        mapBY.removeLayer(markers); 
                }
            if (mapBY.hasLayer(markersClustPSA)){
                 
                             mapBY.removeLayer(markersClustPSA); 
                }
            
                if(mapBY.hasLayer(makersclustINF)){
                    
                                    mapBY.removeLayer(makersclustINF);
                }
            if(mapBY.hasLayer(markersClustFOLK)){
            
                                    mapBY.removeLayer(markersClustFOLK);
                }
            if(mapBY.hasLayer(markersClustSel)){
                     $('#selectFolk').val('dummy');
                    displaySelectFolk.disabled = true;
                    mapBY.removeLayer(markersClustSel);
                }
            if (mapBY.hasLayer(markersPSA)){
                   mapBY.removeLayer(markersPSA); 
                }
            if(mapBY.hasLayer(markersINF)){
                    mapBY.removeLayer(markersINF);
                }
            if(mapBY.hasLayer(markersFOLK)){
                    mapBY.removeLayer(markersFOLK);
                }
            if(mapBY.hasLayer(sampleFOLKSel)){
                    $('#selectFolk').val('dummy');
                    displaySelectFolk.disabled = true;
                    mapBY.removeLayer(sampleFOLKSel);
                }
}

function clearMapSelect(){
     if (mapBY.hasLayer(markers)){
                                  mapBY.removeLayer(markers); 
                }
            if (mapBY.hasLayer(markersClustPSA)){
                   
                             mapBY.removeLayer(markersClustPSA); 
                } 
                if (mapBY.hasLayer(markersPSA)){
                    console.log('markersPSA');
                             mapBY.removeLayer(markersPSA); 
                }
    
                if(mapBY.hasLayer(makersclustINF)){
                
                                    mapBY.removeLayer(makersclustINF);
                }
            if(mapBY.hasLayer(markersClustFOLK)){
                   
                                    mapBY.removeLayer(markersClustFOLK);
                }
            if(mapBY.hasLayer(markersClustSel)){
                                    mapBY.removeLayer(markersClustSel);
                }
    if (mapBY.hasLayer(markersPSA)){
                   mapBY.removeLayer(markersPSA); 
                }
            if(mapBY.hasLayer(markersINF)){
                    mapBY.removeLayer(markersINF);
                }
            if(mapBY.hasLayer(markersFOLK)){
                    mapBY.removeLayer(markersFOLK);
                }
            if(mapBY.hasLayer(sampleFOLKSel)){
                    $('#selectFolk').val('dummy');
                    displaySelectFolk.disabled = true;
                    mapBY.removeLayer(sampleFOLKSel);
                }
    
}
