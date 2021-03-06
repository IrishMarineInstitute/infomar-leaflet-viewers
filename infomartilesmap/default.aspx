﻿<%@ Page Language="C#" %>
<!DOCTYPE html>
<script runat="server">

    private void Page_Load(object sender, EventArgs e)
    {
        // Check whether the browser remains
        // connected to the server.


	if (!Request.IsLocal && !Request.IsSecureConnection)
	{
    		string redirectUrl = Request.Url.ToString().Replace("http:", "https:");
    		Response.Redirect("https://maps.marine.ie/infomarbathymetry/index.html", false);
    		HttpContext.Current.ApplicationInstance.CompleteRequest();
	}
        //else
        //{
            // If the browser is not connected
            // stop all response processing.
        //    Response.End();
        //}
    }

</script>
<html>
<head>
    <title>INFOMAR Bathymetry Viewer</title>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
	<link rel="shortcut icon" href="images/favicon.ico">
    <!-- Leaflet -->
	<link rel="stylesheet" href="scripts/libs/leaflet-1.0.0-b1/leaflet.css" />
	<link rel="stylesheet" href="scripts/libs/leaflet-1.0.0-b1/myButtons.css" />
    <link rel="stylesheet" href="scripts/tools/opacityControl/lib/opacity/Control.Opacity.css" />
    <link rel="stylesheet" href="scripts/libs/jquery-ui-1.11.4/jquery-ui.css" />
    <link rel="stylesheet" href="scripts/tools/Leaflet.draw/dist/leaflet.draw.css" />
    <link rel="stylesheet" href="scripts/display/L.Control.Credits/dist/leaflet-control-credits.css" />
	<link rel="stylesheet" href="scripts/tools/leaflet-measure/dist/leaflet-measure.css" />
	
    <script src="scripts/libs/jquery/jquery-1.11.3.min.js"></script>
	<script src="scripts/libs/jquery-ui-1.11.3/jquery-ui.min.js"></script>
	
	<script src="scripts/libs/leaflet-1.0.0-b1/leaflet-src.js" type="text/javascript"></script> 
	<script src="scripts/libs/esri-leaflet-v2.0.0-beta.5/dist/esri-leaflet.js" type="text/javascript"></script>
	<script src="scripts/tools/opacityControl/lib/opacity/Control.Opacity.js" type="text/javascript"></script>
    <script type="text/javascript" src="scripts/display/L.Control.Credits/dist/leaflet-control-credits-src.js"></script>
	<script src="scripts/tools/leaflet-measure/dist/leaflet-measure.js" type="text/javascript"></script>
 	<script src="scripts/display/Spin.js" type="text/javascript"></script> 
