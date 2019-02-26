var map = L.map('map', {
    layersControl: true,
    scrollWheelZoom: 'center'
  }).setView([53.5, -13], 7);

var viewportWidth = $(window).width();
if (viewportWidth < 480) {
    map.setView([54.1, -10.3], 10);
}

L.latlngGraticule({
    showLabel: true,
    zoomInterval: [
        { start: 8, end: 10, interval: 0.5 },
        { start: 10, end: 12, interval: 0.25 },
        { start: 12, end: 16, interval: 0.125 },
        { start: 16, end: 20, interval: 0.0625 },
        { start: 20, end: 24, interval: 0.03125 }
    ]
}).addTo(map);

var basemapPane = map.createPane('basemapPane');
map.getPane('basemapPane').style.zIndex = 2;

var AdmiraltyPane = map.createPane('AdmiraltyPane');
map.getPane('AdmiraltyPane').style.zIndex = 10;

var OSIPane = map.createPane('OSIPane');
map.getPane('OSIPane').style.zIndex = 5;

var tilesPane = map.createPane('tilesPane');
map.getPane('tilesPane').style.zIndex = 4;

var bathyContoursPane = map.createPane('bathyContoursPane');
map.getPane('bathyContoursPane').style.zIndex = 7;

var srContoursPane = map.createPane('srContoursPane');
map.getPane('srContoursPane').style.zIndex = 6;

var OrangeGreenBlue = [
    [100, 253, 107, 0], [99, 252, 111, 0], [98, 252, 115, 0], [97, 252, 120, 0], [96, 251, 124, 0], [95, 251, 129, 0], [94, 251, 133, 0], [93, 250, 137, 0], [92, 250, 142, 0], [91, 250, 146, 0], [90, 249, 151, 0], [89, 249, 155, 0], [88, 249, 159, 0], [87, 248, 164, 0], [86, 248, 168, 0], [85, 248, 173, 0], [84, 247, 177, 0], [83, 247, 181, 0], [82, 247, 186, 0], [81, 246, 190, 0], [80, 246, 195, 0], [79, 246, 199, 0], [78, 245, 203, 0], [77, 245, 208, 0], [76, 245, 212, 0], [75, 245, 217, 1], [74, 235, 218, 5], [73, 226, 219, 10], [72, 217, 220, 15], [71, 208, 221, 19], [70, 199, 222, 24], [69, 190, 223, 29], [68, 181, 224, 33], [67, 172, 225, 38], [66, 163, 226, 43], [65, 154, 227, 47], [64, 145, 228, 52], [63, 136, 229, 57], [62, 126, 231, 61], [61, 117, 232, 66], [60, 108, 233, 71], [59, 99, 234, 75], [58, 90, 235, 80], [57, 81, 236, 85], [56, 72, 237, 89], [55, 63, 238, 94], [54, 54, 239, 99], [53, 45, 240, 103], [52, 36, 241, 108], [51, 27, 242, 113], [50, 18, 244, 118], [49, 17, 234, 123], [48, 16, 224, 128], [47, 15, 214, 134], [46, 15, 204, 139], [45, 14, 195, 145], [44, 13, 185, 150], [43, 12, 175, 156], [42, 12, 165, 161], [41, 11, 156, 167], [40, 10, 146, 172], [39, 10, 136, 178], [38, 9, 126, 183], [37, 8, 117, 189], [36, 7, 107, 194], [35, 7, 97, 200], [34, 6, 87, 205], [33, 5, 78, 211], [32, 5, 68, 216], [31, 4, 58, 222], [30, 3, 48, 227], [29, 2, 39, 233], [28, 2, 29, 238], [27, 1, 19, 244], [26, 0, 9, 249], [25, 0, 0, 255], [24, 3, 0, 250], [23, 7, 1, 245], [22, 11, 2, 240], [21, 15, 3, 235], [20, 19, 4, 230], [19, 22, 5, 225], [18, 26, 5, 220], [17, 30, 6, 215], [16, 34, 7, 210], [15, 38, 8, 205], [14, 41, 9, 200], [13, 45, 10, 195], [12, 49, 11, 190], [11, 53, 11, 185], [10, 57, 12, 180], [9, 60, 13, 175], [8, 64, 14, 170], [7, 68, 15, 165], [6, 72, 16, 160], [5, 76, 16, 155], [4, 79, 17, 150], [3, 83, 18, 145], [2, 87, 19, 140], [1, 91, 20, 135]
];

