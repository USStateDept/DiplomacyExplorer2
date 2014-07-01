/*Initialization of the program.
 *
 *
 */
var baseURL = "http://" + host + "/geoserver/opengeo/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=opengeo%3A*******&outputformat=json";
var generalBaseLayer = "PA_Data_110m"



var allLayersGroup = new L.LayerGroup();
var allLayersGroupPts = new L.LayerGroup();

var mainKey;
var currentKey;




var geoJsonList = {}
var geoJsonLayer;
var keysets;
var hash;
//load the base geoJson layer




var createLayer = function(data, styleObj){

	new L.geoJson(data, {style: function(feature){ 
										styleObj['fillColor'] = getColor(styleObj['mainStyleKey'], styleObj['fillColorSubKey']);
										return styleObj;
										}});
}





$.ajax({
	url: baseURL.replace("*******", generalBaseLayer),
	dataType: 'json',
	//ignite(data) is found on the main index.jsp page
	success: function(data){ignite(data);} 
	/*function(data) {
		//load layer to be styled later
		

		geoJsonLayerTPAPEC = new L.geoJson(data, {style: StyleTPAPEC});
		geoJsonLayerTPNAFTA = new L.geoJson(data, {style: StyleTPNAFTA});
		geoJsonLayerTPWTO = new L.geoJson(data, {style: StyleTPWTO});
		geoJsonLayerTPASEAN = new L.geoJson(data, {style: StyleTPASEAN});
		geoJsonLayerTPCBERA = new L.geoJson(data, {style: StyleTPCBERA});
		geoJsonLayerTPCAFTA = new L.geoJson(data, {style: StyleTPCAFTA});
		geoJsonLayerSTI = new L.geoJson(data, {style: {
													weight: 1,
													opacity: 1,
													color: 'white',
													fillOpacity: 0.7,
													fillColor: getColorSTI(feature.properties.Science)
												}});
		geoJsonLayerECC = new L.geoJson(data, {style: {
											weight: 1,
											opacity: 1,
											color: 'white',
											fillOpacity: 0.7,
											fillColor: getColorECC(feature.properties.Env_Climate)
										}});
		geoJsonLayerGEWE = new L.geoJson(data, {style: {
												weight: 1,
												opacity: 1,
												color: 'white',
												fillOpacity: 0.7,
												fillColor: getColorGEWE(feature.properties.Gender_Women)
											}});
		geoJsonLayerWCC = new L.geoJson(data, {style: {
												weight: 1,
												opacity: 1,
												color: 'white',
												fillOpacity: 0.7,
												fillColor: getColorGEWE(feature.properties.Crisis_Conflict)
											}});

	}*/
});











var cmAttr = "<a href='mailto:dittemoremb@state.gov'>eDiplomacy Geo|DST</a>"
//cmAttr = 'Data: <a href="http://www.eia.gov/countries/data.cfm" title="U.S. Energy Information Administration">EIA</a>, <a href="http://www.openstreetmap.org/" title="&copy; OpenStreetMap contributors">OpenStreetMap</a>, <a href="http://www.cloudmade.com/" title="&copy; 2011 CloudMade">CloudMade</a>, <a href="http://www.stamen.com/" title="Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.">Stamen Design</a>',


var map = new L.Map('map', {
	zoomControl: false,
	center: [20, 10],
	zoom: 2,
	maxZoom: 6,
	minZoom: 2,
	worldCopyJump: true
});




L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
	maxZoom: 18,
	id: 'examples.map-20v6611k'
}).addTo(map);

new L.Control.Zoom({ position: 'topright' }).addTo(map);










$(".mainKey").click(function(ev, mainClickCallbacker){
	//clear all layers on this
	clearLayers();
	var keyname = $(this).attr("name");
	mainkey = keyname;
	currentKey = keyname
	map.addLayer(allLayersGroup, {insertAtTheBottom: true});
	//add all layers as part of this key
	$.each(keysets[keyname]['layers'], function(index, valueset){
		allLayersGroup.addLayer(valueset['jsonLayer']);
	});

	var returnhtml = renderSidePanel(keyname);
	//if the description panel is closed then open it
	if ($("#descPane").hasClass("closed")){
		$(".toggleSidePane").trigger("click");
	}

	//unbind previous bindings so we don't conflict
	$(".sideBarLayerToggle").unbind("click");

	$("#mapKey").html(returnhtml);

	//bind event to layers to turn them on
	$(".sideBarLayerToggle").click(function(){
		var layername = $(this).attr('name');
		currentKey = mainkey + "+" + layername
		var templayerobj = keysets[mainkey]['layers'][layername];

		//might need tocheck if this is actually a valid part of the keys until then we just assume
		//var tempkeyarray = $.map(obj, function(element,index) {return index});
		//$.inArray(layername, tempkeyarray)


		allLayersGroup.clearLayers();
		allLayersGroupPts.clearLayers();

		allLayersGroup.addLayer(templayerobj['jsonLayer']);

		if (templayerobj['ptsLayer'] != ""){
			loadPointLayer(templayerobj, currentKey)
		}
		map.addLayer(allLayersGroup);
		map.addLayer(allLayersGroupPts);
		hash.trigger("move");
	});
	if (mainClickCallbacker){
		mainClickCallbacker();
	}
	hash.trigger("move");
	//trigger the hash update

});




