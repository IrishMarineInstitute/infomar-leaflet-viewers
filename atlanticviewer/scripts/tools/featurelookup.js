$('#lookupFeature').change(function(){
		var feature = $('#lookupFeature').val();
	switch (feature){
		case "ChannelFeatures":
			map.flyTo([49.1, -50],10);
			$('input[name="to"]').val('-220');
			$('input[name="from"]').val('-1300');
			$('#bathyAppChanges').click();
			break;
		case "VolcanicRidge":
			$('input[name="to"]').val('-2700');
			$('input[name="from"]').val('-4000');
			$('#bathyAppChanges').click();
			map.flyTo([52.3, -26.1],9);
			break;
		case "Seamounts":
			$('input[name="to"]').val('-500');
			$('input[name="from"]').val('-4700');
			$('#bathyAppChanges').click();
			map.flyTo([52.3, -31.3],9);
		break;
		case "OrphanKnoll":
			map.flyTo([49.8, -45.3],9);
			$('input[name="to"]').val('-2300');
			$('input[name="from"]').val('-4000');
			$('#bathyAppChanges').click();
		break;
		case "SubmarineVolcanoes":
			$('input[name="to"]').val('-850');
			$('input[name="from"]').val('-1500');
			$('#bathyAppChanges').click();
			map.flyTo([59.253, -30.476],10);
		break;
	}	
});			
