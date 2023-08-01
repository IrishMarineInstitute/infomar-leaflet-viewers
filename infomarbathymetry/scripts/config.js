var base_EsriOceans = L.tileLayer('//services.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}.png', {
        noWrap: true,
		attribution: '<a href="//www.esri.com">ESRI</a>'
		});

 
var base_EsriImagery = L.tileLayer('//server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        noWrap: true,
		attribution: '<a href="//www.esri.com">ESRI</a>'
		});


var OpenStreetMap = L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '<a href="//openstreetmap.org/copyright">OpenStreetMap contributors</a> ',
		});

var INFOMAR_Basemap = L.tileLayer('//maps.marine.ie/INFOMAR_Tiles/basemap/{z}/{x}/{y}.png', {
       		 maxZoom: 10,
       		 minZoom: 0,
       		 opacity: 1,   
			 attribution: '<a href="//www.infomar.ie">INFOMAR</a>'
});


var bathy_Contours = L.tileLayer('https://maps.marine.ie/INFOMAR_Tiles/SR_Contours/{z}/{x}/{y}.png', {
            maxZoom: 14,
            minZoom: 5,
            opacity: 1,
			attribution: '<a href="//www.infomar.ie">INFOMAR</a>'
        });

var backscatter_int = L.tileLayer('https://maps.marine.ie/INFOMAR_Tiles/backscatter/{z}/{x}/{y}.png', {
            maxZoom: 14,
            minZoom: 5,
            opacity: 1,
			attribution: '<a href="//www.infomar.ie">INFOMAR</a>'
        });	
	
var seabedClass = L.esri.dynamicMapLayer({
	url: 'https://maps.marine.ie/arcgis/rest/services/Infomar/INFOMAR_Seabed_Substrate/MapServer',
	opacity: 0.7,
	zIndex: 1000,
	id: 'seabedClassID'
}); 

var IWDDSLink = 'https://secure.dccae.gov.ie/GSI/INFOMAR_VIEWER/';		
var stdChartsURL = "https://secure.dccae.gov.ie/GSI_DOWNLOAD/Marine/Data/INFOMAR_Charts/";
var kmzURL = "https://secure.dccae.gov.ie/GSI_DOWNLOAD/Marine/Data/INFOMAR_Google/";

var seabedChartsURL = "https://maps.marine.ie/infomarData/chartsmap/pdfs/";
var varChartsURL = 'https://maps.marine.ie/infomarData/variousmaps/PDFs/';
var previewImg = 'https://maps.marine.ie/infomarData/chartsmap/pngs/';
var kmzPrevImage = 'https://maps.marine.ie/infomarData/variousmaps/kmz_pngs/';

function googleAnalyticsDownload(type, pdf){
		console.log(type, pdf);
		gtag('event','Download', {
			'event_category': type,
			'event_label': pdf
		});
}
