// PSA Query Form///
L.Control.queryTool = L.Control.extend({
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
        var controlUI = L.DomUtil.create('a', 'queryPSAButton myButton', controlDiv);
        controlUI.title = 'Query PSA Data';
        controlUI.id = 'queryButton';
        controlUI.href = '#';
        controlUI.style.width = "35px";
		controlUI.style.height = "35px";
		
        var queryForm = L.DomUtil.create('div', 'queryToolDiv myButton leaflet-bar no  Print', controlDiv);
       
        queryForm.title = 'Query Particle Size Analysis';
        queryForm.style.display = 'none';
        queryForm.innerHTML = "<div id=\"queryF\"></div>"; 
        
         L.DomEvent
            .addListener(queryForm, 'click', L.DomEvent.stopPropagation)
            .addListener(queryForm, 'click', L.DomEvent.preventDefault);
       
        L.DomEvent
            .addListener(controlUI, 'click', function () {
            $('#queryEdge').load("libs/queryTool/queryTool.html", function(){
                   $( "#accordionQ" ).accordion({heightStyle: "content", animate: 500});
                     $('input[type=radio],label').on('click',function(e){e.stopPropagation();});
                     $('span.ui-icon-help').click(function(e) {
                            if ($(this).attr('name') == "singleQueryHelp"){
                                      $('#singleQueryHelp').slideToggle( "slow" );
                            }else if ($(this).attr('name') == "folkQueryLegend"){
                                    $('#folkQueryLegend').slideToggle( "slow" );
                            }else if ($(this).attr('name') == "folkQueryHelp"){
                                    $('#folkQueryHelp').slideToggle( "slow" );
                            }
                            e.preventDefault();
                            e.stopPropagation();
                        });
                    $('#queryEdge').css('display', 'block');
                     
                        $('span.ui-icon.ui-icon-close').click(function(e){
                            $('#queryEdge').css('display', 'none');
                            $('#queryButton').css('display', 'block');
                        });    
                /*        
                    $( "#radioMakers" ).buttonset();
                    $( "#INFMarkers" ).button( "option", "icons", {primary:'ui-icon-gear',secondary:'ui-icon-triangle-1-s'} );
                    $( "#folkClassMarkers" ).button( "option", "icons", {primary: "ui-icon-locked"} );
                        $( "#displaySelectFolk" ).button( "option", "icons", {primary: "ui-icon-locked"} );
                    $( "#origSamples" ).button({
                        icons: {
                                primary: "ui-icon-heart",
                        },
                        text: false});    
*/                });
   
        });
        
        L.DomEvent.addListener(mapBY, 'click', function () {
            queryForm.style.display = 'none';
			controlUI.style.display = 'block';  
          
         });
        
        return controlDiv;
    }

       
});



