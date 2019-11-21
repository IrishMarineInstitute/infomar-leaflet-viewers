$('#repeat1').on('click', function bathyClick(e){
    map.removeLayer(Bathy);
});
$('#repeat0').on('click', function bathyunClick(e) {
    map.addLayer(Bathy);
});

$('#repeat1_Shaded').on('click', function shadedreliefClick(e) {
    map.removeLayer(BathyShaded);
});

$('#repeat0_Shaded').on('click',function shadedreliefunClick(e) {
    map.addLayer(BathyShaded);
});