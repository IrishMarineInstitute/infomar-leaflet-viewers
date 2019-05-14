//Login Control
L.Control.loginCtrl = L.Control.extend({
	options: {
		position: 'topleft',
		popupOptions: { 
      className: 'leaflet-measure-resultpopup',
      autoPanPadding: [10, 10],
	  }
	},

onAdd: function (map) {
	var controlDiv = L.DomUtil.create('div', 'myloginButton leaflet-bar noPrint');
	controlDiv.id = 'secureLoginDivID';
	controlDiv.style.marginTop = '0px';
	controlDiv.cursor = 'pointer';	
	
		var controlUI = L.DomUtil.create('a', 'myloginButton myButton', controlDiv);
		controlUI.id = 'secureLoginUI';
        controlUI.href = '#';
	
	
		var secureLogin = L.DomUtil.create('div', 'leaflet-bar', controlDiv);
		secureLogin.id = 'loginFormDiv';
		secureLogin.style.padding = 'padding: 10px 10px 0px 5px;';		
		secureLogin.style.display = 'none';
		secureLogin.style.backgroundColor = 'white'; 
		
		
		secureLogin.innerHTML = "<div><form action=\"#\" id=\"loginForm\" autocomplete=\"off\"><div>Login to access restricted layers:</div><div class=\"loginDiv\"><label for=\"usernameINFOMAR\">Username <input style=\"width:50%; text-align:right; margin-left: 25px;\" id=\"usernameINFOMAR\" type=\"text\" value=\'\' name=\'usernameINFOMAR\'></label></div><div class=\"loginDiv\"><label for=\"passwordINFOMAR\">Password <input style=\"width:50%; text-align:right; margin-left: 30px;\" id=\"passwordINFOMAR\" type=\"password\" value=\'\' name=\"passwordINFOMAR\"></label></div><input type=\"button\" value=\"Open Admiralty Layers\" onclick=\"loginClick()\"><p>  </p></form></div>";
		
		//<button style=\"marginLeft: 20px;\" onclick=\"loginOSIClick()\">Open OSI Layers</button>
		
		L.DomEvent.disableClickPropagation(controlDiv);
		L.DomEvent.disableScrollPropagation(controlDiv);
	
	    var showForm = function (){
				controlUI.style.display = 'none';
				secureLogin.style.display = 'block';
		};
		var hideForm = function (){
			if ($("#usernameINFOMAR").is(":focus")){
				return;
			}else if($("#passwordINFOMAR").is(":focus")){
				return;
			}else{
			controlUI.style.display = 'block';
			secureLogin.style.display = 'none';
		}
		}
		L.DomEvent.addListener(controlDiv, 'mouseover', showForm);
		//L.DomEvent.addListener(controlDiv, 'mouseout', hideForm);
		L.DomEvent.addListener(map, 'click', hideForm);
					 
		return controlDiv;
}
});	

function toggleLoginBtn(){
$('#loginFormDiv').css('display','none');
$('#secureLoginUI').css('display','block');
}	