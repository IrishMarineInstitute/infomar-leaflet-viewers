// Split Screen View///
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
        controlUI.href = '#';
        		controlUI.style.width = "35px";
		controlUI.style.height = "35px";
		
        L.DomEvent.addListener(controlUI, 'click', function () {
              $('#content').load("libs/mapLegend/mapLegend.html", function(){
                  if (mapBY.hasLayer(bathy_Contours) != true){
                           $('#bathyLeg').hide();
            }
                  if (mapBY.hasLayer(backscatter_int) != true){
                           $('#backscatterLeg').hide();
            }
                  if (mapBY.hasLayer(markers) != true){
                         $('#samplePtsLeg').hide();
            }
                  if (mapBY.hasLayer(seabedClassFolk) != true){
                           $('#sedClassLeg').hide();
            }
                  
            });
            
            setTimeout(function(){
                legendExpand()
                controlUI.style.display = 'none';
                mapLegend.style.display = 'block';
            }, 500);
            
        });

		var mapLegend = L.DomUtil.create('div', 'mapLegend', controlDiv);
        mapLegend.title = 'Map Legend';
        mapLegend.style.display = 'none';
        mapLegend.innerHTML = "<div id=\"content\"></div>" 
                
        L.DomEvent.addListener(mapBY, 'click', function () {
            mapLegend.style.display = 'none';
			controlUI.style.display = 'block';  
         });
		
        return controlDiv;
    }
});

function legendExpand(){
            if ($('#bathyLeg').css("display") == "block"){
                    $('#bathyLeg').click();
                }else if ($('#backscatterLeg').css("display") == "block"){
                    $('#backscatterLeg').click();
                }else if ($('#samplePtsLeg').css("display") == "block"){
                    $('#samplePtsLeg').addClass('ui-accordion-header-active');  
                }else if ($('#sedClassLeg').css("display") == "block"){
                    $('#sedClassLeg').addClass('ui-accordion-header-active');  
            }
}