<script src='scripts/tools/leaflet-workspace/jam/require_edited.js'></script>
<script src='scripts/tools/leaflet-workspace/js/leaflet.spin.js'></script>
<script src="scripts/tools/leaflet-workspace/leaflet-workspace-edited.js"></script>
<script src="scripts/tools/leaflet-workspace/leaflet-workspace-csv.js"></script>
	<script src="scripts/display/style_template.js" type="text/javascript"></script>
	<script src="scripts/tools/addcsv/leaflet.geoCSV.js" type="text/javascript"></script>
	<script type="text/javascript"></script>
    <style>
         body {
            margin: 0;
            padding: 0;
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
            font-size: 14px;
			background: #A4C7FF;
			overflow: hidden;
        }

        #map {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
        }

        #format {
            margin-top: 2em;
        }

        #form {
            border: #bbb solid 1px;
            border-radius: 4px;
            background-color: white;
			padding: 5px;
        }

        button.ui-button-icon-only {
            width: 1.6em;
            height: 1.7em;
            float: right;
            padding: 12px;
			outline:none;
        }

        .ui-widget {
            font-size: 0.9em;
        }
        #bathybutton {
            position: absolute;
            top: 10px;
            right: 220px;
            z-index: 500;
            background: #D4FFD4;
        }

       #depth-ranges {
            position: relative;
            float: right;
            top: 10px;
            right: 35px;
            z-index: 500;
            width: 215px;
            padding: 0.5em;
            background-color: #D4FFD4;
            margin-right: 15px;
        }

            #depth-ranges input {
                display: inline-block;
                border: 1px solid #999;
                font-size: 13px;
                width: 35px;
                border-radius: 4px;
                height: 26px;
             }

                #depth-ranges input[type='submit'] {
                    padding: 0 1em;
                    cursor: pointer;
                    color: white;
                    width: 125px;
                    height: 30px;
                    background: #5C7DB8;
                    border-color: #5C7DB8;
                    margin-top: 4px;
                    position: relative;
                    font-size: 14px;
                }

        #depth-ranges input[type="submit"]:hover {
            border: 1px solid #999;
            color: #0000FF;
        }

        #bathy-wrapper {
            position: relative;
            float: left;
            display: none;
        }

        #BathyInfo {
            display: none;
        }
        #chart-legend {
            width: 25px;
            height: 100px;
            padding: 5px;
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
            font-size: 8px;
        }

        .legend-block {
			width: 20px;
            height: 10px;
            border: #bbb solid 1px;
            background-color: #D3D3D3;
        }

        #aspect-legend {
            display: inline-block;
            padding: 5px;
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
            font-size: 12px;
            background-color: white;
        }

        .aspect-legend-block {
            width: 20px;
            height: 10px;
            border: #bbb solid 0.1px;
            background-color: #D3D3D3;
			display: inline-block;
        }
        #toolbar {
            padding: 2px;
            display: inline-block;
            width: 98%;
            margin-bottom: 10px;
        }
        /* support: IE7 */
        * + html #toolbar {
            display: inline;
        }

        #repeat0Label.ui-state-active {
            background: #15b007;
        }

            #repeat0Label.ui-state-active span.ui-button-text {
                color: #FFFFFF;
            }

        #repeat1Label.ui-state-active {
            background: #FF0000;
        }

            #repeat1Label.ui-state-active span.ui-button-text {
                color: #FFFFFF;
            }
        #srbutton {
            position: absolute;
            top: 10px;
            right: 55px;
            z-index: 500;
            background: #D2FEFF;
        }

        #formShading {
            border: #bbb solid 1px;
            border-radius: 4px;
            padding: 4px;
            background-color: white;
        }

        #form-Shading {
            position: relative;
            display: inline-block;
            top: 10px;
            right: 51px;
            z-index: 500;
            padding: 0.5em;
            background-color: #D2FEFF;
            float: right;
            display: none;
            margin-bottom: 10px;
			margin-left: 10px;
        }

            #form-Shading input {
                display: inline-block;
                border: 1px solid #999;
                width: 30px;
                border-radius: 4px;
                height: 25px;
            }

                #form-Shading input[type='submit'] {
                    padding: 0 1em;
                    cursor: pointer;
                    color: white;
                    width: 125px;
                    height: 30px;
                    background: #5C7DB8;
                    border-color: #5C7DB8;
                    position: relative;
                }
                #form-Shading input[type='submit']:hover {
                        border: 1px solid #999;
                        color: #0000FF;
                    } 
        #toolbar_shaded {
            padding: 2px;
            display: inline-block;
            width: 98%;
            align-content: center;
            margin-bottom: 10px;
        }
        /* support: IE7 */
        * + html #toolbar_shaded {
            display: inline;
        }

        #shaded0Label.ui-state-active {
            background: #15b007;
        }

            #shaded0Label.ui-state-active span.ui-button-text {
                color: #FFFFFF;
            }

        #shaded1Label.ui-state-active {
            background: #FF0000;
        }

            #shaded1Label.ui-state-active span.ui-button-text {
                color: #FFFFFF;
            }
		#resetBathyShaded {
		position: float;
		float: right;
		}	
		#resetBathy {
		position: float;
		float: right;
		vertical-align: bottom;
		margin-top: 4px;	
		}
		#uploadCSV {
		display: block;
		display: none;
		padding: 0.5em;
		position: absolute;
		float: left;
		left:60px;
		top:10px;
		z-index: 800;
		background: #F6F5F5;
		}
		.linksDiv {
		width: 200px;
		height: 30px;
		position: relative;
		display: inline;
		}
		div.popupLoc{
		font-size: 12px;
		max-width: 150px;
		}
		
