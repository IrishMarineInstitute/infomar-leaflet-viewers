var checkurl = false;
console.log(checkurl);

$(document).ready(function()
{
 $("#show_login").click(function(){
  showpopup();
 });
 $("#close_login").click(function(){
  hidepopup();
 });
 $("#dologin").click(function(){
	validate(); 
 });
});

function showpopup()
{
 $("#loginform").fadeIn();
 $("#loginform").css({"visibility":"visible","display":"block"});
}

function hidepopup()
{
 $("#loginform").fadeOut();
 $("#loginform").css({"visibility":"hidden","display":"none"});
}

function validate()
{
	if ($("#login")['0'].value == 'info@infomar.ie' && $("#password")['0'].value == 'iloverocks'){
		checkurl = true;
		window.open("https://maps.marine.ie/infomar_surveyplanning");
	}else{
		alert('Incorrect username or password, please try again.');
	}
		
}	