/*Initialization of the program.
 *
 *
 */

//used for any external resources like bids
var proxy = "proxy?url=";
//this will be used for all data sets served directly from our server
var baseDataURL = "static/data/"
//the file with all fo the
var generalBaseLayer = "DiscoverDiplomacy-Data_110m.json";



var allLayersGroup = new L.LayerGroup();
var allLayersGroupPts = new L.LayerGroup();

//hold the main and currentkey
var mainKey;
var currentKey;




var geoJsonList = {};
var geoJsonLayer;
var keysets;

var hash;
//load the base geoJson layer


/*
	Load the data here

*/

var bidsPopup = function(feature, layer){
	//layer.bindPopup(feature.properties.Project_Title);
	var linktoproject = "";
	if (feature.properties.Link_To_Project != null){
		linktoproject = "<br><a target='_blank' href='"+feature.properties.Link_To_Project +"'>Project Website</a><br/>"
	}
	projectannounceddate = ""
	if (feature.properties.Project_Announced != null){
		var tempdate = new Date(feature.properties.Project_Announced);
		projectannounceddate = "<br>Date Added: " + tempdate.toDateString();
	}

	layer.bindPopup("<h3>" + feature.properties.Project_Title + 
	"</h3><br>Sector: " + feature.properties.Sector +
	"<br> US$: " + addCommas(feature.properties.Project_Size) + 
	"<br> Status: " + feature.properties.Status +
	projectannounceddate + 
	"<br>Primary Funding Source: " + feature.properties.Project_Funding_Source + 
	"<br>" + linktoproject + "<a href='" + feature.properties.Business_URL + "' target='_blank'>Contact</a>");

}

var IMOPopup = function(feature, layer){
	layer.bindPopup("Ship Name: " + feature.properties['Ship Name'] +
	"<br> Incident: " + feature.properties['Incident d'] + 
	"<br> Action Taken: " + feature.properties['Action tak']);
}

var createLayer = function(data, styleObj){

	if (styleObj['externalresource']){
		return $.ajax({
		dataType: "json",
		url: proxy + styleObj['externalresource']
		}).then(function (data){
				var onEachPopup = bidsPopup;
				if (styleObj['attributeName'] == "IMO"){
					var onEachPopup = IMOPopup;
				}
				return new L.geoJson(data, {style: function(feature){ 
								//pass attribute value to the getColor
								styleObj['fillColor'] = getColor(styleObj['attributeName'], feature.properties[styleObj['attributeName']]);
								return styleObj;
								},
								onEachFeature: onEachPopup
							});
		});
	}


	return new L.geoJson(data, {style: function(feature){ 
										//pass attribute value to the getColor
										styleObj['fillColor'] = getColor(styleObj['attributeName'], feature.properties[styleObj['attributeName']]);
										styleObj['color'] = '#666';
										return styleObj;
										},
								onEachFeature: onEachFeature});
};

var loadPointLayer = function(layerobj, theparent){
	//already checked if the point layer is valid
	$.ajax({
		url: "geojson?layerid=" + layerobj['ptsLayer'],
		dataType: 'json',
		success: function(data){
			allLayersGroupPts.addLayer(new L.geoJson(data, {onEachFeature: onEachFeaturePts}));
			map.addLayer(allLayersGroupPts)
		}
	});

}





$.ajax({
	//url: baseURL.replace("*******", generalBaseLayer),
	url: baseDataURL + generalBaseLayer,
	dataType: 'json',
	//ignite(data) is found on the main index.jsp page
	success: function(data){ignite(data);$("#loading").hide();$("#loading_splash").hide();$("#splash_buttons").show();} 

});





/*

set up the map

*/



var cmAttr = "<a href='mailto:dittemoremb@state.gov'>eDiplomacy Geo|DST</a>"
//cmAttr = 'Data: <a href="http://www.eia.gov/countries/data.cfm" title="U.S. Energy Information Administration">EIA</a>, <a href="http://www.openstreetmap.org/" title="&copy; OpenStreetMap contributors">OpenStreetMap</a>, <a href="http://www.cloudmade.com/" title="&copy; 2011 CloudMade">CloudMade</a>, <a href="http://www.stamen.com/" title="Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.">Stamen Design</a>',

