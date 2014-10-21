/*Initialization of the program.
 *
 *
 */

//used for any external resources like bids
var proxy = "geoproxy/?url=";
//this will be used for all data sets served directly from our server
var baseDataURL = "static/data/"
//the file with all fo the
//var generalBaseLayer = "DiscoverDiplomacy-Data_50m.json";
var generalBaseLayer = "DiscoverDiplomacy-Topo_50m.json";
var disputedAreasLayer = "DisputedAreas_50m.json";



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
	"<br> US: $" + addCommas(feature.properties.Project_Size) + 
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

var UNHCRPopup = function(feature, layer){
	var tempoutput = "";
	tempoutput += "<strong>" + feature.properties['name'] + "</strong><br/>";
	if (feature.properties.hasOwnProperty("value")){
		tempoutput += addCommas(feature.properties["value"]) + " People<br/>";
	}
	if (feature.properties.hasOwnProperty("updated_at")){
		tempoutput += "Last Updated: " + feature.properties["updated_at"];
	}

	layer.bindPopup(tempoutput);

}

var redIcon = L.icon({
    iconUrl: 'static/lib/Leaflet-0.7.2/dist/images/marker-icon.png',
    iconRetinaUrl: 'static/lib/Leaflet-0.7.2/dist/images/marker-icon-2x.png',
	//iconSize: [20, 25],
    //iconAnchor: [22, 94],
    //popupAnchor: [-3, -76],
    //shadowUrl: 'my-icon-shadow.png',
    //shadowRetinaUrl: 'my-icon-shadow@2x.png',
    //shadowSize: [68, 95],
    //shadowAnchor: [22, 94]
});
var storyIcon = L.icon({
    iconUrl: 'static/lib/Leaflet-0.7.2/dist/images/story-marker.png',
    iconRetinaUrl: 'static/lib/Leaflet-0.7.2/dist/images/story-marker.png',
    iconSize: [40, 40],
    //iconAnchor: [22, 94],
    //popupAnchor: [-3, -76],
    //shadowUrl: 'my-icon-shadow.png',
    //shadowRetinaUrl: 'my-icon-shadow@2x.png',
    //shadowSize: [68, 95],
    //shadowAnchor: [22, 94]
});
externalLayerLoad = function(templayerobj){
	$("#loading").show();
	if (templayerobj['jsonStyle']['attributeName'] == "Bureaus"){
		//append the layers into 
		loadBureaus();
		$("#loading").hide();
		return externalLayerLoad;
	}
	$.ajax({
		dataType: "json",
		url: proxy + templayerobj['jsonStyle']['externalresource'],
		timeout:5000
		}).fail(function(error){ 
			countryJSONLayer.setStyle(function(feature){ 
						//pass attribute value to the getColor
						styleobj = {};
						styleobj['fillOpacity'] = 0;
						return styleobj;
					});
			$("#loading").hide();
			alert("Data published from external organization is unavailable at this time.");

		}).done(function (data){
				var onEachPopup = bidsPopup;
				if (templayerobj['jsonStyle']['attributeName'] == "IMO"){
					var onEachPopup = IMOPopup;
				}
				else if (templayerobj['jsonStyle']['attributeName'] == "UNHCR"){
					var onEachPopup = UNHCRPopup;
				}


				var markerClusterGrp = new L.markerClusterGroup({ showCoverageOnHover: false, zoomToBoundsOnClick: true, iconCreateFunction: iconCreateCluster, disableClusteringAtZoom: maxZoom});

				var tempMarkerLayer = new L.geoJson(data, {
							 pointToLayer: function (feature, latlng) {
							 		return L.marker(latlng, {icon: redIcon});
							        //return L.circleMarker(latlng, geojsonMarkerOptions);
							    },
								onEachFeature: onEachPopup
							});


				markerClusterGrp.addLayer(tempMarkerLayer);

				if (templayerobj['jsonStyle']['secondarystyle']){
					countryJSONLayer.setStyle(function(feature){ 
								//pass attribute value to the getColor
								if (templayerobj['jsonStyle']['secondarystyle']['attributeName'] == ""){
									templayerobj['jsonStyle']['secondarystyle']['fillOpacity'] = 0;
								}
								else{
									templayerobj['jsonStyle']['secondarystyle']['fillColor'] = getColor(templayerobj['jsonStyle']['secondarystyle']['attributeName'], feature.properties[templayerobj['jsonStyle']['secondarystyle']['attributeName']]);
									templayerobj['jsonStyle']['secondarystyle']['color'] = '#666';
								}
								return templayerobj['jsonStyle']['secondarystyle'];
							});
					markerClusterGrp = [markerClusterGrp, countryJSONLayer];
				}

				templayerobj['jsonLayer'] = markerClusterGrp;

				if (templayerobj['jsonLayer'].length != undefined){
					$.each(templayerobj['jsonLayer'], function(index, layer){
						allLayersGroup.addLayer(layer);
					});
				}
				else{
					allLayersGroup.addLayer(templayerobj['jsonLayer']);
				}

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


				$("#loading").hide();


/*
				return 
*/
		});









}



