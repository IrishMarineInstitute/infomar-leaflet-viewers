 var Admiralty_2704;
 var Pre2017_BathyGrids;
 var Admiralty_100k_75k_60k_50k_WM;
 var Admiralty_500k_200k_150k_WM;
 var Admiralty_37k_30k_25k_20k_WM;
 
function loginClick() {
var loginF = document.getElementById('loginForm'); 
var userNameInput = document.getElementById('usernameINFOMAR').value;
var passWordInput = document.getElementById('passwordINFOMAR').value;

 function serverAuth(callback){
  L.esri.post('//maps.marine.ie/arcgis/tokens/generateToken', {
	username: userNameInput,
    password: passWordInput,
    f: 'json',
    expiration: 86400,
	client: 'referer',
	referer: 'maps.marine.ie'
    }, callback);
 }

       serverAuth(function(error, response){
    Admiralty_500k_200k_150k_WM = L.esri.imageMapLayer({
    url: '//maps.marine.ie/arcgis/rest/services/AdmiraltyCharts/Admiralty_500k_200k_150k_WM/ImageServer',
	opacity: 0.75,
    token:  response.token,
	position: 'back',
	pane: 'AdmiraltyPane',
    }).addTo(map);

	        
    Admiralty_500k_200k_150k_WM.on('authenticationrequired', function (e) {
    serverAuth(function(error, response){
    e.authenticate(response.token);
    });
    });
   });
	
	serverAuth(function(error, response){
    Admiralty_100k_75k_60k_50k_WM = L.esri.imageMapLayer({
		url: '//maps.marine.ie/arcgis/rest/services/AdmiraltyCharts/Admiralty_100k_75k_60k_50k_WM/ImageServer',
		opacity: 0.75,
		token:  response.token,
		position: 'back',
		pane: 'AdmiraltyPane',
    });
	
    Admiralty_100k_75k_60k_50k_WM.on('authenticationrequired', function (e) {
		serverAuth(function(error, response){
		e.authenticate(response.token);
    });
    });
   });

   	serverAuth(function(error, response){
    Admiralty_37k_30k_25k_20k_WM = L.esri.imageMapLayer({
		url: '//maps.marine.ie/arcgis/rest/services/AdmiraltyCharts/Admiralty_37k_30k_25k_20k_WM/ImageServer',
		opacity: 0.75,
		token:  response.token,
		position: 'back',
		pane: 'AdmiraltyPane',
    });
	
    Admiralty_37k_30k_25k_20k_WM.on('authenticationrequired', function (e) {
		serverAuth(function(error, response){
		e.authenticate(response.token);
    });
    });
   });

   toggleLoginBtn();
var timeout = 5000;
var addlayers = setTimeout ("updateLayersControl()", timeout); 
loginForm.reset();


}




var updateLayersControl = function (){
//	all_srnw_contours.setZIndex(100);
//	coastal_srnw_contours.setZIndex(100);
	
	control.addOverlay( Admiralty_500k_200k_150k_WM, "Admiralty_500k_200k_150k", {groupName : "Admiralty Data"} );
	control.addOverlay( Admiralty_100k_75k_60k_50k_WM, "Admiralty_100k_75k_60k_50k", {groupName : "Admiralty Data"} );
	control.addOverlay( Admiralty_37k_30k_25k_20k_WM, "Admiralty_37k_30k_25k_20k_WM", {groupName : "Admiralty Data"} );
	 
}
var Discovery_ITM;

function loginOSIClick() {
/* var loginF = document.getElementById('loginOSIForm'); 
var userNameInput = document.getElementById('usernameOSI').value;
var passWordInput = document.getElementById('passwordOSI').value; */

console.log('test');

 function serverAuth(callback){
	 var user = 'marineWMS';
	 var pass = 'pKjw3.ze';
	 
  L.esri.post('//webservices.osi.ie/arcgis/tokens/generateToken', {
	username: user,
    password: pass,
    f: 'json',
    expiration: 86400,
	client: 'referer',
	referer: 'maps.marine.ie'
    }, callback);
 }

       serverAuth(function(error, response){
    Discovery_ITM = L.esri.dynamicMapLayer({
    url: '//webservices.osi.ie/WMS/services/WMS/MapGenie_Discovery_ITM/mapserver/WMSServer',
	opacity: 0.75,
    token:  response.token,
	position: 'back'
    }).addTo(map);

	        
    Discovery_ITM.on('authenticationrequired', function (e) {
    serverAuth(function(error, response){
    e.authenticate(response.token);
    });
    });
   });
}
 
	





