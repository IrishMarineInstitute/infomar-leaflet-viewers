function createkmzPopup(feature, layer) {
	layer.bindTooltip('Click to preview Google Earth (kmz) file', {className: 'toolTip'});
	
 	var props = feature.properties;
	
		layer.on('click', function(e){
			var downloadType = 'KMZ';
			googleAnalyticsDownload(downloadType, props.KMZName);
					map.flyToBounds(e.target.getBounds());
					 if (isTouchDevice == true) {
						 	
							touchScreenkmzModal(props.KMZName);
					}else{ 
							downloadkmzModal(props.KMZName);
					}
		}); 
		
		layer.on('mouseover', function(e){
			highlightkmzFeature(e);
		});
		
		layer.on({
            mouseout: resetkmzHighlight,
    });		
    }

	var fullPageLink;
		
function resetkmzHighlight(e) {
	$(".previewWindow").css("display", "none");
	$("#previewImg").css("border", "1px solid #bbb");
	kmzOutline.setStyle(style300);
	kmzOverview.setStyle(style400);
}			
var modalOpen = false;

function touchScreenkmzModal(kmzname){

	$(".previewWindow").css("display", "none");
	var kmzLink = 'https://jetstream.gsi.ie/iwdds/delivery/INFOMAR_Google/' +kmzname+ '.kmz';
	var newImage = '//maps.marine.ie/infomarData/variousmaps/kmz_pngs/' + kmzname +".png";
	
		var popup =  "<div><button id=\"btnSmall\" onclick='closeShipwreckWindow()' style=\"float:right;\ class=\"ui-button-text-icon-primary ui-icon ui-icon-close\"><span class=\"ui-icon ui-icon-close\"></span></button></div><div><img src="+newImage+" width=100%; height=100%; style= \"margin-top:5px;\"></div><div><a class=\"button\" href =\""+kmzLink+"\" target=\"blank\">Download Google Earth kmz file</a></div>";
	
											
			 $('#shipwreckModal').html(popup);
			 $('#shipwreckModal').removeClass("mediumModal").removeClass("greyscalesmallModal").addClass('mobileModal')

			setTimeout(
			  function() 
			  {
				$("div#shipwreckModal").addClass("show");
				modalOpen = true;	
			  }, 2000);			 

			modalCoverageAction();
}	

function downloadkmzModal(kmzname){
	var linkStr = JSON.stringify(kmzname);
	$(".previewWindow").css("display", "none");
	var newImage = '//maps.marine.ie/infomarData/variousmaps/kmz_pngs/' + kmzname +".png";
	
		var popup =  "<div><button id=\"btnSmall\" onclick='closeShipwreckWindow()' style=\"float:right;\ class=\"ui-button-text-icon-primary ui-icon ui-icon-close\"><span class=\"ui-icon ui-icon-close\"></span></button></div><div><img src="+newImage+" width=100%; height=100%; style= \"margin-top:5px;\"></div><div><button id=\"btnSmall\" onclick='downloadkmz("+linkStr+")' style=\"float:left; margin:10px;\ class=\"ui-button-text-icon-primary\">Download Google Earth kmz file</button></div>";
											
			 $('#shipwreckModal').html(popup);
			 $('#shipwreckModal').removeClass("mediumModal").removeClass("greyscalesmallModal").addClass('kmzModal')

			setTimeout(
			  function() 
			  {
				$("div#shipwreckModal").addClass("show");
				modalOpen = true;	
			  }, 2000);			 

			modalCoverageAction();
}
function highlightkmzFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 2,
        color: '#a8a8a8',
        dashArray: '',
        fillOpacity: 0.7
    });
	var pngString = layer.feature.properties.KMZName;
	
	var newImage = '//maps.marine.ie/infomarData/variousmaps/kmz_pngs/' + pngString +".png"; 
	if(modalOpen){
		return false;
	}else {
	$("#previewImg").attr("src", newImage);
	$(".previewWindow").css("display", "block");
	$("#previewImg").css("border", "8px solid #fff");
	}
	
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}	

function modalCoverageAction(){
			var div = L.DomUtil.get(shipwreckModal);
			L.DomEvent.disableClickPropagation(div);
			L.DomEvent.on(div, 'mousewheel', L.DomEvent.stopPropagation);
			L.DomEvent.on(div, 'click', L.DomEvent.stopPropagation);
		
		setTimeout(function() {	
		map.on('click', function(e){
			if (modalOpen){
					closeShipwreckWindowNoZoom();
				} 
			});
			}, 100);
}

function downloadkmz(downloadLink){
	window.location = 'https://jetstream.gsi.ie/iwdds/delivery/INFOMAR_Google/' +downloadLink+ '.kmz';
}