var loadPointLayer = function(layerobj, theparent){
	//already checked if the point layer is valid
	$.ajax({
		url: "geojson/?layerid=" + layerobj['ptsLayer'],
		dataType: 'json',
		success: function(data){
			allLayersGroupPts.addLayer(new L.geoJson(data, {pointToLayer: function (feature, latlng) {
							 		return L.marker(latlng, {icon: storyIcon});
							        //return L.circleMarker(latlng, geojsonMarkerOptions);
							    },
							    onEachFeature: onEachFeaturePts}));
			map.addLayer(allLayersGroupPts)
		}
	});

}


var countryJSONLayer;

$( document ).ready(function() {
	countryJSONLayer = new L.geoJson(null, {onEachFeature: onEachFeature});
	countryJSONLayer = omnivore.topojson(baseDataURL + generalBaseLayer,{}, countryJSONLayer)
	.on('ready', function() {
		loadBureaus();
		ignite();
	    $("#loading").hide();
	    $("#loading_splash").hide();
	    $("#splash_buttons").show();
    })
    .on('error', function() {
    	console.log("there was an error");
    });

});
/*
$.ajax({
	//url: baseURL.replace("*******", generalBaseLayer),
	url: baseDataURL + generalBaseLayer,
	dataType: 'json',
	//ignite(data) is found on the main index.jsp page
	success: function(data){} 

});
*/




/*

set up the map

*/



var cmAttr = "<a href='mailto:dittemoremb@state.gov'>eDiplomacy Geo|DST</a>"

var width = (window.innerWidth);
var deviceZoom;

if (width <= 480) {
	deviceZoom = "1";
	//initZoom = "1";
} else if (width <= 800) {
	deviceZoom = "1";
	//initZoom = "2";
} else if (width <= 1024) {
	deviceZoom = "2";
	//initZoom = "2";
} else if (width <= 1400) {
	deviceZoom = "2";
	//initZoom = "3";
} else if (width <= 1600) {
	deviceZoom = "3";
	//initZoom = "3";
} else if (width <= 3200) {
	deviceZoom = "3";
	//initZoom = "4";
} else if (width <= 3840) {
	deviceZoom = "4";
	//initZoom = "4";
} else if (width <= 10000) {
	deviceZoom = "5";
	//initZoom = "5";
} else {
	deviceZoom = "5";
	//initZoom = "6";
}

var maxZoom = "6";

var southWest = L.latLng(-67,-180),
	northEast = L.latLng(80, 190),
	bounds = L.latLngBounds(southWest, northEast);

var map = new L.Map('map', {
	zoomControl: false,
	center: [20, 10],
	zoom: deviceZoom,
	maxZoom: maxZoom,
	minZoom: deviceZoom,
	worldCopyJump: false,
	attributionControl: false,
	noWrap: true,
	maxBounds: bounds
});

//removing fitBounds for initial load
//map.fitBounds(bounds);

//base layer here
L.tileLayer.wms('http://54.197.226.119:8080/geoserver/natural-earth-rasters/wms', {
    format: 'image/png',
    transparent: true,
    layers: 'natural-earth-rasters:NE2_50M_SR_W_Lakes',
    noWrap: false,
    crs: L.CRS.EPSG3857
}).addTo(map);