var outValues = [];
for (var i = 1; i < 101; i++) {
    outValues.push(
        i
    );
}

var inpRange = [];
var maxDepth = -5000;
var minDepth = 50;
var interval = (maxDepth - minDepth) / 100;

inpRange.push(
    Math.round((maxDepth + 0.000001) * 1000) / 1000
);
for (var i = 1; i < 100; i++) {
    inpRange.push(
        Math.round((maxDepth - (interval * i) + 0.000001) * 1000) / 1000, Math.round((maxDepth - (interval * i) + 0.000001) * 1000) / 1000
    );
}
inpRange.push(
    Math.round((minDepth + 0.000001) * 1000) / 1000
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
        }
    },
    "outputPixelType": "U8"
};

var renderingRule = {
    "rasterFunction": "Hillshade",
    "rasterFunctionArguments": {
        "Azimuth": 315.0,
        "Altitude": 45.0,
        "ZFactor": 5 * 2
    },
    "variableName": "DEM"
};

//ESRI Layers
var base_EsriOceans = L.tileLayer('//services.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}.png', {
    noWrap: true,
    pane: 'basemapPane',
    attribution: '<a href="//www.esri.com">ESRI</a>'
});

var base_EsriImagery = L.tileLayer('//server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    noWrap: true,
    pane: 'basemapPane',
    attribution: '<a href="//www.esri.com">ESRI</a>'
});

var OpenStreetMap = L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    pane: 'basemapPane',
    attribution: '<a href="//openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var openseamap = L.tileLayer('//tiles.openseamap.org/seamark/{z}/{x}/{y}.png', {
    attribution: '<a href="http://www.openseamap.org">OpenSeaMap</a>'
});

//OSI Data 
var OSI_Key = 'P10D7U-aQxRPM2L55sIKL9IlMPtmbd9deXd7lALPU0pmFBRskal3kWlOXtjUEuJwjlaB1bE4hFRLljWpJdCC64Ku_5JAPIC3LLnzeJeB_rk.';
var OSI_URL = 'https://mapgenie.osi.ie/arcgis/rest/services/WM/';

var OSI_Discovery = L.esri.dynamicMapLayer({
    url: OSI_URL + 'discovery/MapServer',
    token: OSI_Key,
    f: 'json',
    client: 'referer',
    referer: 'https://maps.marine.ie/infomar_surveyplanning',
    pane: 'OSIPane',
    opacity: 0.75,
    attribution: '<a href="//www.osi.ie">Ordinance Survey Ireland</a>'
}).addTo(map);

var OSI_DigitalGlobe = L.esri.dynamicMapLayer({
    url: OSI_URL + 'digitalglobe/MapServer',
    token: OSI_Key,
    f: 'json',
    client: 'referer',
    pane: 'OSIPane',
    opacity: 0.75,
    referer: 'https://maps.marine.ie/infomar_surveyplanning',
    attribution: '<a href="//www.osi.ie">Ordinance Survey Ireland</a>'
});

//Admiralty Data
var Admiralty_S57_300k = L.tileLayer('//maps.marine.ie/INFOMAR_Tiles/UKHO/{z}/{x}/{y}.png', {
    maxZoom: 15,
    minZoom: 11,
    opacity: 0.75,
    pane: 'AdmiraltyPane',
    attribution: '<a href="http://www.infomar.ie">INFOMAR</a>'
}).addTo(map);

