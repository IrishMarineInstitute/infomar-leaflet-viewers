var iconbaseURL = '//maps.marine.ie/mapjslibs/sedimentData/';

var mudIcon = L.icon({
    className: 'psa-icon-base',
    iconUrl: iconbaseURL + 'marker-icon-M.png',
});
var mixedSedIcon = L.icon({
    iconUrl: iconbaseURL +'marker-icon-gM.png',
    className: 'psa-icon-base'
});
var sandIcon = L.icon({
    className: 'psa-icon-base',
    iconUrl: iconbaseURL + 'marker-icon-S.png',
});
var gravelIcon = L.icon({
    iconUrl: iconbaseURL + 'marker-icon-G.png',
    className: 'psa-icon-base'
});
var mudSandIcon = L.icon({
    iconUrl: iconbaseURL + 'marker-icon-mS.png',
    className: 'psa-icon-base'
});
var noPSAIcon = L.icon({
    iconUrl: iconbaseURL + 'marker-icon-blue.png',
    className: 'psa-icon-base'
});

//Create Pie Charts
function pieChart(nameVals, sedVals, Folk, PSA_Des){
    chartOpen = true;
    sectorValues = sedVals; 
    sectorNames = nameVals; 
       
    var sortedArray = sortArray(sectorNames, sectorValues);
    var sortSectorNames = [];
    var sortSectorValues = [];
    for(i=0; i<sortedArray.length;i++){
        sortSectorNames.push(sortedArray[i][0]);
        sortSectorValues.push(parseFloat(sortedArray[i][1]).toFixed(2));
    }  

    var colourP = [];
            for(var i=0; i<sortSectorNames.length;i++){
                if (sortSectorNames[i] == "Sand"){
                    colourP.push("#ffff70");
                  // colourP.push("#F4D03F");
                   // colourP.push("#fdfd7b");
                 }
                 if (sortSectorNames[i] == "Mud"){
                     colourP.push("#d9d681");
                  //  colourP.push("#DC7633");
                  //    colourP.push("#7efc7e");
                 } 
                 if (sortSectorNames[i] =="Gravel"){
                     colourP.push("#cd8966");
                    //colourP.push("#99A3A4"); 
                   //  colourP.push("#ff7dff"); 
                  }     
                 }
    
    var ctx =  document.getElementById('chartContainer').getContext('2d');

	var myPieChart = new Chart('chartContainer', { 
        type: 'pie',
        data: {
            labels: sortSectorNames,
            datasets: [{
               data: sortSectorValues,
               backgroundColor: colourP
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
                    fontColor: '#FBFCFC',
                        textShadow: true,
                        shadowOffsetX: -5,
                        shadowOffsetY: 5
                }
            }, 
            title: {
                display: false,
                text: "Particle Size Analysis",
                },
            legend: {
                display: true,
                labels: {
                    boxWidth: 10,
                    fontSize: 12
                },
                animation: {
                duration: 6000
                }
           },
             weight: 10
         }
    });

}

function sortArray(names, times){
     var nameSectorArray = [];
   
    for(i=0; i<names.length;i++){
        var tempArray = [names[i], times[i]];
        nameSectorArray.push(tempArray);
        nameSectorArray.sort(function(a,b){return b[1]-a[1]});
    }
        return(nameSectorArray);
}

function sampleInfo(args){
     var imageLink = "//maps.marine.ie/infomarData/tilesmap/SampleImages/Web_Images/" + Math.round(args.YEAR) + "/"+ args.SURVEY + "/";
    
                    //hidden pane with sample information"
                if(args.SURVEY != 'undefined' && args.SURVEY != ""){
				var popupHTML = "<div id=popupContent style=\"display: none;\"><table class=\"tg\"><tr><td class=\"tg-9hbo\">Survey</td><td class=\"tg-yw4l\">" + args.SURVEY +"</td></tr>";
				    }    
				if(args.DATE != 'undefined' && args.DATE != ""){
				 popupHTML += "<tr><td class=\"tg-9hbo\">Date</td><td class=\"tg-yw4l\">" + (args.DATE).toString(); +"</td></tr>";
				    }
				 popupHTML += "<tr><td class=\"tg-9hbo\">Latitude</td><td class=\"tg-yw4l\">"+ Math.round(args.LAT * 100)/100+ "</td></tr><tr><td class=\"tg-9hbo\">Longitude</td><td class=\"tg-yw4l\">"+ Math.round(args.LONG * 100)/100 + "</td></tr>";
				 
				if(args.DEPTH != 'undefined' && args.DEPTH != "" && args.DEPTH != "0"){
					popupHTML +=  "<tr><td class=\"tg-9hbo\">Depth</td><td class=\"tg-yw4l\">"+ args.DEPTH + "m</td></tr>";
					}
                if(args.SAMPLER != 'undefined' && args.SAMPLER != ""){
				 popupHTML += "<tr><td class=\"tg-9hbo\">Sampler</td><td class=\"tg-yw4l\">" + args.SAMPLER +"</td></tr>";
				    }
				if(args.DSCRIPTION != 'undefined' && args.DSCRIPTION != ""){
						popupHTML += "<tr><td class=\"tg-9hbo\">Description</td><td class=\"tg-ddddx\">"+ args.DSCRIPTION + "</td></tr>";
				 }
				if(args.COMMENT != 'undefined' && args.COMMENT != ""){
				 		popupHTML += "<tr><td class=\"tg-9hbo\">Comment</td><td class=\"tg-ddddx\">"+ args.COMMENT + "</td></tr>";
					}
                if(args.IMAGE != 'undefined' && args.IMAGE != ""){
						popupHTML += "<tr><td class=\"tg-img\" colspan=\"2\"><img src='" + imageLink + args.IMAGE + ".jpg' width=\'100%\' /></td></tr>";
                    var test = imageLink + args.IMAGE + ".jpg";
				  }
                 if(args.FOLK_CLASS != 'undefined' && args.FOLK_CLASS != ""){
                        popupHTML += "<tr><td class=\"tg-img\" colspan=\"2\"><a href='#' onclick=\"$('#divPopup').show();$('#popupContent').hide();\">Hide Sample Collection Details</a></td></tr>";
                 }
					   popupHTML +="</table></div>";
    
    return popupHTML;
}