map.addControl(new L.Control.ZoomMin({ position: 'topright' }));

/* Attribution control */
var attributionControl = L.control({
  position: "bottomright"
});
attributionControl.onAdd = function (map) {
  var div = L.DomUtil.create("div", "leaflet-control-attribution");
  div.innerHTML = "<a href='#' onclick='$(\"#disclaimerModal\").modal(\"show\"); return false;'>Boundary disclaimer</a>";
  return div;
};
map.addControl(attributionControl);

var disputedAreasStyle = {
	weight: 0,
	fillOpacity: 0.85,
	fillColor: '#E6E6E6'
};

$.getJSON(baseDataURL + disputedAreasLayer, function(data) {
	var disputedAreasJson = new L.GeoJSON(data, {style: disputedAreasStyle});
	map.addLayer(disputedAreasJson);
});

//L.geoJson('static/data/posts.json').addTo(map);

var postLayer = null;

var loadBureaus = function(){
	clearLayers();
	allLayersGroup.clearLayers();
	allLayersGroupPts.clearLayers();
	
	countryJSONLayer.setStyle(bureausLayerPolygonOptions);

	allLayersGroup.addLayer(countryJSONLayer);
	if (postLayer == null){
		$.ajax({
			'url': "static/data/posts.json",
			'dataType': "json",
			'success': function (data) {
				// load the geojson to the map with marker styling
				postLayer = new L.geoJson(data, {
					pointToLayer: function (feature, latlng) {
						var popupOptions = {maxWidth: 200};
						var popupContent = feature.properties.PostName;
						return L.circleMarker(latlng, postsLayerMarkerOptions).bindPopup(popupContent,popupOptions);
					},
					style:postsLayerMarkerOptions
				});
				allLayersGroupPts.addLayer(postLayer);
				
				}
			});
	}
	else{
		allLayersGroupPts.addLayer(postLayer);
	}
	map.addLayer(allLayersGroup);
	map.addLayer(allLayersGroupPts);

}



var bureausLayerPolygonOptions  = function (feature) {
	return {
		weight: 1,
		opacity: 1,
		color: 'white',
		//fillOpacity: 0.7,
		fillOpacity: 0.85,
		fillColor: getColorBureaus(feature.properties.Bureau)
	};
};

function getColorBureaus(d) {
	if (d == 'AF') {
		return	'#f8c373'
	}else if (d == 'EAP') {
		return	'#fdf08f'
	}else if (d == 'EUR') {
		return	'#efbbd1'
	}else if (d == 'NEA') {
		return	'#b8da72'
	}else if (d == 'SCA') {
		return	'#c9beda'
	}else if (d == 'WHA') {
		return	'#a8c9ea'
	}else {
		return	'#d6d6d6';
		//return	'#e6e7e8';
	}
}
			



var postsLayerMarkerOptions = {
	radius: 3,
	fillColor: "#333385",
	color: "#8080B2",
	weight: 1,
	opacity: 1,
	fillOpacity: 1,
	zIndexOffset: 10
};

map.addLayer(allLayersGroupPts);
map.addLayer(allLayersGroup);
 




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

