function createChartPopup(feature, layer) {
	layer.bindTooltip('Click to open', {className: 'toolTip'});
	
 	var props = feature.properties;
	layer.on('click', function(e){
		var downloadType = 'Chart';
		googleAnalyticsDownload(downloadType, e.target.feature.properties.Online_BY);
		var touchscreen = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));
		
		if (pdflist == e.target.feature.properties.PDF && modalOpen == true){
					L.DomEvent.stop(e);
					return false;
				} else {
					L.DomEvent.stop(e);
					$(".previewWindow").css("display", "none");				
					map.flyToBounds(e.target.getBounds());
					if (isTouchDevice == true) {					
							touchScreenModal(props.Online_BY, props.OnlineFold, props.Bay_Area, props.Online_BS, props.OnlineSRNW, props.OnlineSRNE);
					}else{ 
							showChartImageWindow(props.Online_BY, props.OnlineFold, props.Bay_Area, props.Online_BS, props.OnlineSRNW, props.OnlineSRNE);
					}
				//	modalReplace(e);
				}
		}); 

layer.on('mouseover', function(e){
			highlightFeature(e)
		});		
		
		layer.on({
        mouseout: resetHighlight,
    });		
    }
	
	var fullPageLink;
	var modalOpen = false;
	var pdflist;
	
	function showChartImageWindow(bathymetry, folder, title, backscatter, shadedNW, shadedNE){
		pdflist = bathymetry;
		
		var baseURL = stdChartsURL + folder;
		var linkString = stdChartsURL + folder +bathymetry;
		
		fullPageLink = baseURL +bathymetry;
		
		var info = getAcrobatInfo();
		
		if ((info.browser != "firefox") && info.acrobat == false){
			var pdfError = "<div>It appears your browser pdf previewer is disabled.<br>You can enable the pdf previewer or you can download the maps using the following buttons:<br></div><div><a class=\"button\" href ="+baseURL+"/"+ bathymetry+".pdf target=\"blank\">Bathymetry</a></div><div><a class=\"button\" href ="+baseURL+"/"+ backscatter+".pdf target=\"blank\">Backscatter</a></div><div><a class=\"button\" href ="+baseURL+"/"+ shadedNE+".pdf target=\"blank\">Shaded Relief North East</a></div><div><a class=\"button\" href ="+baseURL+"/"+ shadedNW+".pdf target=\"blank\">Shaded Relief North West</a></div>";
			
			$('#pdferror').html(pdfError);
			$("div#pdferror").addClass("show");
			modalOpen = true;
			
		} else {
			var imageIframe = "<div><p style=\"font-size: 16px; font-weight: strong; margin: 5px; color: #4A4A4A;\">"+ title +"<button id=\"btnCloseShipwreck\" onclick='closeShipwreckWindow()' style=\"float:right;\ class=\"ui-button-text-icon-primary ui-icon ui-icon-close\"><span class=\"ui-icon ui-icon-close\"></span></button></p></div><div id=\"chartimageDiv\"><embed id=\"chartimage\" src='" + baseURL + "/" + bathymetry + ".pdf'\" width=\"100%;\" height=\"100%;\" type=\"application/pdf\"></div><div><button id=\"bathymetry\" type=\"button\" class=\"chartbtn btn btn-digital\" onclick='openNewImage(\"" + baseURL+ "\",\"" + bathymetry+ "\", bathymetry)'>Bathymetry</button><button id=\"backscatter\" type=\"button\" class=\"chartbtn btn btn-digital\" onclick='openNewImage(\"" + baseURL+ "\",\"" + backscatter+ "\", backscatter)'>Backscatter</button><button id=\"shadedNE\" type=\"button\" class=\"chartbtn btn btn-digital\" onclick='openNewImage(\"" + baseURL+ "\",\"" + shadedNE+ "\", shadedNE)'>Shaded Relief North East</button><button id=\"shadedNW\" type=\"button\" class=\"chartbtn btn btn-digital\" onclick='openNewImage(\"" + baseURL+ "\",\"" + shadedNW+ "\", shadedNW)'>Shaded Relief North West</button><button type=\"button\" class=\"chartbtn btn btn-digital\" class=\"ui-button-text-icon-primary\" onclick='openNewImageLink(fullPageLink)'><span class=\"ui-icon ui-icon-extlink\"></span></button></div>";
									
			$('#shipwreckModal').html(imageIframe);
			fullPageLink = ($('#chartimage').attr("src"));
			 
			setTimeout(
			  function() 
			  {
				$("div#modalMask").addClass("show");
				$("div#modalMask").css('display', 'block');
				$("div#shipwreckModal").addClass("show");
				$("button#bathymetry").addClass("hoverBtn");
				modalOpen = true;
			 }, 2000);			 
		}
			modalAction();	
			return false;
      }

function touchScreenModal(bathymetry, folder, title, backscatter, shadedNW, shadedNE){
		var baseURL = stdChartsURL + folder;
		fullPageLink = baseURL +bathymetry;
		var pnglink = bathymetry +".png";
		var newImage = previewImg + pnglink; 
		pdflist = bathymetry;
	
			var popup =  "<div><button id=\"btnSmall\" onclick='closeShipwreckWindow()' style=\"float:right;\ class=\"ui-button-text-icon-primary ui-icon ui-icon-close\"><span class=\"ui-icon ui-icon-close\"></span></button></div><div><img src="+newImage+" width=100%; height=100%;\"><div><p style=\"font-size: 12px; font-weight: strong; margin: 5px; color: #4A4A4A;\">Download a Map:</span></p></div><div><a class=\"button\" href ="+baseURL+"/"+ bathymetry+".pdf target=\"blank\">Bathymetry</a></div><div><a class=\"button\" href ="+baseURL+"/"+ backscatter+".pdf target=\"blank\">Backscatter</a></div><div><a class=\"button\" href ="+baseURL+"/"+ shadedNE+".pdf target=\"blank\">Shaded Relief North East</a></div><div><a class=\"button\" href ="+baseURL+"/"+ shadedNW+".pdf target=\"blank\">Shaded Relief North West</a></div>";
						
			 $('#shipwreckModal').html(popup);
			 $('#shipwreckModal').removeClass("mediumModal").addClass('mobileModal');
			 
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
function openNewImage(baseURL, newChart, name){
		var downloadType = 'Chart';
		googleAnalyticsDownload(downloadType, newChart);
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
			}	
			
function openNewImageLink(url){
				var win = window.open(url, '_blank');
				win.focus();
			 return false;
			}

function highlightFeature(e) {
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
	var pnglink = layer.feature.properties.Online_BY +".png";
	var newImage = previewImg + pnglink; 

	$("#previewImg").attr("src", newImage);
	$(".previewWindow").css("display", "block");
	}					   
/*     if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    } */
}

function resetHighlight(e) {
	$(".previewWindow").css("display", "none");
    chartsLayer100.setStyle(style100);
	chartsLayer50.setStyle(style50);
	coastal100k.setStyle(style200);
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


		