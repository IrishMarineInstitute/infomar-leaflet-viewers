var baseURL = '//maps.marine.ie/mapjslibs/images/shipwrecks/';
    
var wreckIcon = L.icon({
    iconUrl: baseURL + 'shipwreckMarkerNoImg.png',
    iconSize: [24, 43],
    iconAnchor: [12, 42],
    popupAnchor: [0, -46]
});

var wreckIcon2 = L.icon({
    iconUrl: baseURL + 'shipwreckMarker3d.png',
    iconSize: [24, 43],
    iconAnchor: [12, 42],
    popupAnchor: [0, -46]
});

var wreckIcon3 = L.icon({
    iconUrl: baseURL + 'shipwreckMarkerImg.png',
    iconSize: [24, 43],
    iconAnchor: [12, 42],
    popupAnchor: [0, -46]
});

var wreckIcon4 = L.icon({
    iconUrl: baseURL + 'shipwreckMarkerPDF.png',
    iconSize: [24, 43],
    iconAnchor: [12, 42],
    popupAnchor: [0, -46]
});

var wreckIcon5 = L.icon({
    iconUrl: baseURL + 'shipwreckMarker5.png',
    iconSize: [24, 43],
    iconAnchor: [12, 42],
    popupAnchor: [0, -46],
    zIndexOffset: -100
});

function createWreckPopup(feature, layer) { 
	var props = feature.properties;
    
 	var downloadType = 'Wreck Sheet';
        var vesselName = "Unidentified Wreck";
    
        var popupHTML = "<table class=\"tg\">";
        if (typeof props.VESSELNAME != 'undefined' && props.VESSELNAME != "") {
            popupHTML += "<tr><th class=\"tg-topbottom\"  colspan=\"2\">" + props.VESSELNAME + "</th>";
            vesselName = props.VESSELNAME;
        } else{
            popupHTML += "<tr><th class=\"tg-topbottom\"  colspan=\"2\">" + vesselName + "</th>";
        }

        popupHTML += "<tr><td class=\"tg-9hbo\">Latitude</td><td class=\"tg-yw4l\">"+ feature.geometry.coordinates[1].toFixed(5).toString() + "</td></tr><tr><td class=\"tg-9hbo\">Longitude</td><td class=\"tg-yw4l\">"+ feature.geometry.coordinates[0].toFixed(5).toString() + "</td></tr><tr><td class=\"tg-9hbo\">Vessel Type </td><td class=\"tg-yw4l\">" + (props.VESSELTYPE || "Unknown") + "</td></tr><tr><td class=\"tg-9hbo\">Wreck Length </td><td class=\"tg-yw4l\">"+ props.WRECKLEN_M + " m</td></tr><tr><td class=\"tg-9hbo\">Wreck Width </td><td class=\"tg-yw4l\">" + props.WRECKWID_M + " m</td></tr><tr><td class=\"tg-9hbo\">Depth </td><td class=\"tg-yw4l\">" + props.H2ODEPTH_M + " m</td></tr>";

        if (typeof props.URL_IMAGE != 'undefined' && props.URL_IMAGE != "" && props.URL_IMAGE != "<Null>") {
			popupHTML += "<tr><td class=\"tg-img\" colspan=\"2\"><a class='pointer' onclick='showShipwreckImageWindow(\"" +props.URL_IMAGE + "\",\""+vesselName + "\");'><img src='"+  props.URL_IMAGE + "' width='100%' /></a></td></tr>";
	        }		
        if (typeof props.URL3DMODEL != 'undefined' && props.URL3DMODEL != "" && props.URL3DMODEL != "<Null>") {
            popupHTML += "<tr><td class=\"tg-9hbo\" colspan=\"2\"><a class='pointer' onclick='showShipwreckWindow(\"" + props.URL3DMODEL + "\",\""+vesselName + "\");'>View 3D Model</a></td></tr>";
        }
		if (typeof props.URL_PDF != 'undefined' && props.URL_PDF != "No" && props.URL_PDF != "") {
            popupHTML += "<tr><td class=\"tg-9hbo\" colspan=\"2\"><a onclick='googleAnalyticsDownload(\"" + downloadType + "\",\""+vesselName + "\");' href='"+ props.URL_PDF + "' target='_blank'>View Wreck Report</a></td></tr>";
        } 
        if (typeof props.LinkEUSite != 'undefined' && props.LinkEUSite != "") { 
            popupHTML += "<tr><td class=\"tg-9hbo\" colspan=\"2\"><div id=\"showLinks\"><i class=\"arrow down\"></i><a href='#' onCLick=\"showLinks();\">External Links  </a></div><div id=\"externalLinks\"><div class='popupDiv'><a href =\"https://www.archaeology.ie/underwater-archaeology\" target='_blank'>Underwater Archaeology Unit</a></div><div class='popupDiv'><a href='"+props.LinkEUSite+"' target='_blank');'>WreckSite.eu Report</a></div></div></td></tr>";
             } else {
            popupHTML += "<tr><td class=\"tg-9hbo\" colspan=\"2\"><div id=\"showLinks\"><i class=\"arrow down\"></i><a href='#' onCLick=\"showLinks();\">External Links  </a></div><div id=\"externalLinks\"><div class='popupDiv'><a href =\"https://www.archaeology.ie/underwater-archaeology\" target='_blank'>Underwater Archaeology Unit</a></div><div class='popupDiv'><a href=\"https://wrecksite.eu\" target='_blank');'>WreckSite.eu</a></div></div></td></tr>";
            }
            popupHTML +="<tr><td class=\"tg-topbottom\" colspan=\"2\"><div id=\"disclaimer\"><i class=\"arrow down\"></i><a href='#' onClick=\"showDisclaimer();\">Wreck Legislation  </a></div><div id=\"wreckDisclaimer\"><div class='popupDiv'>Wrecks over 100 years old and archaeological objects found underwater are protected under the National Monuments (Amendment) Acts <a href =\"http://www.irishstatutebook.ie/eli/1987/act/17/enacted/en/html\" target='_blank'>1987 </a> and <a href =\"http://www.irishstatutebook.ie/eli/1994/act/17/enacted/en/html\" target='_blank'>1994 </a>. Significant wrecks less than 100 years old can be protected by Underwater Heritage Order. See <a href =\"https://www.archaeology.ie/underwater-archaeology\" target='_blank'> UAU </a> information leaflet on <a href =\"https://www.archaeology.ie/sites/default/files/media/publications/Protection-of-Wrecks.pdf\" target='_blank'> Protection of Wrecks.</a></div></div></td></tr>";
            
        return popupHTML;
}

 function showShipwreckWindow(sketchfabID, name) {
	if (isTouchDevice == true) {
		var url = sketchfabID+ '?utm_medium=embed&utm_source=website&utm_campain=share-popup';
			window.open(url, '_blank');
	}else{
	 
    var sketchfabIframe = "<div class=\"sketchfab-embed-wrapper\"><iframe class=\"3diframe\" width=\"100%;\" height=\"100%;\" src="+ sketchfabID +" frameborder=\"0\" allow=\"autoplay; fullscreen; vr\" mozallowfullscreen=\"true\" webkitallowfullscreen=\"true\"></iframe><p style=\"font-size: 13px; font-weight: normal; margin: 5px; color: #4A4A4A;\"><a href="+ sketchfabID +"?utm_medium=embed&utm_source=website&utm_campain=share-popup\" target=\"_blank\" style=\"font-weight: bold; color: #1CAAD9;\">"+name+"</a>on <a href=\"https://sketchfab.com?utm_medium=embed&utm_source=website&utm_campain=share-popup\" target=\"_blank\" style=\"font-weight: bold; color: #1CAAD9;\">Sketchfab</a></p><button id=\"btnCloseShipwreck\" type=\"button\" class=\"btn btn-digital\" style=\"margin-top: 10px; float:right;\" onclick=\"closeShipwreckWindow()\">Close</button></div>"; 
	 
	 $('#shipwreckModal').html(sketchfabIframe);
	 
				$("div#shipwreckModal").addClass("show");
				$("div#modalMask").addClass("show");
				
		if ($(window).width() < 400){
			$("#3diframe").attr('width','200px;');
		}
				return false;
			}
 }
			function closeShipwreckWindow() {
				$("div#shipwreckModal").removeClass("show");
				$("div#modalMask").removeClass("show");
					return false;
			}