var map = new L.Map('map', {
	zoomControl: false,
	center: [20, 10],
	zoom: 2,
	maxZoom: 6,
	minZoom: 2,
	worldCopyJump: false,
	attributionControl: false,
	maxBounds: L.latLngBounds(L.latLng(-180, -360), L.latLng(180, 360))
});

var precipitation = L.tileLayer.wms('http://54.197.226.119/geoserver/opengeo/wms', {
    format: 'image/png',
    transparent: true,
    layers: 'opengeo:baselayer',
    noWrap: true
}).addTo(map);

new L.Control.Zoom({ position: 'topright' }).addTo(map);

/*

L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
	maxZoom: 18,
	id: 'examples.map-20v6611k'
}).addTo(map);


*/

/*
var keyToggle = L.control({position: "bottomleft"});

keyToggle.onAdd = function (map) {
	this._div = L.DomUtil.create('div', 'toggleSidePane info'); // create a div with a class "info"
	

	return this._div;
};

// method that we will use to update the control based on feature properties passed

keyToggle.addTo(map);

*/



/*

utitlities


*/
function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

var convertValuetoLabel = function(feature, attributeName, tempObj){
		var featureval = feature.properties[attributeName];
		if ($.type(featureval) != "string"){
			return addCommas(featureval);
		}

		try{
			var thevalue =  tempObj['labels']['labels'][$.inArray(featureval, tempObj['labels']['values'])];
			if (thevalue && thevalue != "null"){
				return thevalue;
			}
			else{
				return "No Value";
			}
		}
		catch(err){
			return "No Value";

		}
}





/*

	Render viewers


*/




var renderSidePanelPiece = function(index, layerobj, counter){

	//if ($.inArray("grades", layerobj)){
		//do stuff that may be outside the below code

	//}
	//else{

	var key1div = L.DomUtil.create('div');
	var values = layerobj['labels']['values'];
		// this is something like a subheader
	var keyLabels = [];
	var labels = layerobj['labels']['labels'];

	if (values == null && layerobj['labels']['html']){
		keyLabels.push(layerobj['labels']['html']);
	}
	else{
		for (var i = 0; i < values.length; i++) {
			keyLabels.push(
				'<i style="background:' + getColor(layerobj['jsonStyle']['attributeName'],values[i]) + '"></i>' +
				labels[i]
			);
		}	
	}

	var keypanel = "<div class='legend'>" + keyLabels.join('<br>') + "</div>";
	
	var keyAccordionTitle = "<div class='panel panel-default'> \
								<a data-toggle='collapse' data-parent='#accordion' href='#collapse" + counter + "' class='sideBarLayerToggle' id='" + index + "id' name='" + index + "'> \
								<div class='panel-heading'> \
										<h4 class='panel-title'> "+ layerobj['subject'] + "</h4> \
								</div></a>";


	var keyAccordionPanel = "<div id=\"collapse" + counter + "\" class=\"panel-collapse collapse\"><div class=\"panel-body\">" + layerobj['description'] + "</div>" + keypanel + "<div id='hover_value'></div> \
							<p><small>" + layerobj['attribution'] + "</small></p></div>";

	return keyAccordionTitle + keyAccordionPanel;


}



var renderSidePanel = function(sidekey){
	currentSideKey = keysets[sidekey];

	var returnhtml = "";
	returnhtml += "<div class=\"headwrapper\"> \
						<div class=\"\"> \
							<h4 class=\"\"> \
							"+	currentSideKey['categoryName'] +"\
							</h4> \
						</div>";
	returnhtml += "<div class=\"in\"><div class=\"more\">" + currentSideKey['categoryDescription'] + "</div></div></div>";
	returnhtml += "<p class='small-instructions'><small>Click the buttons to update the map</small></p>";
	returnhtml += "<div class=\"panel-group\" id=\"accordion\">";
	//returnhtml += "</div>"
	var counter = 1;
	$.each(currentSideKey['layers'], function(index, value){
		var tempreturn = renderSidePanelPiece(index,value, counter) + "</div>";
		returnhtml += tempreturn
		counter += 1;
	});

	returnhtml += "</div><br/>";

	return returnhtml;

}