var serviceURL = '//maps.marine.ie/arcgis/rest/services/Infomar/All_Surveys_shft/ImageServer/';

//infomar data
var surveys = L.esri.featureLayer({
    url: '//maps.marine.ie/arcgis/rest/services/Infomar/SurveyCoverage/MapServer/0',
    name: 'INFOMAR/INSS Surveyed Areas',
    transparent: true,
	simplifyFactor: 0.1,
	precision: 3, 
	//where: "Lidar = 0",
    style: { color: 'green', weight: 2 },
    attribution: '<a href="//infomar.ie">INFOMAR/INSS</a>'
});

surveys.bindPopup(function (layer) {
    return L.Util.template('<p><h4>{SURVEY} </h4>{Nearest_Co}<br>{VESSEL_NAM}, {YEAR}<br>{PROJECT}</p>', layer.feature.properties);
});

/* var surveys2017 = L.esri.featureLayer({
    url: '//dmagsdev02:6080/arcgis/rest/services/Infomar/SurveyPlanning_InfomarVector/MapServer/1',
    name: 'Proposed INFOMAR Survey Areas',
    transparent: true,
    simplifyFactor: 0.1,
    precision: 3,
    style: { color: 'red', weight: 2 },
    attribution: '<a href="//infomar.ie">INFOMAR/INSS</a>'
});

surveys2017.bindPopup(function (layer) {
    return L.Util.template('<p><h4>{LOCATION} </h4>{VESSEL}', layer.feature.properties);
}); */

var PlannedSurveys = L.geoJSON(PlannedSurveys, {
	style: {color: "#2576e8"},
	onEachFeature: function (feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.LOCATION) {
        layer.bindPopup("Location: " + feature.properties.LOCATION + '<br>' + "Vessel: " + feature.properties.VESSEL);
    }
}
});

var All50k_BayAreas = L.geoJSON(All50k_BayAreas, {
	style: function(feature){
		switch (feature.properties.Status){
			case 'Final Online': return {color: "#1ba80f"};
			case 'Incomplete' : return {color:"#dd0000"};
			case 'Complete NOT Online' : return {color: "#ef7809"};
			//case '150' : return {color:"#3f9d7b"};
		}
	},
	onEachFeature: function (feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.Status) {
        layer.bindPopup(feature.properties.Name + '<br>' + "Status:" + feature.properties.Status);
    }
}
});
var All100k_BayAreas = L.geoJSON(All100k_BayAreas, {
	style: function(feature){
		switch (feature.properties.Status){
			case 'Final online': return {color: "#1ba80f"};
			case 'Will be updated 2016\/2017' : return {color:"#dd0000"};
			case 'Final NOT online' : return {color: "#ef7809"};
			//case '150' : return {color:"#3f9d7b"};
		}
	},
	onEachFeature: function (feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.Status) {
        layer.bindPopup(feature.properties.Name + '<br>' + "Status:" + feature.properties.Status);
    }
}
});

var a100k_ChartSeries = L.geoJSON(a100k_ChartSeries, {
	style: {color: "#2576e8"},
	onEachFeature: function (feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.Name) {
        layer.bindPopup(feature.properties.Chart_Ref +" " + feature.properties.Name);
    }
}
});

//Bathymetry & Contour Tiles
var OSM_Overall_bounds = [[46.5, -26], [58.814, -5.2]];

var Overall_Bathy_Contours = L.tileLayer('//maps.marine.ie/INFOMAR_Tiles/SR_Contours/{z}/{x}/{y}.png', {
    maxZoom: 14,
    minZoom: 6,
    bounds: OSM_Overall_bounds,
    opacity: 1,
    pane: 'bathyContoursPane',
    attribution: '<a href="http://www.infomar.ie">INFOMAR</a>'
}).addTo(map);


var Bathy = L.esri.imageMapLayer({
    url: serviceURL,
    renderingRule: colourRendering,
    zIndex: 5,
    opacity: 0.75,
    updateInterval: 500,
    updateWhenIdle: true,
    unloadInvisibleTiles: true,
    pane: 'tilesPane',
    attribution: '<a href="//infomar.ie">INFOMAR/INSS</a>'
});