var loadPointLayer = function(layerobj, theparent){
	//already checked if the point layer is valid
	$.ajax({
		url: baseURL.replace("*******", layerobj['ptsLayer']),
		dataType: 'json',
		success: function(data){
			allLayersGroupPts.addLayer(new L.geoJson(data, {onEachFeature: onEachFeaturePts}));
			map.addLayer(allLayersGroupPts)
		}
	});

}



var renderSidePanelPiece = function(index, layerobj, counter){

	//if ($.inArray("grades", layerobj)){
		//do stuff that may be outside the below code

	//}
	//else{

	var key1div = L.DomUtil.create('div');
	var grades = layerobj['labels']['grades'];
		// this is something like a subheader
	var keyLabels = [];
	var from = layerobj['labels']['from'];

	for (var i = 0; i < grades.length; i++) {
		
		keyLabels.push(
			'<i style="background:' + getColorTPMember(grades[i]) + '"></i>' +
			from[i]
		);
	}	
	//}

	var keypanel = "<div class='legend'>" + keyLabels.join('<br>') + "</div>";
	

	var keyAccordionTitle = "<div class='panel panel-default'> \
								<div class='panel-heading'> \
									<h4 class='panel-title'> \
										<a data-toggle='collapse' data-parent='#accordion' href='#collapse" + counter + "' class='sideBarLayerToggle' name='" + index + "'>"+ layerobj['subject'] + " \
										</a> \
									</h4> \
								</div>";


	var keyAccordionPanel = "<div id=\"collapse" + counter + "\" class=\"panel-collapse collapse\"><div class=\"panel-body\">" + layerobj['description'] + "</div>" + keypanel + "</div>";

	return keyAccordionTitle + keyAccordionPanel;


}

//this was for the sidebutton //onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key1Layer + "),allLayersGroupPts.addLayer(" + key1LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\"


var renderSidePanel = function(sidekey){
	currentSideKey = keysets[sidekey];
	var returnhtml = "";
	returnhtml += "<div class=\"panel-group\" id=\"accordion\">";
	returnhtml += "<div class=\"panel panel-primary\"> \
						<div class=\"panel-heading\"> \
							<h4 class=\"panel-title\"> \
								<a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapseCategory\">" + currentSideKey['categoryName'] + "</a> \
							</h4> \
						</div>";
	returnhtml += "<div id=\"collapseCategory\" class=\"panel-collapse collapse in\"><div class=\"panel-body\">" + currentSideKey['categoryDescription'] + "</div>";
	returnhtml += "</div></div>"
	var counter = 1;
	$.each(currentSideKey['layers'], function(index, value){
		var tempreturn = renderSidePanelPiece(index,value, counter) + "</div>";
		returnhtml += tempreturn
		counter += 1;
	});

	returnhtml += "</div></div><br/>";

	return returnhtml;

}



 function clearLayers() {
	allLayersGroup.clearLayers();
	allLayersGroupPts.clearLayers();
}


/************************

These keys need to be added to the data structure above




*************/






/*function highlightFeature(e) {
	var layer = e.target;

	layer.setStyle({
		weight: 2,
		color: '#666',
		dashArray: '',
		fillOpacity: 0.7
	});

	if (!L.Browser.ie && !L.Browser.opera) {
		layer.bringToFront();
	}
	info.update(layer.feature.properties);
}

function resetHighlight(e) {
	geoJsonLayerICAO.resetStyle(e.target);
	info.update();
}
*/
var popup = L.popup();
/*
var info = L.control({position: "bottomleft"});

info.onAdd = function (map) {
	this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
	this.update();
	return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
	this._div.innerHTML = '' +  (props ?
		'' + props.sovereignt + ': ' + props.ICAO + ''
		: '');
};

info.addTo(map);
*/

var keyToggle = L.control({position: "bottomleft"});

keyToggle.onAdd = function (map) {
	this._div = L.DomUtil.create('div', 'toggleSidePane info'); // create a div with a class "info"
	

	return this._div;
};

// method that we will use to update the control based on feature properties passed

keyToggle.addTo(map);







/*Map Controls.  Functions to turn layers on and off
 *
 *
 */




