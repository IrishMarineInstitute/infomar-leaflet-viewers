var base_EsriOceans = L.tileLayer('//services.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}.png', {
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

var bathy_Contours = L.tileLayer('https://maps.marine.ie/INFOMAR_Tiles/SR_Contours/{z}/{x}/{y}.png', {
            maxZoom: 13,
            minZoom: 6,
            opacity: 1,
            attribution: '<a href="http://www.infomar.ie">INFOMAR</a>'
        });

var backscatter_int = L.tileLayer('https://maps.marine.ie/INFOMAR_Tiles/backscatter/{z}/{x}/{y}.png', {
            maxZoom: 13,
            minZoom: 6,
            opacity: 1,
            attribution: '<a href="http://www.infomar.ie">INFOMAR</a>'
        });	
		
