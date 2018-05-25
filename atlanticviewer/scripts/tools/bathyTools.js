// aspect tool
var aspectButton = document.getElementById('aspect');
$('#aspectScale').hide();

function aspectClick() {
var aspectRendering = {
             "rasterFunction" : "Colormap",
             "rasterFunctionArguments" : {
             "Colormap" : [
				[1,85,214,254],
				[2,117,167,254],
				[3,133,79,251],
				[4,212,86,255],
				[5,239,111,159],
				[6,255,140,133],
				[7,255,164,125],
				[8,255,200,120],
				[9,254,211,116],
				[10,176,220,135],
			],			
			"Raster" :  {
				"rasterFunction" : "Remap",
				"rasterFunctionArguments": {
                "InputRanges": [-1,0,0,22.5,22.6,67.5,67.6,112.5,112.6,157.5,157.6,202.5,202.5,247.5,247.6,272.5,292.6,337.5,337.6,360],
                "OutputValues": [1,2,3,4,5,6,7,8,9,10],
                "Raster": {
						"rasterFunction" : "Aspect" 
					},
                  }, "variableName" : "Raster"
             }, "variableName" : "Raster"
			},		
	};
	
	Bathy.setRenderingRule(aspectRendering);
	BathyShaded.setRenderingRule(renderingRule);	
	BathyShaded.bringToBack();
	};

function aspectunClick() {
    if (typeof depthbyRangeRendering == "undefined")
    {
        Bathy.setRenderingRule(colourRendering);
		BathyShaded.setRenderingRule(renderingRule);	
    } 
    else{
        Bathy.setRenderingRule(depthbyRangeRendering);
        BathyShaded.setRenderingRule(newMaskRule);
        BathyShaded.bringToBack();
    }
    };	
	
       var aspecttoolon = false;
      function toggleaspecttool() {

          if (aspecttoolon == false)
          { 
            //if off, turn it on
			aspecttoolon = true;
			 $('#aspectScale').show();
			 $('#aspect').children('span').first().text("Return to Bathymetry");
             aspectClick();
        }
         else
     {
            //if on, turn it off
			aspecttoolon = false;
		  $('#aspectScale').hide();
          $('#aspect').children('span').first().text("Aspect");
		 aspectunClick();
	     }
      }
	 
	  aspectButton.addEventListener('click', toggleaspecttool);
	  
// Slope tool
	var slopeButton = document.getElementById('slope');
$('#slopeScale').hide();

function slopeClick() {

var slopeRendering = {
             "rasterFunction" : "Colormap",
             "rasterFunctionArguments" : {
             "Colormap" : [
[1,117,186,67],
[2,216,235,55],
[3,255,197,1],
[4,255,170,0],
[5,253,107,0],
[6,254,67,16],
[7,187,42,97],
[8,154,42,186],
[9,74,36,183],
			],	
			"Raster" :  {
				"rasterFunction" : "Remap",
				"rasterFunctionArguments": {
                "InputRanges": [0,0.5,0.5,1,1,2,2,5,5,10,10,15,15,20,20,30,30,90],
                "OutputValues": [1,2,3,4,5,6,7,8,9],
                "Raster":{
					"rasterFunction":"Slope",
					"rasterFunctionArguments": {
					"RemoveEdgeEffect": "True",
					"ZFactor": 1
                    // "Raster":{		
							// "rasterFunction" : "Mask",
					        // "rasterFunctionArguments" : {
					        // "IncludedRanges" : [maxDepth,minDepth]
					// },  
					// "variableName" : "DEM"
                // },
					},
						"outputPixelType": "U8",
						"variableName":"DEM"
		                  }, 
				},
             }, "variableName" : "Raster"
			},	
	   };
	
	Bathy.setRenderingRule(slopeRendering);
	

	BathyShaded.setRenderingRule(newMaskRule);
	BathyShaded.bringToBack();	
	
  };

  function slopeunClick(e){
      if (typeof depthbyRangeRendering == "undefined") {
          Bathy.setRenderingRule(colourRendering);
		  BathyShaded.setRenderingRule(renderingRule);	
      }
      else {
          Bathy.setRenderingRule(depthbyRangeRendering);
          BathyShaded.setRenderingRule(newMaskRule);
          BathyShaded.bringToBack();
      }
  };
      
	  var slopetoolon = false;
      function toggleslopetool() {

          if (slopetoolon == false)
          { 
            //if off, turn it on
			slopetoolon = true;
			$('#slopeScale').show();
            $('#slope').children('span').first().text("Return to Bathymetry");
             slopeClick();
        }
         else
     {
            //if on, turn it off
			slopetoolon = false;
		 $('#slopeScale').hide();
         $('#slope').children('span').first().text("Slope");
			slopeunClick();
          }
      }
  
