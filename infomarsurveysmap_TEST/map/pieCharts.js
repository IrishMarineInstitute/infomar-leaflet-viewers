function pieChart(stats){	
    var statsAll = stats.split(",");
   
    var sectorStats = [];
    sectorStats.push([statsAll[0],statsAll[1],statsAll[2]]);
    
    for(i=3; i<statsAll.length;i+=3){
        sectorStats.push([statsAll[i],statsAll[i+1], statsAll[i+2]]);  
    }  
    
    var sortedArray = sortArray(sectorStats);
       
    var sortSectorNames = [];
    var sortSectorValues = [];
	var sortSectorColours = [];
    for(i=0; i<sortedArray.length;i++){
        sortSectorNames.push(sortedArray[i][0][0]);
        sortSectorValues.push(sortedArray[i][0][1]);
		sortSectorColours.push(sortedArray[i][0][2]);
    }  

    var ctx =  document.getElementById('chartContainer').getContext('2d');

	var myPieChart = new Chart('chartContainer', { 
        type: 'pie',
        data: {
            labels: sortSectorNames,
            datasets: [{
                data: sortSectorValues,
                backgroundColor: sortSectorColours
         }]
        },
         options: {
            plugins: {
                labels: {
                    render: function(options){
                        var value = options.value; 
                        if (value > 4 ){
                        return value + "%"; 
                        }else{
                            return "";
                        }
                        },
                    fontColor: '#fff',
                        textShadow: true,
                        shadowOffsetX: -5,
                        shadowOffsetY: 5
                }
            }, 
            title: {
                display: true,
                text: "% Total Survey Time"
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
    $("div#divPopup").html("<div id=\"divPopup\"><i class=\"arrow up\"></i><a href='#' onClick=\'closePieChart(\""+stats + "\");return false;\'>Hide Survey Statistics</a></div>");
}                                                                                       

function closePieChart(stats){
    $("#chartContainer").css("display","none");
    $("table.tg").css("display","block");
    $("div#divPopup").html("<div id=\"divPopup\"><i class=\"arrow down\"></i><a href='#' onClick=\'pieChart(\"" + stats + "\");return false;\'>View Survey Statistics</a></div>");
}

function sortArray(sectorStats){
     var nameSectorArray = [];
   
    for(i=0; i<sectorStats.length;i++){
	var tempArray = [sectorStats[i]];
        nameSectorArray.push(tempArray);
        nameSectorArray.sort(function(a,b){return b[0][1]-a[0][1]});
    }
        return(nameSectorArray);
    
}