function createSeabedChartPopup(feature, layer) {
	layer.bindTooltip('Click to open', {className: 'toolTip'});
	
 	var props = feature.properties;
	layer.on('click', function(e){
		var touchscreen = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));
		
		if (pdflist == e.target.feature.properties.Chart_Name && modalOpen == true){
					L.DomEvent.stop(e);
					return false;
				} else {
					L.DomEvent.stop(e);
					$(".previewWindow").css("display", "none");				
					map.flyToBounds(e.target.getBounds());
					if (isTouchDevice == true) {					
							touchScreenSeabedModal(props.Chart_Name, props.OnlineFold, props.Name);
					}else{ 
							showSeabedChartImageWindow(props.Chart_Name, props.OnlineFold, props.Name);
					}
				
				}
		}); 

layer.on('mouseover', function(e){
			highlightSeabedFeature(e)
		});		
		
		layer.on({
        mouseout: resetSeabedHighlight,
    });		
    }
	
	var fullPageLink;
	var modalOpen = false;
	var pdflist;
	
	function showSeabedChartImageWindow(seabedClass, folder, title){
		pdflist = seabedClass;
		
		var baseURL = stdChartsURL + folder;
		var linkString = stdChartsURL + folder +seabedClass;
		
		fullPageLink = baseURL +seabedClass;
		
		var info = getAcrobatInfo();
		
		if ((info.browser != "firefox") && info.acrobat == false){
			var pdfError = "<div>It appears your browser pdf previewer is disabled.<br>You can enable the pdf previewer or you can download the maps using the following buttons:<br></div><div><a class=\"button\" href ="+baseURL+"/"+ seabedClass+".pdf target=\"blank\">Seabed Calssification</a></div></div>";
			
			$('#pdferror').html(pdfError);
			$("div#pdferror").addClass("show");
			modalOpen = true;
			
		} else {
			var imageIframe = "<div><p style=\"font-size: 16px; font-weight: strong; margin: 5px; color: #4A4A4A;\">"+ title + " Seabed Classification" + "<button id=\"btnCloseShipwreck\" onclick='closeShipwreckWindow()' style=\"float:right;\ class=\"ui-button-text-icon-primary ui-icon ui-icon-close\"><span class=\"ui-icon ui-icon-close\"></span></button></p></div><div id=\"chartimageDiv\"><embed id=\"chartimage\" src='" + baseURL + "/" + seabedClass + ".pdf'\" width=\"100%;\" height=\"100%;\" type=\"application/pdf\"></div><div><button type=\"button\" class=\"btn btn-digital\" style=\"margin-top: 10px; margin-right: 10px; float:left;\"class=\"ui-button-text-icon-primary\" onclick='openNewImageLink(fullPageLink)'><span class=\"ui-icon ui-icon-extlink\"></span></button></div>";
									
			$('#shipwreckModal').html(imageIframe);
			fullPageLink = ($('#chartimage').attr("src"));
			 
			setTimeout(
			  function() 
			  {
				$("div#modalMask").addClass("show");
				$("div#modalMask").css('display', 'block');
				$("div#shipwreckModal").addClass("show");
				$("button#seabedClass").addClass("hoverBtn");
				modalOpen = true;
			 }, 2000);			 
		}
			modalAction();	
			return false;
      }

function touchScreenSeabedModal(seabedClass, folder, title){
		var baseURL = stdChartsURL + folder;
		fullPageLink = baseURL +seabedClass;
		var pnglink = seabedClass +".png";
		var newImage = previewImg + pnglink; 
		pdflist = seabedClass;
	
			var popup =  "<div><button id=\"btnSmall\" onclick='closeShipwreckWindow()' style=\"float:right;\ class=\"ui-button-text-icon-primary ui-icon ui-icon-close\"><span class=\"ui-icon ui-icon-close\"></span></button></div><div><img src="+newImage+" width=100%; height=100%;\"><div><p style=\"font-size: 12px; font-weight: strong; margin: 5px; color: #4A4A4A;\">Download a Map:</span></p></div><div><a class=\"button\" href ="+baseURL+"/"+ seabedClass+".pdf target=\"blank\">Seabed Classification</a></div><div></div>";
						
			 $('#shipwreckModal').html(popup);
			 $('#shipwreckModal').removeClass("mediumModal").addClass('mobileSeabedModal');
			 
			 setTimeout(
			  function() 
			  {
				$("div#shipwreckModal").addClass("show");
					modalOpen = true;
			  }, 1000);			 
            
			modalAction();
			return false;
}
	  
function closeShipwreckWindow() {
            $("div#shipwreckModal").removeClass("show");
            $("div#modalMask").removeClass("show");
	
		if ($(window).width() < 480 ||isTouchDevice == true) {
			map.flyToBounds([[53.5, -5.5],[53.5, -12.5]]);
		}else if ($(window).width() < 780 ||isTouchDevice == true) {
			map.flyToBounds([[53.5, -8.5],[53.5, -8.5]]);
		}else {
			map.flyToBounds([[55.5, -5.5], [51, -14.5]]);
		}
			modalOpen = false;
		    return false;
}
		
function closeShipwreckWindowNoZoom() {
            $("div#shipwreckModal").removeClass("show");
			$("div#modalMask").removeClass("show");
					
			modalOpen = false;	
		    return false;
        }		
		
		function closepdfErrorWindow() {
            $("div#pdferror").removeClass("show");
			map.flyToBounds([[55.5, -5.5], [51, -14.5]]);
            return false;
        }
/* function openNewImage(baseURL, newChart, name){
			 var newImage = "<embed id=\"chartimage\" src='" + baseURL + "/" + newChart + ".pdf'\" width=\"100%\" height=\"100%\" type=\"application/pdf\">" 

			$("#chartimage").replaceWith(newImage);
			$("button").removeClass("hoverBtn");
			setTimeout(
			  function() 
			  {
				$(name).addClass("hoverBtn");	
			  }, 100);
			  
			 fullPageLink = $('embed#chartimage')[0].src;
		
			 return false;
			}	 */
			
function openNewImageLink(url){
				var win = window.open(url, '_blank');
				win.focus();
			 return false;
			}

function highlightSeabedFeature(e) {
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
	var pnglink = layer.feature.properties.Chart_Name +".png";
	var newImage = previewImg + pnglink; 
	
	$("#previewImg").attr("src", newImage);
	$(".previewWindow").css("display", "block");
	}					   
/*     if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    } */
}

function resetSeabedHighlight(e) {
	$(".previewWindow").css("display", "none");
	seabedLayer.setStyle(style50);
}

function modalReplace(e){
		$("div#shipwreckModal").removeClass("show");
		L.DomEvent.stop(e);
}

function modalAction(){
			var div = L.DomUtil.get(shipwreckModal);
			L.DomEvent.disableClickPropagation(div);
			L.DomEvent.on(div, 'mousewheel', L.DomEvent.stopPropagation);
			L.DomEvent.on(div, 'click', L.DomEvent.stopPropagation);

		setTimeout(function() {	
		map.on('click', function(e){
			if (modalOpen){
			closeShipwreckWindow();
				}
			});
			}, 100);
}  


		