slopeButton.addEventListener('click', toggleslopetool);

//Clip tool
var clipExtentButton = document.getElementById('ClipExtent');

//clipExtentButton.addEventListener('click', function clipExtent(e) {
function clipExtent() {
var bounds = map.getBounds();
	var ymax = bounds.getWest();
	var ymin = bounds.getEast();
	var xmax = bounds.getNorth();
	var xmin = bounds.getSouth();

var clipRendering = {
  "rasterFunction" : "Clip",
  "rasterFunctionArguments" : {
        "ClippingGeometry" : {         
	    "extent" : { "xmin" :xmin, "ymin" : ymin, "xmax" : xmax, "ymax" : ymax, "spatialReference" : {"wkid" : 3857} },
        "ClippingType": 1
    },
  },
  "variableName" : "Raster"
};

	Bathy.setRenderingRule(clipRendering);
	BathyShaded.setRenderingRule(clipRendering);
};

function unClipExtent() {
    console.log(depthbyRangeRendering);

    if (typeof depthbyRangeRendering == "undefined") {
        Bathy.setRenderingRule(colourRendering);
		BathyShaded.setRenderingRule(renderingRule);	
    }
    else {
        Bathy.setRenderingRule(depthbyRangeRendering);
        BathyShaded.setRenderingRule(newMaskRule);
        BathyShaded.bringToBack();
    }
};

var cliptoolon = false;
function togglecliptool() {

    if (cliptoolon == false) {
        //if off, turn it on
        cliptoolon = true;
        $('#ClipExtent').children('span').first().text("Show Full Extent");
        clipExtent();
    }
    else {
        //if on, turn it off
        cliptoolon = false;
        $('#ClipExtent').children('span').first().text("Clip");
        unClipExtent();

    }
}

clipExtentButton.addEventListener('click', togglecliptool);

//Identify Depth Tool
var identifyDepthButton = document.getElementById('iDepth');
var identifiedPixel;
var pane = document.getElementById('pixelValue');

function onMapClick(e) {
	
  	  if(identifiedPixel){
		
            pane.innerHTML = 'Loading';
        }
			Bathy.identify().at(e.latlng).run(function(error, results){
			 identifiedPixel = results.pixel;	
			
			if(identifiedPixel.properties.value == 'NoData'){		
          	pane.innerHTML = identifiedPixel.properties.value;
			}
			else{
			pixelValue = parseFloat(identifiedPixel.properties.value);	
			pane.innerHTML =  pixelValue.toFixed(2) + 'm'; 
			}
	 });
	 }
	
     var depthtoolon = false;
     function toggledepthtool() {

         if (depthtoolon == false)
         { 
            //if off, turn it on
			depthtoolon = true;
             map.on('click', onMapClick);
			 $(pane).show().text("Click on map to get depths");
              }
         else
         {
             //if on, turn it off
			 depthtoolon = false;
			 $(pane).hide();
             map.off('click', onMapClick);
         }
     }
	 
	// identifyDepthButton.addEventListener('click', toggledepthtool);
	
