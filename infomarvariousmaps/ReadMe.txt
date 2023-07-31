Various Charts Viewer
The purpose of this viewer is to enable display and download of various maps that INFOMAR provides such as the Survey Coverage map, Real Map of Ireland etc. The web address: http://maps.marine.ie/infomarvariousmaps and the map is iframed into https://www.infomar.ie/maps/downloadable-maps/maps.

This charts viewer contains the following layers:
Bathymetry
Greyscale Maps
Survey Coverage Map	
Real Map of Ireland	
Small Area 3d Maps
PAD INSS INFOMAR Map	
Google Earth Coastal KMZ
Google Earth Overview KMZ	

The following tools are available in the map viewer:
o	Ability to see a thumbnail on hovering over map/kmz outlines
o	Ability to open a map pdf in popup window and within the window use some pdf tools
o	Ability to preview the Google Earth kmz files in a popup window and click a button to download a kmz
o	Layers dialogue box
o	Scale bar and Lat/Lng display
o	Zoom in/out

Specific Notes:
Most of the layers aside from the Bathymetry tiles are added as gsoJSON files from infomarData/variousmaps/geojson

If you hover on chart outline it displays a preview of that chart in the corner of the map and if you click on the outline a window is opened with pdf preview. The base urls are defined as:
var stdChartsURL = "https://secure.dccae.gov.ie/GSI_DOWNLOAD/Marine/Data/INFOMAR_Charts/";
var kmzURL = "https://secure.dccae.gov.ie/GSI_DOWNLOAD/Marine/Data/INFOMAR_Google/";
var varChartsURL = 'https://maps.marine.ie/infomarData/variousmaps/PDFs/';
var kmzPrevImage = 'https://maps.marine.ie/infomarData/variousmaps/kmz_pngs/';


Popups are created in either charts_v2.js, kmz.js, PADINSSINFOMAR.js or realMap.js depending on the data download type.  If you hover a chart or kmz outline it displays a preview of that file and if you click on the outline a window is opened with the same preview and a link to download the kmz/pdf.