#printlegend{
display: none;
position:absolute; 
left:0px; 
z-index:500;
margin-right: 5px;
border: grey solid 1px;
border-radius: 2px;
background-color: white;
padding:5px;
text-align:right;
}
.printlegendother{
width:170px;
margin-bottom: 10px;
}
.printlegendbathy{
width:110px;
}
.printLogo {
    float: left;
    margin: 5px 15px 2px 2px;
}
#shadedlegend {
display: none;
margin-bottom: 10px;
text-align: left;
height: 140px;
}
#bathylegend {
margin-bottom: 10px;
text-align: right;
}
#colorLeg{
    float: left;
	margin-bottom: 10px;
	margin-left: 10px;
}
#shadedimg{
    float: left;	
	margin: 10px 3px;	
}
#disclaimer{
text-align:left;
font-size: x-small;
z-index:500;
color: red;
}
#uploadGIS{
z-index: 1000;
}
#layerUploadDialog{
display: none;
}
#dropzoneCSV{
display: none;
}
#layerUploadDialogCSV{
display: none;
}
		</style>
		<style>
		@media only screen and (max-device-width: 480px) {
		div#depth-ranges {
			display: none;
			top: 10px;
            right: 30px;
			font-size: 12px;
					}
<!-- 		div#uploadControlDivID{
		display: none;
		} -->					
		div#colorscale {
			width: 10px;
		}			
		div#form-Shading {
			top: 10px;
            right: 45px;
			font-size: 12px;
				}
		a.leaflet-control-layers-toggle{F
			width:28px  !important;
			height:28px  !important;
		}
		a.leaflet-control-measure-toggle{
			width:32px  !important;
			height:32px  !important;
		}
 		div.leaflet-credits-control{
			height:	38px  !important;
			padding-right: 38px  !important;
			background-image: url("images/INFOMAR_logo_S.png")  !important;
		}
		a.leaflet-credits-showlink {
		font-size: 6px !important;
		line-height: 7px !important;
		}
		a.shadedReliefButton{
			width:28px  !important;
			height:28px  !important;
		}
		div.leafletcontrol{
			width:28px  !important;
			height:28px  !important;
			}
		}
			@media print {
    @page {
        size: landscape;
    }

    html {
        padding: 0px !important;
    }

    .noPrint {
        display: none !important;
    }

    md-tooltip {
        display: none;
    }
	.leaflet-control-zoom{
	 display: none !important;
	}
	.leaflet-control-measure{
	 display: none !important;
	}
	.leaflet-control-layers{
	 display: none !important;
	}
	.leaflet-control-mouseposition{
	 display: none !important;
	}
	.leaflet-control-attribution{
	 display: none !important;
	}
	.leaflet-credits-control{
	 display: none !important;
	}
	.opacity_slider_control{
	 display: none !important;
	}
	.myButton{
		 display: none !important;
	}
}
		</style>
	<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-68916322-1', 'auto');
  ga('send', 'pageview');

