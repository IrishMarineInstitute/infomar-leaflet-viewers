$(function () {
    $("#uploadCSVBtn")
      .button({
          text: false,
          icons: {
              primary: "ui-icon-arrowthick-1-n"
          }
      })
      .click(function (event) {
		  $('uploadCSV').show("slow");
		  togglePanel('#uploadCSV');
          event.preventDefault();
      });
});
$(function () {
    $("#newbutton")
      .button({
          text: false,
          icons: {
              primary: "ui-icon-wrench"
          }
      })
      .click(function (event) {
          event.preventDefault();
      });
});
$(function () {
    $("#bathybutton")
      .button()
      .click(function (event) {
		$('#BathyInfo').hide("slow"); 
		togglePanel('#depth-ranges');
       event.preventDefault();
      });
});
$(function () {
    $("#bathybuttononform")
      .button({
          text: false,
          icons: {
              primary: "ui-icon-image"
		  }
          })
      .click(function (event) {
		$('#BathyInfo').hide("slow"); 
		togglePanel('#form');
       event.preventDefault();
      });
});
$(function () {
    $("#srbuttononform")
      .button({
          text: false,
          icons: {
              primary: "ui-icon-image"
		  }
          })
      .click(function (event) {
		$('#srInfo').hide("slow"); 
		togglePanel('#formShading');
       event.preventDefault();
      });
});
$(function () {
    $("#srbutton")
      .button()
      .click(function (event) {
		  $('#srInfo').hide("slow"); 
		  togglePanel('#form-Shading');
          event.preventDefault();
      });
});
$(function () {
    $("#bathyLayerInfo")
      .button({
          text: false,
          icons: {
              primary: "ui-icon-arrowthickstop-1-s"
          }
      })
      .click(function (event) {
		 // $('#form').hide(); 
		// $('#bathy-wrapper').hide();
		// togglePanel('#BathyInfo');
		window.open("//www.isde.ie/geonetwork/srv/eng/catalog.search#/metadata/ie.marine.data:dataset.3978");
      });
});


$(function () {
    $('#closeCSVUploadForm')
	.button({
        text: false,
        icons: {
            primary: "ui-icon-close"
        }
    })
	.click(function (event) {
		 $('#uploadCSV').hide("slow");
	 });
	});

$(function () {
    $("#aspect")
      .button()
      .click(function (event) {
          event.preventDefault();
      });
}); $(function () {
    $("#slope")
      .button()
      .click(function (event) {
          event.preventDefault();
      });
});
$(function () {
    $("#ClipExtent")
      .button()
      .click(function (event) {
          event.preventDefault();
      });
});


function togglePanel(x) {
    $(x).slideToggle(800);
	base_EsriOceans.bringToBack();
	};

$(document).ready(function () {
    var du = 4000;
	refreshLayers();
	$('div.leaflet-credits-control').click();
    $(document).tooltip({
        track: true,
        open: function (event, ui) {
            setTimeout(function () {
                $(ui.tooltip).hide('explode');
            }, du);
        }
    });
});
	$(function () {
    $("#closeBathyForm")
	.button({
        text: false,
        icons: {
            primary: "ui-icon-close"
        }
    })
		 .click(function (event) {
        togglePanel('#depth-ranges');
		// $('#depth-ranges').hide("slow");
	 });
	});
	$(function () {
    $("a.shadedReliefButton")
		 .click(function (event) {
    $('#depth-ranges').hide('slide', {direction: 'left'}, 800);
    $(this).next('#depth-ranges').stop().show('slide', {direction: 'left'}, 800);
	 });
	});
	
    $(function () {
        $("#layerOnOff").buttonset({
			width: '10px'
		});
    });
$(function () {
    $("#tools")
	.button({
        text: false,
        icons: {
            primary: "ui-icon-wrench"
        }
    })
	.click(function (event) {
		 togglePanel('#bathy-wrapper');
		 $('#form').hide("slow"); 
		 $('#BathyInfo').hide("slow"); 
	 });
 });
$(function () {
    $("#shadedLayerInfo").button({
        text: false,
        icons: {
            primary: "ui-icon-help"
        }
    })
		 .click(function (event) {
		 togglePanel('#srInfo');
		  $('#formShading').hide("slow"); 
		 
	 });
});
$(function () {	
    $("#closeShadedForm")
	.button({
        text: false,
        icons: {
            primary: "ui-icon-close"
        }
    })
	 .click(function (event) {
		 togglePanel('#form-Shading');
	 });
});
    $(function () {
        $("#shadedlayerOnOff").buttonset();
    });
$(function () {
    $("#to")
      .click(function (event) {
		  this.focus();this.select();
      });
});
$(function () {
    $("#from")
      .click(function (event) {
		  this.focus();this.select();
      });
});
$(function () {
    $("#altitude")
      .click(function (event) {
		  this.focus();this.select();
      });
});
$(function () {
    $("#azimuth")
      .click(function (event) {
		  this.focus();this.select();
      });
});
$(function () {
    $("#zfactor")
      .click(function (event) {
		  this.focus();this.select();
      });
});
	$(function () {
    $("#resetBathy")
	.button({
        text: false,
        icons: {
            primary: "ui-icon-arrowreturnthick-1-w"
        }
    })
		 .click(function (event) {
		$('input[name="to"]').val('50');
		$('input[name="from"]').val('-5223');
		$("#colorscale").val("OrangeGreenBlue").change();
		$('#bathyAppChanges').click();		
		event.preventDefault();
	 });
	});
		$(function () {
    $("#resetBathyShaded")
	.button({
        text: false,
        icons: {
            primary: "ui-icon-arrowreturnthick-1-w"
        }
    })
		 .click(function (event) {
		$('input[name="azimuth"]').val('315');
		$('input[name="altitude"]').val('45');
		$('input[name="zfactor"]').val('5')*(3);
		$('#shadedAppChanges').click();		
		event.preventDefault();
	 });
	});

		$(function () {
    $("#zoomtoLoc")
      .button()
      .click(function (event) {	
        map.fitBounds(marker.getBounds(), {
          padding: [20, 20],
          maxZoom: 17
        });
      });
    });
	
if(!('ontouchstart' in window)){
    $('#depth-ranges input').tooltip('destroy');
	$('#form-Shading input').tooltip('destroy');
}

