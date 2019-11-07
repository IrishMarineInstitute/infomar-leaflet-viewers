var map = L.map('map', {
	layersControl: true, 
    minZoom: 6,
	maxZoom: 16,
	scrollWheelZoom: 'center',
	maxBounds: [[40,-30],[65,30]]
	}).setView([53.5, -13],6);

    
var viewportWidth = $(window).width();
if (viewportWidth < 480){
			map.setView([53.5, -8.5],6);
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
var OrangeGreenBlue;

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
        "ZFactor": 5
    },
    "variableName": "DEM"
};

var serviceURL = '//maps.marine.ie/arcgis/rest/services/Infomar/All_Surveys_shft/ImageServer/'
	
var Bathy = L.esri.imageMapLayer({
	url: serviceURL,
	renderingRule: colourRendering,
//	zIndex: 5,
	opacity: 0.75,
	updateInterval: 500,
	updateWhenIdle: true,
	unloadInvisibleTiles: true
});

var BathyShaded = L.esri.imageMapLayer({
    url: serviceURL,
	renderingRule: renderingRule,
//    zIndex: 1,
	updateInterval: 500,
	updateWhenIdle: true,
	unloadInvisibleTiles: true
});

var baseMap = {
		"Oceans": base_EsriOceans,
		"Street Map": OpenStreetMap,
		"Imagery": base_EsriImagery,
};

var overlays = {
    "Bathymetry with Contours": bathy_Contours,
};

map.addLayer(base_EsriOceans);
map.addLayer(bathy_Contours);

var layersControl = new L.control.layers(baseMap, overlays);
map.addControl(layersControl);

var bathyControl = new L.Control.bathyControl();
map.addControl(bathyControl);

var srControl = new L.Control.srControl();
map.addControl(srControl);

var opacitySlider = new L.Control.opacitySlider();
map.addControl(opacitySlider);
opacitySlider.setOpacityLayer(Bathy);

L.controlCredits({
    image: "images/INFOMAR_logo_C.png",
    link: "javascript:void(0);",
    text: "<p style=\"margin-top:0px; margin-bottom:3px\">INFOMAR is a seabed mapping project run jointly by the<br/> Marine Institute and the Geological Survey of Ireland.</a><p style=\"margin-top:0px; margin-bottom:3px\">Water depths are reduced to Lowest Astronomical Tide (LAT).</p><p style=\"color:red; margin-top:0px\"><B> Map is NOT to be used for navigation.</B></p>",
    width: '75',
    height: '75'
}).addTo(map);

var LocateMeControlWatch = new L.Control.locateMeWatch();
map.addControl(LocateMeControlWatch);

var idDepthControl = new L.Control.idDepth();
map.addControl(idDepthControl);

var uploadFileControl = new L.Control.uploadFile();
map.addControl(uploadFileControl);

var printMapControl = new L.Control.printMap();
map.addControl(printMapControl);

  L.control.measure({
	primaryLengthUnit: 'meters', 
	secondaryLengthUnit: 'kilometers',
	primaryAreaUnit: 'sqmeters', 
	secondaryAreaUnit: 'sqkilometers' 
  }).addTo(map);

