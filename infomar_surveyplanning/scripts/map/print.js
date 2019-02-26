/* var zoomLevel;
map.on('zoomend', function () {	
zoomLevel = map.getZoom();
console.log(zoomLevel);
}); */

var printMap = function(){
if(window.print) {
/* 			checkMap(polygonLgd);
			checkMapPts(pointsLgd); */
	
			$('div.leaflet-control-scale.leaflet-control').appendTo('#printlegend');
		
			var screenHeight = window.innerHeight;
			var screenWidth = window.innerWidth;
			$("body").css({ "width": screenWidth, "height": screenHeight -50});	
			
			setTimeout(printDelay, 1000);				
	      }else {
	alert('Android browser does not support printing this map \n Open the map in a browser such as Chrome or Firefox to print');
			}
	};
//}

function printDelay() {
	$('#printlegend').css({'display':'block','left':'0px'});
		window.print(); 
	}  
  
var checkMap = function(layer){
		var layerArray = layer.getLayers();
		 	for(var i=0; i<layerArray.length; i ++){
				var layer =layerArray[i]; 
				var layeridExists = document.getElementById(layerStr(layer.options.name));
										
				if ((map.hasLayer(layer)) && layeridExists== null){
						var layerDiv = L.DomUtil.create('div', 'layerDivClass');
						var controlDiv = L.DomUtil.create('div');
						controlDiv.innerHTML = layer.options.name;
						controlDiv.id = layerStr(layer.options.name);
						
						var symbolDiv = L.DomUtil.create('div', 'symbolDivClass');
						symbolDiv.id = layerStr(layer.options.name) + 'img';
						symbolDiv.style.backgroundColor = layer.options.style.color;
						symbolDiv.style.opacity = layer.options.style.weight/10;
						symbolDiv.borderColor = layer.options.style.color;
						
						layerDiv.appendChild(symbolDiv);
						layerDiv.appendChild(controlDiv);
						document.getElementById('vectorLeg').append(layerDiv);
						
				}}
}

var checkMapPts = function(layer){
			var layerArray = layer.getLayers();
		 	for(var i=0; i<layerArray.length; i ++){
				var layer =layerArray[i] 
				var layeridExists = document.getElementById(layerStr(layer.options.name));
												
				if ((map.hasLayer(layer)) && layeridExists== null){
						var layerDiv = L.DomUtil.create('div', 'layerDivClass');
						layerDiv.id = layerStr(layer.options.name);
						var controlDiv = L.DomUtil.create('div');
						controlDiv.innerHTML = layer.options.name;
						controlDiv.id = layerStr(layer.options.name);
						
						var smallSymbol = smallIcon(layer.options.img);
						var symbolDiv = L.DomUtil.create('div', 'symbolDivClass');
						symbolDiv.id = layerStr(layer.options.name) + 'img';
						symbolDiv.innerHTML ='<img src='+ smallSymbol +'></img>';
						symbolDiv.style.width = '20px';
						symbolDiv.style.height = '20px';
												
						layerDiv.appendChild(symbolDiv);
						layerDiv.appendChild(controlDiv);
						document.getElementById('vectorLeg').append(layerDiv);					
				}}
}	

var removeLayers = function(layer){
			var layerArray = layer.getLayers();
		 	for(var i=0; i<layerArray.length; i ++){
				var layer =layerArray[i] 
				var layeridExists = document.getElementById(layerStr(layer.options.name));
				//var symbidExists = document.getElementById(layerStr(layer.options.name) +'img');
						
				if ((map.hasLayer(layer)== false) && layeridExists!= null){
						document.getElementById('vectorLeg').removeChild(layeridExists);
					//	document.getElementById('vectorLeg').removeChild(symbidExists);								
				}}
}	

var layerStr = function(str){
	var myStr = String(str);
	str = myStr.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
	return str;
}

var smallIcon = function(str){
	var myStr = String(str);
	var tempStr = myStr.slice(0, -4);
	str = tempStr + '_s.png'
	return str;
}