var convertValuetoLabel = function(feature, attributeName, layerObj){
		var featureval = feature.properties[attributeName];

		if ($.type(featureval) == "string" || featureval=="null" || layerObj['jsonStyle']['isstring']){
			try{
			
				var thevalue =  layerObj['labels']['labels'][$.inArray(String(featureval), layerObj['labels']['values'])];
				
				if (thevalue && thevalue != null){
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
		
		if (layerObj['jsonStyle']['extralabel']){
			var tempending = layerObj['jsonStyle']['extralabel'];
			if (featureval > 1){
				tempending = tempending + "s";
			}
			return addCommas(featureval) + " " + tempending;
		}
		else {
			return addCommas(featureval);
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
				'<div class="legendItem"><i style="background:' + getColor(layerobj['jsonStyle']['attributeName'],values[i]) + '"></i>' +
				'<div class="legendLabel">' + labels[i] + '</div></div>'
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
							<div class='attribution'><p><small>" + layerobj['attribution'] + "</small></p></div></div>";

	return keyAccordionTitle + keyAccordionPanel;


}



var renderSidePanel = function(sidekey, centraltheme){
	currentSideKey = keysets[sidekey];

	var returnhtml = "";
	returnhtml += "<div class=\"headwrapper " + centraltheme + "\"> \
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
	if (! _.has(currentSideKey, "sorted")){
		currentSideKey['sorted'] = _(currentSideKey['layers']).sortBy(function(obj) { return obj.subject })
	}
	$.each(currentSideKey['sorted'], function(index, value){
		var tempreturn = renderSidePanelPiece(value['keyid'],value, counter) + "</div>";
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
	if (currentKey == undefined){return;}
	var layer = e.target;
	var feature = e.target.feature;
	var content = "<strong>" + feature.properties['Geounit'] + "</strong>"; 
	var tempcurrentkey = currentKey.split("+");
	if (tempcurrentkey.length < 2){
		return;
	}
    var tempObj = keysets[tempcurrentkey[0]]['layers'][tempcurrentkey[1]];
    if (tempObj['jsonStyle']['attributeName'] == "Bureaus"){return;}
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
        weight: 2,
        //color: '#666',
        dashArray: ''
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
}

var resetHighlight = function(e){
	if (currentKey == undefined){return;}
	$(".leaflet-control-infobox-interior").html("");
	$(".leaflet-control-infobox-interior").hide();
	var tempcurrentlayer = allLayersGroup.getLayers()[0];
	var tempcurrentkey = currentKey.split("+");
	if (tempcurrentkey.length < 2){
		return;
	}
	tempcurrentlayer.setStyle({weight: 1,
        //color: '#666',
        dashArray: ''});
	return;
}

L.Control.Command = L.Control.extend({
    options: {
        position: 'topright',
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

	var popupContent = "";
	

	popupContent = "<h4>" + feature.properties.Title + "</h4><h5>" + feature.properties.Country + "</h5><h6 style='height:140px; overflow-y:auto; font-size: small; font-weight: normal' >" + feature.properties.Story + "</h6>";
	layer.bindPopup(popupContent, {"maxWidth":500});

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
		case "TB-Incidence_2012":
			dint = parseInt(d);
			if (dint > 399){
				return '#be3e48';
			}
			else if (dint > 299){
				return	'#e54c58'
			}
			else if (dint > 124){
				return	'#e96e6e'
			}
			else if (dint > 49){
				return	'#ed8b87'
			}
			else if (dint > 19){
				return	'#f1a8a3'
			}
			else if (dint > 9){
				return	'#f6c6c3'
			}
			else if (dint > 0){
				return	'#fce6e7'
			}
			else {
				return '#e6e7e8';
			}
			break;
		case "Inf-Mort_2012":
			dint = parseInt(d);
			if (dint > 199){
				return '#e54c58';
			}
			else if (dint > 99){
				return	'#e96e6e'
			}
			else if (dint > 49){
				return	'#ed8b87'
			}
			else if (dint > 9){
				return	'#f1a8a3'
			}
			else if (dint > 0){
				return	'#f6c6c3'
			}
			else {
				return '#e6e7e8';
			}
			break;
		case "NIV_1997": 
			dint = parseInt(d);
			if (dint > 99999){
				return '#c8551a';
			}
			else if (dint > 49999){
				return	'#f26722'
			}
			else if (dint > 24999){
				return	'#f38333'
			}
			else if (dint > 9999){
				return	'#f49d4b'
			}
			else if (dint > 4999){
				return	'#f6b965'
			}
			else if (dint > 0){
				return	'#f8d57f'
			}
			else {
				return '#e6e7e8';
			}
			break;
		case "Malaria-Elimination_2013":
			if (d == '4') {
				return	'#be3e48';
			} else if (d == '3') {
				return	'#e96e6e';
			} else if (d == '2') {
				return	'#f1a8a3';
			} else if (d == '1') {
				return	'#fce6e7';
			} else if (d == '0') {
				return	'#e6e7e8';
			} else {
				return	'#e6e7e8';
			}
			break;
		case "Malaria-Incidence_2013":
			if (d == '6') {
				return	'#be3e48';
			} else if (d == '5') {
				return	'#e54c58';
			} else if (d == '4') {
				return	'#e96e6e';
			} else if (d == '3') {
				return	'#ed8b87';
			}else if (d == '2') {
				return	'#f1a8a3';
			}else if (d == '1') {
				return	'#f6c6c3';
			} else {
				return	'#e6e7e8';
			}
			break;
		case "TPIndex_2014":
			if (d == '6'){
				return "#c8551a"
			} else if (d == '5') {
				return	'#f26722'
			} else if (d == '4') {
				return	'#f38333'
			} else if (d == '3') {
				return	'#f49d4b'
			} else if (d == '2') {
				return	'#f6b965'
			} else if (d == '1') {
				return	'#f8d57f'
			} else {
				return	'#e6e7e8';
			}
			break;
		case "MLOIndex_2014":
			if (d == '5') {
				return	'#f26722'
			} else if (d == '4') {
				return	'#f38333'
			} else if (d == '3') {
				return	'#f49d4b'
			} else if (d == '2') {
				return	'#f6b965'
			} else if (d == '1') {
				return	'#f8d57f'
			} else {
				return	'#e6e7e8';
			}
			break;
		case "AUMember_2014":
			if (d == 'Member') {
				return	'#f38333'
			} else if (d == 'Suspended') {
				return	'#f8d57f'
			} else {
				return	'#e6e7e8';
			}
			break;
	    case "TIPS_2013":
			if (d == 'Special Case') {
				return	'#2f7d89'
			} else if (d == 'Tier 3') {
				return	'#3992a1'
			} else if (d == 'Tier 3 Auto-Downgrade') {
				return	'#5ea1af'
			} else if (d == 'Tier 2 Watch List') {
				return	'#7db0be'
			} else if (d == 'Tier 2') {
				return	'#99c2cf'
			} else if (d == 'Tier 1') {
				return	'#b8d6e1'
			} else {
				return	'#e6e7e8';
			}
			break;
		case "UNHCRcamps":
			if (d == 'Refugees') {
				return	'#91151F';
			} else {
				return	'#e6e7e8';
			}
			break;
		case "MaternalHealthAccessToCare_2014":
			if (d == 'Excellent') {
				return	'#e54c58'
			} else if (d == 'Good') {
				return	'#e96e6e'
			} else if (d == 'Fair') {
				return	'#ed8b87'
			} else if (d == 'Poor') {
				return	'#f1a8a3'
			} else if (d == 'Unsuitable') {
				return	'#f6c6c3'
			} else {
				return	'#e6e7e8';
			}
			break;
		case "PEPFAR_2014":
			if (d == '3') {
				return	'#f6c6c3'
			} else if (d == '2') {
				return	'#ed8b87'
			} else if (d == '1') {
				return	'#e54c58'
			} else {
				return	'#e6e7e8';
			}
			break;
		case "TB-Drug-Resistance_2012":
			if (d == 'At least one case reported') {
				return	'#e96e6e'
			} else if (d == 'No cases reported') {
				return	'#e6e7e8'
			} else {
				return	'#e6e7e8';
			}
			break;
		case "USAID-GlobalHealth_2014":
			if (d == '1') {
				return	'#e96e6e'
			}else {
				return	'#e6e7e8';
			}
			break;
		case "USAID-DHRA_2014":
			if (d == '1') {
				return	'#5ea1af'
			}else {
				return	'#e6e7e8';
			}
			break;
		case "USAID-WatSan_2014":
			if (d == '1') {
				return	'#95b353'
			}else {
				return	'#e6e7e8';
			}
			break;
		case "USAID-CrisisConflict_2014":
			if (d == '1') {
				return	'#e96e6e'
			}else {
				return	'#e6e7e8';
			}
			break;
		case "USAID-GenderWomen_2014":
			if (d == '1') {
				return	'#5ea1af'
			}else {
				return	'#e6e7e8';
			}
			break;
		case "USAID-EnvClimate_2014":
			if (d == '1') {
				return	'#95b353'
			}else {
				return	'#e6e7e8';
			}
			break;
		case "USAID-ScienceTech_2014":
			if (d == '1') {
				return	'#f38333'
			}else {
				return	'#e6e7e8';
			}
			break;
		case "ICAOMember_2014":
			if (d == 'Member') {
				return	'#f38333'
			}else {
				return	'#e6e7e8';
			}
			break;
		case "UNESCOMember_2014":
			if (d == 'Member') {
				return	'#f38333'
			}else {
				return	'#e6e7e8';
			}
			break;
		case "FAOMember_2014":
			if (d == 'Member') {
				return	'#f38333'
			}else {
				return	'#e6e7e8';
			}
			break;
		case "OASMember_2014":
			if (d == 'Member') {
				return	'#f38333'
			}else {
				return	'#e6e7e8';
			}
			break;
		case "UNGAMember_2014":
			if (d == 'Member') {
				return	'#f38333'
			}else {
				return	'#e6e7e8';
			}
			break;
		case "OSCEMember_2014":
			if (d == 'Member') {
				return	'#f38333'
			}else {
				return	'#e6e7e8';
			}
			break;
		case "OECDMember_2014":
			if (d == 'Member') {
				return	'#f38333'
			}else {
				return	'#e6e7e8';
			}
			break;
		case "NATOMember_2014":
			if (d == 'Member') {
				return	'#f38333'
			}else {
				return	'#e6e7e8';
			}
			break;
		case "EUMember_2014":
			if (d == 'Member') {
				return	'#f38333'
			}else {
				return	'#e6e7e8';
			}
			break;
		case "WFP-Board_2014":
			if (d == 'Member') {
				return	'#f38333'
			}else {
				return	'#e6e7e8';
			}
			break;
		case "UNHCRMember_2014":
			if (d == 'Member') {
				return	'#f38333'
			}else {
				return	'#e6e7e8';
			}
			break;
		case "APECMember_2014":
			if (d == 'Member') {
				return	'#f38333'
			}else {
				return	'#e6e7e8';
			}
			break;
		case "NAFTAMember_2014":
			if (d == 'Member') {
				return	'#f38333'
			}else {
				return	'#e6e7e8';
			}
			break;
		case "AGOAMember_2014":
			if (d == 'Member') {
				return	'#f38333'
			}else {
				return	'#e6e7e8';
			}
			break;
		case "WTOMember_2014":
			if (d == 'Member') {
				return	'#f38333'
			}else if(d=='Observer'){
				return '#f8d57f'
			}
			else{
				return	'#e6e7e8';
			}
			break;
		case "ASEANMember_2014":
			if (d == 'Member') {
				return	'#f38333'
			}else {
				return	'#e6e7e8';
			}
			break;
		case "CBERAMember_2014":
			if (d == 'Member') {
				return	'#f38333'
			}else {
				return	'#e6e7e8';
			}
			break;
		case "CAFTAMember_2014":
			if (d == 'Member') {
				return	'#f38333'
			} else if (d == 'Observer') {
				return	'#f8d57f'
			} else {
				return	'#e6e7e8';
			}
			break;
		/*
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
		*/
		case "PEPFAR_2014":
		/*
		case "NNPTSigned_2014":
			if (d == 'X') {
			return	'#b37ead'
			} else {
				return	'#e6e7e8';
			}
			break;
		case "NNPTDeposited_2014":
			if (d == 'X') {
			return	'#b37ead'
			} else {
				return	'#e6e7e8';
			}
			break;
		*/
		case "NNPTSignedDeposited_2014":
			if (d == 'Deposited') {
				return	'#d0a2c6'
			} else if (d == 'Signed and Deposited') {
				return	'#b37ead'
			}else {
				return	'#e6e7e8';
			}
			break;
		case "HEU-Free_2014":
			if (d == '1') {
			return	'#b37ead'
			} else {
				return	'#e6e7e8';
			}
			break;
		case "Money-Laundering_2014":
			if (d == 'Primary Concern') {
				return	'#aa73a6'
			} else if (d == 'Concern') {
				return	'#bc89b5'
			} else if (d == 'Monitored') {
				return	'#d0a2c6'
			} else {
				return	'#e6e7e8';
			}
			break;
		case "Precursor-Chemical-Sources_2014":
			if (d == '1') {
			return	'#b37ead'
			} else {
				return	'#e6e7e8';
			}
			break;
		case "301-List_2014":
			if (d == 'Priority Watch List') {
				return	'#f38333'
			} else if (d == 'Watch List') {
				return	'#f8d57f'
			} else {
				return	'#e6e7e8';
			}
			break;
		case "CITES-Species_2014":
			dint = parseInt(d);
			if (dint > 99){
				return '#51751A';
			}
			else if (dint > 49){
				return	'#86A641'
			}
			else if (dint > 24){
				return	'#A7C06F'
			}
			else if (dint > 9){
				return	'#D8E3AF'
			}
			else if (dint > 0){
				return	'#ECF5D0'
			}
			else {
				return '#e6e7e8';
			}
			break;
		case "Internet-Freedom_2013":
			if (d == 'Free') {
				return	'#3992a1'
			}else if (d == 'Partly Free') {
				return	'#7db0be'
			}else if (d == 'Not Free') {
				return	'#b8d6e1'
			}else {
				return	'#e6e7e8';
			}
			break;
		case "FOTP-Status_2013":
			if (d == 'F') {
				return	'#3992a1'
			}else if (d == 'PF') {
				return	'#7db0be'
			}else if (d == 'NF') {
				return	'#b8d6e1'
			}else {
				return	'#e6e7e8';
			}
			break;
		case "Polio-Cases_2014":
			dint = parseInt(d);
			if (dint > 10) {
				return	'#e96e6e'
			}else if (dint > 0){
				return	'#f6c6c3'
			}
			else {
				return '#e6e7e8';
			}
			break;
		case "Post-LEEDS-Certification_2014":
			if (d == 'Certified') {
				return	'#e4eec3'
			}else if (d == 'Silver') {
				return	'#bbcd89'
			}else if (d == 'Gold') {
				return	'#95b353'
			}else if (d == 'Platinum') {
				return	'#668831'
			}else {
				return	'#e6e7e8';
			}
			break;
		case "OES-Hubs_2014":
			if (d == 'Baltic and Nordic States Hub') {
				return	'#e592b5'
			}else if (d == 'Central American and Caribbean Hub') {
				return	'#7fb0e0'
			}else if (d == 'Central and Eastern European Hub') {
				return	'#efbbd1'
			}else if (d == 'Central Asian Hub') {
				return	'#ae9ec8'
			}else if (d == 'East African Hub') {
				return	'#fad8a4'
			}else if (d == 'East Asia Hub') {
				return	'#fdf08f'
			}else if (d == 'Middle Eastern Hub') {
				return	'#b8da72'
			}else if (d == 'Pacific Hub') {
				return	'#fce644'
			}else if (d == 'South American Hub') {
				return	'#bdd6ef'
			}else if (d == 'South Asian Hub') {
				return	'#c9beda'
			}else if (d == 'Southern Africa Hub') {
				return	'#f8c373'
			}else if (d == 'Western and Central Africa Hub') {
				return	'#f6ae42'
			}else {
				return	'#e6e7e8';
			}
			break;
		case "Bureaus":
			if (d == 'AF') {
				return	'#f8c373'
			}else if (d == 'EAP') {
				return	'#fdf08f'
			}else if (d == 'EUR') {
				return	'#efbbd1'
			}else if (d == 'NEA') {
				return	'#b8da72'
			}else if (d == 'SCA') {
				return	'#c9beda'
			}else if (d == 'WHA') {
				return	'#a8c9ea'
			}else {
				return	'#d6d6d6';
				//return	'#e6e7e8';
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

	//if jsonLayer is a function add loader then run deferred clenaup
	if (templayerobj["jsonLayer"] != null){
		if (! templayerobj['jsonLayer']['_leaflet_id'] && templayerobj['jsonLayer'].length < 2){

			templayerobj['jsonLayer'] = templayerobj['jsonLayer'](templayerobj);
		}
		else{
			if (templayerobj['jsonLayer'].length != undefined){
				//set the style before 
				countryJSONLayer.setStyle(function(feature){ 
					//pass attribute value to the getColor
					if (templayerobj['jsonStyle']['secondarystyle']['attributeName'] == ""){
						templayerobj['jsonStyle']['secondarystyle']['fillOpacity'] = 0;
					}
					else{
						templayerobj['jsonStyle']['secondarystyle']['fillColor'] = getColor(templayerobj['jsonStyle']['secondarystyle']['attributeName'], feature.properties[templayerobj['jsonStyle']['secondarystyle']['attributeName']]);
						templayerobj['jsonStyle']['secondarystyle']['color'] = '#666';
					}
					return templayerobj['jsonStyle']['secondarystyle'];
				});
				$.each(templayerobj['jsonLayer'], function(index, layer){
					allLayersGroup.addLayer(layer);
				});
			}
			else{
				allLayersGroup.addLayer(templayerobj['jsonLayer']);
			}

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


	}
	else{
		
		countryJSONLayer.setStyle(function(feature){ 
										//pass attribute value to the getColor
										if (templayerobj['jsonStyle']['attributeName'] == ""){
											templayerobj['jsonStyle']['fillOpacity'] = 0;
										}
										else{
											templayerobj['jsonStyle']['fillColor'] = getColor(templayerobj['jsonStyle']['attributeName'], feature.properties[templayerobj['jsonStyle']['attributeName']]);
											templayerobj['jsonStyle']['color'] = '#666';
										}
										return templayerobj['jsonStyle'];
									});




		allLayersGroup.addLayer(countryJSONLayer);

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
	ga('send', 'event', 'button', 'click', layername);
}


$(".mainKey").click(function(ev, mainClickCallbacker){
	//clear all layers on this
	$("#mapKeybutton").trigger("click");
	clearLayers();
	mainkey = $(this).attr("name");
	var centraltheme = $(this).attr("class").split(" ")[1];
	map.addLayer(allLayersGroup, {insertAtTheBottom: true});
	//add all layers as part of this key
	/*$.each(keysets[mainkey]['layers'], function(index, valueset){
		allLayersGroup.addLayer(valueset['jsonLayer']);
	});*/

	var returnhtml = renderSidePanel(mainkey, centraltheme);
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
	//mainClickCallbacker will only be called when there is a hash
	if (mainClickCallbacker){
		mainClickCallbacker();
	}
	else{
		$(".sideBarLayerToggle:first").trigger("click");
	}
	ev.preventDefault();
	return false;

	//hash.trigger("move");
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

	if($(this).innerHeight() > 100){
		$(this).addClass("fadetext");
		$(this).readmore({
		  moreLink: '<a class="read-more-link MBT-readmore">Read more ></a>',
		  lessLink: '<a class="read-less-lin MBT-readmore">< Read less</a>',
		  maxHeight: 85,
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



$("#header-search-box").focus(function(elem){
  if ($(this).val() == "Search Site"){
  	$(this).val("");
  }
});

/*

	OLD SEARCH FUNCTIONALITY

*/

/*
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
*/





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


$('#openShare').click(function(){
	$('#hashURLText').val(window.location.href);
    $('#shareModal').modal('show');
});


$("#viewSplash").click(function(ev){
	$('#splashScreen').modal('show');
});

$("#noTour").click(function(ev){
	$('#splashScreen').modal('hide');
	return false;
});

$(".viewTour").click(function(ev){

	$('#splashScreen').modal('hide');
	// Initialize the tour
	//tour.init();
	tour.restart();
	// Start the tour
	ga('send', 'event', 'button', 'click', 'viewTour');
	tour.start(true);
	return false;
});


$("#noSplash").click(function(ev){
	$.cookie('splashScreen', "true");
	$('#splashScreen').modal('hide');
	ev.preventDefault();
	return false;
});




