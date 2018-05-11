/*
     detectPDFjs.js  v0.2
     By Eric Gerds   http://www.pinlady.net/PluginDetect/

     Detect if a browser has PDF.js (Firefox PDF viewer) installed and enabled


 USAGE:
  1) This script works together with the PluginDetect script.
     See http://www.pinlady.net/PluginDetect/download/

  2) Insert the PluginDetect script into the <head> or <body> of your web page.

  3) The output <div> is assumed to be in the parent window of your web page.
     Have the output <div> BEFORE this script. The <div> looks like this:
       <div id="detectPDFjs_output"></div>

  4) If you wish to specify the plugindetect <div>, then insert it into the <body>,
     anywhere BEFORE the plugin detection begins.
     This <div> temporarily holds any plugin object that is inserted into the web page,
     but only when needed for detection.
     For example:
        <div id="plugindetect" style="right:0px; top:0px; position:absolute;"></div>
     This step is optional, as PluginDetect will create and insert the <div> automatically
     when needed.

  5) Insert this script AFTER the PluginDetect script, AFTER the output <div>,
     and AFTER the plugindetect <div> (assuming you specifed the plugindetect <div>).

  6) Get a copy of the "empty.pdf" file. The empty.pdf file is needed for PDF detection.
     Adjust the value of the "DummyPDF" variable (given in the code below) to reflect the
     empty.pdf name and path.

     Examples...

     If your web page is at      http://www.mysite.com/webpage.htm
     and you have empty.pdf at   http://www.mysite.com/empty.pdf
     then DummyPDF = "empty.pdf"  (relative path, relative to the web page)

     If your web page is at       http://www.mysite.com/webpage.htm
     and you have empty.pdf at    http://www.mysite.com/stuff/empty.pdf
     then DummyPDF = "stuff/empty.pdf"   (relative path, relative to the web page)
     or   DummyPDF = "/stuff/empty.pdf"  (absolute path)

  7) Feel free to change this script, remove comments, etc... to fit your own needs.


*/


(function(){

var $ = PluginDetect, 

// The DummyPDF path can be relative or absolute.
// Only the very first PDFjs PluginDetect command that is executed
// needs to have the DummyPDF input argument. You do not have to specify this input arg in
// any subsequent PDFjs PluginDetect commands.
DummyPDF = "../files/empty.pdf",

// node for output text
out = document.getElementById("detectPDFjs_output");


// Return text message based on plugin status
var getStatusMsg = function(status)
{
   if (status==0) return "installed & enabled & is the default PDF viewer in your browser";
   if (status==-0.5) return "detection has started but has not completed yet";
   if (status==-1) return "not installed / not enabled / not the default PDF viewer in your browser";
   if (status==-3) return "error...bad input argument to PluginDetect method";
   return "unknown";

};   // end of getStatusMsg()


// Add text to output node
var docWrite = function(text){
     if (out)
     {
        if (text)
        {
          text = text.replace(/&nbsp;/g,"\u00a0");
          out.appendChild(document.createTextNode(text));
        };
        out.appendChild(document.createElement("br"));
     };
 };  // end of function


function displayPDFresults($)
{
   var status, msg;

   if ($.isMinVersion)
   {
      status = $.isMinVersion("PDFjs", 0);
      docWrite("Firefox PDF Reader status: " + getStatusMsg(status));
      docWrite("");
   };

};   // end of displayPDFresults()


// Display results when PDF detection is completed
$.onDetectionDone("PDFjs", displayPDFresults, DummyPDF);



})();   // end of function
