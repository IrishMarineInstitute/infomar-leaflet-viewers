	var wreckIcon = L.icon({
    iconUrl: 'images/shipwreckMarker.png',
    iconSize: [24, 43],
    iconAnchor: [12, 42],
    popupAnchor: [0, -46],
});

var wreckIcon2 = L.icon({
    iconUrl: 'images/shipwreckMarker3d.png',
    iconSize: [24, 43],
    iconAnchor: [12, 42],
    popupAnchor: [0, -46],
});

var myshipwreckObject = new Array();

function createWreckPopup(feature, layer) {
	//myshipwreckObject.push(feature.properties);
	myshipwreckObject.push(feature);
	var props = feature.properties;

        var vesselName = "Unidentified Vessel";
        if (typeof props.VESSEL_NAM != 'undefined' && props.VESSEL_NAM != " ") {
            vesselName = props.VESSEL_NAM;
        };

        var popupHTML = "<label class='popupTitle'>" + vesselName + "</label><br/>";
        popupHTML += "<div><label class='popupLabel'>Lat:</label>" +" "+ feature.geometry.coordinates[1].toFixed(2).toString() + " <label class='popupLabel'>Long:</label>"+" " + feature.geometry.coordinates[0].toFixed(2).toString() + "</div>";

        popupHTML += "<div><label class='popupLabel'>Vessel Type: </label>"+" " + (props.VESSEL_TYP || "Unknown") + "</div>";
        popupHTML += "<div><label class='popupLabel'>Wreck Length: </label>" +" "+ props.WRECK_LENG + " m</div>";
        popupHTML += "<div><label class='popupLabel'>Wreck Width: </label>"+" " + props.WRECK_WIDT + " m</div>";
        popupHTML += "<div><label class='popupLabel'>Depth: </label>"+" " + props.WATER_DEPT + " m</div>";

        if (typeof props.IMAGE != 'undefined' && props.IMAGE != "") {
			popupHTML += "<div><a class='pointer' onclick='showShipwreckImageWindow(\"" + props.IMAGE + "\",\""+vesselName + "\");'><img src='" + props.IMAGE + "' width='100%' /></a></div>";
		//	popupHTML += "<br/><div><a class='pointer' onclick='showShipwreckImageWindow(\"" + props.IMAGE + "\",\""+vesselName + "\");'>View Full Size Image</a></div>"; 
        }
		if (typeof props.PDF != 'undefined' && props.PDF != "") {
            popupHTML += "<br/><div><a href='" + props.PDF + "' target='_blank'>View Wreck Report</a></div>";
        } 
		
       if (typeof props.Link3d != 'undefined' && props.Link3d != "") {
            popupHTML += "<br/><div><a class='pointer' onclick='showShipwreckWindow(\"" + props.Link3d + "\",\""+vesselName + "\");'>View 3D Model</a></div>";
        }

         layer.bindPopup(popupHTML);
			 
    }

 function showShipwreckWindow(sketchfabID, name) {
	 console.log(sketchfabID);
	 var sketchfabIframe = "<div class=\"sketchfab-embed-wrapper\"><iframe class=\"3diframe\" width=\"100%;\" height=\"100%;\" src="+ sketchfabID +" frameborder=\"0\" allowvr allowfullscreen mozallowfullscreen=\"true\" webkitallowfullscreen=\"true\" onmousewheel=\"\"></iframe><p style=\"font-size: 13px; font-weight: normal; margin: 5px; color: #4A4A4A;\"><a href="+ sketchfabID +"?utm_medium=embed&utm_source=website&utm_campain=share-popup\" target=\"_blank\" style=\"font-weight: bold; color: #1CAAD9;\">"+name+"</a>on <a href=\"https://sketchfab.com?utm_medium=embed&utm_source=website&utm_campain=share-popup\" target=\"_blank\" style=\"font-weight: bold; color: #1CAAD9;\">Sketchfab</a></p><button id=\"btnCloseShipwreck\" type=\"button\" class=\"btn btn-digital\" style=\"margin-top: 10px; float:right;\" onclick=\"closeShipwreckWindow()\">Close</button></div>"; 
	 
	 
	 $('#shipwreckModal').html(sketchfabIframe);
	 
				$("div#shipwreckModal").addClass("show");
				$("div#modalMask").addClass("show");
				
		if ($(window).width() < 400){
			$("#3diframe").attr('width','200px;');
		}
				return false;
			}

			function closeShipwreckWindow() {
				$("div#shipwreckModal").removeClass("show");
				$("div#modalMask").removeClass("show");
					return false;
			}

function showShipwreckImageWindow(shipwreckimage, name) {
			
		 var imageIframe = "<div class=\"imgFrame\" style=\"text-align: center\"><img id=\"shipwreckimg\"src=\'" + shipwreckimage + "\' width=\'100%\' height=\'100%\'/></div><div style=\"text-align: center\"><p style=\"font-size: 13px; font-weight: normal; margin: 5px; color: #4A4A4A;\">"+name+" <div><button id=\"btnCloseShipwreck\" type=\"button\" class=\"btn btn-digital\" style=\"margin-top: 10px; float:right;\" onclick=\"closeShipwreckWindow()\">Close</button></div>";	
			
			
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
		
		