function zoomToFeature(e) {
	map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
	layer.on({
		//click: highlightFeature,
		//mouseout: resetHighlight
	});
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


/*Map Styles
 *
 *
 *
 */

 function getColor(mainKey, prop) {
	switch(mainKey) {
	    case "TPMember":
        	if (d == 'Member') {
					return	'#FC4E2A'
				} else if (d == 'Observer') {
					return	'#FC4E2A'
				} else {
					return	'#ddd';
				}
	        break;
	    case "HT":
			if (d == 'Special Case') {
				return	'#499DD6'
			} else if (d == 'Tier 3') {
				return	'#9E252B'
			} else if (d == 'Tier 3 Auto-Downgrade') {
				return	'#FC4E2A'
			} else if (d == 'Tier 2 Watch List') {
				return	'#E67125'
			} else if (d == 'Tier 2') {
				return	'#FDBE10'
			} else if (d == 'Tier 1') {
				return	'#00763F'
			} else {
				return	'#ddd';
			}
			break;
		case "WatSan":
			if (d == '1') {
				return	'#FC4E2A'
			} else {
				return	'#ddd';
			}	
			break;	
		case "HIGH":
			if (d == '1') {
				return	'#FC4E2A'
			} else {
				return	'#ddd';
			}
			break;
		case "HIAV":
			if (d == '3') {
				return	'#FC4E2A'
			} else if (d == '2') {
				return	'#FD8D3C'
			} else if (d == '1') {
				return	'#CACF9B'
			} else {
				return	'#ddd';
			}
		case "HIHIVAIDS":
			if (d == '3') {
				return	'#FC4E2A'
			} else if (d == '2') {
				return	'#FD8D3C'
			} else if (d == '1') {
				return	'#CACF9B'
			} else {
				return	'#ddd';
			}
			break;
	    default:
	        return '#FC4E2A';
	}
}




function getColorHIM(d) {
	if (d == '3') {
		return	'#FC4E2A'
	} else if (d == '2') {
		return	'#FD8D3C'
	} else if (d == '1') {
		return	'#CACF9B'
	} else {
		return	'#ddd';
	}
}

function getColorHIMHAC(d) {
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
}

function getColorHIPEPFAR(d) {
	if (d == '3') {
		return	'#FC4E2A'
	} else if (d == '2') {
		return	'#FD8D3C'
	} else if (d == '1') {
		return	'#CACF9B'
	} else {
		return	'#ddd';
	}
}

function getColorHIP(d) {
	if (d == '3') {
		return	'#FC4E2A'
	} else if (d == '2') {
		return	'#FD8D3C'
	} else if (d == '1') {
		return	'#CACF9B'
	} else {
		return	'#ddd';
	}
}

function getColorHIT(d) {
	if (d == '3') {
		return	'#FC4E2A'
	} else if (d == '2') {
		return	'#FD8D3C'
	} else if (d == '1') {
		return	'#CACF9B'
	} else {
		return	'#ddd';
	}
}

function getColorMLOMember(d) {
	if (d == 'Member') {
		return	'#FC4E2A'
	} else if (d == 'Suspended') {
		return	'#FD8D3C'
	} else {
		return	'#ddd';
	}
}
/*
function getColorMLOIndex(d) {
	if (d == '8') {
		return	'#093B49'
	} else if (d == '8') {
		return	'#093B49'
	} else if (d == '7') {
		return	'#106F89'
	} else if (d == '6') {
		return	'#106F89'
	} else if (d == '5') {
		return	'#158DAF'
	} else if (d == '4') {
		return	'#158DAF'
	} else if (d == '3') {
		return	'#18A2C9'
	} else if (d == '2') {
		return	'#1AACD6'
	} else if (d == '1') {
		return	'#51C5E8'
	} else {
		return	'#ddd';
	}
}
*/		
function getColorNucSign(d) {
	if (d == 'X') {
		return	'#FC4E2A'
	} else {
		return	'#ddd';
	}
}

function getColorNucDepo(d) {
	if (d == 'X') {
		return	'#FC4E2A'
	} else {
		return	'#ddd';
	}
}

function getColorTPMember(d) {
	if (d == 'Member') {
		return	'#FC4E2A'
	} else if (d == 'Observer') {
		return	'#FC4E2A'
	} else {
		return	'#ddd';
	}
}
/*
function getColorTPIndex(d) {
	if (d == '4') {
		return	'#093B49'
	} else if (d == '3') {
		return	'#106F89'
	} else if (d == '2') {
		return	'#158DAF'
	} else if (d == '1') {
		return	'#51C5E8'
	} else {
		return	'#ddd';
	}
}
*/		

function getColorWatSan(d) {
	if (d == '1') {
		return	'#FC4E2A'
	} else {
		return	'#ddd';
	}
}

function getColorDHRA(d) {
	if (d == '1') {
		return	'#FC4E2A'
	} else {
		return	'#ddd';
	}
}

function getColorSTI(d) {
	if (d == '1') {
		return	'#FC4E2A'
	} else {
		return	'#ddd';
	}
}

function getColorECC(d) {
	if (d == '1') {
		return	'#FC4E2A'
	} else {
		return	'#ddd';
	}
}

function getColorGEWE(d) {
	if (d == '1') {
		return	'#FC4E2A'
	} else {
		return	'#ddd';
	}
}

function getColorWCC(d) {
	if (d == '1') {
		return	'#FC4E2A'
	} else {
		return	'#ddd';
	}
}






/* UI Controls of the site.  This will bind all listeners
 *
 *
*/


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

