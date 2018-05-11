//autogenerate dropdown list from shipwrecks geojson file
var lookupContent = "<div>Select from the following list  of shipwrecks<br> that have additional information:<div><select name=\"lookupFeature\" id=\"lookupFeature\">	<option value=\"dummy\">Clear Map</option>";
document.getElementById('lookup').innerHTML = lookupContent;

for(i=0; i<myshipwreckObject.length; i++){
	var shipwreckName =  JSON.stringify(myshipwreckObject[i].VESSEL_NAM);
	var shipwreckNameClean = shipwreckName.substring(1, shipwreckName.length-1);
	
	if (shipwreckNameClean !==" "){
		var shipwreckOption = "<option value=" + shipwreckName +">" + shipwreckNameClean +"</option>";
		$("#lookupFeature").append(shipwreckOption);
	}
}	