/*

	map controls


*/




var onEachFeature = function(feature, layer){
	layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight//,
        //click: zoomToFeature
    });
}




var highlightFeature = function(e){
	var layer = e.target;
	var feature = e.target.feature;
	var content = "<strong>" + feature.properties['Country'] + "</strong>";
	var tempcurrentkey = currentKey.split("+");
	if (tempcurrentkey.length < 2){
		return;
	}
    var tempObj = keysets[tempcurrentkey[0]]['layers'][tempcurrentkey[1]];
	if ($("#slidervalue").val()){
		var attributeTimeName = currentSliderObj[$("#slidervalue").val()]
		content += ": " + convertValuetoLabel(feature, attributeTimeName, tempObj);

	}
	else{
		content += ": " + convertValuetoLabel(feature, tempObj['jsonStyle']['attributeName'], tempObj);

	}

	$(".leaflet-control-infobox-interior").html(content);
	$(".leaflet-control-infobox-interior").show();
	//$("#hover_value").html(content);

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: ''
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
}

var resetHighlight = function(e){
	$(".leaflet-control-infobox-interior").html("");
	$(".leaflet-control-infobox-interior").hide();
	var tempcurrentlayer = allLayersGroup.getLayers()[0];
	var tempcurrentkey = currentKey.split("+");
	if (tempcurrentkey.length < 2){
		return;
	}
	tempcurrentlayer.resetStyle(e.target);
	return;
}

L.Control.Command = L.Control.extend({
    options: {
        position: 'topleft',
    },

    onAdd: function (map) {
        var controlDiv = L.DomUtil.create('div', 'leaflet-control-infobox');

        var controlUI = L.DomUtil.create('div', 'closed leaflet-control-infobox-interior', controlDiv);
        controlUI.title = 'Map Commands';
        return controlDiv;
    }
});
var mycontrol = new L.Control.Command;
mycontrol.addTo(map);







function zoomToFeature(e) {
	map.fitBounds(e.target.getBounds());
}




function onEachFeaturePts(feature, layer) {
	layer.on({
	//mouseover: highlightFeature,
	//mouseout: resetHighlight
	//click: zoomToFeature
	});

	var popupContent = "";
	
	// NEW POPUP CODE - In Progress
	// popup for photo and video
	if (feature.properties.PhotoURL != null && feature.properties.VideoURL != null){
		popupContent = "<h4>" + feature.properties.Title + "</h4><h5>" + feature.properties.Country + "</h5><video style='margin-top:-50px;' width='300' height='240' controls><source src='../vid/sample_mpeg4.mp4' type='video/mp4'>Your browser does not support the video tag.</video><br><img src='../img/" + feature.properties.PhotoURL + "' alt='photo test' height='80' width='100%'><h5 style='height:140px; overflow-y:scroll'>" + feature.properties.Story + "</h5>";
		layer.bindPopup(popupContent);
	} 
	// popup for photo only
	else if (feature.properties.PhotoURL != null && feature.properties.VideoURL == undefined){
		popupContent = "<h4>" + feature.properties.Title + "</h4><h5>" + feature.properties.Country + "</h5><img src='../img/" + feature.properties.PhotoURL + "' alt='photo test' height='80' width='100%'>< style='height:140px; overflow-y:scroll'h5>" + feature.properties.Story + "</h5>";
		layer.bindPopup(popupContent);
	}
	// popup for video only
	else if (feature.properties.PhotoURL == undefined && feature.properties.VideoURL != null){
		popupContent = "<h4>" + feature.properties.Title + "</h4><h5>" + feature.properties.Country + "</h5><video style='margin-top:-50px;' width='300' height='240' controls><source src='../vid/sample_mpeg4.mp4' type='video/mp4'>Your browser does not support the video tag.</video><h5 style='height:140px; overflow-y:scroll'>" + feature.properties.Story + "</h5>";
		layer.bindPopup(popupContent);
	// popup text only
	} else {
		popupContent = "<h3>" + feature.properties.Title + "</h3><h4>" + feature.properties.Country + "</h4><h6 style='height:140px; overflow-y:scroll; font-size: small; font-weight: normal' >" + feature.properties.Story + "</h6>";
		layer.bindPopup(popupContent);
	} 
}





 function clearLayers() {
 	if (currentSliderObj){
 		destoryTimeSlider();
 	}
	allLayersGroup.clearLayers();
	allLayersGroupPts.clearLayers();
}

