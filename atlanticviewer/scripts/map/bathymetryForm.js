var depthForm = document.getElementById('form');
var startDepthInput = document.getElementById('from');
var endDepthInput = document.getElementById('to');
var colorScaleDrop = document.getElementById('colorscale');
var azimuthInput = document.getElementById('azimuth');
var altitudeInput = document.getElementById('altitude');
var zfactorInput = document.getElementById('zfactor');
var depthbyRangeRendering;
var newMaskRule;

$('#GreyColorScale').hide();
$('#BlueColorScale').hide();
$('#BlueBrownScale').hide();
$('#GreenScale').hide();
$('#BlueGreenScale').hide();
$('#OrangeGreenBlueScale').show();

depthForm.addEventListener('submit', function depthbyRangeClick(e) {
if(isNaN(startDepthInput.value)|| isNaN(endDepthInput.value)){
        alert("Please enter a numeric value.");
        return false;
}else{   
	var colorRamp = colorRamps(colorScaleDrop.value);
	var outValues = [];
    
    map.removeLayer(bathyTilesWContour);
    
    for (var i = 1; i < 101; i++) {
            outValues.push(
                i 
            );
        }
		
var inpRange = [];
var maxDepth = parseFloat(startDepthInput.value);
var minDepth = parseFloat(endDepthInput.value);
var interval = (maxDepth-minDepth)/100;

	if(maxDepth>minDepth){
		alert("The highest point must be greater then the lowest point.  Please use the minus sign to denote values below sea level.");
	}
	if(maxDepth>0){
		alert("Please use the minus sign to denote values below sea level.");
	}

inpRange.push(
 Math.round((maxDepth + 0.000001) * 1000)/1000
  );
for (var i = 1; i < 100; i++) {
    inpRange.push(
         Math.round(((maxDepth - (interval * i)) + 0.000001) * 1000)/1000,Math.round(((maxDepth - (interval * i)) + 0.000001) * 1000)/1000
     );
}
inpRange.push(
 Math.round((minDepth + 0.000001) * 1000)/1000
);


	depthbyRangeRendering = {
	"rasterFunction" : "Colormap",
	"rasterFunctionArguments" : {
    "Colormap" : colorRamp,
    "Raster":{
				"rasterFunction": "Remap",
				"rasterFunctionArguments": {
				"InputRanges": inpRange,
				"OutputValues": outValues,
                "Raster":{		
							"rasterFunction" : "Mask",
							"rasterFunctionArguments" : {
							"IncludedRanges" : [maxDepth,minDepth]
							},  
							"variableName" : "DEM"
							},
                  },
               "outputPixelType": "U8"
             },     
  },
  "outputPixelType": "U8"
};
	Bathy.setRenderingRule(depthbyRangeRendering);

if(azimuthInput.value<0){
	alert ("The Azimuth must be greater than 0");
}
if(azimuthInput.value>360){
	alert ("The Azimuth must be less than 360");
}	
if(altitudeInput.value<0){
	alert ("The Altitude must be greater than 0");
}
if(altitudeInput.value>90){
	alert ("The Altitude must be less than 90");
}
if(zfactorInput.value<0){
	alert ("The Z factor must be greater than 0");
}

  newMaskRule = {	
		 "rasterFunction" : "Hillshade",
		 "rasterFunctionArguments" : {
						 "Azimuth" : 315.0,
						 "Altitude" : 45.0,
						 "ZFactor" : 4,
						 "DEM": {
							 "rasterFunction" : "Mask",
							 "rasterFunctionArguments" : {
							 "IncludedRanges" : [maxDepth,minDepth]
						 },  
						 "variableName" : "DEM"
						 },
					},
				  };					

	$("#repeat0_Shaded").click(); 
    $("#repeat0").click();			
	    
	BathyShaded.setRenderingRule(newMaskRule);	
	BathyShaded.bringToBack();
	colorRampsLegend(colorScaleDrop.value);
	e.preventDefault();
}
  });
  
  function colorRamps(color) {
var inc1 = 2;
var inc2 = 2;
var inc3 = 2;

  switch (color){
      case "BlueBrown":
          return BlueBrown;
	      break;
      case "Grey":
          return GreyPaleGrey;
          break;		 
      case "Blue":	
          return BluePaleBlue;
          break;	
      case "Green":	
          return GreenPaleGreen;
	      break;	
      case"BlueGreen":	
          return BlueGreen;
          break;	
      case"OrangeGreenBlue":	
          return OrangeGreenBlue;
          break;	
 	  }
};

function colorRampsLegend(color) {

  switch (color){
	case "Blue":
	$('#BlueColorScale').show();
	$('#GreyColorScale').hide();
	$('#BlueBrownScale').hide();
	$('#GreenScale').hide();
	$('#BlueGreenScale').hide();
	$('#OrangeGreenBlueScale').hide();
break;
  }
  switch (color){
	case "Grey":
	$('#BlueColorScale').hide();
	$('#GreyColorScale').show();
	$('#BlueBrownScale').hide();
	$('#GreenScale').hide();
	$('#BlueGreenScale').hide();
	$('#OrangeGreenBlueScale').hide();
  }
    switch (color){
	case "BlueGreen":
	$('#BlueColorScale').hide();
	$('#GreyColorScale').hide();
	$('#BlueBrownScale').hide();
	$('#GreenScale').hide();
	$('#BlueGreenScale').show();
	$('#OrangeGreenBlueScale').hide();
  }
    switch (color){
	case "BlueBrown":
	$('#BlueColorScale').hide();
	$('#GreyColorScale').hide();
	$('#BlueBrownScale').show();
	$('#GreenScale').hide();
	$('#BlueGreenScale').hide();
	$('#OrangeGreenBlueScale').hide();
  }
     switch (color){
	case "Green":
	$('#BlueColorScale').hide();
	$('#GreyColorScale').hide();
	$('#BlueBrownScale').hide();
	$('#GreenScale').show();
	$('#BlueGreenScale').hide();
	$('#OrangeGreenBlueScale').hide();
  }
     switch (color){
	case "OrangeGreenBlue":
	$('#BlueColorScale').hide();
	$('#GreyColorScale').hide();
	$('#BlueBrownScale').hide();
	$('#GreenScale').hide();
	$('#BlueGreenScale').hide();
	$('#OrangeGreenBlueScale').show();
  }
  
};