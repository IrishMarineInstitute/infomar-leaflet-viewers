var mapBY = L.map('mapBY', {
            center: [53.5, -10.397],
			layers: [base_EsriOceans,bathy_Contours],
            zoom: 7,
            layersControl: true,
        });
		
var baseMap = {
		"Oceans": base_EsriOceans,
		"Street Map": OpenStreetMap,
		"Imagery": base_EsriImagery,
};
		
 var Overlays ={
	 'Bathymetry' : bathy_Contours,
	 'Backscatter' : backscatter_int,
 }
 
 
	L.control.layers(baseMap, Overlays).addTo(mapBY);
	L.control.scale().addTo(mapBY);
	L.control.mousePosition().addTo(mapBY);
	mapBY.addControl(new L.Control.syncMap());
	
	if (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0)){
		mapBY.addControl(new L.Control.locateMeWatch());	
		mapBY.addControl(new L.Control.Compass());
	 }