var destoryTimeSlider = function(){
	$( ".timeSlider" ).fadeOut( "slow", function() {});
	currentSliderObj = null;
	$("#slidervalue").val("");
	$( "#slider" ).slider( "destroy" );
}



/*Time Slider controls

*/


var currentSliderObj;
var sliderkey;
var setupTimeSlider = function(timeJsonObj){
	currentSliderObj = timeJsonObj;
	// get my keys
	sliderkey = $.map(timeJsonObj, function(element,index) {return index});
	$("#slidervalue").val(sliderkey[0]);


    $( "#slider" ).slider({
      min: 0,
      max: sliderkey.length -1,
      step: 1,
      slide: function( event, ui ) {
      	$("#slidervalue").val(sliderkey[ui.value]);
      	//use currentkey
      	var tempcurrentlayer = allLayersGroup.getLayers()[0];
	    var tempcurrentkey = currentKey.split("+");
	    var tempStyleObj = keysets[tempcurrentkey[0]]['layers'][tempcurrentkey[1]]['jsonStyle'];
	    tempcurrentlayer.setStyle(function(feature){ 
											var theattribute = currentSliderObj[$("#slidervalue").val()]
											//pass attribute value to the getColor
											tempStyleObj['fillColor'] = getColor(tempStyleObj['attributeName'], feature.properties[theattribute]);
											return tempStyleObj;
										});
      }
    });

    var tempcurrentlayer = allLayersGroup.getLayers()[0];
	var tempcurrentkey = currentKey.split("+");
	var tempStyleObj = keysets[tempcurrentkey[0]]['layers'][tempcurrentkey[1]]['jsonStyle'];
    tempcurrentlayer.setStyle(function(feature){ 

										//pass attribute value to the getColor
										tempStyleObj['fillColor'] = getColor(tempStyleObj['attributeName'], feature.properties[tempStyleObj['attributeName']]);
										return tempStyleObj;
									});


	$( ".timeSlider" ).fadeIn( "slow", function() {});
}









