$('#lookupFeature').change(function(){
		var feature = $('#lookupFeature').val();
	switch (feature){
		case "ChannelFeatures":
			map.flyTo([49.1, -50],10);
			$('input[name="to"]').val('-220');
			$('input[name="from"]').val('-1300');
			$('input#bathyAppChanges').click();
            $("#repeat0_Shaded").click(); 
			break;
		case "VolcanicRidge":
			$('input[name="to"]').val('-2700');
			$('input[name="from"]').val('-4000');
			$('input#bathyAppChanges').click();
			map.flyTo([52.3, -26.1],9);
            $("#repeat0_Shaded").click(); 
			break;
		case "Seamounts":
			$('input[name="to"]').val('-500');
			$('input[name="from"]').val('-4700');
			$('input#bathyAppChanges').click();
			map.flyTo([52.3, -31.3],9);
            $("#repeat0_Shaded").click(); 
		break;
		case "OrphanKnoll":
			map.flyTo([49.8, -45.3],9);
			$('input[name="to"]').val('-2300');
			$('input[name="from"]').val('-4000');
			$('input#bathyAppChanges').click();
            $("#repeat0_Shaded").click(); 
		break;
		case "SubmarineVolcanoes":
			$('input[name="to"]').val('-850');
			$('input[name="from"]').val('-1500');
			$('input#bathyAppChanges').click();
			map.flyTo([59.253, -30.476],10);
            $("#repeat0_Shaded").click(); 
		break;
	}
});			


// $("#lookupFeature option:eq(0)").prop("selected", true);