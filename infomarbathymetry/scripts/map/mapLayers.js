var map = L.map('map', {
	layersControl: true, 
	minZoom: 6,
	maxZoom: 16,
	scrollWheelZoom: 'center',
	maxBounds: [[40,-30],[65,30]]
	}).setView([53.5, -13],6);
map.attributionControl.addAttribution("&copy; <a href=http://www.infomar.ie>INFOMAR</a>");

var viewportWidth = $(window).width();
if (viewportWidth < 480){
			map.setView([53.5, -8.5],6);
}

var OrangeGreenBlue = [
[100, 253, 107, 0],[99, 252, 111, 0],[98, 252, 115, 0],[97, 252, 120, 0],[96, 251, 124, 0],[95, 251, 129, 0],[94, 251, 133, 0],[93, 250, 137, 0],[92, 250, 142, 0],[91, 250, 146, 0],[90, 249, 151, 0],[89, 249, 155, 0],[88, 249, 159, 0],[87, 248, 164, 0],[86, 248, 168, 0],[85, 248, 173, 0],[84, 247, 177, 0],[83, 247, 181, 0],[82, 247, 186, 0],[81, 246, 190, 0],[80, 246, 195, 0],[79, 246, 199, 0],[78, 245, 203, 0],[77, 245, 208, 0],[76, 245, 212, 0],[75, 245, 217, 1],[74, 235, 218, 5],[73, 226, 219, 10],[72, 217, 220, 15],[71, 208, 221, 19],[70, 199, 222, 24],[69, 190, 223, 29],[68, 181, 224, 33],[67, 172, 225, 38],[66, 163, 226, 43],[65, 154, 227, 47],[64, 145, 228, 52],[63, 136, 229, 57],[62, 126, 231, 61],[61, 117, 232, 66],[60, 108, 233, 71],[59, 99, 234, 75],[58, 90, 235, 80],[57, 81, 236, 85],[56, 72, 237, 89],[55, 63, 238, 94],[54, 54, 239, 99],[53, 45, 240, 103],[52, 36, 241, 108],[51, 27, 242, 113],[50, 18, 244, 118],[49, 17, 234, 123],[48, 16, 224, 128],[47, 15, 214, 134],[46, 15, 204, 139],[45, 14, 195, 145],[44, 13, 185, 150],[43, 12, 175, 156],[42, 12, 165, 161],[41, 11, 156, 167],[40, 10, 146, 172],[39, 10, 136, 178],[38, 9, 126, 183],[37, 8, 117, 189],[36, 7, 107, 194],[35, 7, 97, 200],[34, 6, 87, 205],[33, 5, 78, 211],[32, 5, 68, 216],[31, 4, 58, 222],[30, 3, 48, 227],[29, 2, 39, 233],[28, 2, 29, 238],[27, 1, 19, 244],[26, 0, 9, 249],[25, 0, 0, 255],[24, 3, 0, 250],[23, 7, 1, 245],[22, 11, 2, 240],[21, 15, 3, 235],[20, 19, 4, 230],[19, 22, 5, 225],[18, 26, 5, 220],[17, 30, 6, 215],[16, 34, 7, 210],[15, 38, 8, 205],[14, 41, 9, 200],[13, 45, 10, 195],[12, 49, 11, 190],[11, 53, 11, 185],[10, 57, 12, 180],[9, 60, 13, 175],[8, 64, 14, 170],[7, 68, 15, 165],[6, 72, 16, 160],[5, 76, 16, 155],[4, 79, 17, 150],[3, 83, 18, 145],[2, 87, 19, 140],[1, 91, 20, 135],
];

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
        "ZFactor": 5 * (2)
    },
    "variableName": "DEM"
};


var serviceURL = '//maps.marine.ie/arcgis/rest/services/Infomar/All_Surveys_shft/ImageServer/'
	
var Bathy = L.esri.imageMapLayer({
	url: serviceURL,
	renderingRule: colourRendering,
	zIndex: 5,
	opacity: 0.75,
	updateInterval: 500,
	updateWhenIdle: true,
	unloadInvisibleTiles: true
}).addTo(map);

var BathyShaded = L.esri.imageMapLayer({
    url: serviceURL,
	renderingRule: renderingRule,
    zIndex: 1,
	updateInterval: 500,
	updateWhenIdle: true,
	unloadInvisibleTiles: true
}).addTo(map);


var base_EsriOceans = L.tileLayer('//services.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}.png', {
        noWrap: true,
		attribution: '<a href="//www.esri.com">ESRI</a>'
    }).addTo(map);
 
var base_EsriImagery = L.tileLayer('//server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        noWrap: true,
		attribution: '<a href="//www.esri.com">ESRI</a>'
});

var shadedrelief = L.tileLayer('//server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}', {
        noWrap: true,
		attribution: '<a href="//www.esri.com">ESRI</a>'
});

var topographic = L.tileLayer('//server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
        noWrap: true,
		attribution: '<a href="//www.esri.com">ESRI</a>'
});

var OpenStreetMap = L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     attribution: '<a href="//openstreetmap.org/copyright">OpenStreetMap contributors</a> ',
});

var baseMap = {
    "Oceans": base_EsriOceans,
	"Street Map": OpenStreetMap,
	"Shaded Relief": shadedrelief,
    "Imagery": base_EsriImagery,
	"Topographic": topographic,
};

var overlays = {};
var layersControl = new L.control.layers(baseMap, overlays);
map.addControl(layersControl);

var bathyControl = new L.Control.bathyControl();
map.addControl(bathyControl);

var srControl = new L.Control.srControl();
map.addControl(srControl);

var opacitySlider = new L.Control.opacitySlider();
map.addControl(opacitySlider);
opacitySlider.setOpacityLayer(Bathy);

BathyShaded.bringToBack();
  Bathy.on('load',function(e){
	  spinner.stop();
 });
   BathyShaded.on('load',function(e){
	  spinner.stop();
 });
 

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

	map.on('movestart', function(){
		spinner.spin();
		container.appendChild(spinner.el);
	});
