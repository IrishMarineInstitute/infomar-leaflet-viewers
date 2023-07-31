Shipwrecks Viewer

The purpose of this map is to display information and imagery relating to shipwreck data gathered by INFOMAR.  The web address is http://maps.marine.ie/infomarshipwrecksmap and the map is iframed into the page https://www.infomar.ie/maps/downloadable-maps/shipwrecks

The following are the current layers used in this viewer:
Bathymetry	
Shipwrecks

The following tools are available in the map viewer:
o	Legend tool
o	Select a shipwreck dropdown box
o	Clustering of shipwreck points
o	Layers dialogue box
o	Scale bar and Lat/Lng display

Specific Notes:
Popup is displayed when you click on a shipwreck with information on the shipwreck, high resolution image of the wreck, link to wreck report and 3d model if available and other useful links. Code to create and populate the popup is in map/shipwrecks.js.

The spatial shipwrecks geoJSON file with lat/longs and information for each shipwreck is in ../infomardata/shipwrecksmap/geoJSON/Shipwrecks.js file which can be updated whenever there is new information.

This map uses links to to 3d models that have been uploaded to Sketchfab.com.  The link to the model is taken from the LINK3DMODE field in the shipwrecks geojson, e.g https://sketchfab.com/models/d05e076e429b47e89caec761f68e25be/embed 

Shipwreck images are stored on the GSI server and full url is given in the IMAGE field, e.g. https://secure.dccae.gov.ie/GSI_DOWNLOAD/Marine/Data/Shipwrecks/Image/OLDFIELD_GRANGE_GSI34_3D_5m_600.jpg.  

If there are new images or 3d models they should have their full urls in these fields and if the urls are correct they will appear automatically when there is an update to the shipwrecks geojson file.

The dropdown list of shipwrecks is created in the shipwrecklookup.js, it uses the vessel name field in the spatial Shipwrecks file so this field should not change from "VESSELNAME", if it is changed it will need to be updated here or the dropdown will not work.