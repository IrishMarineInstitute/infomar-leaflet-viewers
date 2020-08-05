var map = L.map('map', {
	layersControl: true, 
	minZoom: 4,
	maxZoom: 16,
	scrollWheelZoom: 'center',
	}).setView([51.5, -31],5);
map.attributionControl.addAttribution("&copy; <a href=https://www.infomar.ie>INFOMAR</a>, &copy; <a href=https://ec.europa.eu/info/departments/research-and-innovation_en>EC Research & Innovation</a>, &copy; <a href=https://www.dfo-mpo.gc.ca/index-eng.htm>Fisheries and Oceans Canada</a>,&copy; <a href=https://www.noaa.gov/>NOAA</a>, ");

var viewportWidth = $(window).width();
if (viewportWidth < 480){
			map.setView([52.7, -25.134],4);
	}

var outValues = [];
for (var i = 1; i < 101; i++) {
    outValues.push(
        i
    );
}

var inpRange = [];
var maxDepth = -5223;
var minDepth = 50;
var interval = (maxDepth - minDepth) / 100;

inpRange.push(
 Math.round((maxDepth + 0.000001) * 1000)/1000
  );
for (var i = 1; i < 100; i++) {
    inpRange.push(
         Math.round(((maxDepth - (interval * i)) + 0.000001) * 1000)/1000,Math.round(((maxDepth - (interval * i)) + 0.000001) * 1000)/1000
     );
}
inpRange.push(
 Math.round((minDepth + 0.000001) * 1000)/1000
);

var colourRendering = {
    "rasterFunction": "Colormap",
    "rasterFunctionArguments": {
        "Colormap": OrangeGreenBlue,
        "Raster": {
            "rasterFunction": "Remap",
            "rasterFunctionArguments": {
                "InputRanges": inpRange,
                "OutputValues": outValues,
                "Raster": "$$"
            },
           "outputPixelType": "U8"
        },
    },
    "outputPixelType": "U8"
};

var renderingRule = {
    "rasterFunction": "Hillshade",
    "rasterFunctionArguments": {
        "Azimuth": 315.0,
        "Altitude": 45.0,
        "ZFactor": 4
    },
    "variableName": "DEM"
};
var serviceURL = 'https://maps.marine.ie/arcgis/rest/services/Infomar/Atlantic_Bathy/ImageServer';
var InfomarserviceURL = 'https://maps.marine.ie/arcgis/rest/services/Infomar/All_Surveys_shft/ImageServer/';
//var serviceURL = 'http://miags03:6080/arcgis/rest/services/Infomar/All_BathySurveys/ImageServer/'

var Bathy = L.esri.imageMapLayer({
	url: serviceURL,
	renderingRule: colourRendering,
	zIndex: 5,
	opacity: 0.75,
	updateWhenIdle: true,
	unloadInvisibleTiles: true,
});

var BathyShaded = L.esri.imageMapLayer({
    url: serviceURL,
	renderingRule: renderingRule,
    zIndex: 1,
    updateInterval: 500,
	updateWhenIdle: true,
	unloadInvisibleTiles: true
});

var IBathyShaded = L.esri.imageMapLayer({
    url: InfomarserviceURL,
	renderingRule: renderingRule,
    zIndex: 1,
	updateInterval: 500,
	updateWhenIdle: true,
	unloadInvisibleTiles: true
});

var bathyTilesWContours = "//maps.marine.ie/atlanticdata/Tiles/{z}/{x}/{y}.png";

var bathyTilesWContour = L.tileLayer(bathyTilesWContours, {
            maxZoom: 14,
            minZoom: 2,
            opacity: 1,
           zIndex: 100,
        }).addTo(map);

function style50(feature) {
    return {
        weight: 2,
        opacity: 1,
        color: '#FF6600',
        dashArray: '3',
        fillOpacity: 0.05
    };
}

var overviews = {
	"Atlantic Bathymetry": bathyTilesWContour,
	"INFOMAR Bathymetry" : bathy_Contours,
    "INFOMAR Backscatter" : backscatter_int
};
var base_EsriOceans = L.tileLayer('//services.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}.png', {
        noWrap: true,
    }).addTo(map);

var OpenStreetMap = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '<a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});
var base_EsriImagery = L.tileLayer('//server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        noWrap: true,
});

var baseMap = {
    "Oceans": base_EsriOceans,
    "Imagery": base_EsriImagery,
	"Street Map": OpenStreetMap
};

L.control.layers(baseMap, overviews).addTo(map);

var bathyControl = new L.Control.bathyControl();
map.addControl(bathyControl);

var srControl = new L.Control.srControl();
map.addControl(srControl);

var opacitySlider = new L.Control.opacitySlider();
map.addControl(opacitySlider);
opacitySlider.setOpacityLayer(Bathy);

 L.controlCredits({
    link: "https://www.atlanticresource.org",
    text: "<img src = \"images/AORA_Credits.png\" /><p style=\"margin-top:0px; margin-bottom:0px\">Water depths are given at Lowest Astronomical Tide (LAT).</p><p style=\"color:red; margin-top:2px\"><B> Map is NOT to be used for navigation.</B></p>",
    width: '5',
    height: '110'
}).addTo(map); 

var LocateMeControlWatch = new L.Control.locateMeWatch();
map.addControl(LocateMeControlWatch);

var idDepthControl = new L.Control.idDepth();
map.addControl(idDepthControl);

var uploadCSVControl = new L.Control.uploadCSVfile();
map.addControl(uploadCSVControl);

/*
  L.control.measure({
	primaryLengthUnit: 'meters', 
	secondaryLengthUnit: 'kilometers',
	primaryAreaUnit: 'sqmeters', 
	secondaryAreaUnit: 'sqkilometers' 
  }).addTo(map);
*/


/*map.on('zoomend', function(){
      var x = map.getZoom();
      if (x>=13){
          	$("#repeat0_Shaded").click(); 
            $("#repeat0").click();	
      }
});*/