</script>
</head>
<body>
	<div id="container">
		<div id="map"></div>
			<div id="printlegend" class="printlegendbathy">
					<div id="bathylegend">
					<img id="colorLeg" src="images/OrangeGreenBlue.png" alt="Legend" />
					<span style="text-align:right">
					<span id="maxPrint" style="vertical-align:top"></span>
					<div style="height:100px"></div>
					<span id="minPrint" style="vertical-align:bottom"></span>
					</span>
					<div>
					<img id="printLogoBathy" class="printLogo" src="images/INFOMAR_logo_C.png" alt="N"><br>
					</div>
					</div>
				<div id="shadedlegend">	
				<div style="height:100px">
				<img id="shadedimg"src="images/SR_Leg.png" alt="ShadedLegendImg" />
				<div>
				<span id="anglePrint"></span>
				<span id="azimuthPrint"></span><br>
				<span id="vertPrint"></span>
				<img id="printLogoShaded" class="printLogo" src="images/INFOMAR_logo_C.png" alt="N"></div>
				</div>
			</div>
				<div id='disclaimer'>
				<p>Map is NOT to be used for navigation</p>
				</div>			
			</div>

		<div id="form-Shading" class="leaflet-bar noPrint">
            <div id="toolbar_shaded" class="ui-widget-header ui-corner-all">
                <span id="shadedlayerOnOff">
                    <input type="radio" id="repeat0_Shaded" name="repeat_Shaded" checked="checked" autocomplete="off"><label for="repeat0_Shaded" id="shaded0Label">On</label>
                    <input type="radio" id="repeat1_Shaded" name="repeat_Shaded" autocomplete="off"><label for="repeat1_Shaded" id="shaded1Label">Off</label>
                </span>
                <button id="closeShadedForm"></button>
                <button id="srbuttononform">Shaded Relief Settings</button>
				<button id="shadedLayerInfo">Layer Info</button>
            </div>
            <form action="#" id="formShading" autocomplete="off">
                <div>
                    <p style="margin-top: 6px; margin-bottom: 0px;">
                        <label for="altitude">
                            Altitude (Value 0 - 90):
                            <input id='altitude' type="text" name='altitude' style="margin-left:10px;" value="45" title="Angle of the sun above the surface">
                        </label>
                    </p>
                    <p style="margin-top: 6px; margin-bottom: 0px;">
                        <label for="azimuth">
                            Azimuth (Value 0 - 360):
                            <input id='azimuth' type="text" value='315' name='azimuth' title="Orientation the of the sun over the surface">
                        </label>
                    </p>
                    <p style="margin-top: 6px; margin-bottom: 8px;">
                        <label for="zfactor">
                            Vertical Exaggeration:
                            <input id='zfactor' type="text" value='5' name='zfactor' style="margin-left:16px;" title="Value by which the depth/elevation values will be multiplied to exaggerate seabed topography">
                        </label>
                    </p>
                    <input style="margin-left:10px" id='shadedAppChanges' type="submit" value="Apply Changes">
					<button id="resetBathyShaded" type="reset">Reset Defaults</button>
                </div>
            </form>
		<div id="srInfo">
                <img src="images/SR_5.png" style="width: 220px; height: 125px; margin-top: 10px; border: solid; border-color: #808080; border-width: 1px;">
                <p style="width: 215px; font-size: small; width: 230px; font-family: Verdana,Arial,sans-serif;">The shaded relief layer highlights features on the seabed using light and shade. Change the default altitude, azimuth and vertical exaggeration using form below.</p><a style="width: 100%" href="http://www.isde.ie/#/" target="blank">Open ISDE Data Catalogue </a>
            </div>
        </div>
        <div id="depth-ranges" draggable="true" class="leaflet-bar noPrint">
            <div id="toolbar" class="ui-widget-header ui-corner-all">
                <span id="layerOnOff">
                    <input type="radio" id="repeat0" name="repeat" checked="checked" autocomplete="off"><label for="repeat0" id="repeat0Label">On</label>
                    <input type="radio" id="repeat1" name="repeat" autocomplete="off"><label for="repeat1" id="repeat1Label">Off</label>
                </span>
	            <button id="closeBathyForm"></button>
                 <button id="bathybuttononform">Bathymetry Settings</button>
				 <button id="bathyLayerInfo">Layer Info</button>
				<button id="tools">Analysis Tools</button>
            </div>

            <form action="#" id="form" autocomplete="off">
			<div><div style="display:inline-block; vertical-align:top; text-align:left; padding:5px 0 0 0;"><p style="margin-bottom:40px;">	
					<label for="to">
							Maximum value:
                    <input id='to' type="text" value='50' name='to' title="Change maximum depth (or elevation), use - sign for depths below sea level and + sign for elevation above sea level"></label></p>
					                        <label for="from">
                                 Minimum value:
                            <input id='from' type="text" value='-5223' name='from' title="Change minimum depth (or elevation), use - sign for depths below sea level and + sign for elevation above sea level">
                        </label></div>
						<div id="GreyColorScale" style="display: inline-block; position:relative; float: right;">
                            <div id="chart-legend">
                                <div class="legend-block" style="background-color: rgb(234,238,241);"></div>
                                <div class="legend-block" style="background-color: rgb(215,219,221);"></div>
                                <div class="legend-block" style="background-color: rgb(196,200,202);"></div>
                                <div class="legend-block" style="background-color: rgb(178,181,183);"></div>
                                <div class="legend-block" style="background-color: rgb(159,162,163);"></div>
                                <div class="legend-block" style="background-color: rgb(141,143,144);"></div>
                                <div class="legend-block" style="background-color: rgb(122,124,125);"></div>
                                <div class="legend-block" style="background-color: rgb(103,105,105);"></div>
                                <div class="legend-block" style="background-color: rgb(85,86,86);"></div>
                                <div class="legend-block" style="background-color: rgb(50,50,50);"></div>
                            </div>
                        </div>
                        <div id="BlueColorScale" style="display: inline-block; position:relative; float: right;">
                            <div id="chart-legend">
                                <div class="legend-block" style="background-color: rgb(198,219,239);"></div>
                                <div class="legend-block" style="background-color: rgb(175,209,231);"></div>
                                <div class="legend-block" style="background-color: rgb(152,198,223);"></div>
                                <div class="legend-block" style="background-color: rgb(124,183,217);"></div>
                                <div class="legend-block" style="background-color: rgb(97,167,210);"></div>
                                <div class="legend-block" style="background-color: rgb(75,152,201);"></div>
                                <div class="legend-block" style="background-color: rgb(55,135,192);"></div>
                                <div class="legend-block" style="background-color: rgb(36,116,182);"></div>
                                <div class="legend-block" style="background-color: rgb(21,98,169);"></div>
                                <div class="legend-block" style="background-color: rgb(8,81,156);"></div>
                            </div>
                        </div>
                        <div id="BlueBrownScale" style="display: inline-block; position:relative; float: right;">
                            <div id="chart-legend">
                                <div class="legend-block" style="background-color: rgb(128,64,0);"></div>
                                <div class="legend-block" style="background-color: rgb(178,114,51);"></div>
                                <div class="legend-block" style="background-color: rgb(229,165,102);"></div>
                                <div class="legend-block" style="background-color: rgb(235,184,134);"></div>
                                <div class="legend-block" style="background-color: rgb(197,171,146);"></div>
                                <div class="legend-block" style="background-color: rgb(159,159,159);"></div>
                                <div class="legend-block" style="background-color: rgb(121,159,197);"></div>
                                <div class="legend-block" style="background-color: rgb(83,159,235);"></div>
                                <div class="legend-block" style="background-color: rgb(51,140,229);"></div>
                                <div class="legend-block" style="background-color: rgb(25,102,178);"></div>
                                <div class="legend-block" style="background-color: rgb(2,67,133);"></div>
                            </div>
                        </div>
                        <div id="GreenScale" style="display: inline-block; position:relative; float: right;">
                            <div id="chart-legend">
                                <div class="legend-block" style="background-color: rgb(204,236,230);"></div>
                                <div class="legend-block" style="background-color: rgb(175,224,213);"></div>
                                <div class="legend-block" style="background-color: rgb(147,213,196);"></div>
                                <div class="legend-block" style="background-color: rgb(119,201,176);"></div>
                                <div class="legend-block" style="background-color: rgb(93,189,153);"></div>
                                <div class="legend-block" style="background-color: rgb(73,178,128);"></div>
                                <div class="legend-block" style="background-color: rgb(55,162,101);"></div>
                                <div class="legend-block" style="background-color: rgb(38,142,74);"></div>
                                <div class="legend-block" style="background-color: rgb(19,125,57);"></div>
                                <div class="legend-block" style="background-color: rgb(0,109,44);"></div>
                                <div class="legend-block" style="background-color: rgb(0,89,35);"></div>
                            </div>
                        </div>
                        <div id="BlueGreenScale" style="display: inline-block; position:relative; float: right;">
                            <div id="chart-legend">
                                <div class="legend-block" style="background-color: rgb(163,219,182);"></div>
                                <div class="legend-block" style="background-color: rgb(139,210,190);"></div>
                                <div class="legend-block" style="background-color: rgb(115,200,198);"></div>
                                <div class="legend-block" style="background-color: rgb(92,186,206);"></div>
                                <div class="legend-block" style="background-color: rgb(71,171,207);"></div>
                                <div class="legend-block" style="background-color: rgb(54,153,197);"></div>
                                <div class="legend-block" style="background-color: rgb(38,134,187);"></div>
                                <div class="legend-block" style="background-color: rgb(21,117,178);"></div>
                                <div class="legend-block" style="background-color: rgb(8,100,167);"></div>
                                <div class="legend-block" style="background-color: rgb(8,81,147);"></div>
                                <div class="legend-block" style="background-color: rgb(8,64,129);"></div>
                            </div>
                        </div>
                        <div id="OrangeGreenBlueScale" style="display: inline-block; position:relative; float: right;">
                            <div id="chart-legend">
                                <div class="legend-block" style="background-color: rgb(253,107,0);"></div>
                                <div class="legend-block" style="background-color: rgb(249,151,0);"></div>
                                <div class="legend-block" style="background-color: rgb(246,195,0);"></div>
                                <div class="legend-block" style="background-color: rgb(199,222,24);"></div>
                                <div class="legend-block" style="background-color: rgb(108,233,71);"></div>
                                <div class="legend-block" style="background-color: rgb(18,244,118);"></div>
                                <div class="legend-block" style="background-color: rgb(10,146,172);"></div>
                                <div class="legend-block" style="background-color: rgb(3,48,227);"></div>
                                <div class="legend-block" style="background-color: rgb(19,4,230);"></div>
                                <div class="legend-block" style="background-color: rgb(57,12,180);"></div>
                                <div class="legend-block" style="background-color: rgb(91,20,135);"></div>
                            </div>
                        </div>
						</div>
						<div>
                            <select name="colorscale" id="colorscale">
                                <option value="OrangeGreenBlue">Orange,Green,Blue</option>
                                <option value="Grey">Grey to Pale Grey</option>
                                <option value="BlueGreen">Blue to Green</option>
                                <option value="BlueBrown">Blue to Brown</option>
                                <option value="Blue">Blue to Pale Blue</option>
                                <option value="Green">Green to Pale Green</option>
                            </select>
						</div>
						<div style="padding: 5px">
                        <input type="submit" id="bathyAppChanges" value="Apply Changes">
						<button id="resetBathy" type="reset">Reset Defaults</button>