/*Map Styles
 *
 *
 *
 */

 function getColor(mainKey, prop) {
 	var d = prop;
	switch(mainKey) {
		case "TBIncidence-100k_2012":
			dint = parseInt(d);
			if (dint > 399){
				return '#CA1300';
			}
			else if (dint > 299){
				return	'#D29200'
			}
			else if (dint > 124){
				return	'#D5d500'
			}
			else if (dint > 49){
				return	'#98D900'
			}
			else if (dint > 19){
				return	'#59DD00'
			}
			else if (dint > 9){
				return	'#17E100'
			}
			else {
				return '#00E52D';
			}
			break;
		case "ChildMort_2012":
			dint = parseInt(d);
			if (dint > 199){
				return '#0868ac';
			}
			else if (dint > 99){
				return	'#43a2ca'
			}
			else if (dint > 49){
				return	'#7bccc4'
			}
			else {
				return '#bae4bc';
			}
			break;
		case "NIV_1997": 
			dint = parseInt(d);
			if (dint > 99999){
				return '#253494';
			}
			else if (dint > 49999){
				return	'#2c7fb8'
			}
			else if (dint > 24999){
				return	'#41b6c4'
			}
			else if (dint > 9999){
				return	'#7fcdbb'
			}
			else if (dint > 4999){
				return	'#c7e9b4'
			}
			else {
				return '#ffffcc';
			}
			break;
		case "MalariaElim_2012":
			if (d == '4') {
				return	'#FC4E2A';
			} else if (d == '3') {
				return	'#CACF9B';
			} else if (d == '2') {
				return	'#CACF9B';
			} else if (d == '1') {
				return	'#CACF9B';
			} else {
				return	'#ddd';
			}
			break;
		case "TPIndex_2014":
			if (d == '6'){
				return "#6e016b"
			} else if (d == '5') {
				return	'#88419d'
			} else if (d == '4') {
				return	'#8c6bb1'
			} else if (d == '3') {
				return	'#8c96c6'
			} else if (d == '2') {
				return	'#9ebcda'
			} else if (d == '1') {
				return	'#bfd3e6'
			} else {
				return	'#ddd';
			}
			break;
		case "MLOIndex_2014":
			if (d == '5') {
				return	'#006837'
			} else if (d == '4') {
				return	'#31a354'
			} else if (d == '3') {
				return	'#78c679'
			} else if (d == '2') {
				return	'#addd8e'
			} else if (d == '1') {
				return	'#d9f0a3'
			} else {
				return	'#ddd';
			}
			break;
		case "AUMember_2014":
			if (d == 'Member') {
				return	'#de2d26'
			} else if (d == 'Suspended') {
				return	'#fc9272'
			} else {
				return	'#ddd';
			}
			break;
	    case "TIPS_2013":
			if (d == 'Special Case') {
				return	'#a63603'
			} else if (d == 'Tier 3') {
				return	'#e6550d'
			} else if (d == 'Tier 3 Auto-Downgrade') {
				return	'#fd8d3c'
			} else if (d == 'Tier 2 Watch List') {
				return	'#fdae6b'
			} else if (d == 'Tier 2') {
				return	'#fdd0a2'
			} else if (d == 'Tier 1') {
				return	'#feedde'
			} else {
				return	'#ddd';
			}
			break;
		case "MaternalHealthAccessToCare_2014":
			if (d == 'Excellent') {
				return	'#00BDFF'
			} else if (d == 'Good') {
				return	'#009DD4'
			} else if (d == 'Fair') {
				return	'#007BA6'
			} else if (d == 'Poor') {
				return	'#004E69'
			} else if (d == 'Unsuitable') {
				return	'#002430'
			} else {
				return	'#ddd';
			}
			break;
		case "PEPFAR_2014":
			if (d == '3') {
				return	'#78c679'
			} else if (d == '2') {
				return	'#addd8e'
			} else if (d == '1') {
				return	'#d9f0a3'
			} else {
				return	'#ddd';
			}
			break;
		case "TBDrugResistance-2012":
			if (d == '0') {
				return	'#1bf782'
			}else {
				return	'#ddd';
			}
			break;
		case "USAID-GlobalHealth_2014":
			if (d == '1') {
				return	'#843f0f'
			}else {
				return	'#ddd';
			}
			break;
		case "USAID-DHRA_2014":
			if (d == '1') {
				return	'#FC4E2A'
			}else {
				return	'#ddd';
			}
			break;
		case "USAID-WatSan_2014":
			if (d == '1') {
				return	'#1f78b4'
			}else {
				return	'#ddd';
			}
			break;
		case "USAID-CrisisConflict_2014":
			if (d == '1') {
				return	'#717973'
			}else {
				return	'#ddd';
			}
			break;
		case "USAID-GenderWomen_2014":
			if (d == '1') {
				return	'#717dc4'
			}else {
				return	'#ddd';
			}
			break;
		case "USAID-EnvClimate_2014":
			if (d == '1') {
				return	'#7ec329'
			}else {
				return	'#ddd';
			}
			break;
		case "USAID-ScienceTech_2014":
			if (d == '1') {
				return	'#FC4E2A'
			}else {
				return	'#ddd';
			}
			break;
		case "ICAOMember_2014":
			if (d == 'Member') {
				return	'#e42632'
			}else {
				return	'#ddd';
			}
			break;
		case "UNESCOMember_2014":
			if (d == 'Member') {
				return	'#636363'
			}else {
				return	'#ddd';
			}
			break;
		case "FAOMember_2014":
			if (d == 'Member') {
				return	'#79BD8F'
			}else {
				return	'#ddd';
			}
			break;
		case "OASMember_2014":
			if (d == 'Member') {
				return	'#d95f0e'
			}else {
				return	'#ddd';
			}
			break;
		case "UNGAMember_2014":
			if (d == 'Member') {
				return	'#C7C59F'
			}else {
				return	'#ddd';
			}
			break;
		case "OSCEMember_2014":
			if (d == 'Member') {
				return	'#FDC173'
			}else {
				return	'#ddd';
			}
			break;
		case "OECDMember_2014":
			if (d == 'Member') {
				return	'#B62B3C'
			}else {
				return	'#ddd';
			}
			break;
		case "NATOMember_2014":
			if (d == 'Member') {
				return	'#7fcdbb'
			}else {
				return	'#ddd';
			}
			break;
		case "EUMember_2014":
			if (d == 'Member') {
				return	'#14618D'
			}else {
				return	'#ddd';
			}
			break;
		case "UNHCRMember_2014":
			if (d == 'Member') {
				return	'#618E99'
			}else {
				return	'#ddd';
			}
			break;
		case "APECMember_2014":
			if (d == 'Member') {
				return	'#8F9E95'
			}else {
				return	'#ddd';
			}
			break;
		case "NAFTAMember_2014":
			if (d == 'Member') {
				return	'#062943'
			}else {
				return	'#ddd';
			}
			break;
		case "WTOMember_2014":
			if (d == 'Member') {
				return	'#424DA1'
			}else {
				return	'#ddd';
			}
			break;
		case "ASEANMember_2014":
			if (d == 'Member') {
				return	'#70523A'
			}else {
				return	'#ddd';
			}
			break;
		case "CBERAMember_2014":
			if (d == 'Member') {
				return	'#A15979'
			}else {
				return	'#ddd';
			}
			break;
		case "CAFTAMember_2014":
			if (d == 'Member') {
				return	'#F1BA4E'
			} else if (d == 'Observer') {
				return	'#C0C44E'
			} else {
				return	'#ddd';
			}
			break;
		case "NucSign_2014":
		case "NucDepo_2014":
			if (d == 'X') {
			return	'#FC4E2A'
			} else {
				return	'#ddd';
			}
			break;
		case "TPMember":
			if (d == 'Member') {
				return	'#FC4E2A'
			} else if (d == 'Observer') {
				return	'#FC4E2A'
			} else {
				return	'#ddd';
			}
			break;
		case "PEPFAR_2014":
		case "NNPTSigned_2014":
			if (d == 'X') {
			return	'#FC4E2A'
			} else {
				return	'#ddd';
			}
			break;
		case "NNPTDeposited_2014":
			if (d == 'X') {
			return	'#FC4E2A'
			} else {
				return	'#ddd';
			}
			break;
		case "NNPTSignedDeposited_2014":
			if (d == '2') {
				return	'#FC4E2A'
			} else if (d == '1') {
				return	'#FD8D3C'
			} else if (d == '0') {
				return	'#CACF9B'
			} else {
				return	'#ddd';
			}
			break;
	    default:
	        return '#FC4E2A';
	}
}