function showShipwreckImageWindow(shipwreckimage, name) {
			
		 var imageIframe = "<div class=\"imgFrame\" style=\"text-align: center\"><img id=\"shipwreckimg\"src=\'"+ shipwreckimage + "\' width=\'100%\' height=\'100%\'/></div><div style=\"text-align: center\"><p style=\"font-size: 13px; font-weight: normal; margin: 5px; color: #4A4A4A;\">"+name+" <div><button id=\"btnCloseShipwreck\" type=\"button\" class=\"btn btn-digital\" style=\"margin-top: 10px; float:right;\" onclick=\"closeShipwreckWindow()\">Close</button></div>";	
						
            $('#shipwreckModal').html(imageIframe);
            $("div#shipwreckModal").addClass("show");
            $("div#modalMask").addClass("show");

            return false;
        }
        function closeShipwreckWindow() {
            $("div#shipwreckModal").removeClass("show");
            $("div#modalMask").removeClass("show");

            return false;
        }
		
function showDisclaimer(){
        $("div#wreckDisclaimer").addClass("show");
         $("div#disclaimer").html("<div id=\"disclaimer\" class='popupDiv'><i class=\"arrow up\"></i><a href='#' onCLick=\"hideDisclaimer();\">Wreck Legislation  </a></div>");
         }	

function hideDisclaimer(){
        $("div#wreckDisclaimer").removeClass("show");
        $("div#disclaimer").html("<div id=\"disclaimer\" class='popupDiv'><i class=\"arrow down\"></i><a href='#' onCLick=\"showDisclaimer();\">Wreck Legislation  </a></div>");
   
}

function showLinks(){
        $("div#externalLinks").addClass("show");
         $("div#showLinks").html("<div id=\"showLinks\" class='popupDiv'><i class=\"arrow up\"></i><a href='#' onCLick=\"hideLinks();\">External Links  </a></div>");
         }	

function hideLinks(){
        $("div#externalLinks").removeClass("show");
        $("div#showLinks").html("<div id=\"showLinks\" class='popupDiv'><i class=\"arrow down\"></i><a href='#' onCLick=\"showLinks();\">External Links  </a></div>");
}

   