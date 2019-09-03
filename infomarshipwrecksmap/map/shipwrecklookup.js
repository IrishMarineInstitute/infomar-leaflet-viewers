if (isTouchDevice == true) {
	$('#lookup').css('display', 'none');
//	$('#lookupFeature').css('display', 'none');
} else {	 
//autogenerate dropdown list from shipwrecks geojson file
var lookupContent = "<div>Select from the list  of identified shipwrecks:<div><select name=\"lookupFeature\" id=\"lookupFeature\">	<option value=\"dummy\">Clear Map</option>";
document.getElementById('lookup').innerHTML = lookupContent;

for(i=0; i<myshipwreckObject.length; i++){
	var shipwreckName =  JSON.stringify(myshipwreckObject[i].properties.VESSEL_NAM);
	var shipwreckNameClean = shipwreckName.substring(1, shipwreckName.length-1);
	
	if (shipwreckNameClean !==""){
		var shipwreckOption = "<option value=" + shipwreckName +">" + shipwreckNameClean +"</option>";
		$("#lookupFeature").append(shipwreckOption);
	}
	}
	sortList();
}

function sortList(){
	var select = $("#lookupFeature");
	select.html(select.find('option').sort(function(x,y){
		return $(x).text() > $(y).text() ? 1 : -1;
	}));
	$('select').val("dummy");
}
//open and zoom to shipwreck from dropdown
var shipwreckmarker;
$('#lookupFeature').change(function(e){

var marker = $('#lookupFeature').val();
var downloadType = 'Wreck Sheet';
if(typeof shipwreckmarker !== 'undefined'){
	shipwreckmarker.removeFrom(map);
	}

for(i=0; i<myshipwreckObject.length; i++){

	if(myshipwreckObject[i].properties.VESSEL_NAM == marker && myshipwreckObject[i].properties.VESSEL_NAM != " "){
		
		var popupContent = "<label class='popupTitle'>" + myshipwreckObject[i].properties.VESSEL_NAM + "</label><br/>";
        popupContent += "<div><label class='popupLabel'>Lat:</label>" +" "+ myshipwreckObject[i].geometry.coordinates[1].toFixed(2).toString() + " <label class='popupLabel'>Long:</label>"+" " + myshipwreckObject[i].geometry.coordinates[0].toFixed(2).toString() + "</div>";
        popupContent += "<div><label class='popupLabel'>Vessel Type: </label>"+" " + (myshipwreckObject[i].properties.VESSEL_TYP || "Unknown") + "</div>";
        popupContent += "<div><label class='popupLabel'>Wreck Length: </label>" +" "+ myshipwreckObject[i].properties.WRECK_LENG + " m</div>";
        popupContent += "<div><label class='popupLabel'>Wreck Width: </label>"+" " + myshipwreckObject[i].properties.WRECK_WIDT + " m</div>";
        popupContent += "<div><label class='popupLabel'>Depth: </label>"+" " + myshipwreckObject[i].properties.WATER_DEPT + " m</div>";


        if (typeof myshipwreckObject[i].properties.IMAGE != 'undefined' && myshipwreckObject[i].properties.IMAGE != "") {
            popupContent += "<div><a class='pointer' onclick='showShipwreckImageWindow(\"" +myshipwreckObject[i].properties.IMAGE + "\",\""+myshipwreckObject[i].properties.VESSEL_NAM + "\");'><img src='"+  myshipwreckObject[i].properties.IMAGE + "' width='100%' /></a></div>";
        }
        if (typeof myshipwreckObject[i].properties.LINK3DMODE != 'undefined' && myshipwreckObject[i].properties.LINK3DMODE != "") {
            popupContent += "<br/><div><a class='pointer' onclick='showShipwreckWindow(\"" + myshipwreckObject[i].properties.LINK3DMODE + "\",\""+myshipwreckObject[i].properties.VESSEL_NAM + "\");'>View 3D Model</a></div>";
        }	
 		if (myshipwreckObject[i].properties.PDF != 'undefined' && myshipwreckObject[i].properties.PDF !="No") {
            popupContent += "<br/><div><a href='" + myshipwreckObject[i].properties.PDF + "' target='_blank'>View Wreck Report</a></div>";
        }  
		

	var popup = L.popup().setContent(popupContent);
	
	shipwreckmarker = new L.marker([myshipwreckObject[i].geometry.coordinates[1].toFixed(6).toString(), myshipwreckObject[i].geometry.coordinates[0].toFixed(6).toString()], {opacity:1, icon: wreckIcon2}).addTo(map).bindPopup(popup);
	
	var mapCenterlat = shipwreckmarker._latlng.lat + 0.05;
	map.flyTo([mapCenterlat, shipwreckmarker._latlng.lng], 12);
		
	map.once("zoomend", function(e){
		shipwreckmarker.openPopup();
		});
		
		} 
		}
		});
		
