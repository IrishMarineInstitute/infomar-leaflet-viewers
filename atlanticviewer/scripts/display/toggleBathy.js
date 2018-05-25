$('#repeat1').on('click', function bathyClick(e){
    Bathy.setOpacity(0);
});
$('#repeat0').on('click', function bathyunClick(e) {
    Bathy.setOpacity(0.75);
});

$('#repeat1_Shaded').on('click', function shadedreliefClick(e) {
    BathyShaded.setOpacity(0);
});

$('#repeat0_Shaded').on('click',function shadedreliefunClick(e) {
    BathyShaded.setOpacity(0.75);
});