</div>
            </form>
        <div id="bathy-wrapper">
                <button type="button" value="Slope" id="slope" title="Calculate the angle of the bathymetry or elevation data in degrees" style="margin-top:5px;">Slope</button>
                <div id="slopeScale" class="leaflet-bar" style="margin-top:10px; margin-bottom: 10px; background:white;">
                    <div id="aspect-legend" class="panel-body">
                        <h3>Slope (in Degrees)</h3>
                        <div class="legend-value">
                            <div class="aspect-legend-block" style="background-color: rgb(117,186,67);"></div>  0-0.5 deg</div>
                        <div class="legend-value">
                            <div class="aspect-legend-block" style="background-color: rgb(216,235,55);"></div>  0.5-1 deg</div>
                        <div class="legend-value">
                            <div class="aspect-legend-block" style="background-color: rgb(255,197,1);"></div>  1-2 deg</div>
                        <div class="legend-value">
                            <div class="aspect-legend-block" style="background-color: rgb(255,170,0);"></div>  2-5 deg</div>
                        <div class="legend-value">
                            <div class="aspect-legend-block" style="background-color: rgb(253,107,0);"></div>  5-10 deg</div>
                        <div class="legend-value">
                            <div class="aspect-legend-block" style="background-color: rgb(254,67,16);"></div>  10-15 deg</div>
                        <div class="legend-value">
                            <div class="aspect-legend-block" style="background-color: rgb(187,42,97);"></div>  15-20 deg</div>
                        <div class="legend-value">
                            <div class="aspect-legend-block" style="background-color: rgb(154,42,186);"></div>  20-30 deg</div>
                        <div class="legend-value">
                            <div class="aspect-legend-block" style="background-color: rgb(74,36,183);"></div>  30-90 deg</div>
                    </div>
                </div>
                <button type="button" value="Aspect" id="aspect" title="Calculate the orientation (North, South, East or West) of the slope" style="margin-top:5px;">Aspect</button>
                <div id="aspectScale" class="leaflet-bar" style="margin-top:10px; margin-bottom: 10px; background:white;">
                    <div id="aspect-legend" class="panel-body">
                        <h3>Aspect (in Degrees)</h3>
                        <div class="legend-value">
                            <div class="aspect-legend-block" style="background-color: rgb(85,214,254);"></div>  Flat(-1)</div>
                        <div class="legend-value">
                            <div class="aspect-legend-block" style="background-color: rgb(117,167,254);"></div>  North (0-22.5)</div>
                        <div class="legend-value">
                            <div class="aspect-legend-block" style="background-color: rgb(133,79,251);"></div>  Northeast (22.5-67.5)</div>
                        <div class="legend-value">
                            <div class="aspect-legend-block" style="background-color: rgb(212,86,255);"></div>  East (67.5-112.5)</div>
                        <div class="legend-value">
                            <div class="aspect-legend-block" style="background-color: rgb(239,111,159);"></div>  Southeast (112.5-157.5)</div>
                        <div class="legend-value">
                            <div class="aspect-legend-block" style="background-color: rgb(255,140,133);"></div>  South (157.5-202.5)</div>
                        <div class="legend-value">
                            <div class="aspect-legend-block" style="background-color: rgb(255,164,125);"></div>  Southwest (202.5-247.5)</div>
                        <div class="legend-value">
                            <div class="aspect-legend-block" style="background-color: rgb(255,200,120);"></div>  West (247.5-292.5)</div>
                        <div class="legend-value">
                            <div class="aspect-legend-block" style="background-color: rgb(254,211,116);"></div>  Northwest (295-337.5)</div>
                        <div class="legend-value">
                            <div class="aspect-legend-block" style="background-color: rgb(176,220,135);"></div>  North (337.5-360)</div>
                    </div>
                </div>
                <button type="button" value="ClipExtent" id="ClipExtent" title="Clip data to map extent" style="margin-top:5px;">Clip</button>
		</div>
         </div>
		    <div id="BathyInfo">
                <img src="images/BathyInfo8.png" style="width:200px; height:145px; margin-top:10px;">
                <p style="font-size: small; font-family: Verdana,Arial,sans-serif;">The bathymetry shows the depth of the seabed using a graduated colour scale. Bathymetry values are negative and elevation values (from LiDAR surveys) are positive above sea level. Change the range of values displayed and colour scale using form above.</p><a style="width: 100%" href="http://www.isde.ie/#/" target="blank">Open ISDE Data Catalogue </a>
            </div>
		</div> 