var BathyShaded = L.esri.imageMapLayer({
    url: serviceURL,
    renderingRule: renderingRule,
    zIndex: 1,
    updateInterval: 500,
    updateWhenIdle: true,
    unloadInvisibleTiles: true,
    pane: 'tilesPane',
    attribution: '<a href="//infomar.ie">INFOMAR/INSS</a>'
});

// map.removeLayer(BathyShaded);

//NPWS layers	
var npwsSAC = L.esri.featureLayer({
    url: '//webservices.npws.ie/arcgis/rest/services/NPWS/NPWSDesignatedAreas/MapServer/3',
    name: 'Special Areas of Conservation',
    simplifyFactor: 0.5,
    precision: 5,
    opacity: 0.7,
    style: { color: 'red', weight: 2 },
    dashArray: "5, 5",
    attribution: '<a href="https://www.npws.ie/">NPWS</a>'
});
npwsSAC.bringToBack();

npwsSAC.bindPopup(function (layer) {
    return L.Util.template('<h4>{SITE_NAME} </h4><a href={URL} target=\'blank\'>Site Details</a>', layer.feature.properties);
});

var npwsSPA = L.esri.featureLayer({
    url: '//webservices.npws.ie/arcgis/rest/services/NPWS/NPWSDesignatedAreas/MapServer/0',
    name: 'Special Protection Areas',
    simplifyFactor: 0.5,
    precision: 5,
    opacity: 0.7,
    style: { color: 'green', weight: 2 },
    dashArray: "5, 5",
    attribution: '<a href="https://www.npws.ie/">NPWS</a>'
});
npwsSPA.bringToBack();

npwsSPA.bindPopup(function (layer) {
    return L.Util.template('<h4>{SITE_NAME} </h4><a href={URL} target=\'blank\'>Site Details</a>', layer.feature.properties);
});

var npwsNHA = L.esri.featureLayer({
    url: '//webservices.npws.ie/arcgis/rest/services/NPWS/NPWSDesignatedAreas/MapServer/2',
    name: 'Natural Heritage Area',
    simplifyFactor: 0.5,
    precision: 5,
    opacity: 0.7,
    style: { color: 'orange', weight: 2 },
    dashArray: "5, 5",
    attribution: '<a href="https://www.npws.ie/">NPWS</a>'
});
npwsNHA.bringToBack();

npwsNHA.bindPopup(function (layer) {
    return L.Util.template('<h4>{SITE_NAME} </h4><a href={URL} target=\'blank\'>Site Details</a>', layer.feature.properties);
});

var npwsPNHA = L.esri.featureLayer({
    url: '//webservices.npws.ie/arcgis/rest/services/NPWS/NPWSDesignatedAreas/MapServer/1',
    name: 'Proposed Natural Heritage Area',
    simplifyFactor: 0.5,
    precision: 5,
    opacity: 0.7,
    style: { color: 'yellow', weight: 2 },
    dashArray: "5, 5",
    attribution: '<a href="https://www.npws.ie/">NPWS</a>'
});

npwsPNHA.bindPopup(function (layer) {
    return L.Util.template('<h4>{SITE_NAME} </h4><a href={URL} target=\'blank\'>Site Details</a>', layer.feature.properties);
});
npwsPNHA.bringToBack();

var polygonLgd = new L.layerGroup([npwsNHA, npwsPNHA, npwsSPA, npwsSAC, surveys, PlannedSurveys]);

//Coastal Infrastructure
var iconlighthouse = L.icon({
    iconUrl: 'scripts/libs/leaflet-1.0.3/images/marker-icon-yellow.png',
    iconSize: [17, 31], // size of the icon
    //shadowSize:   [20, 25], // size of the shadow
    iconAnchor: [2, 30], // point of the icon which will correspond to marker's location
    //shadowAnchor: [8, 34],  // the same for the shadow
    popupAnchor: [0, -31] // point from which the popup should open relative to the iconAnchor
});


