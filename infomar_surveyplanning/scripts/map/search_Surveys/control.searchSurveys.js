if (typeof console == "undefined") {
	this.console = { log: function (msg) { /* do nothing since it would otherwise break IE */} };
}
	var irebounds = new L.LatLngBounds([[40,-30],[57,-4]]);
	var searchResult;
	
L.Control.searchSurveys = L.Control.extend({
	options: {
		collapsed: true,
		position: 'topleft',
		text: 'Search Survey Names',
		placeholder: '',
		bounds: irebounds, // L.LatLngBounds
		email: null, // String
		callback: function (results) {
			if (results.length == 0) {
				console.log("ERROR: didn't find a result");
				return;
			}
			var bbox = results[0].boundingbox,
				first = new L.LatLng(bbox[0], bbox[2]),
				second = new L.LatLng(bbox[1], bbox[3]),
				bounds = new L.LatLngBounds([first, second]);
			this._map.fitBounds(bounds);
		}
	},

	_callbackId: 0,

	initialize: function (options) {
		L.Util.setOptions(this, options);
	},

	onAdd: function (map) {
		this._map = map;

		var className = 'leaflet-control-SearchInfomar',
			container = this._container = L.DomUtil.create('div', className);

		L.DomEvent.disableClickPropagation(container);

		var form = this._form = L.DomUtil.create('form', className + '-form');

		var input = this._input = document.createElement('input');
		input.type = "text";
		input.placeholder = this.options.placeholder || '';
		input.id = "surveyInput";

		var submit = document.createElement('input');
		submit.type = "submit";
		submit.id = "surveySubmit";
		submit.value = this.options.text;
		
		var x = document.createElement("P");
		var listSurveyNames = document.createElement('button');
		listSurveyNames.type = "button";
		listSurveyNames.innerHTML = "Open List of Survey Names";
		listSurveyNames.className = "linkbtn";
		
		var clearbtn = document.createElement('clearbutton');
		clearbtn.type = "button";
		clearbtn.innerHTML = "Clear Map";
		clearbtn.className = "linkbtn";
		
		form.appendChild(input);
		form.appendChild(submit);
		x.appendChild(listSurveyNames); 
		x.appendChild(clearbtn);	
		form.appendChild(x);

		L.DomEvent.addListener(form, 'submit', this._geocode, this);
		L.DomEvent.addListener(listSurveyNames, 'click', this._showList, this);
		L.DomEvent.addListener(clearbtn, 'click', this._clearMap, this);
		L.DomEvent.disableClickPropagation(listSurveyNames);

		if ($('#surveyInput').is(":focus")){
			console.log('Nope');
		}else if (this.options.collapsed) {
			L.DomEvent.addListener(container, 'mouseover', this._expand, this);
			//L.DomEvent.addListener(container, 'mouseout', this._collapse, this);

			var link = this._layersLink = L.DomUtil.create('a', className + '-toggle', container);
			link.href = '#';
			link.title = 'Nominatim SearchInfomar';

			L.DomEvent.addListener(link, L.Browser.touch ? 'click' : 'focus', this._expand, this);
			
			this._map.on('movestart', this._collapse, this);
			this._map.on('click', this._collapse, this);
		} else {
			this._expand();
		}
	
		container.appendChild(form);

		return container;
	},

	/* helper functions for cordinate extraction */
	_createSearchResult : function(lat, lon) {
		//creates an position description similar to the result of a Nominatim search
		var diff = 0.005;
		var result = [];
		result[0] = {};
		result[0]["boundingbox"] = [parseFloat(lat)-diff,parseFloat(lat)+diff,parseFloat(lon)-diff,parseFloat(lon)+diff];
		result[0]["class"]="boundary";
		result[0]["display_name"]="Position: "+lat+" "+lon;
		result[0]["lat"] = lat;
		result[0]["lon"] = lon;
		return result;
	},
	_isLatLon : function (q) {
		//"lon lat" => xx.xxx x.xxxxx
		var re = /(-?\d+\.\d+)\s(-?\d+\.\d+)/;
		var m = re.exec(q);
		if (m != undefined) return m;

		//lat...xx.xxx...lon...x.xxxxx
		re = /lat\D*(-?\d+\.\d+)\D*lon\D*(-?\d+\.\d+)/;
		m = re.exec(q);
		//showRegExpResult(m);
		if (m != undefined) return m;
		else return null;
	},
	_isLatLon_decMin : function (q) {
		console.log("is LatLon?: "+q);
		//N 53° 13.785' E 010° 23.887'
		//re = /[NS]\s*(\d+)\D*(\d+\.\d+).?\s*[EW]\s*(\d+)\D*(\d+\.\d+)\D*/;
		re = /([ns])\s*(\d+)\D*(\d+\.\d+).?\s*([ew])\s*(\d+)\D*(\d+\.\d+)/i;
		m = re.exec(q.toLowerCase());
		//showRegExpResult(m);
		if ((m != undefined)) return m;
		else return null;
		// +- dec min +- dec min
	},
	
	_geocode : function (event) {
		L.DomEvent.preventDefault(event);
		var q = this._input.value;
			
		var find = L.esri.find({
			url: '//maps.marine.ie/arcgis/rest/services/Infomar/SurveyCoverage/MapServer/'
		});
		
		find.layers('0')
			.text(q)
			.fields('SURVEY');

		find.run(function(error, featureCollection, response) {
		
		if (response.results == 0){
				$('#surveysError').css('display' , 'block');
			}else{
				console.log('GNIS Name: ' + featureCollection.features[0].properties.SURVEY);
				
				var myStyle = {
					"color": "#000099",
					"weight": 5,
					"opacity": 0.65
					};
					
				searchResult = L.geoJSON(featureCollection.features[0].geometry, {
					style: myStyle
				}).addTo(map);
				
				searchResult.bindPopup(featureCollection.features[0].properties.SURVEY)
				.openPopup();
				
				var bounds = searchResult.getBounds();
				map.flyToBounds([bounds._northEast, bounds._southWest]);
			}
		});
	},

	_expand: function () {
		L.DomUtil.addClass(this._container, 'leaflet-control-SearchInfomar-expanded');
	},

	_collapse: function () {
		this._container.className = this._container.className.replace(' leaflet-control-SearchInfomar-expanded', '');
	},
	
	_showList: function (){
		getData()
		$('#surveysListDiv').css('display' , 'block');
	},
	_clearMap: function (){
		map.removeLayer(searchResult);
	}
		
});

