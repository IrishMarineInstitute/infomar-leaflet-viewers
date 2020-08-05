L.Control.mapLegend = L.Control.extend({
    options: {
        position: 'topright',
        popupOptions: {
            className: 'leaflet-measure-resultpopup',
            autoPanPadding: [10, 10]
        }
    },

    onAdd: function (map) {
        var controlDiv = L.DomUtil.create('div', 'myButton leaflet-bar noPrint');
        L.DomEvent
            .addListener(controlDiv, 'click', L.DomEvent.stopPropagation)
            .addListener(controlDiv, 'click', L.DomEvent.preventDefault)
        var controlUI = L.DomUtil.create('a', 'legendButton myButton', controlDiv);
        controlUI.title = 'Map Legend';
        controlUI.id = 'legendButton';
        controlUI.href = '#';
        controlUI.style.width = "35px";
		controlUI.style.height = "35px";
		
        var mapLegend = L.DomUtil.create('div', 'mapLegend', controlDiv);
         L.DomEvent
            .addListener(mapLegend, 'click', L.DomEvent.stopPropagation)
            .addListener(mapLegend, 'click', L.DomEvent.preventDefault)
        mapLegend.title = 'Map Legend';
        mapLegend.style.display = 'none';
        mapLegend.innerHTML = "<div id=\"content\"></div>"; 
        
        
        L.DomEvent.addListener(controlUI, 'click', function () {
            var layers =[];
                layers = checkLayers();
                if(layers.length == 0){
                    mapLegend.innerHTML = "<div id=\"content\"><div class=\"textbox\">No layers displayed on the map.</div></div>";
                    controlUI.style.display = 'none';
                    mapLegend.style.display = 'block';
                    return false;
                }
            
                $('#content').load("map/mapLegend/mapLegend.html", function(){
                    $('h3').hide();
                    $('.chartsDiv').hide();
                    for(i=0;i<layers.length; i++){
                        $('#'+ layers[i]).show();
                }
                    legendExpand(layers);
                    map.on("zoomend", refreshZoom);
            });
                
            setTimeout(function(){
                controlUI.style.display = 'none';
                mapLegend.style.display = 'block';
            }, 200);      
            
 
                $('input.leaflet-control-layers-selector').click(function(e){
                  //  e.preventDefault();
                     if($('#legendButton').css("display") == "none"){
                            $('#legendButton')[0].click();
                        }
                    });
    
        });
        
            L.DomEvent.addListener(map, 'click', function () {
            mapLegend.style.display = 'none';
			controlUI.style.display = 'block';  
            map.off("zoomend", refreshZoom);
         });
     
        return controlDiv;
        }
});

function legendExpand(layers){
    for(i=0;i<layers.length; i++){
        if($('#'+ layers[i]).css('display') == 'block'){
                   var firstH3ID = ($('#'+ layers[i]).index('h3'));
                    $( "#accordion" ).accordion({ active: firstH3ID, heightStyle: "content", animate: 500 });
                    return;
                   }
                }
    
}

function checkLayers(){
        var layersDisplayed = [];
        for (key in overlays){
            if(map.hasLayer(overlays[key])){
                var str = key.replace(/ |:/g, "");
                layersDisplayed.push(str);
                if( str == "CoastalChartSeries1100k" || str == "PriorityBayCharts1100k" || str == "PriorityBayCharts150k" || str == "SedimentClassificationCharts"){
                     if (!layersDisplayed.includes("charts")){
                        layersDisplayed.push('charts');
                        } 
                 }
            }
        }
    
       
    if (layersDisplayed.indexOf('Bathymetry') != -1){
        layersDisplayed.splice(layersDisplayed.indexOf('Bathymetry'), 1 );
                    if (map.getZoom()<=12){
                            layersDisplayed.unshift('bathyLeg');
                    }if (map.getZoom()>=13){
                            layersDisplayed.unshift('bathyShallowLeg');
                             }  
    }
    return layersDisplayed;
}
    
var refreshZoom = function zoomBathy(){
         if (map.hasLayer(bathy_Contours) == true){
             if(($('#bathyShallowLeg').next().css('display') == 'block')||($('#bathyLeg').next().css('display') == 'block')){
                    if(map.getZoom()<=12){
                               $('#bathyShallowLeg').hide().next().slideUp();
                                $('#bathyLeg').show().next().slideDown();
                        }else {
                                  $('#bathyLeg').hide().next().slideUp();
                                $('#bathyShallowLeg').show().next().slideDown();
                            }
                    }else{
                         if(map.getZoom()<=12){
                               $('#bathyShallowLeg').hide();
                                $('#bathyLeg').show();
                        }else {
                                  $('#bathyLeg').hide();
                                $('#bathyShallowLeg').show();
                            }
                    }
           }
}

   