/* UI Controls of the site.  This will bind all listeners
 *
 *
*/


var mainKeySidebarFunc = function(ev){
	//clear all layers on this
	clearLayers();
	mainkey = $(this).attr("name");
	map.addLayer(allLayersGroup, {insertAtTheBottom: true});
	//add all layers as part of this key
	/*$.each(keysets[mainkey]['layers'], function(index, valueset){
		allLayersGroup.addLayer(valueset['jsonLayer']);
	});*/

	hash.trigger("move");
	//trigger the hash update
}


var sideBarClick = function(ev){

	var layername = $(this).attr('name');
	currentKey = mainkey + "+" + layername
	var templayerobj = keysets[mainkey]['layers'][layername];

	allLayersGroup.clearLayers();
	allLayersGroupPts.clearLayers();

	allLayersGroup.addLayer(templayerobj['jsonLayer']);

	if (templayerobj['ptsLayer'] != "" && templayerobj['ptsLayer'] != null){
		loadPointLayer(templayerobj, currentKey)
	}
	map.addLayer(allLayersGroup);
	map.addLayer(allLayersGroupPts);

	if (templayerobj['jsonStyle']['timeEnabled']){
		setupTimeSlider(templayerobj['timeSeriesInfo']);
	}
/* in format   "bbox": [[-10, -10 ], [ 10, 10]] */
	if (templayerobj['jsonStyle']['bbox']){
		 map.fitBounds(templayerobj['jsonStyle']['bbox']);
	}


	hash.trigger("move");

}