var cilLighthouse = L.esri.featureLayer({
    url: '//atlas.marine.ie/arcgis/rest/services/CIL/MapServer/5',
    name: 'Lighthouse',
    img: 'scripts/libs/leaflet-1.0.3/images/marker-icon-yellow.png',
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: iconlighthouse });
    },
    attribution: '<a href="//www.irishlights.ie">CIL</a>'
});

cilLighthouse.bindPopup(function (layer) {
    return L.Util.template('<h4>{geographicalName} </h4>Lighthouse<br>{geographicalNameSourceOfName}<br><a href={dataSourceURL} target=\'blank\'>Site Details</a>', layer.feature.properties);
});

var iconBouy = L.icon({
    iconUrl: 'scripts/libs/leaflet-1.0.3/images/marker-icon-orange.png',
    iconSize: [17, 31], // size of the icon
    //shadowSize:   [20, 25], // size of the shadow
    iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
    //shadowAnchor: [8, 34],  // the same for the shadow
    popupAnchor: [0, -31] // point from which the popup should open relative to the iconAnchor
});

var navBouys = L.esri.featureLayer({
    url: '//atlas.marine.ie/arcgis/rest/services/TransportNetworks/MapServer/2',
    name: 'CIL Navigational Bouys',
    img: 'scripts/libs/leaflet-1.0.3/images/marker-icon-orange.png',
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: iconBouy });
    },
    attribution: '<a href="//www.irishlights.ie">CIL</a>'
});

navBouys.bindPopup(function (layer) {
    return L.Util.template('<h4>{geographicalName_1} </h4>Navigational Bouy <br>Class: {buoyClass_1}<br>{geographicalNameSourceOfName_1}<br><a href={dataSourceURL_1} target=\'blank\'>Site Details</a>', layer.feature.properties);
});

var weatherBouyIcon = L.icon({
    iconUrl: 'scripts/libs/leaflet-1.0.3/images/marker-icon-indigo.png',
    iconSize: [17, 31], // size of the icon
    //shadowSize:   [20, 25], // size of the shadow
    iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
    //shadowAnchor: [8, 34],  // the same for the shadow
    popupAnchor: [0, -31] // point from which the popup should open relative to the iconAnchor
});

var weatherBouys = L.esri.featureLayer({
    url: '//atlas.marine.ie/arcgis/rest/services/TransportNetworks/MapServer/3',
    name: 'Weather Bouys',
    img: 'scripts/libs/leaflet-1.0.3/images/marker-icon-indigo.png',
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: weatherBouyIcon });
    },
    attribution: '<a href="//www.marine.ie">Marine Institute</a>'
});

weatherBouys.bindPopup(function (layer) {
    return L.Util.template('<h4>{geographicalName}</h4>{geographicalNameSourceOfName} <br><a href={dataSourceURL} target=\'blank\'>Site Details</a>', layer.feature.properties);
});

var pierIcon = L.icon({
    iconUrl: 'scripts/libs/leaflet-1.0.3/images/marker-icon-green.png',
    // iconSize: [14, 20],
    //iconAnchor: [0, 0]

    iconSize: [17, 31], // size of the icon
    //shadowSize:   [20, 25], // size of the shadow
    iconAnchor: [2, 30], // point of the icon which will correspond to marker's location
    //shadowAnchor: [8, 34],  // the same for the shadow
    popupAnchor: [0, -31] // point from which the popup should open relative to the iconAnchor
});

var pierQuaySlip = L.esri.featureLayer({
    url: '//atlas.marine.ie/arcgis/rest/services/TransportNetworks/MapServer/5',
    name: 'MIDA Piers Slipways, Quays',
    img: 'scripts/libs/leaflet-1.0.3/images/marker-icon-green.png',
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: pierIcon });
    },
    attribution: '<a href="//www.osi.ie">OSI</a>'
});


