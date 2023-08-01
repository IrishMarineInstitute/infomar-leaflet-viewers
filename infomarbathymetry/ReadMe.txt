Dynamic Bathymetry Map
The purpose of this map is to display the bathymetry data and enable the user to edit how the data is displayed to best suit their requirements.
The site web address is http://maps.marine.ie/infomarbathymetry and it is iframed into https://www.infomar.ie/maps/interactive-maps/dynamic-web-mapping

This site uses the following layers:
Bathymetry - OSM Tiles
Bathymetry data layer - ArcGIS Service.	This layer can be edited using the ‘Edit Bathymetry Display’ dialog to change the range of data displayed, the colours used and analyse the data for Slope and Aspect.  You can click on the blue drop icon and then click on the map to open depth values from the layer.
Shaded Relief Layer - 	ArcGIS Service.	This is the same layer as the Bathymetry data layer it is just shaded rather than coloured.  This layer can be edited using the ‘Edit Shaded Relief Display’ dialog to change parameters used to apply shading.  You can change the values for the Azimuth, Altitude and Vertical Exaggeration used when shading the data.

The ArcGIS service used for both the Bathymetry and Shaded Relief layers is:
https://image.marine.ie/arcgis/rest/services/INFOMAR/AllSurvey/ImageServer

This site has the following tools:
o	Bathymetry display and analysis dialog (functions implemented in scripts\map\bathymetryForm.js)
		Enables change range of values applied to the colour scale
		Analysis tools include slope, aspect and clip
		Button to go to information and download data using MI ERDDAP system
	
o	Shaded Relief display and analysis dialog (functions implemented in scripts\map\shadingForm.js)
		Allows user to change the shaded relief settings including the Altitude, azimuth and vertical exaggeration parameters used
	
o	Various tools on the map (map setup and tools added to map in scripts\map\mapLayers.js, map tools defined and created in scripts\map\controls4.js)
		Transparency slider
		Geolocation tool to be used with phones
		Click for Depths
		Upload points file
		Print pdf
		Measure distance/areas tool
		Layers dialogue to switch between the base layers

o	Default tools provided by leaflet	
	o	Zoom in/out
	o	Scale bar and Lat/Lng display
	o	Logo/accreditation display

Specific Notes
This viewer uses an older version of the ESRI Leaflet javascript library (version 2.1.1), it was not possible to use the newer versions because they did not support using raster functions which are used by the viewer to change the display of the bathymetry data.

