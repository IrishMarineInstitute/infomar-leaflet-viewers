function createCoveragePopup(feature, layer) {
	layer.bindTooltip('Click to open', {className: 'toolTip'});
	
 	var props = feature.properties;
	
		layer.on('click', function(e){

					map.flyToBounds(e.target.getBounds());
					if (isTouchDevice == true) {
							map.closePopup();
							touchScreenCoverageModal(props.OnlineFolder, props.Polygons, props.Coverage, props.PNG);
					}else{ 
							showCovMapImageWindow(props.OnlineFolder, props.Polygons, props.Coverage);
					}
					}); 
		
		layer.on('mouseover', function(e){
			highlightCoverageFeature(e);
		});
		
		layer.on({
            mouseout: resetCoverageHighlight,
    });		
    }

	var fullPageLink;
	
function showCovMapImageWindow(onlineFolder, polygons, coverage) {

	var imageIframe = "<div><p style=\"font-size: 16px; font-weight: strong; margin: 5px; color: #4A4A4A;\">Maps showing Infomar Coverage<button id=\"btnCloseShipwreck\" onclick='closeShipwreckWindowNoZoom()' style=\"float:right;\ class=\"ui-button-text-icon-primary\"><span class=\"ui-icon ui-icon-close\"></span></button></p></div><div id=\"chartimageDiv\" \"><embed id=\"chartimage\" src='"+ onlineFolder + polygons + "' width=\"100%;\" height=\"100%;\" type=\"application/pdf\"></div><div><button id=\"backscatter\" type=\"button\" class=\"btn btn-digital\" style=\"margin-top: 10px; margin-right: 10px; float:left;\" onclick='openCoverageImage(\""+ onlineFolder + polygons+ "\")'>Survey Coverage Polygons</button><button id=\"backscatter\" type=\"button\" class=\"btn btn-digital\" style=\"margin-top: 10px; margin-right: 10px; float:left;\" onclick='openCoverageImage(\""+onlineFolder + coverage+ "\")'>Survey Coverage Bathymetry</button><button type=\"button\" class=\"btn btn-digital\" style=\"margin-top: 10px; margin-right: 10px; float:left;\"class=\"ui-button-text-icon-primary\" onclick='openNewImageCoverageLink(fullPageLink)'><span class=\"ui-icon ui-icon-extlink\"></span></button></div>";
			
						
			 $('#shipwreckModal').html(imageIframe);
			fullPageLink = ($('#chartimage').attr("src"));
				 if ($(window).width() < 600){
				 $('#shipwreckModal').removeClass("mediumModal").addClass('smallModal');
			 }

					
			setTimeout(
			  function() 
			  {
				$("div#shipwreckModal").addClass("show");
				modalOpen = true;	
			  }, 2000);			 
         
		modalCoverageAction();
            return false;
        }	
		
function openCoverageImage(newChart){
			 var newImage = "<embed id=\"chartimage\" src='" +newChart + "' width=\"100%\" height=\"100%\" type=\"application/pdf\">" 

			$("#chartimage").replaceWith(newImage);
	
			 fullPageLink = $('embed#chartimage')[0].src;
		
			 return false;
			}	
function openNewImageCoverageLink(url){
				var win = window.open(url, '_blank');
				win.focus();
			 return false;
			}		

function resetCoverageHighlight(e) {
	$(".previewWindow").css("display", "none");
	surveyCoveragePoly.setStyle(style50);
}			
var modalOpen = false;

function touchScreenCoverageModal(onlineFolder, polygons, coverage, png){
		$(".previewWindow").css("display", "none");
				
		var popup =  "<div><button id=\"btnSmall\" onclick='closeShipwreckWindow()' style=\"float:right;\ class=\"ui-button-text-icon-primary ui-icon ui-icon-close\"><span class=\"ui-icon ui-icon-close\"></span></button></div><div><img src=\"//maps.marine.ie/infomarData/variousmaps/PDFs/Coverage/"+png+"\" width=100%; height=100%;\ style= \"margin-top:5px;\"></div><div><p style=\"font-size: 12px; font-weight: strong; margin: 5px; color: #4A4A4A;\">Download a Map:</span></p></div><div><a class=\"button\" href =\""+onlineFolder +polygons+"\" target=\"blank\">Survey Areas</a></div><div><a class=\"button\" href =\""+onlineFolder +coverage+"\" target=\"blank\">Survey Bathymetry</a><\div>";
	
											
			 $('#shipwreckModal').html(popup);
			 $('#shipwreckModal').removeClass("mediumModal").removeClass("greyscalesmallModal").removeClass("kmzModal").addClass('realMapsmallModal');

			setTimeout(
			  function() 
			  {
				$("div#shipwreckModal").addClass("show");
				modalOpen = true;	
			  }, 2000);			 

			modalCoverageAction();
}	

function highlightCoverageFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 2,
        color: '#a8a8a8',
        dashArray: '',
        fillOpacity: 0.7
    });
	console.log(layer);
	var newImage = '//maps.marine.ie/infomarData/variousmaps/PDFs/Coverage/' + layer.feature.properties.PNG; 

	if(modalOpen){
		return false;
	}else {
	$("#previewImg").attr("src", newImage);
	$(".previewWindow").css("display", "block");
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