pierQuaySlip.bindPopup(function (layer) {
    return L.Util.template('<h4>{geographicalName}</h4>{localId}<br>{county}<br>{latitude}, {longitude}<br>{dataProvenance}', layer.feature.properties);
});

marinaIcon = L.icon({
    iconUrl: 'scripts/libs/leaflet-1.0.3/images/marker-icon-pink.png',
    // iconSize: [14, 20],
    //iconAnchor: [0, 0]

    iconSize: [17, 31], // size of the icon
    //shadowSize:   [20, 25], // size of the shadow
    iconAnchor: [2, 30], // point of the icon which will correspond to marker's location
    //shadowAnchor: [8, 34],  // the same for the shadow
    popupAnchor: [0, -31] // point from which the popup should open relative to the iconAnchor
});
var marina = L.esri.featureLayer({
    url: '//atlas.marine.ie/arcgis/rest/services/TransportNetworks/MapServer/11',
    name: 'Marina',
    img: 'scripts/libs/leaflet-1.0.3/images/marker-icon-pink.png',
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: marinaIcon });
    },
    attribution: '<a href="//www.mida.ucc.ie">MIDA</a>'
});


marina.bindPopup(function (layer) {
    console.log(layer.feature.properties);
    return L.Util.template('<h4>{marinaName}</h4>{geographicalName}<br> Road Access:{roadAccess}<br>Comments:{comments}<br>No. Berths:{berthFacility}<br>Berth Type:{berthDetail}<br>Marine Type:{marinaType}<br><a href={dataAccessURL} target=\'blank\'>Site Details</a>', layer.feature.properties);
});

var epaBathingWaters = L.esri.featureLayer({
    url: '//gis.epa.ie/arcgis/rest/services/EPAMapServices/BathingWater/MapServer/0',
    transparent: true,
    zIndex: 500
});

epaBathingWaters.bindPopup(function (layer) {
    return L.Util.template('<p><h4>{Label}</h4>{LOCATION} {LatestYear} : {LatestCompliance}</p>', layer.feature.properties);
});

var mainHarbours = L.esri.featureLayer({
    url: '//services6.arcgis.com/uWTLlTypaM5QTKd2/ArcGIS/rest/services/Regional/FeatureServer/4',
    transparent: true,
    zIndex: 500,
    style: { weight: 6 },
    attribution: '<a href="//www.osi.ie">OSI</a>'
});

mainHarbours.bindPopup(function (layer) {
    return L.Util.template('<p>{NAMN1}</p>', layer.feature.properties);
});

var otherHarbours = L.esri.featureLayer({
    url: '//services6.arcgis.com/uWTLlTypaM5QTKd2/ArcGIS/rest/services/Regional/FeatureServer/5',
    transparent: true,
    zIndex: 500,
    style: { weight: 6 },
    attribution: '<a href="//www.osi.ie">OSI</a>'
});

otherHarbours.bindPopup(function (layer) {
    return L.Util.template('<p>{NAMN1}</p>', layer.feature.properties);
});

var pointsLgd = new L.layerGroup([otherHarbours, mainHarbours, epaBathingWaters, marina, pierQuaySlip, weatherBouys, cilLighthouse]);


var osiCoast250k = L.esri.featureLayer({
    url: '//services6.arcgis.com/uWTLlTypaM5QTKd2/ArcGIS/rest/services/Regional/FeatureServer/6',
    transparent: true,
    zIndex: 500,
    style: { color: 'red', weight: 2 },
    attribution: '<a href="//www.osi.ie">OSI</a>'
});

var National_1m = L.esri.featureLayer({
    url: '//services6.arcgis.com/uWTLlTypaM5QTKd2/ArcGIS/rest/services/OSi_National_1m_Map_Of_Ireland/FeatureServer',
    transparent: true,
    zIndex: 500,
    style: { color: 'red', weight: 2 },
    attribution: '<a href="//www.osi.ie">OSI</a>'
});