$(".mainKey").click(function(ev, mainClickCallbacker){
	//clear all layers on this
	$("#mapKeybutton").trigger("click");
	clearLayers();
	mainkey = $(this).attr("name");
	map.addLayer(allLayersGroup, {insertAtTheBottom: true});
	//add all layers as part of this key
	/*$.each(keysets[mainkey]['layers'], function(index, valueset){
		allLayersGroup.addLayer(valueset['jsonLayer']);
	});*/

	var returnhtml = renderSidePanel(mainkey);
	$("#mapKey").html(returnhtml);

	$(".more").each(moreFunction);
	$(".mainKeySidebar").click(mainKeySidebarFunc);

	//if the description panel is closed then open it
	/*
	if ($("#descPane").hasClass("closed")){
		clearLayers();
		$(".toggleSidePane").trigger("click");
	}
	*/

	//unbind previous bindings so we don't conflict
	$(".sideBarLayerToggle").unbind("click");

	

	//bind event to layers to turn them on
	$(".sideBarLayerToggle").click(sideBarClick);
	if (mainClickCallbacker){
		mainClickCallbacker();
	}
	hash.trigger("move");
	//trigger the hash update

});



$(".btn-group").children().click(function(ev){
	$(".btn-group").children().removeClass("btnon");
	$(".sideBarTabContent").hide();
	$(this).addClass("btnon");

	var tempcallkey = $(this).attr('id');
	$("." + tempcallkey).show();
	return false;

	//show the approparite panel

	//stuff happens

});




var moreFunction = function() {

	if($(this).innerHeight() > 200){
		$(this).addClass("fadetext");
		$(this).readmore({
		  moreLink: '<a class="read-more-link MBT-readmore">Read more ></a>',
		  lessLink: '<a class="read-less-lin MBT-readmore">< Read less</a>',
		  maxHeight: 185,
		  speed: 200,
		  afterToggle: function(trigger, element, expanded) {
			if(! expanded) { // The "Close" link was clicked
				$(element).addClass("fadetext");
			  $('html, body').animate( { scrollTop: element.offset().top }, {duration: 100 } );
			}
			else{
				$(element).removeClass("fadetext");
			}
		  }
		});
	}
}








var renderResultItem = function(valueobj, counter){


	
	var keyAccordionTitle = "<a data-toggle='collapse' data-parent='#accordion' href='#collapse" + counter + "' class='resultItem' id='" + valueobj['keyid'] + "' name='" + valueobj['keyid'] + "'> \
								<div class='panel-heading'> \
										<h4 class='panel-title'> "+ valueobj['subject'] + "</h4> \
								</div></a>";


	return keyAccordionTitle;
}


$(".externalSearchForm").submit(function(ev){
	$("#searchKeybutton").trigger("click");
	$("#inputSearch").val($("#header-search-box").val());
	$("#header-search-box").val("See Results Below");
	$("#searchform").trigger("submit");
	ev.preventDefault();
	return false;
});	




