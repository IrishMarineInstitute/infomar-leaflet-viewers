	var chartURL = varChartsURL +"RealMap/";
	
function createRealMapPopup(feature, layer) {
	layer.bindTooltip('Click to open', {className: 'toolTip'});

	
 	var props = feature.properties;
		layer.on('click', function(e){

					map.flyToBounds(e.target.getBounds());
				
				if (feature.properties.IrishStdRealMap){
					if (isTouchDevice == true) {
							touchScreenRealMap(props.StdRealMap, props.IrishStdRealMap, props.LessonPlans, props.PNG);
					}else{ 
							showRealMapImageWindow(props.StdRealMap, props.IrishStdRealMap, props.LessonPlans);
					}
				}else{
					if (isTouchDevice == true){
						touchSmall3dImageWindow(props.StdSmallMap, props.IrishStdSmallMap, props.OtherSizes, props.PNG);
					}else{
						showSmall3dImageWindow(props.StdSmallMap, props.IrishStdSmallMap, props.OtherSizes);
					}
				}
					
					}); 
		layer.on('mouseover', function(e){
			highlightRealMapFeature(e)
		});
		
		layer.on({
        mouseout: resetRealMapHighlight,
    });		
    }
		var fullPageLink;
function showRealMapImageWindow(pdfname, irishpdf, LessonPlans) {
			
		var imageIframe = "<div><p style=\"font-size: 16px; font-weight: strong; margin: 5px; color: #4A4A4A;\">Real Map of Ireland<button id=\"btnCloseShipwreck\" onclick='closeShipwreckWindowNoZoom()' style=\"float:right;\ class=\"ui-button-text-icon-primary\"><span class=\"ui-icon ui-icon-close\"></span></button></p></div><div id=\"chartimageDiv\" \"><embed id=\"chartimage\" src='" +chartURL+ pdfname + "' width=\"100%;\" height=\"100%;\" type=\"application/pdf\"></div><div><button id=\"bathymetry\" type=\"button\" class=\"btn btn-digital\" style=\"margin-top: 10px; margin-right: 10px; float:left;\" onclick='openNewRealImage(\""+chartURL + pdfname+"\")'>English</button><button id=\"bathymetry\" type=\"button\" class=\"btn btn-digital\" style=\"margin-top: 10px; margin-right: 10px; float:left;\" onclick='openNewRealImage(\"" +chartURL+ irishpdf + "\")'>Gaeilge</button></div><div><button type=\"button\" class=\"btn btn-digital\" style=\"margin-top: 10px; margin-right: 10px; float:left;\"class=\"ui-button-text-icon-primary\" onclick='openNewImageRealMapLink(fullPageLink)'><span class=\"ui-icon ui-icon-extlink\"></span></button><div><a id=\"alessonPlans\" href =\""+LessonPlans+"\" target=\"blank\">View Lesson Plans</a></div></div>";
			
						
			 $('#shipwreckModal').html(imageIframe);
			 	fullPageLink = ($('#chartimage').attr("src"));
				
			 if ($(window).width() < 600){
				 $('#shipwreckModal').removeClass( "mediumModal" ).addClass('realMapsmallModal')
			 }
					 
			setTimeout(
			  function() 
			  {
				$("div#shipwreckModal").addClass("show");
				modalOpen = true;	
			}, 200);			 
            
modalAction();

            return false;
        }

function openNewImageRealMapLink(url){
				var win = window.open(url, '_blank');
				win.focus();
			 return false;
			}

function highlightRealMapFeature(e){
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

	var newImage = chartURL + layer.feature.properties.PNG; 
	
	$("#previewImg").attr("src", newImage);
	$(".previewWindow").css("display", "block");
	}
	
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}
			
function resetRealMapHighlight(e) {
	$(".previewWindow").css("display", "none");
  		realMapIrePoly.setStyle(style100);
		realMapSmallPoly.setStyle(style100);
}


