Seabed and Sediment viewer

The purpose of this map is to display data relating to seabed sediments and sediment types gathered by INFOMAR. The map is displayed externally on: http://maps.marine.ie/infomartilesmap.  The map is iframed into https://www.infomar.ie/maps/interactive-maps/seabed-and-sediment on infomar.ie website.

The following are the current layers used in this viewer:
Bathymetry - OSM tiles
Backscatter - OSM tiles
Sample Points - geoJSON file from folder .../infomarData/tilesmap/geoJSON/ 
Seabed Classification - this is an arcgis service 
EEZ Boundary - geoJSON file from folder .../infomarData/tilesmap/geoJSON/ 
Designated Area Boundary - geoJSON file from folder .../infomarData/tilesmap/geoJSON/ 

The following tools are available in the map viewer:
o	Legend tool
o	Split screen tool
o	Query PSA tool
o	Clustering of Sample Points
o	Layers dialogue box
o	Scale bar and Lat/Lng display
o	Zoom in/out

Specific Notes:
Viewer uses .../mapjslibs/config.js file to call all of the layers in the map, except for the layers which are geoJSON files that are called from the folder .../infomarData/tilesmap/geoJSON/ these are called in the index.html file.

The Sediment Samples points are added to the map in the map.js file and the field FOLKCLASS is used to define what colour point pin is used.  Also the popup is created using the field names in the geoJSON file.  If the field names change in the geoJSON file then this code will need to be updated.

This map displays the sample points and photos of the samples.  Any new images should be copied into the ...infomarData/tilesmap/SampleImages/Web_Images/***year***/****surveyname****/ folder on the production website.  The geoJSON file has a field which called ‘IMAGE’, the name of new images is here.  

In the pieCharts.js javascript file this field is combined with the root url: ‘//maps.marine.ie/infomarData/tilesmap/SampleImages/Web_Images/’, the YEAR field and the SURVEY name field to make the link to each individual image in the popup. E.g. http://maps.marine.ie/infomarData/tilesmap/SampleImages/Web_Images/2011/CV11_01/CV_11_01_33.jpg

If there is any incorrect values here the links will not work and if the names of any of the fields used change the links will also not work.

Tools used in the viewer are defined in the controls.js file.
