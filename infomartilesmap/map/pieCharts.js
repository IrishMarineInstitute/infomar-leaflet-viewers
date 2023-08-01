var iconbaseURL = '//maps.marine.ie/mapjslibs/sedimentData/';

var psaIcon = L.Icon.extend({
    options: {
        iconSize:     [25, 41],
        iconAnchor:   [13, 40],
        popupAnchor:  [-3, -35],
        shadowUrl: '//maps.marine.ie/mapjslibs/leaflet-1.3.1/images/marker-shadow.png',
        shadowSize:   [20, 40],
        shadowAnchor: [5, 40]    
    }
});

var mudIcon = new psaIcon({
    iconUrl: iconbaseURL + 'marker-icon-M.png',
});
var mixedSedIcon = new psaIcon({
    iconUrl: iconbaseURL +'marker-icon-gM.png',
});
var sandIcon = new psaIcon({
    iconUrl: iconbaseURL + 'marker-icon-S.png',
});
var gravelIcon = new psaIcon({
    iconUrl: iconbaseURL + 'marker-icon-G.png',
});
var mudSandIcon = new psaIcon({
    iconUrl: iconbaseURL + 'marker-icon-mS.png',
});
var noPSAIcon = new psaIcon({
    iconUrl: iconbaseURL + 'marker-icon-blue.png',
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
     var imageLink = "//maps.marine.ie/infomarData/tilesmap/SampleImages/Web_Images/" + Math.round(args.YEAR) + "/"+ args.SURVEYID + "/";
    
                    //hidden pane with sample information"
                if(args.SURVEYID != 'undefined' && args.SURVEYID != ""){
				var popupHTML = "<div id=popupContent style=\"display: none;\"><table class=\"tg\"><tr><td class=\"tg-9hbo\">Survey</td><td class=\"tg-yw4l\">" + args.SURVEYID +"</td></tr>";
				    }    
				if(args.DATE_ != 'undefined' && args.DATE_ != ""){
				 popupHTML += "<tr><td class=\"tg-9hbo\">Date</td><td class=\"tg-yw4l\">" + (args.DATE_).toString() +"</td></tr>";
				    }
				 popupHTML += "<tr><td class=\"tg-9hbo\">Latitude</td><td class=\"tg-yw4l\">"+ Math.round(args.LATITUDE * 100)/100+ "</td></tr><tr><td class=\"tg-9hbo\">Longitude</td><td class=\"tg-yw4l\">"+ Math.round(args.LONGITUDE * 100)/100 + "</td></tr>";
				 
				if(args.DEPTH != 'undefined' && args.DEPTH != "" && args.DEPTH != "0"){
					popupHTML +=  "<tr><td class=\"tg-9hbo\">Depth</td><td class=\"tg-yw4l\">"+ args.DEPTH + "m</td></tr>";
					}
                if(args.SENSOR != 'undefined' && args.SENSOR != ""){
				 popupHTML += "<tr><td class=\"tg-9hbo\">Sampler</td><td class=\"tg-yw4l\">" + args.SENSOR +"</td></tr>";
				    }
				if(args.DSCRIPTION != 'undefined' && args.DSCRIPTION != ""){
						popupHTML += "<tr><td class=\"tg-9hbo\">Description</td><td class=\"tg-ddddx\">"+ args.DSCRIPTION + "</td></tr>";
				 }
				if(args.COMMENT_ != 'undefined' && args.COMMENT_ != ""){
				 		popupHTML += "<tr><td class=\"tg-9hbo\">Comment</td><td class=\"tg-ddddx\">"+ args.COMMENT_ + "</td></tr>";
					}
                if(args.IMAGEID != 'undefined' && args.IMAGEID != ""){
						popupHTML += "<tr><td class=\"tg-img\" colspan=\"2\"><img src='" + imageLink + args.IMAGEID + ".jpg' width=\'100%\' /></td></tr>";
                    var test = imageLink + args.IMAGEID + ".jpg";
				  }
                 if(args.FOLKCLASS != 'undefined' && args.FOLKCLASS != ""){
                        popupHTML += "<tr><td class=\"tg-img\" colspan=\"2\"><a href='#' onclick=\"$('#divPopup').show();$('#popupContent').hide();\">Hide Sample Collection Details</a></td></tr>";
                 }
					   popupHTML +="</table></div>";
    
    return popupHTML;
}