function getData() {
	 
var query ="//maps.marine.ie/arcgis/rest/services/Infomar/SurveyCoverage/MapServer/0/query?where=YEAR%3E1990&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelContains&relationParam=&outFields=SURVEY%2CYEAR%2CPROJECT%2C+Nearest_co&returnGeometry=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=SURVEY&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&f=pjson";

		$.getJSON(query, function(data) {
				
			for (var i = 0; i < data.features.length; i++) {
				var survey = data.features[i].attributes.SURVEY;
				
				//$('#surveysList').append('<div style="padding:8px;">' + survey + ',\t ' +data.features[i].attributes.Nearest_Co +', \t '+ data.features[i].attributes.PROJECT + ', \t ' + data.features[i].attributes.YEAR +' \t<button onclick="showOnMap(\'' +survey +'\')">Show</button></div>');
				
				$('#surveysList').append('<button class=\"linkbtn\" style=\"padding-bottom: 8px;\" onclick="showOnMap(\'' +survey +'\')">' + survey + ',\t ' +data.features[i].attributes.Nearest_Co +', \t '+ data.features[i].attributes.PROJECT + ', \t ' + data.features[i].attributes.YEAR +'</button>');
								
				$('#surveysListDiv').append($('#surveysList'));
			}
			
		})
}	

var showOnMap = function(e){
	
	document.getElementById('surveyInput').value=e;
	surveySubmit.click();
	
	 $('#surveysListDiv').delay("slow").fadeOut();
	document.getElementById('surveyInput').value='';
}
























