if (isTouchDevice == true) {
	$('#lookup').css('display', 'none');
//	$('#lookupFeature').css('display', 'none');
} else {	 
//autogenerate dropdown list from shipwrecks geojson file
var lookupContent = "<div>Select from the list  of identified shipwrecks:<div><select name=\"lookupFeature\" id=\"lookupFeature\">	<option value=\"dummy\">Clear Map</option>";
document.getElementById('lookup').innerHTML = lookupContent;

for(var i=0; i<myshipwreckObject.length; i++){
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

    for(i=0; i<myshipwreckObject.length; i++){
        if(myshipwreckObject[i].properties.VESSEL_NAM == marker){
            var popupContent = createWreckPopup(myshipwreckObject[i], shipwreckPts);
            shipwreckmarker = new L.marker([myshipwreckObject[i].geometry.coordinates[1].toFixed(6).toString(), myshipwreckObject[i].geometry.coordinates[0].toFixed(6).toString()], {opacity:1, icon: wreckIcon2}).addTo(map).bindPopup(popupContent);
            }
        }
    
	var mapCenterlat = shipwreckmarker._latlng.lat + 0.05;
	map.flyTo([mapCenterlat, shipwreckmarker._latlng.lng], 12);
		
	map.once("zoomend", function(e){
		shipwreckmarker.openPopup();
		});
});
		