<!-- 		<div id="uploadCSV" class="leaflet-bar noPrint">
		<button id="closeCSVUploadForm"></button>
		<span>Upload a csv file of points with columns:<br> Latitude (WGS84), Longitude (WGS84), Name. <br>For example: <em>
		  51.559, -9.7129, Sample 1</em></span><br><br>
			<span><input type="file" id="upload"></span>
		</div> -->
    </div>
	<script src="scripts/map/controls4.js" type="text/javascript"></script>
	<script src="scripts/map/mapLayers.js" type="text/javascript"></script>
	<script src="scripts/display/toggleBathy.js" type="text/javascript"></script>
	<script src="scripts/map/bathymetryForm.js" type="text/javascript"></script>	
	<script src="scripts/map/shadingForm.js" type="text/javascript"></script>
	<script src="scripts/tools/bathyTools.js" type="text/javascript"></script>
    <script src="scripts/tools/MousePosition/L.Control.MousePosition.js" type="text/javascript"></script>

    <div id="latlng" class="leaflet-bar noPrint">
        <script>
            L.control.mousePosition().addTo(map);
        </script>
    </div>
    <div id="scale-bar" class="leaflet-bar noPrint">
        <script>
            L.control.scale().addTo(map);
			
function refreshLayers() {
    var timeout = 300000;
    BathyShaded.bringToBack();
	Bathy.bringToFront();
    var refresh = setTimeout("refreshLayers()", timeout);
        }
		
		var spinner = new Spinner().spin();
		container.appendChild(spinner.el);
        </script>
    </div>	
</body>

</html>