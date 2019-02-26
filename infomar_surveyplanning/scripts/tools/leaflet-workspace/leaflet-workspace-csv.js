function myUploadCSVCallback(m) {
	
        function readerLoad() {
            if (this.readyState !== 2 || this.error) {
                return;
            }
            else {
                worker.data(this.result, [this.result]);
            }
        }

        function handleZipFile(file) {
            var reader = new FileReader();
            reader.onload = readerLoad;
            reader.readAsArrayBuffer(file);
			}
		
		function readFile(file, callback){
			var reader = new FileReader();
			reader.onload = callback
			reader.readAsText(file);
}
        function handleFile(file) {
			 m.spin(true);
			if (file.name === "undefined"){
			$('#layerUploadDialogCSV').val('');
				m.spin(false);
			}else if (file.name.slice(-3) ==='csv'){
				 uploadCSV(file);
				 return false;
			}else{
			alert ('Please ensure the file is a .csv file');
			}
			
            var reader = new FileReader();
            reader.onload = function () {
                var ext;
                if (reader.readyState !== 2 || reader.error) {
                    return;
                }
                else {
                    ext = file.name.split('.');
                    ext = ext[ext.length - 1];
                    worker.json([reader.result, file.name.slice(0, (0 - (ext.length + 1)))], [reader.result]);
                }
            };
            reader.readAsArrayBuffer(file);
        }
		
//upload the csv file
function uploadCSV(file){
var csvMarker = new L.FeatureGroup();

        readFile(file, function(e) {
   			var csvString = e.target.result;
			var ptsGeoCSV = L.geoCsv (csvString, {
			onEachFeature:function(f,l) {
				var popup = f.properties.popup;
				
			var isOutsideMapBounds = function (e) {
				if (l._latlng === undefined)
					console.log('undefined');
					return false;
				return map.options.maxBounds &&
				!map.options.maxBounds.contains(l._latlng);
				};
				
				if (isOutsideMapBounds()){ 
						
					alert('One or all of these points fall outside of the map bounds. \n\nPlease check each line follows the format:\nLatitude, Longitude, Name.');		
					throw new Error('File format bad');
				}	else
				{
				Bathy.identify().at(l._latlng).run(function(error, results){
				depthPixelClick = results.pixel;
				var popupAnchor = [l._latlng.lat + .035, l._latlng.lng];
		
				if(depthPixelClick.properties.value == 'NoData'){ 
				l.bindPopup(popup + "<br>No Data for this location");
				} else
				{
				depthPixel = parseFloat(depthPixelClick.properties.value);        			
				l.bindPopup(popup + "<br>Depth/Elevation: " + depthPixel.toFixed(2) + 'm');
				}
				});
				}			
			  },
		  lineSeparator: '\r\n',
		  fieldSeparator: ',',
		  pointToLayer: function (feature, latlng) {
			return L.marker(latlng, {
			icon:L.icon({
			iconUrl: 'scripts/libs/leaflet-1.0.0-b1/images/redmymarker-icon.png',
			shadowUrl: 'scripts/libs/leaflet-1.0.0-b1/images/marker-shadow.png',
				iconSize: [25,41],
				iconAnchor: [12,41],
				shadowSize:   [41,41],
				shadowAnchor: [12,41]
				  })
				});
			  }
			});
			
			try{
			csvMarker.addLayer(ptsGeoCSV);	
			map.addLayer(csvMarker);
			map.fitBounds(csvMarker.getBounds(), {padding:[70, 70]});
			
			} catch (e){
				alert("Upload Failed: Ensure that the selected file has the required fields: Lat, Long, Name.");
				return false;
			}
			layersControl.addOverlay(ptsGeoCSV, file.name);
			$('#layerUploadDialogCSV').val('');
			});	
		 m.spin(false);
	}		
		
          //*****************************
        //        UI UPLOAD CODE 
        //*****************************

        function makeUploadForm() {
            var form = L.DomUtil.create('form', 'bgroup');
            form.id = "dropzoneCSV";
            return form;
        }

        function makeFileInput(form) {
		    var fileInput = L.DomUtil.create('input', '', form);
            fileInput.type = "file";
            fileInput.id = "layerUploadDialogCSV";
            fileInput.onchange = function () {

                var file = document.getElementById("layerUploadDialogCSV").files[0];

                handleFile(file);
            };

            //prevent map panning when opening file dialog
            L.DomEvent.on(fileInput, 'click', L.DomEvent.stopPropagation);

            return fileInput;	
        }


        function onAddUploadForm(map) {
            // create the control container with a particular class name

            var form = makeUploadForm(); //The form used for uploading
            var fileInput = makeFileInput(form); //The default open file dialog (hidden)

            //setWorkerEvents();

            //Create a styled file upload button, which executes the upload dialog
            //makeUploadButton(form, fileInput); 
			//makeUploadButton(fileInput); 
            //Set up the drag & drop area
            var dropbox = document.getElementById("map");
            dropbox.addEventListener("dragenter", dragenter, false);
            dropbox.addEventListener("dragover", dragover, false);
            dropbox.addEventListener("drop", drop, false);
            dropbox.addEventListener("dragleave", function () {
                m.scrollWheelZoom.enable();
            }, false);

            function dragenter(e) {
                e.stopPropagation();
                e.preventDefault();
                m.scrollWheelZoom.disable();
            }

            function dragover(e) {
                e.stopPropagation();
                e.preventDefault();
            }

            function drop(e) {
                e.stopPropagation();
                e.preventDefault();
                m.scrollWheelZoom.enable();
                var dt = e.dataTransfer;
                var files = dt.files;

                var i = 0;
                var len = files.length;
                if (!len) {
                    return
                }
                while (i < len) {
                    handleFile(files[i]);
                    i++;
                }
            }

            return form;
		}

					
        //Create Upload Buttons
        var NewButton = L.Control.extend({ 
             options: {
                 position: 'topleft'
             },
             onAdd: onAddUploadForm
         });

        // //Add them to the map
         m.addControl(new NewButton());
	}
	