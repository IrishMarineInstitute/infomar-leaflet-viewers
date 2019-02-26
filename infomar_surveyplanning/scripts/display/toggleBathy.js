  $('#repeat1').on('click', function bathyClick(e){
	  map.removeLayer(Bathy);
	  shadedPrint();
  });
  $('#repeat0').on('click', function bathyunClick(e) {
	  map.addLayer(Bathy);
      bathyPrint();
	  });

  $('#repeat1_Shaded').on('click', function shadedreliefClick(e) {
	  map.removeLayer(BathyShaded);
 });

  $('#repeat0_Shaded').on('click',function shadedreliefunClick(e) {
	  map.addLayer(BathyShaded);
    });

var shadedPrint = function (){
	$('#printlegend').toggleClass('printlegendbathy printlegendother');
	$('#bathylegend').hide(); 
	$('#shadedlegend').show();  
}
var bathyPrint = function (){
	$('#printlegend').toggleClass('printlegendbathy printlegendother');
	 $('#bathylegend').show(); 	
	 $('#shadedlegend').hide();  
}

