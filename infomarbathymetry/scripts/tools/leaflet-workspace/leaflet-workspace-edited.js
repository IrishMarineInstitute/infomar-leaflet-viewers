function myUploadCallback(m) {
	
    //Set up 'options' for uploaded layers

    var options = {
        onEachFeature: function (feature, layer) {
            if (feature.properties) {
                layer.bindPopup(Object.keys(feature.properties).map(function (k) {
                    if (k === '__color__') {
                        return;
                    }
                    return k + ": " + feature.properties[k];
                }).join("<br />"), {
                    maxHeight: 200
                });
            }
        },
        style: function (feature) {
            return {
                opacity: 1,
                fillOpacity: 0.1,
                radius: 4,
                color: feature.properties.__color__
            }
        },
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
                opacity: 1,
                fillOpacity: 0.5,
                color: feature.properties.__color__
            });
        }
    };

    require(['catiline'], function (cw) {

        //Set up catiline worker & helper functions

        var worker = cw({
            init: function (scope) {
                importScripts('scripts/tools/leaflet-workspace/jam/require_edited.js');
                require.config({
                    baseUrl: this.base
                });
                require(['shp'], function (shp) {
                    scope.shp = shp;
                });
            },
            data: function (data, cb, scope) {
                this.shp(data).then(function (geoJson) {
                    if (Array.isArray(geoJson)) {
                        geoJson.forEach(function (geo) {
                            scope.json([geo, geo.fileName, true], true, scope);
                        });
                    } else {
                        scope.json([geoJson, geoJson.fileName, true], true, scope);
                    }
                }, function (e) {
                    console.log('leaflet-workspace error', e);
                    setTimeout(function () {
                        throw e;
                    });
                });
            },
            color: function (s) {
                //from http://stackoverflow.com/a/15710692
                //importScripts('resources/scripts/leaflet-workspace/js/colorbrewer.js');
                //return colorbrewer.Spectral[11][Math.abs(JSON.stringify(s).split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0)) % 11];
                return '#ff0000';
            },
            makeString: function (buffer) {
                var array = new Uint8Array(buffer);
                var len = array.length;
                var outString = "";
                var i = 0;

                while (i < len) {
                    outString += String.fromCharCode(array[i++]);
                }

                return outString;
            },
            json: function (data, cb, scope) {
                importScripts('scripts/tools/leaflet-workspace/js/topojson.v1.min.js');
                var name = data[1];

                //var json = data.length === 2 ? JSON.parse(scope.makeString(data[0])) : data[0];
                var json;
                if (data.length === 2) {
                    json = JSON.parse(scope.makeString(data[0]))
                }
                else {
                    json = data[0];
                }

                if (typeof json.type === "undefined") {
                    console.log("ERROR: JSON is not formatted correctly");
                    setTimeout(function () { throw new Error ("JSON is not formatted correctly") });
                }
                else {
                    if (json.type === 'Topology') {
                        var nom;
                        for (nom in json.objects) {
                            scope.layer(topojson.feature(json, json.objects[nom]), nom, scope);
                        }
                    }
                    else {
                        //json.type === 'FeatureCollection'
                        scope.layer(json, name, scope);
                    }
                }
            }, layer: function (json, name, scope) {

                json.features.forEach(function (feature) {
                    feature.properties.__color__ = scope.color(feature);
                });
                scope.fire('json', [json, name]);
            },
            base: cw.makeUrl('.')
        });



        //*****************************
        //        FILE HANDLING
        //*****************************

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
				m.spin(false);
			}else if (file.name.slice(-3) === 'zip') {
				//setWorkerEvents();
			    return handleZipFile(file);	
            }
			// else if (file.name.slice(-3) ==='csv'){
				// uploadCSV(file);
				// return false;
			// }
			
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
		
		
          //*****************************
        //        UI UPLOAD CODE 
        //*****************************

        function makeUploadForm() {
            var form = L.DomUtil.create('form', 'bgroup');
            form.id = "dropzone";
            return form;
        }

        function makeFileInput(form) {
		    var fileInput = L.DomUtil.create('input', '', form);
            fileInput.type = "file";
            fileInput.id = "layerUploadDialog";
            fileInput.onchange = function () {

                var file = document.getElementById("layerUploadDialog").files[0];

                handleFile(file);
            };

            //prevent map panning when opening file dialog
            L.DomEvent.on(fileInput, 'click', L.DomEvent.stopPropagation);

            return fileInput;	
        }

        function setWorkerEvents() {
            worker.on('json', function (e) {
                m.spin(false);
                
                var fileName = e[1];
                var jsonLayer = L.geoJson(e[0], options).addTo(m);

                var customLayer = { id: jsonLayer._leaflet_id, name: fileName, layer: jsonLayer };
                customLayer.visible = true;
			    layersControl.addOverlay(customLayer.layer, customLayer.name);
				map.fitBounds(customLayer.layer.getBounds(), {padding:[70, 70]});
				$('#layerUploadDialog').val('');
				});
			    worker.on('error', function (e) {
                m.spin(false);
                console.warn(e);
                alert("Upload Failed: Ensure that the selected file is GeoJSON, TopoJSON, or a Zipped Shapefile.");
				$('#layerUploadDialog').val('');
            });
			
	    }
        function onAddUploadForm(map) {
            // create the control container with a particular class name

            var form = makeUploadForm(); //The form used for uploading
            var fileInput = makeFileInput(form); //The default open file dialog (hidden)

            setWorkerEvents();

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
	});
	}