function pieChart(nameVals, timeVals){	
    sectorValues = timeVals.split(",");  
    sectorNames = nameVals.split(","); 
    
    for(i=0; i<sectorNames.length;i++){
        if(sectorNames[i].includes("%")){
            break;
        }else{
        sectorNames[i]= sectorNames[i] + " (%)";
        }
    }

        var ctx =  document.getElementById('chartContainer').getContext('2d');
        var pieColors = ["#009245", "#65c994","#0193D9", "#0C04ED","#F8931F", "#FFFF01", "#C2272D", "#612F90"]
        
	var myPieChart = new Chart('chartContainer', { 
        type: 'pie',
        data: {
            labels: sectorNames,    
            datasets: [{
                data: sectorValues,
                backgroundColor: pieColors
         }]
        },
         options: {
            title: {
                display: true,
                text: "% Time per Activity"
            },
            legend: {
                display: true,
                labels: {
                    boxWidth: 10,
                    fontSize: 12, 
                }
            },
             animation: {
                duration: 3000
             }
        }
    });

    $("#chartContainer").css("display","block");
    $("table.tg").css("display","none");
    $("div#divPopup").html("<div id=\"divPopup\"><i class=\"arrow up\"></i><a href='#' onClick=\'closePieChart(\""+sectorNames + "\",\""+ sectorValues+ "\");return false;\'>Hide Survey Statistics</a></div>");
}                                                                                       

function closePieChart(names, times){
    $("#chartContainer").css("display","none");
    $("table.tg").css("display","block");
    $("div#divPopup").html("<div id=\"divPopup\"><i class=\"arrow down\"></i><a href='#' onClick=\'pieChart(\"" + names + "\",\"" + times + "\");return false;\'>View Survey Statistics</a></div>");
}