function touchScreenRealMap(pdfname, irishpdf, LessonPlans, png){
	$(".previewWindow").css("display", "none");
		map.closePopup();
		
		var popup =  "<div><button id=\"btnSmall\" onclick='closeShipwreckWindow()' style=\"float:right;\ class=\"ui-button-text-icon-primary ui-icon ui-icon-close\"><span class=\"ui-icon ui-icon-close\"></span></button></div><div><img src=" +chartURL + png+" width=100%; height=100%;\ style= \"margin-top:5px;\"></div><div><p style=\"font-size: 12px; font-weight: strong; margin: 5px; color: #4A4A4A;\">Download the Real Map of Ireland:</span></p></div><div><a class=\"button\" href =\""+chartURL+pdfname+"\" target=\"blank\">English</a></div><div><a class=\"button\" href =\""+chartURL + irishpdf+"\" target=\"blank\">Gaeilge</a><\div><div><a href =\""+LessonPlans+"\" target=\"blank\">View Lesson Plans</a></div>";
	
								
			 $('#shipwreckModal').html(popup);
			 $('#shipwreckModal').removeClass( "mediumModal" ).addClass('realMapsmallModal')
						 
			setTimeout(function(){
				$("div#shipwreckModal").addClass("show");
				modalOpen = true;	
			  }, 200);			 
            
modalAction();
}

function openNewRealImage(newChart){
			 var newImage = "<embed id=\"chartimage\" src='" +newChart + "' width=\"100%\" height=\"100%\" type=\"application/pdf\">" 

			$("#chartimage").replaceWith(newImage);
			 fullPageLink = $('embed#chartimage')[0].src;
		
			 return false;
			}
	
	
function showSmall3dImageWindow(pdfname, place, Other) {
			
		var imageIframe = "<div><p style=\"font-size: 16px; font-weight: strong; margin: 5px; color: #4A4A4A;\">3d Map of "+ place +"<button id=\"btnCloseShipwreck\" onclick='closeShipwreckWindow()' style=\"float:right;\ class=\"ui-button-text-icon-primary\"><span class=\"ui-icon ui-icon-close\"></span></button></p></div><div id=\"chartimageDiv\" \"><embed id=\"chartimage\" src='" +chartURL+ pdfname + "' width=\"100%;\" height=\"100%;\" type=\"application/pdf\"></div><div><button type=\"button\" class=\"btn btn-digital\" style=\"margin-top: 10px; margin-right: 10px; float:left;\"class=\"ui-button-text-icon-primary\" onclick='openNewImageRealMapLink(fullPageLink)'><span class=\"ui-icon ui-icon-extlink\"></span></button>";
		
		if (Other =="Yes"){
		
		imageIframe += "<div><a id=\"alessonPlans\" href =\""+IWDDSLink+"\" target=\"blank\">Search for alternative print size</a></div></div>";
		}
						
			 $('#shipwreckModal').html(imageIframe);
			 	fullPageLink = ($('#chartimage').attr("src"));
				
			 if ($(window).width() < 600){
				 $('#shipwreckModal').removeClass( "mediumModal" ).addClass('realMapsmallModal')
			 }
					 
			setTimeout(
			  function() 
			  {
				$("div#shipwreckModal").addClass("show");
				modalOpen = true;	
			}, 200);			 
            
		modalAction();

            return false;
        }			
		
function touchSmall3dImageWindow(pdfname, place, Other, png) {
		$(".previewWindow").css("display", "none");
		
		var imageIframe = "<div><button id=\"btnCloseShipwreck\" onclick='closeShipwreckWindowNoZoom()' style=\"float:right;\ class=\"ui-button-text-icon-primary\"><span class=\"ui-icon ui-icon-close\"></span></button></p></div><div><img src=" +chartURL + png+" width=100%; height=100%;\ style= \"margin-top:5px;\"></div><div><div><a class=\"button\" href =\""+chartURL+ pdfname+"\" target=\"blank\">Download Map</a></div>";
		
		if (Other =="Yes"){
				imageIframe += "<div><a id=\"alessonPlans\" href =\""+IWDDSLink+"\" target=\"blank\">Alternative print size</a></div></div>";
		}
						
			 $('#shipwreckModal').html(imageIframe);
			 	fullPageLink = ($('#chartimage').attr("src"));
				
			 if ($(window).width() < 600){
				 $('#shipwreckModal').removeClass( "mediumModal" ).addClass('realMapsmallModal')
			 }
					 
			setTimeout(
			  function() 
			  {
				$("div#shipwreckModal").addClass("show");
				modalOpen = true;	
			}, 200);			 
            
		modalAction();

            return false;
        }				