//Marine Boundaries
var distanceCoast = L.geoJSON(distanceCoastPolys, {
	style: function(feature){
		switch (feature.properties.Distance){
			case '20': return {color: "#31698A"};
			case '30' : return {color:"#04cba9"};
			case '100' : return {color: "#ff4444"};
			case '150' : return {color:"#3f9d7b"};
		}
	},
	onEachFeature: function (feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.Distance) {
        layer.bindPopup(feature.properties.Distance + " nautical miles from Coast");
    }
}
});

var irishterritorialSea = L.esri.featureLayer({
    url: '//atlas.marine.ie/arcgis/rest/services/ReportingUnits/MapServer/13',
    transparent: true,
    zIndex: 500,
    attribution: '<a href="//www.dccae.gov.ie/en-ie/natural-resources/topics/Oil-Gas-Exploration-Production/Pages/home.aspx">PAD</a>'
});

var irishEEZ = L.esri.featureLayer({
    //url: 'http://atlas.marine.ie/arcgis/rest/services/ReportingUnits/MapServer/9',
	url: '//atlas.marine.ie/arcgis/rest/services/AdministrativeUnits/MapServer/8',
    transparent: true,
    zIndex: 500,
    attribution: '<a href="//www.dccae.gov.ie/en-ie/natural-resources/topics/Oil-Gas-Exploration-Production/Pages/home.aspx">PAD</a>'
});

var irishDesignatedArea = L.esri.featureLayer({
    url: '//atlas.marine.ie/arcgis/rest/services/AdministrativeUnits/MapServer/10',
    transparent: true,
    zIndex: 500,
    attribution: '<a href="//www.dccae.gov.ie/en-ie/natural-resources/topics/Oil-Gas-Exploration-Production/Pages/home.aspx">PAD</a>'
});

var irishMSFD = L.esri.featureLayer({
    url: '//atlas.marine.ie/arcgis/rest/services/ReportingUnits/MapServer/4',
    transparent: true,
    zIndex: 500,
    attribution: '<a href="//www.marine.ie">Marine Institute</a>'
});

var baseMaps = [
    {
        groupName: "Base Maps",
        expanded: false,
        layers: {
            "Open Street Maps": OpenStreetMap,
            "ESRI Oceans": base_EsriOceans,
            "ESRI Imagery": base_EsriImagery
        }
    }
];

var overlays = [
    {
        groupName: "OSI Maps",
        expanded: true,
        layers: {
            "OSI Discovery": OSI_Discovery,
            "OSI Digital Globe": OSI_DigitalGlobe
        }
    },
	   {
        groupName: "Admiralty Data",
        expanded: true,
        layers: {
			"Vector S57 300k/100k/50k" : Admiralty_S57_300k, 
         }
    },{
        groupName: "Coastal Infrastructure",
        expanded: false,
        layers: {
            "Open Sea Map": openseamap,
            "Navigation Bouys": navBouys,
            "Weather Bouys": weatherBouys,
            "Lighthouse": cilLighthouse,
            "Piers, Slips Quays": pierQuaySlip,
            "Marina": marina
        }
    }, {
        groupName: "Marine Boundaries",
        expanded: false,
        layers: {
            "Irish Territorial Sea": irishterritorialSea,
            "Irish Exclusive Economic Zone": irishEEZ,
            "Irish Designated Continental Shelf": irishDesignatedArea,
            "Irish MSFD Waters": irishMSFD,
			"Distance from Coastline" : distanceCoast
       }
    }, {
        groupName: "INFOMAR",
        expanded: true,
        layers: {
            "Shaded Bathymetry & Contours": Overall_Bathy_Contours,
            "Bathymetry Gridded Data": Bathy,
            "Shaded Relief Gridded Data": BathyShaded,
            "INFOMAR/INSS Surveys": surveys,
            "Planned 2017 Surveys": PlannedSurveys,
			"50K Charts Priority Bays" : All50k_BayAreas,
			"100K Charts Priority Bays" : All100k_BayAreas,
			"100K Chart Series" : a100k_ChartSeries
        }
    }, {
        groupName: "Environmental",
        expanded: false,
        layers: {
            "Special Areas of Conservation": npwsSAC,
            "Special Protection Areas": npwsSPA,
            "Natural Heritage Areas": npwsNHA,
            "Proposed Natural Heritage Areas": npwsPNHA,
            "EPA Bathing Waters": epaBathingWaters
        }
    }
];

