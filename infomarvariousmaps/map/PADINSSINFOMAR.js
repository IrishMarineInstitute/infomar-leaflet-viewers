function createPADChartPopup(feature, layer) {
	var props = feature.properties;
	layer.bindTooltip('Click to preview pdf', {className: 'toolTip'});
		
		layer.on('click', function(e){
				if (pdflist == e.target.feature.properties.PDF && modalOpen == true){
					L.DomEvent.stop(e);
					return false;
				} else {
					L.DomEvent.stop(e);
					$(".previewWindow").css("display", "none");
					map.flyToBounds(e.target.getBounds());
					if (isTouchDevice == true) {
							touchPADScreenModal(props.OnlineFold, props.PDF, props.Name);
					}else{ 
							showPADImageWindow(props.OnlineFold, props.PDF, props.Name);
					}	
				}
			}); 
		
		layer.on('mouseover', function(e){
			highlightPADFeature(e)
		});
		
		layer.on({
        mouseout: resetPADHighlight,
    });		
    }
	
var baseURL;
var pdflist;

function showPADImageWindow(onlinefold, pdfname, title) {
	pdflist = pdfname;
	
		baseURL =  onlinefold + pdfname;
				
		var imageIframe = "<div><p style=\"font-size: 16px; font-weight: strong; margin: 5px; color: #4A4A4A;\">"+ title +"<button id=\"btnCloseShipwreck\" onclick='closeShipwreckWindow()' style=\"float:right;\ class=\"ui-button-text-icon-primary\"><span class=\"ui-icon ui-icon-close\"></span></button></p></div><div id=\"chartimageDiv\" \"><embed id=\"chartimage\" src='" + baseURL + "' width=\"100%;\" height=\"100%;\" type=\"application/pdf\"></div><button type=\"button\" title=\"Open high resolution image in new browser window\"; class=\"btn btn-digital\" style=\"margin-top: 10px; margin-right: 10px; float:left;\"class=\"ui-button-text-icon-primary\" onclick='openNewImageLink(baseURL, title)'><span class=\"ui-icon ui-icon-extlink\"></span></button></div>";
			
						
			 $('#shipwreckModal').html(imageIframe);
			 if ($(window).width() < 600){
				 $('#shipwreckModal').removeClass("mediumModal").removeClass("kmzModal").addClass('smallModal');
			 }
					 
			setTimeout(
			  function() 
			  {
				$("div#shipwreckModal").addClass("show");
				modalOpen = true;	
			}, 1000);			 
          			
			modalAction();
		           return false;
        }
		
function touchPADScreenModal(onlinefold, chart, name){
		var baseURL = onlinefold + chart;
		var a = chart.split(".")[0]
		var pnglink = a +".png";
		var newImage = onlinefold + pnglink; 
	
		var popup =  "<div><button id=\"btnSmall\" onclick='closeShipwreckWindow()' style=\"float:right;\ class=\"ui-button-text-icon-primary ui-icon ui-icon-close\"><span class=\"ui-icon ui-icon-close\"></span></button></div><div><img src="+newImage+" width=100%; height=100%;\"><div><a class=\"button\" href ="+baseURL+" target=\"blank\">Click to download map</a></div></div>";
									
		$('#shipwreckModal').html(popup);
		$('#shipwreckModal').removeClass("mediumModal").addClass('greyscalesmallModal');
						 
		setTimeout(function(){
				$("div#shipwreckModal").addClass("show");
				modalOpen = true;	
			  }, 1000);	

			modalAction();
			return false;
}			

function highlightPADFeature(e) {
    var layer = e.target;
		
    layer.setStyle({
        weight: 2,
        color: '#a8a8a8',
        dashArray: '',
        fillOpacity: 0.7
    });
	
	if (modalOpen){
		return false;
	} else {
	//var a = layer.feature.properties.Name.split(".")[0]
	var pnglink = layer.feature.properties.Name +".png";
	var newImage = layer.feature.properties.OnlineFold+ pnglink; 

	$("#previewImg").attr("src", newImage);
	$(".previewWindow").css("display", "block");
	}
	
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

function resetPADHighlight(e) {
   $(".previewWindow").css("display", "none");
	PADINSSINFOMARmaps.setStyle(style500);
}