$("#searchform").submit(function(ev){
	var tempq = $("#inputSearch").val();
	$(".resultItem").unbind('click');
	//clear results and show loader
	$(".resultsloader").removeClass("closed");

	$.ajax({
		url: "searchLayers?q=" + tempq,
		dataType: 'json',
		success: function(data){
			if (data.length==0){
				$('#resultsblock').html("No results found.");
			}
			else{
				var outputhtml = "";
				$.each(data, function(index, valueobj){
					outputhtml += renderResultItem(valueobj, index);
				});
				$("#resultsblock").html(outputhtml);
				$(".resultItem").click(function(ev){
					clearLayers();
					currentKey = $(this).attr('id');
					var tempsplit = currentKey.split("+");
					layername = tempsplit[1];
					mainkey = tempsplit[0];
					var returnhtml = renderSidePanel(mainkey);
					$("#mapKey").html(returnhtml);
					$(".more").each(moreFunction);



					$(".sideBarLayerToggle").unbind('click');
					$("#" + layername + "id").trigger("click");
					//bind event to layers to turn them on
					$(".sideBarLayerToggle").click(sideBarClick);

					
					$("#mapKeybutton").trigger('click');


					var templayerobj = keysets[mainkey]['layers'][layername];

					allLayersGroup.clearLayers();
					allLayersGroupPts.clearLayers();

					allLayersGroup.addLayer(templayerobj['jsonLayer']);

					if (templayerobj['ptsLayer'] != "" && templayerobj['ptsLayer'] != null){
						loadPointLayer(templayerobj, currentKey)
					}
					map.addLayer(allLayersGroup);
					map.addLayer(allLayersGroupPts);

					if (templayerobj['jsonStyle']['timeEnabled']){
						setupTimeSlider(templayerobj['timeSeriesInfo']);
					}
					if (templayerobj['jsonStyle']['bbox']){
						 map.fitBounds(templayerobj['jsonStyle']['bbox']);
					}


					hash.trigger("move");


				});
			}

			$(".resultsloader").addClass("closed");
			//hide loader
		}
	});

	//get mainkey and subkey results
	//iterate to render side panels with index,layerobj,and counter
	//render side panels


	ev.preventDefault();
	return false;
})





/*
$(".toggleSidePane").unbind("click");
//side bar control.  Need pass after the it is added to the map and map is rendered
$(".toggleSidePane").html("Show").click(function(){
	if ($("#descPane").hasClass("closed")){
		//populate the info.
		$(this).html("Hide");
		$("#descPane").removeClass("closed");
		$("#mapPane").addClass("expanded");
		//make it opena nd change inner html
	}
	else {
		$(this).html("Show");
		$("#descPane").addClass("closed");
		$("#mapPane").removeClass("expanded");
		//just close it
	}
});
*/


/*  Splash Screen */


if ( (! $.cookie('splashScreen') || $.cookie('splashScreen') == "false") && $("#descPane").css('min-height') != "250px"){
	$("#loading").hide();
	$('#splashScreen').modal('show'); 
}
/*
$("#addSplashCookie").click(function(ev){
	$.cookie('splashScreen', "true");
	$(this).html(" Got it, you won't see the splash again.  For testing you can reset this setting under the share button ");
	$(this).unbind('click');
	return false;
});

$("#removeSplashCookie").click(function(ev){
	$.removeCookie('splashScreen');
	$(this).html(" Got it, You can now reload this page, and you will see the splash screen ");
	$(this).unbind('click');
	return false;
});
*/


$("#viewTour").click(function(ev){
	$('#splashScreen').modal('hide');
	// Initialize the tour
	tour.init();

	// Start the tour
	tour.start();
	return false;
});

$("#viewSplash").click(function(ev){
	$('#splashScreen').modal('show');
});

$("#noTour").click(function(ev){
	$('#splashScreen').modal('hide');
	return false;
});

$("#noSplash").click(function(ev){
	$.cookie('splashScreen', "true");
	$('#splashScreen').modal('hide');
	ev.preventDefault();
	return false;
})