var options = {
    container_width: "250px",
    group_maxHeight: "120px",
    exclusive: false,
    collapsed: true,
    position: 'topright'
};

var control = L.Control.styledLayerControl(baseMaps, overlays, options);
map.addControl(control);

var bathyControl;
var srControl;

Bathy.on('add', function () {
    bathyControl = new L.Control.bathyControl();
    map.addControl(bathyControl);
});

BathyShaded.on('add', function () {
    srControl = new L.Control.srControl();
    map.addControl(srControl);
});

Bathy.on('remove', function () {
    map.removeControl(bathyControl);
});

BathyShaded.on('remove', function () {
    map.removeControl(srControl);
});

var opacitySlider = new L.Control.opacitySlider();
map.addControl(opacitySlider);
var opacityLayer = Overall_Bathy_Contours;
opacitySlider.setOpacityLayer(opacityLayer);

map.on('moveend', function () {
	 if (map.hasLayer(Admiralty_S57_300k) && map.getZoom()>10) {
        opacityLayer = Admiralty_S57_300k;
        opacitySlider.setOpacityLayer(opacityLayer);
    }else if (map.hasLayer(Admiralty_500k_200k_150k_WM)) {
        opacityLayer = Admiralty_500k_200k_150k_WM;
        opacitySlider.setOpacityLayer(opacityLayer);
    } else if (map.hasLayer(Admiralty_100k_75k_60k_50k_WM)) {
        opacityLayer = Admiralty_100k_75k_60k_50k_WM;
        opacitySlider.setOpacityLayer(opacityLayer);
    } else if (map.hasLayer(Admiralty_37k_30k_25k_20k_WM)) {
        opacityLayer = Admiralty_37k_30k_25k_20k_WM;
        opacitySlider.setOpacityLayer(opacityLayer);
    }else if (map.hasLayer(Overall_Bathy_Contours)){
        opacityLayer = Overall_Bathy_Contours;
        opacitySlider.setOpacityLayer(opacityLayer);
    } 
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

/* var uploadFileControl = new L.Control.uploadFile();
map.addControl(uploadFileControl);
 */

var trackCtrl = new L.Control.trackCtrl();
map.addControl(trackCtrl);

var liveupdate = new L.control.liveupdate({
    update_map: function () {
        refreshTrack();
    },
    position: 'topleft'
})
    .addTo(map)
    .stopUpdating();

var secureLoginControl = new L.Control.loginCtrl();
map.addControl(secureLoginControl);

var measureControl = new L.Control.Measure({
    primaryLengthUnit: 'meters',
    secondaryLengthUnit: 'kilometers',
    primaryAreaUnit: 'sqmeters',
    secondaryAreaUnit: 'sqkilometers'
});
map.addControl(measureControl);

//var printMapControl = new L.Control.printMap();
//map.addControl(printMapControl);

/* 
    map.on('movestart', function(){
       spinner.spin();
       container.appendChild(spinner.el);
   }); */

var searchSurveys = new L.Control.searchSurveys();
map.addControl(searchSurveys);

var osmGeocoder = new L.Control.OSMGeocoder();
map.addControl(osmGeocoder);

/* map.on('overlayadd', function () {
    checkMap(polygonLgd);
    checkMapPts(pointsLgd);
});

map.on('overlayremove', function () {
    removeLayers(polygonLgd);
    removeLayers(pointsLgd);
}); */


