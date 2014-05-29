var urlWhole = "http://" + host + "/geoserver/opengeo/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=opengeo%3APA_Data_110m&outputformat=json";
var urlWholeHTpts = "http://" + host + "/geoserver/opengeo/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=opengeo%3AHuman_Trafficking_Pts&outputformat=json";
var urlWholePEPFARpts = "http://" + host + "/geoserver/opengeo/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=opengeo%3APEPFAR_Pts&outputformat=json";
var urlWholeNucpts = "http://" + host + "/geoserver/opengeo/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=opengeo%3ANuclear_Pts&outputformat=json";

var allLayersGroup = new L.LayerGroup();
var allLayersGroupPts = new L.LayerGroup();

var currentKey;

var keyToggle = L.control({position: "bottomleft"});

function getGeoJson(data) {
	geoJsonLayerHT = new L.geoJson(data, {style: StyleHT});
	geoJsonLayerHIAV = new L.geoJson(data, {style: StyleHIAV});
	geoJsonLayerHIHIVAIDS = new L.geoJson(data, {style: StyleHIHIVAIDS});
	geoJsonLayerHIM = new L.geoJson(data, {style: StyleHIM});
	geoJsonLayerHIMHAC = new L.geoJson(data, {style: StyleHIMHAC});
	geoJsonLayerHIPEPFAR = new L.geoJson(data, {style: StyleHIPEPFAR});
	geoJsonLayerHIP = new L.geoJson(data, {style: StyleHIP});
	geoJsonLayerHIT = new L.geoJson(data, {style: StyleHIT});
	//geoJsonLayerICAO = new L.geoJson(data, {style: StyleMLOMemberICAO, onEachFeature: onEachFeature});
	geoJsonLayerMLOAU = new L.geoJson(data, {style: StyleMLOMemberAU});
	geoJsonLayerMLOEU = new L.geoJson(data, {style: StyleMLOMemberEU});
	geoJsonLayerMLOFAO = new L.geoJson(data, {style: StyleMLOMemberFAO});
	geoJsonLayerMLOICAO = new L.geoJson(data, {style: StyleMLOMemberICAO});
	geoJsonLayerMLONATO = new L.geoJson(data, {style: StyleMLOMemberNATO});
	geoJsonLayerMLOOAS = new L.geoJson(data, {style: StyleMLOMemberOAS});
	geoJsonLayerMLOOECD = new L.geoJson(data, {style: StyleMLOMemberOECD});
	geoJsonLayerMLOOSCE = new L.geoJson(data, {style: StyleMLOMemberOSCE});
	geoJsonLayerMLOUNESCO = new L.geoJson(data, {style: StyleMLOMemberUNESCO});
	geoJsonLayerMLOUNHCR = new L.geoJson(data, {style: StyleMLOMemberUNHCR});
	geoJsonLayerMLOUNGA = new L.geoJson(data, {style: StyleMLOMemberUNGA});
	geoJsonLayerNucSign = new L.geoJson(data, {style: StyleNucSign});
	geoJsonLayerNucDepo = new L.geoJson(data, {style: StyleNucDepo});
	geoJsonLayerTPAPEC = new L.geoJson(data, {style: StyleTPAPEC});
	geoJsonLayerTPNAFTA = new L.geoJson(data, {style: StyleTPNAFTA});
	geoJsonLayerTPWTO = new L.geoJson(data, {style: StyleTPWTO});
	geoJsonLayerTPASEAN = new L.geoJson(data, {style: StyleTPASEAN});
	geoJsonLayerTPCBERA = new L.geoJson(data, {style: StyleTPCBERA});
	geoJsonLayerTPCAFTA = new L.geoJson(data, {style: StyleTPCAFTA});
}

$.ajax({
	url: urlWhole,
	dataType: 'json',
	jsonpCallback: getGeoJson,
	success: getGeoJson
});

function getGeoJsonPts(data){
	geoJsonLayerHTpts = new L.geoJson(data, {onEachFeature: onEachFeaturePts});
	geoJsonLayerHIPEPFARpts = new L.geoJson(data, {onEachFeature: onEachFeaturePts});
	geoJsonLayerNucpts = new L.geoJson(data, {onEachFeature: onEachFeaturePts});
}

$.ajax({
	url: urlWholeHTpts,
	dataType: 'json',
	jsonpCallback: getGeoJsonPts,
	success: getGeoJsonPts
});

$.ajax({
	url: urlWholePEPFARpts,
	dataType: 'json',
	jsonpCallback: getGeoJsonPts,
	success: getGeoJsonPts
});

$.ajax({
	url: urlWholeNucpts,
	dataType: 'json',
	jsonpCallback: getGeoJsonPts,
	success: getGeoJsonPts
});

var cmAttr = "<a href='mailto:dittemoremb@state.gov'>eDiplomacy Geo|DST</a>"
//cmAttr = 'Data: <a href="http://www.eia.gov/countries/data.cfm" title="U.S. Energy Information Administration">EIA</a>, <a href="http://www.openstreetmap.org/" title="&copy; OpenStreetMap contributors">OpenStreetMap</a>, <a href="http://www.cloudmade.com/" title="&copy; 2011 CloudMade">CloudMade</a>, <a href="http://www.stamen.com/" title="Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.">Stamen Design</a>',

function getColorHT(d) {
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
}

function getColorHIAV(d) {
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

function getColorHIHIVAIDS(d) {
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
function StyleHT(feature) {
	return {
		weight: 1,
		opacity: 1,
		color: 'white',
		fillOpacity: 0.7,
		fillColor: getColorHT(feature.properties.Human_Trafficking)
	};
}

function StyleHIAV(feature) {
	return {
		weight: 1,
		opacity: 1,
		color: 'white',
		fillOpacity: 0.7,
		fillColor: getColorHIAV(feature.properties.Avian_Flu)
	};
}

function StyleHIHIVAIDS(feature) {
	return {
		weight: 1,
		opacity: 1,
		color: 'white',
		fillOpacity: 0.7,
		fillColor: getColorHIHIVAIDS(feature.properties.HIVAIDS)
	};
}

function StyleHIM(feature) {
	return {
		weight: 1,
		opacity: 1,
		color: 'white',
		fillOpacity: 0.7,
		fillColor: getColorHIM(feature.properties.Malaria)
	};
}

function StyleHIMHAC(feature) {
	return {
		weight: 1,
		opacity: 1,
		color: 'white',
		fillOpacity: 0.7,
		fillColor: getColorHIMHAC(feature.properties.Maternity_Health_Access_to_Care)
	};
}

function StyleHIPEPFAR(feature) {
	return {
		weight: 1,
		opacity: 1,
		color: 'white',
		fillOpacity: 0.7,
		fillColor: getColorHIPEPFAR(feature.properties.PEPFAR)
	};
}

function StyleHIP(feature) {
	return {
		weight: 1,
		opacity: 1,
		color: 'white',
		fillOpacity: 0.7,
		fillColor: getColorHIP(feature.properties.Polio)
	};
}

function StyleHIT(feature) {
	return {
		weight: 1,
		opacity: 1,
		color: 'white',
		fillOpacity: 0.7,
		fillColor: getColorHIT(feature.properties.Tuberculosis)
	};
}

function StyleMLOMemberICAO(feature) {
	return {
		weight: 1,
		opacity: 1,
		color: 'white',
		fillOpacity: 0.7,
		fillColor: getColorMLOMember(feature.properties.ICAO)
	};
}

function StyleMLOMemberUNESCO(feature) {
	return {
		weight: 1,
		opacity: 1,
		color: 'white',
		fillOpacity: 0.7,
		fillColor: getColorMLOMember(feature.properties.UNESCO)
	};
}

function StyleMLOMemberFAO(feature) {
	return {
		weight: 1,
		opacity: 1,
		color: 'white',
		fillOpacity: 0.7,
		fillColor: getColorMLOMember(feature.properties.FAO)
	};
}

function StyleMLOMemberOAS(feature) {
	return {
		weight: 1,
		opacity: 1,
		color: 'white',
		fillOpacity: 0.7,
		fillColor: getColorMLOMember(feature.properties.OAS)
	};
}

function StyleMLOMemberUNGA(feature) {
	return {
		weight: 1,
		opacity: 1,
		color: 'white',
		fillOpacity: 0.7,
		fillColor: getColorMLOMember(feature.properties.UNGA)
	};
}

function StyleMLOMemberOSCE(feature) {
	return {
		weight: 1,
		opacity: 1,
		color: 'white',
		fillOpacity: 0.7,
		fillColor: getColorMLOMember(feature.properties.OSCE)
	};
}

function StyleMLOMemberOECD(feature) {
	return {
		weight: 1,
		opacity: 1,
		color: 'white',
		fillOpacity: 0.7,
		fillColor: getColorMLOMember(feature.properties.OECD)
	};
}

function StyleMLOMemberNATO(feature) {
	return {
		weight: 1,
		opacity: 1,
		color: 'white',
		fillOpacity: 0.7,
		fillColor: getColorMLOMember(feature.properties.NATO)
	};
}

function StyleMLOMemberEU(feature) {
	return {
		weight: 1,
		opacity: 1,
		color: 'white',
		fillOpacity: 0.7,
		fillColor: getColorMLOMember(feature.properties.EU)
	};
}

function StyleMLOMemberAU(feature) {
	return {
		weight: 1,
		opacity: 1,
		color: 'white',
		fillOpacity: 0.7,
		fillColor: getColorMLOMember(feature.properties.AU)
	};
}

function StyleMLOMemberUNHCR(feature) {
	return {
		weight: 1,
		opacity: 1,
		color: 'white',
		fillOpacity: 0.7,
		fillColor: getColorMLOMember(feature.properties.UNHCR)
	};
}
/*
function StyleMLOIndex(feature) {
	return {
		weight: 1,
		opacity: 1,
		color: 'white',
		fillOpacity: 0.7,
		fillColor: getColorMLOIndex(feature.properties.Index)
	};
}
*/
function StyleNucSign(feature) {
	return {
		weight: 1,
		opacity: 1,
		color: 'white',
		fillOpacity: 0.7,
		fillColor: getColorNucSign(feature.properties.Signed)
	};
}

function StyleNucDepo(feature) {
	return {
		weight: 1,
		opacity: 1,
		color: 'white',
		fillOpacity: 0.7,
		fillColor: getColorNucDepo(feature.properties.Deposited)
	};
}

function StyleTPAPEC(feature) {
	return {
		weight: 1,
		opacity: 1,
		color: 'white',
		fillOpacity: 0.7,
		fillColor: getColorTPMember(feature.properties.APEC)
	};
}

function StyleTPNAFTA(feature) {
	return {
		weight: 1,
		opacity: 1,
		color: 'white',
		fillOpacity: 0.7,
		fillColor: getColorTPMember(feature.properties.NAFTA)
	};
}

function StyleTPWTO(feature) {
	return {
		weight: 1,
		opacity: 1,
		color: 'white',
		fillOpacity: 0.7,
		fillColor: getColorTPMember(feature.properties.WTO)
	};
}

function StyleTPASEAN(feature) {
	return {
		weight: 1,
		opacity: 1,
		color: 'white',
		fillOpacity: 0.7,
		fillColor: getColorTPMember(feature.properties.ASEAN)
	};
}

function StyleTPCBERA(feature) {
	return {
		weight: 1,
		opacity: 1,
		color: 'white',
		fillOpacity: 0.7,
		fillColor: getColorTPMember(feature.properties.CBERA)
	};
}

function StyleTPCAFTA(feature) {
	return {
		weight: 1,
		opacity: 1,
		color: 'white',
		fillOpacity: 0.7,
		fillColor: getColorTPMember(feature.properties.CAFTA)
	};
}
/*
function StyleTPIndex(feature) {
	return {
		weight: 1,
		opacity: 1,
		color: 'white',
		fillOpacity: 0.7,
		fillColor: getColorTPIndex(feature.properties.Index)
	};
}
*/
var map = new L.Map('map', {
	zoomControl: false,
	center: [20, 10],
	zoom: 2
});

L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
	maxZoom: 18,
	id: 'examples.map-20v6611k'
}).addTo(map);

new L.Control.Zoom({ position: 'topright' }).addTo(map);

$(document).one("ajaxStop", function() {
	$("#loading").hide();
});

function closePane(){

	var rowDiv = document.getElementById("rowId");
	var desc = document.getElementById('descPane');
	var mapp = document.getElementById('mapPane');
	mapp.className = "col-lg-12 col-md-12 col-sm-12";
	rowDiv.removeChild(desc);
	
	var toggleArray = document.getElementsByClassName("info leaflet-control");
	var toggleDiv = toggleArray[0];
	toggleDiv.innerHTML = "<a onclick=\"javascript:openPane(),getCurrentKey();\">Show</a>";
}

var keyNuc;
var keyMLO;
var keyTP;
var keyHI;
var keyHT;

function getCurrentKey(){
	if(currentKey=="Nuc")
	{
	keyNuc();
	}
}
function openPane(){
	
	var descOpen = document.getElementById('descPane');
	if(descOpen){
	
	}
	else
	{

		var div = document.createElement('div');
		div.className = "col-lg-3 col-md-3 col-sm-3";
		div.id="descPane";
		div.innerHTML = "<div class='panel-body panel-collapse collapse in' id='collapseSide' style='padding: 0px !important;'><div id='mapKey'></div></div>";
		
		var desc = document.getElementById('descPane');
		var mapp = document.getElementById('mapPane');
		mapp.className = "col-lg-9 col-md-9 col-sm-9";
		
		var rowDiv = document.getElementById("rowId");
		rowDiv.insertBefore(div,mapp);
		
		var toggleArray = document.getElementsByClassName("info leaflet-control");
		var toggleDiv = toggleArray[0];
		toggleDiv.innerHTML = "<a onclick=\"javascript:closePane();\">Hide</a>";
	
	}
	
}

function changeLayer() {
	allLayersGroup.clearLayers();
	allLayersGroupPts.clearLayers();
}

keyTP = function () {
	var categoryName = "Trade Promotion";
	var categoryDescription = "<h7 class='lorem'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a nibh ac ligula consequat sollicitudin. Curabitur placerat metus in dictum tempus. Maecenas ut lectus ac massa cursus rutrum. In euismod auctor nisl vitae aliquet. Curabitur vel bibendum est. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ipsum diam, interdum quis hendrerit sit amet, malesuada nec sem. Quisque ut sem vitae lorem aliquet fermentum vitae ac mauris. Nunc justo lorem, cursus eget consequat et, ornare in ante. Etiam ornare purus nec gravida aliquam. Donec pharetra et justo sed mollis. Suspendisse a ipsum ultrices, bibendum mi a, semper risus. Nam dictum leo id lacus varius, nec pharetra tortor eleifend. Aenean nunc eros, auctor vitae faucibus et, venenatis eu nisl.</h7>";
	
	var key1Subject = "APEC Membership";
	var key2Subject = "ASEAN Membership";
	var key3Subject = "CAFTA Membership";
	var key4Subject = "CBERA Membership";
	var key5Subject = "NAFTA Membership";
	var key6Subject = "WTO Membership";
	var key1Layer = "geoJsonLayerTPAPEC";
	var key2Layer = "geoJsonLayerTPASEAN";
	var key3Layer = "geoJsonLayerTPCAFTA";
	var key4Layer = "geoJsonLayerTPCBERA";
	var key5Layer = "geoJsonLayerTPNAFTA";
	var key6Layer = "geoJsonLayerTPWTO";
	var key1LayerPts = "";
	var key2LayerPts = "";
	var key3LayerPts = "";
	var key4LayerPts = "";
	var key5LayerPts = "";
	var key6LayerPts = "";
	var key1Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam aliquet fermentum ipsum, id commodo orci dignissim non. Mauris vulputate ultricies leo, et porta orci pretium in. Duis pulvinar iaculis augue, sit amet mollis quam tristique.";
	var key2Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dapibus semper quam vel egestas. Nulla tempus hendrerit justo vel auctor. Pellentesque sollicitudin quis nulla et ornare. Nam rhoncus malesuada neque, a vulputate purus eleifend in.";
	var key3Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in aliquam tortor, eu commodo neque. Cras pellentesque vitae turpis quis adipiscing. Donec ut nisl feugiat, aliquet ligula sit amet, lacinia tortor. Maecenas consectetur dolor vitae.";
	var key4Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam molestie mauris at blandit convallis. Vestibulum molestie feugiat mi eget malesuada. Vivamus at diam quis sem porta aliquam. Integer sapien nulla, viverra ac vehicula et, scelerisque.";
	var key5Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras facilisis dui tortor, vel tristique sem condimentum a. Etiam tincidunt magna eu odio pretium, vel posuere metus adipiscing. Donec et purus turpis. Ut sodales sit amet.";
	var key6Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In adipiscing aliquam tellus at congue. Vivamus vitae vehicula lorem. Etiam pulvinar mauris vitae euismod pellentesque. Mauris venenatis tellus in turpis hendrerit porta. Cras eu est lacinia.";
	
	var key1div = L.DomUtil.create('div'),
		grades = ['Member','null'],
		// this is something like a subheader
		key1Labels = [],
		from;

	for (var i = 0; i < grades.length; i++) {
		from = ['Member', 'Not a member'];
		
		key1Labels.push(
			'<i style="background:' + getColorTPMember(grades[i]) + '"></i>' +
			from[i]
		);
	}
	
	var key2div = L.DomUtil.create('div'),
		grades = ['Member','null'],
		// this is something like a subheader
		key2Labels = [],
		from;

	for (var i = 0; i < grades.length; i++) {
		from = ['Member', 'Not a member'];
		
		key2Labels.push(
			'<i style="background:' + getColorTPMember(grades[i]) + '"></i>' +
			from[i]
		);
	}

	var key3div = L.DomUtil.create('div'),
		grades = ['Member','null'],
		// this is something like a subheader
		key3Labels = [],
		from;

	for (var i = 0; i < grades.length; i++) {
		from = ['Member', 'Not a member'];
		
		key3Labels.push(
			'<i style="background:' + getColorTPMember(grades[i]) + '"></i>' +
			from[i]
		);
	}
	
	var key4div = L.DomUtil.create('div'),
		grades = ['Member','null'],
		// this is something like a subheader
		key4Labels = [],
		from;

	for (var i = 0; i < grades.length; i++) {
		from = ['Member', 'Not a member'];
		
		key4Labels.push(
			'<i style="background:' + getColorTPMember(grades[i]) + '"></i>' +
			from[i]
		);
	}
	
	var key5div = L.DomUtil.create('div'),
		grades = ['Member','null'],
		// this is something like a subheader
		key5Labels = [],
		from;

	for (var i = 0; i < grades.length; i++) {
		from = ['Member', 'Not a member'];
		
		key5Labels.push(
			'<i style="background:' + getColorTPMember(grades[i]) + '"></i>' +
			from[i]
		);
	}
	
	var key6div = L.DomUtil.create('div'),
		grades = ['Member','null'],
		// this is something like a subheader
		key6Labels = [],
		from;

	for (var i = 0; i < grades.length; i++) {
		from = ['Member', 'Not a member'];
		
		key6Labels.push(
			'<i style="background:' + getColorTPMember(grades[i]) + '"></i>' +
			from[i]
		);
	}
	
	//var name = "Nuclear Arms Control";
	var keyTitle1 = "<a onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key1Layer + "),allLayersGroupPts.addLayer(" + key1LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">&nbsp;&nbsp;" + key1Subject + "</a>";
	var keyTitle2 = "<a onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key2Layer + "),allLayersGroupPts.addLayer(" + key2LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">&nbsp;&nbsp;" + key2Subject + "</a>";
	var keyTitle3 = "<a onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key3Layer + "),allLayersGroupPts.addLayer(" + key3LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">&nbsp;&nbsp;" + key3Subject + "</a>";
	var keyTitle4 = "<a onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key4Layer + "),allLayersGroupPts.addLayer(" + key4LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">&nbsp;&nbsp;" + key4Subject + "</a>";
	var keyTitle5 = "<a onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key5Layer + "),allLayersGroupPts.addLayer(" + key5LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">&nbsp;&nbsp;" + key5Subject + "</a>";
	var keyTitle6 = "<a onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key6Layer + "),allLayersGroupPts.addLayer(" + key6LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">&nbsp;&nbsp;" + key6Subject + "</a>";
	
	var key1 = key1Labels.join('<br>');
	var key2 = key2Labels.join('<br>');
	var key3 = key3Labels.join('<br>');
	var key4 = key4Labels.join('<br>');
	var key5 = key5Labels.join('<br>');
	var key6 = key6Labels.join('<br>');
	var key1panel = "<div class='legend'>" + key1 + "</div>";
	var key2panel = "<div class='legend'>" + key2 + "</div>";
	var key3panel = "<div class='legend'>" + key3 + "</div>";
	var key4panel = "<div class='legend'>" + key4 + "</div>";
	var key5panel = "<div class='legend'>" + key5 + "</div>";
	var key6panel = "<div class='legend'>" + key6 + "</div>";
	var accordionStart = "<div class=\"panel-group\" id=\"accordion\">";
	var categoryAccordionTitle = "<div class=\"panel panel-primary\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapseCategory\">" + categoryName + "</a></h4></div>";
	var catAccordionPanel = "<div id=\"collapseCategory\" class=\"panel-collapse collapse in\"><div class=\"panel-body\">" + categoryDescription + "</div>";
	var key1AccordionTitle = "<div class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse1\" onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key1Layer + "),allLayersGroupPts.addLayer(" + key1LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">" + key1Subject + "</a></h4></div>";
	var key1AccordionPanel = "<div id=\"collapse1\" class=\"panel-collapse collapse\"><div class=\"panel-body\">" + key1Description + "</div>" + key1panel + "</div>";
	var key2AccordionTitle = "<div class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse2\" onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key2Layer + "),allLayersGroupPts.addLayer(" + key2LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">" + key2Subject + "</a></h4></div>";
	var key2AccordionPanel = "<div id=\"collapse2\" class=\"panel-collapse collapse\"><div class=\"panel-body\">" + key2Description + "</div>" + key2panel + "</div>";
	var key3AccordionTitle = "<div class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse3\" onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key3Layer + "),allLayersGroupPts.addLayer(" + key3LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">" + key3Subject + "</a></h4></div>";
	var key3AccordionPanel = "<div id=\"collapse3\" class=\"panel-collapse collapse\"><div class=\"panel-body\">" + key3Description + "</div>" + key3panel + "</div>";
	var key4AccordionTitle = "<div class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse4\" onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key4Layer + "),allLayersGroupPts.addLayer(" + key4LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">" + key4Subject + "</a></h4></div>";
	var key4AccordionPanel = "<div id=\"collapse4\" class=\"panel-collapse collapse\"><div class=\"panel-body\">" + key4Description + "</div>" + key4panel + "</div>";
	var key5AccordionTitle = "<div class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse5\" onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key5Layer + "),allLayersGroupPts.addLayer(" + key5LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">" + key5Subject + "</a></h4></div>";
	var key5AccordionPanel = "<div id=\"collapse5\" class=\"panel-collapse collapse\"><div class=\"panel-body\">" + key5Description + "</div>" + key5panel + "</div>";
	var key6AccordionTitle = "<div class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse6\" onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key6Layer + "),allLayersGroupPts.addLayer(" + key6LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">" + key6Subject + "</a></h4></div>";
	var key6AccordionPanel = "<div id=\"collapse6\" class=\"panel-collapse collapse\"><div class=\"panel-body\">" + key6Description + "</div>" + key6panel + "</div>";
	
	var accordionEnd = "</div>";
	
	mapKey.innerHTML = accordionStart + categoryAccordionTitle + catAccordionPanel + "</div></div>" + key1AccordionTitle + key1AccordionPanel + "</div></div>" + key2AccordionTitle + key2AccordionPanel + "</div></div>"  + key3AccordionTitle + key3AccordionPanel + "</div></div>"  + key4AccordionTitle + key4AccordionPanel + "</div></div>"  + key5AccordionTitle + key5AccordionPanel + "</div></div>"  + key6AccordionTitle + key6AccordionPanel + "</div></div>" + accordionEnd + "<br/>";
};

keyMLO = function () {
	var categoryName = "Multi-Lateral Organizations";
	var categoryDescription = "<h7 class='lorem'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a nibh ac ligula consequat sollicitudin. Curabitur placerat metus in dictum tempus. Maecenas ut lectus ac massa cursus rutrum. In euismod auctor nisl vitae aliquet. Curabitur vel bibendum est. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ipsum diam, interdum quis hendrerit sit amet, malesuada nec sem. Quisque ut sem vitae lorem aliquet fermentum vitae ac mauris. Nunc justo lorem, cursus eget consequat et, ornare in ante. Etiam ornare purus nec gravida aliquam. Donec pharetra et justo sed mollis. Suspendisse a ipsum ultrices, bibendum mi a, semper risus. Nam dictum leo id lacus varius, nec pharetra tortor eleifend. Aenean nunc eros, auctor vitae faucibus et, venenatis eu nisl.</h7>";
	
	var key1Subject = "African Union Membership";
	var key2Subject = "European Union Membership";
	var key3Subject = "Food and Agriculture Organization Membership";
	var key4Subject = "International Civil Aviation Organization Membership";
	var key5Subject = "North American Treaty Organization Membership";
	var key6Subject = "Organization of American States Membership";
	var key7Subject = "OECD Membership";
	var key8Subject = "OSCE Membership";
	var key9Subject = "UNESCO Membership";
	var key10Subject = "UNHCR Membership";
	var key11Subject = "UNGA Membership";
	var key1Layer = "geoJsonLayerMLOAU";
	var key2Layer = "geoJsonLayerMLOEU";
	var key3Layer = "geoJsonLayerMLOFAO";
	var key4Layer = "geoJsonLayerMLOICAO";
	var key5Layer = "geoJsonLayerMLONATO";
	var key6Layer = "geoJsonLayerMLOOAS";
	var key7Layer = "geoJsonLayerMLOOECD";
	var key8Layer = "geoJsonLayerMLOOSCE";
	var key9Layer = "geoJsonLayerMLOUNESCO";
	var key10Layer = "geoJsonLayerMLOUNHCR";
	var key11Layer = "geoJsonLayerMLOUNGA";
	var key1LayerPts = "";
	var key2LayerPts = "";
	var key3LayerPts = "";
	var key4LayerPts = "";
	var key5LayerPts = "";
	var key6LayerPts = "";
	var key7LayerPts = "";
	var key8LayerPts = "";
	var key9LayerPts = "";
	var key10LayerPts = "";
	var key11LayerPts = "";
	var key1Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam aliquet fermentum ipsum, id commodo orci dignissim non. Mauris vulputate ultricies leo, et porta orci pretium in. Duis pulvinar iaculis augue, sit amet mollis quam tristique.";
	var key2Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dapibus semper quam vel egestas. Nulla tempus hendrerit justo vel auctor. Pellentesque sollicitudin quis nulla et ornare. Nam rhoncus malesuada neque, a vulputate purus eleifend in.";
	var key3Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in aliquam tortor, eu commodo neque. Cras pellentesque vitae turpis quis adipiscing. Donec ut nisl feugiat, aliquet ligula sit amet, lacinia tortor. Maecenas consectetur dolor vitae.";
	var key4Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam molestie mauris at blandit convallis. Vestibulum molestie feugiat mi eget malesuada. Vivamus at diam quis sem porta aliquam. Integer sapien nulla, viverra ac vehicula et, scelerisque.";
	var key5Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras facilisis dui tortor, vel tristique sem condimentum a. Etiam tincidunt magna eu odio pretium, vel posuere metus adipiscing. Donec et purus turpis. Ut sodales sit amet.";
	var key6Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In adipiscing aliquam tellus at congue. Vivamus vitae vehicula lorem. Etiam pulvinar mauris vitae euismod pellentesque. Mauris venenatis tellus in turpis hendrerit porta. Cras eu est lacinia.";
	var key7Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam aliquet fermentum ipsum, id commodo orci dignissim non. Mauris vulputate ultricies leo, et porta orci pretium in. Duis pulvinar iaculis augue, sit amet mollis quam tristique.";
	var key8Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dapibus semper quam vel egestas. Nulla tempus hendrerit justo vel auctor. Pellentesque sollicitudin quis nulla et ornare. Nam rhoncus malesuada neque, a vulputate purus eleifend in.";
	var key9Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in aliquam tortor, eu commodo neque. Cras pellentesque vitae turpis quis adipiscing. Donec ut nisl feugiat, aliquet ligula sit amet, lacinia tortor. Maecenas consectetur dolor vitae.";
	var key10Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam molestie mauris at blandit convallis. Vestibulum molestie feugiat mi eget malesuada. Vivamus at diam quis sem porta aliquam. Integer sapien nulla, viverra ac vehicula et, scelerisque.";
	var key11Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras facilisis dui tortor, vel tristique sem condimentum a. Etiam tincidunt magna eu odio pretium, vel posuere metus adipiscing. Donec et purus turpis. Ut sodales sit amet.";
	
	var key1div = L.DomUtil.create('div'),
		grades = ['Member','null'],
		// this is something like a subheader
		key1Labels = [],
		from;

	for (var i = 0; i < grades.length; i++) {
		from = ['Member', 'Not a member'];
		
		key1Labels.push(
			'<i style="background:' + getColorMLOMember(grades[i]) + '"></i>' +
			from[i]
		);
	}
	
	var key2div = L.DomUtil.create('div'),
		grades = ['Member','null'],
		// this is something like a subheader
		key2Labels = [],
		from;

	for (var i = 0; i < grades.length; i++) {
		from = ['Member', 'Not a member'];
		
		key2Labels.push(
			'<i style="background:' + getColorMLOMember(grades[i]) + '"></i>' +
			from[i]
		);
	}

	var key3div = L.DomUtil.create('div'),
		grades = ['Member','null'],
		// this is something like a subheader
		key3Labels = [],
		from;

	for (var i = 0; i < grades.length; i++) {
		from = ['Member', 'Not a member'];
		
		key3Labels.push(
			'<i style="background:' + getColorMLOMember(grades[i]) + '"></i>' +
			from[i]
		);
	}
	
	var key4div = L.DomUtil.create('div'),
		grades = ['Member','null'],
		// this is something like a subheader
		key4Labels = [],
		from;

	for (var i = 0; i < grades.length; i++) {
		from = ['Member', 'Not a member'];
		
		key4Labels.push(
			'<i style="background:' + getColorMLOMember(grades[i]) + '"></i>' +
			from[i]
		);
	}
	
	var key5div = L.DomUtil.create('div'),
		grades = ['Member','null'],
		// this is something like a subheader
		key5Labels = [],
		from;

	for (var i = 0; i < grades.length; i++) {
		from = ['Member', 'Not a member'];
		
		key5Labels.push(
			'<i style="background:' + getColorMLOMember(grades[i]) + '"></i>' +
			from[i]
		);
	}
	
	var key6div = L.DomUtil.create('div'),
		grades = ['Member','null'],
		// this is something like a subheader
		key6Labels = [],
		from;

	for (var i = 0; i < grades.length; i++) {
		from = ['Member', 'Not a member'];
		
		key6Labels.push(
			'<i style="background:' + getColorMLOMember(grades[i]) + '"></i>' +
			from[i]
		);
	}
	
	var key7div = L.DomUtil.create('div'),
		grades = ['Member','null'],
		// this is something like a subheader
		key7Labels = [],
		from;

	for (var i = 0; i < grades.length; i++) {
		from = ['Member', 'Not a member'];
		
		key7Labels.push(
			'<i style="background:' + getColorMLOMember(grades[i]) + '"></i>' +
			from[i]
		);
	}
	
	var key8div = L.DomUtil.create('div'),
		grades = ['Member','null'],
		// this is something like a subheader
		key8Labels = [],
		from;

	for (var i = 0; i < grades.length; i++) {
		from = ['Member', 'Not a member'];
		
		key8Labels.push(
			'<i style="background:' + getColorMLOMember(grades[i]) + '"></i>' +
			from[i]
		);
	}
	
	var key9div = L.DomUtil.create('div'),
		grades = ['Member','null'],
		// this is something like a subheader
		key9Labels = [],
		from;

	for (var i = 0; i < grades.length; i++) {
		from = ['Member', 'Not a member'];
		
		key9Labels.push(
			'<i style="background:' + getColorMLOMember(grades[i]) + '"></i>' +
			from[i]
		);
	}
	
	var key10div = L.DomUtil.create('div'),
		grades = ['Member','null'],
		// this is something like a subheader
		key10Labels = [],
		from;

	for (var i = 0; i < grades.length; i++) {
		from = ['Member', 'Not a member'];
		
		key10Labels.push(
			'<i style="background:' + getColorMLOMember(grades[i]) + '"></i>' +
			from[i]
		);
	}
	
	var key11div = L.DomUtil.create('div'),
		grades = ['Member','null'],
		// this is something like a subheader
		key11Labels = [],
		from;

	for (var i = 0; i < grades.length; i++) {
		from = ['Member', 'Not a member'];
		
		key11Labels.push(
			'<i style="background:' + getColorMLOMember(grades[i]) + '"></i>' +
			from[i]
		);
	}
	
	var keyTitle1 = "<a onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key1Layer + "),allLayersGroupPts.addLayer(" + key1LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">&nbsp;&nbsp;" + key1Subject + "</a>";
	var keyTitle2 = "<a onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key2Layer + "),allLayersGroupPts.addLayer(" + key2LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">&nbsp;&nbsp;" + key2Subject + "</a>";
	var keyTitle3 = "<a onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key3Layer + "),allLayersGroupPts.addLayer(" + key3LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">&nbsp;&nbsp;" + key3Subject + "</a>";
	var keyTitle4 = "<a onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key4Layer + "),allLayersGroupPts.addLayer(" + key4LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">&nbsp;&nbsp;" + key4Subject + "</a>";
	var keyTitle5 = "<a onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key5Layer + "),allLayersGroupPts.addLayer(" + key5LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">&nbsp;&nbsp;" + key5Subject + "</a>";
	var keyTitle6 = "<a onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key6Layer + "),allLayersGroupPts.addLayer(" + key6LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">&nbsp;&nbsp;" + key6Subject + "</a>";
	var keyTitle7 = "<a onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key7Layer + "),allLayersGroupPts.addLayer(" + key7LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">&nbsp;&nbsp;" + key7Subject + "</a>";
	var keyTitle8 = "<a onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key8Layer + "),allLayersGroupPts.addLayer(" + key8LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">&nbsp;&nbsp;" + key8Subject + "</a>";
	var keyTitle9 = "<a onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key8Layer + "),allLayersGroupPts.addLayer(" + key9LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">&nbsp;&nbsp;" + key9Subject + "</a>";
	var keyTitle10 = "<a onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key10Layer + "),allLayersGroupPts.addLayer(" + key10LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">&nbsp;&nbsp;" + key10Subject + "</a>";
	var keyTitle11 = "<a onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key11Layer + "),allLayersGroupPts.addLayer(" + key11LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">&nbsp;&nbsp;" + key11Subject + "</a>";
	
	var key1 = key1Labels.join('<br>');
	var key2 = key2Labels.join('<br>');
	var key3 = key3Labels.join('<br>');
	var key4 = key4Labels.join('<br>');
	var key5 = key5Labels.join('<br>');
	var key6 = key6Labels.join('<br>');
	var key7 = key7Labels.join('<br>');
	var key8 = key8Labels.join('<br>');
	var key9 = key9Labels.join('<br>');
	var key10 = key10Labels.join('<br>');
	var key11 = key11Labels.join('<br>');
	
	var key1panel = "<div class='legend'>" + key1 + "</div>";
	var key2panel = "<div class='legend'>" + key2 + "</div>";
	var key3panel = "<div class='legend'>" + key3 + "</div>";
	var key4panel = "<div class='legend'>" + key4 + "</div>";
	var key5panel = "<div class='legend'>" + key5 + "</div>";
	var key6panel = "<div class='legend'>" + key6 + "</div>";
	var key7panel = "<div class='legend'>" + key7 + "</div>";
	var key8panel = "<div class='legend'>" + key8 + "</div>";
	var key9panel = "<div class='legend'>" + key9 + "</div>";
	var key10panel = "<div class='legend'>" + key10 + "</div>";
	var key11panel = "<div class='legend'>" + key11 + "</div>";
	
	var accordionStart = "<div class=\"panel-group\" id=\"accordion\">";
	var categoryAccordionTitle = "<div class=\"panel panel-primary\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapseCategory\">" + categoryName + "</a></h4></div>";
	var catAccordionPanel = "<div id=\"collapseCategory\" class=\"panel-collapse collapse in\"><div class=\"panel-body\">" + categoryDescription + "</div>";
	var key1AccordionTitle = "<div class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse1\" onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key1Layer + "),allLayersGroupPts.addLayer(" + key1LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">" + key1Subject + "</a></h4></div>";
	var key1AccordionPanel = "<div id=\"collapse1\" class=\"panel-collapse collapse\"><div class=\"panel-body\">" + key1Description + "</div>" + key1panel + "</div>";
	var key2AccordionTitle = "<div class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse2\" onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key2Layer + "),allLayersGroupPts.addLayer(" + key2LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">" + key2Subject + "</a></h4></div>";
	var key2AccordionPanel = "<div id=\"collapse2\" class=\"panel-collapse collapse\"><div class=\"panel-body\">" + key2Description + "</div>" + key2panel + "</div>";
	var key3AccordionTitle = "<div class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse3\" onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key3Layer + "),allLayersGroupPts.addLayer(" + key3LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">" + key3Subject + "</a></h4></div>";
	var key3AccordionPanel = "<div id=\"collapse3\" class=\"panel-collapse collapse\"><div class=\"panel-body\">" + key3Description + "</div>" + key3panel + "</div>";
	var key4AccordionTitle = "<div class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse4\" onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key4Layer + "),allLayersGroupPts.addLayer(" + key4LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">" + key4Subject + "</a></h4></div>";
	var key4AccordionPanel = "<div id=\"collapse4\" class=\"panel-collapse collapse\"><div class=\"panel-body\">" + key4Description + "</div>" + key4panel + "</div>";
	var key5AccordionTitle = "<div class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse5\" onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key5Layer + "),allLayersGroupPts.addLayer(" + key5LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">" + key5Subject + "</a></h4></div>";
	var key5AccordionPanel = "<div id=\"collapse5\" class=\"panel-collapse collapse\"><div class=\"panel-body\">" + key5Description + "</div>" + key5panel + "</div>";
	var key6AccordionTitle = "<div class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse6\" onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key6Layer + "),allLayersGroupPts.addLayer(" + key6LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">" + key6Subject + "</a></h4></div>";
	var key6AccordionPanel = "<div id=\"collapse6\" class=\"panel-collapse collapse\"><div class=\"panel-body\">" + key6Description + "</div>" + key6panel + "</div>";
	var key7AccordionTitle = "<div class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse7\" onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key7Layer + "),allLayersGroupPts.addLayer(" + key7LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">" + key7Subject + "</a></h4></div>";
	var key7AccordionPanel = "<div id=\"collapse7\" class=\"panel-collapse collapse\"><div class=\"panel-body\">" + key7Description + "</div>" + key7panel + "</div>";
	var key8AccordionTitle = "<div class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse8\" onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key8Layer + "),allLayersGroupPts.addLayer(" + key8LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">" + key8Subject + "</a></h4></div>";
	var key8AccordionPanel = "<div id=\"collapse8\" class=\"panel-collapse collapse\"><div class=\"panel-body\">" + key8Description + "</div>" + key8panel + "</div>";
	var key9AccordionTitle = "<div class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse9\" onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key9Layer + "),allLayersGroupPts.addLayer(" + key9LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">" + key9Subject + "</a></h4></div>";
	var key9AccordionPanel = "<div id=\"collapse9\" class=\"panel-collapse collapse\"><div class=\"panel-body\">" + key9Description + "</div>" + key9panel + "</div>";
	var key10AccordionTitle = "<div class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse10\" onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key10Layer + "),allLayersGroupPts.addLayer(" + key10LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">" + key10Subject + "</a></h4></div>";
	var key10AccordionPanel = "<div id=\"collapse10\" class=\"panel-collapse collapse\"><div class=\"panel-body\">" + key10Description + "</div>" + key10panel + "</div>";
	var key11AccordionTitle = "<div class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse11\" onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key11Layer + "),allLayersGroupPts.addLayer(" + key11LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">" + key11Subject + "</a></h4></div>";
	var key11AccordionPanel = "<div id=\"collapse11\" class=\"panel-collapse collapse\"><div class=\"panel-body\">" + key11Description + "</div>" + key11panel + "</div>";
	
	var accordionEnd = "</div>";
	
	mapKey.innerHTML = accordionStart + categoryAccordionTitle + catAccordionPanel + "</div></div>" + key1AccordionTitle + key1AccordionPanel + "</div></div>" + key2AccordionTitle + key2AccordionPanel + "</div></div>"  + key3AccordionTitle + key3AccordionPanel + "</div></div>"  + key4AccordionTitle + key4AccordionPanel + "</div></div>"  + key5AccordionTitle + key5AccordionPanel + "</div></div>"  + key6AccordionTitle + key6AccordionPanel + "</div></div>" + key7AccordionTitle + key7AccordionPanel + "</div></div>" + key8AccordionTitle + key8AccordionPanel + "</div></div>" + key9AccordionTitle + key9AccordionPanel + "</div></div>" + key10AccordionTitle + key10AccordionPanel + "</div></div>" + key11AccordionTitle + key11AccordionPanel + "</div></div>" + accordionEnd + "<br/>";
};

keyHI = function () {
	var categoryName = "Health Issues";
	var categoryDescription = "<h7 class='lorem'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum a nibh ac ligula consequat sollicitudin. Curabitur placerat metus in dictum tempus. Maecenas ut lectus ac massa cursus rutrum. In euismod auctor nisl vitae aliquet. Curabitur vel bibendum est. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ipsum diam, interdum quis hendrerit sit amet, malesuada nec sem. Quisque ut sem vitae lorem aliquet fermentum vitae ac mauris. Nunc justo lorem, cursus eget consequat et, ornare in ante. Etiam ornare purus nec gravida aliquam. Donec pharetra et justo sed mollis. Suspendisse a ipsum ultrices, bibendum mi a, semper risus. Nam dictum leo id lacus varius, nec pharetra tortor eleifend. Aenean nunc eros, auctor vitae faucibus et, venenatis eu nisl.</h7>";
	
	var key1Subject = "Avian Flu (tk)";
	var key2Subject = "HIV / AIDS (tk)";
	var key3Subject = "Malaria (tk)";
	var key4Subject = "Maternal Health - Access to Care";
	var key5Subject = "PEPFAR";
	var key6Subject = "Polio (tk)";
	var key7Subject = "Tuberculosis (tk)";
	var key1Layer = "geoJsonLayerHIAV";
	var key2Layer = "geoJsonLayerHIHIVAIDS";
	var key3Layer = "geoJsonLayerHIM";
	var key4Layer = "geoJsonLayerHIMHAC";
	var key5Layer = "geoJsonLayerHIPEPFAR";
	var key6Layer = "geoJsonLayerHIP";
	var key7Layer = "geoJsonLayerHIT";
	var key1LayerPts = "";
	var key2LayerPts = "";
	var key3LayerPts = "";
	var key4LayerPts = "";
	var key5LayerPts = "geoJsonLayerHIPEPFARpts";
	var key6LayerPts = "";
	var key7LayerPts = "";
	var key1Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam aliquet fermentum ipsum, id commodo orci dignissim non. Mauris vulputate ultricies leo, et porta orci pretium in. Duis pulvinar iaculis augue, sit amet mollis quam tristique.";
	var key2Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dapibus semper quam vel egestas. Nulla tempus hendrerit justo vel auctor. Pellentesque sollicitudin quis nulla et ornare. Nam rhoncus malesuada neque, a vulputate purus eleifend in.";
	var key3Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in aliquam tortor, eu commodo neque. Cras pellentesque vitae turpis quis adipiscing. Donec ut nisl feugiat, aliquet ligula sit amet, lacinia tortor. Maecenas consectetur dolor vitae.";
	var key4Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam molestie mauris at blandit convallis. Vestibulum molestie feugiat mi eget malesuada. Vivamus at diam quis sem porta aliquam. Integer sapien nulla, viverra ac vehicula et, scelerisque.";
	var key5Description = "After decades of sporadic assistance to the growing issue of HIV/AIDS around the world, the international community has come together to deal with this and other health issues that impact the stability of our shrinking world.  Besides contributing to international initiatives including the Global Fund to Fight Aids, Tuberculosis and Malaria, the United States implemented the President's Emergency Plan for AIDS Relief (PEPFAR) to partner with local governmental and non-governmental health agencies to develop programs to prevent, test, and treat the disease. PEPFAR investments also help to alleviate suffering from other diseases across the global health spectrum. Since 2008, the number of individuals receiving lifesaving anti-retroviral therapy has more than tripled and more than one million babies have been born without HIV due to PEPFAR-supported programs.  And the moment has arrived when creating an AIDS-free generation is truly within reach.PEPFAR has also served to transform the way that development is done.  While continuing to rapidly expand access to lifesaving HIV services, PEPFAR has moved from an emergency state to a more sustainable footing, creating a robust health care delivery capability -- often where little to none previously existed -- that is being used not only to address HIV, but also a broader range of health issues. Since 2011, U.S. Department of State has created Partnership Frameworks, a series of joint strategic plans with foreign governments, such as South Africa and Botswana, through which  a true and enduring partnership with host countries has evolved -- one that positions them to assume greater ownership of their national HIV response. The plans aim to promote a sustainable approach to combating HIV/AIDS in partner countries through service delivery, policy reform, and coordinated financial commitments. After decades of sporadic assistance to the growing issue of HIV/AIDS around the world, the international community has come together to deal with this and other health issues that impact the stability of our shrinking world.  Besides contributing to international initiatives including the Global Fund to Fight Aids, Tuberculosis and Malaria, the United States implemented the President's Emergency Plan for AIDS Relief (PEPFAR) to partner with local governmental and non-governmental health agencies to develop programs to prevent, test, and treat the disease. PEPFAR investments also help to alleviate suffering from other diseases across the global health spectrum. Since 2008, the number of individuals receiving lifesaving anti-retroviral therapy has more than tripled and more than one million babies have been born without HIV due to PEPFAR-supported programs.  And the moment has arrived when creating an AIDS-free generation is truly within reach.PEPFAR has also served to transform the way that development is done.  While continuing to rapidly expand access to lifesaving HIV services, PEPFAR has moved from an emergency state to a more sustainable footing, creating a robust health care delivery capability -- often where little to none previously existed -- that is being used not only to address HIV, but also a broader range of health issues.  Since 2011, U.S. Department of State has created Partnership Frameworks, a series of joint strategic plans with foreign governments, such as South Africa and Botswana, through which  a true and enduring partnership with host countries has evolved -- one that positions them to assume greater ownership of their national HIV response. The plans aim to promote a sustainable approach to combating HIV/AIDS in partner countries through service delivery, policy reform, and coordinated financial commitments.";
	var key6Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In adipiscing aliquam tellus at congue. Vivamus vitae vehicula lorem. Etiam pulvinar mauris vitae euismod pellentesque. Mauris venenatis tellus in turpis hendrerit porta. Cras eu est lacinia.";
	var key7Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam aliquet fermentum ipsum, id commodo orci dignissim non. Mauris vulputate ultricies leo, et porta orci pretium in. Duis pulvinar iaculis augue, sit amet mollis quam tristique.";
	
	var key1div = L.DomUtil.create('div'),
		grades = ['Member','null'],
		// this is something like a subheader
		key1Labels = [],
		from;

	for (var i = 0; i < grades.length; i++) {
		from = ['Member', 'Not a member'];
		
		key1Labels.push(
			'<i style="background:' + getColorHIAV(grades[i]) + '"></i>' +
			from[i]
		);
	}
	
	var key2div = L.DomUtil.create('div'),
		grades = ['Member','null'],
		// this is something like a subheader
		key2Labels = [],
		from;

	for (var i = 0; i < grades.length; i++) {
		from = ['Member', 'Not a member'];
		
		key2Labels.push(
			'<i style="background:' + getColorHIHIVAIDS(grades[i]) + '"></i>' +
			from[i]
		);
	}

	var key3div = L.DomUtil.create('div'),
		grades = ['Member','null'],
		// this is something like a subheader
		key3Labels = [],
		from;

	for (var i = 0; i < grades.length; i++) {
		from = ['Member', 'Not a member'];
		
		key3Labels.push(
			'<i style="background:' + getColorHIM(grades[i]) + '"></i>' +
			from[i]
		);
	}
	
	var key4div = L.DomUtil.create('div'),
		grades = ['Excellent', 'Good', 'Fair', 'Poor', 'Unsuitable', 'No data'],
		// this is something like a subheader
		key4Labels = [],
		from;

	for (var i = 0; i < grades.length; i++) {
		from = ['Excellent', 'Good', 'Fair', 'Poor', 'Unsuitable', 'No data'];
		
		key4Labels.push(
			'<i style="background:' + getColorHIMHAC(grades[i]) + '"></i>' +
			from[i]
		);
	}
	
	var key5div = L.DomUtil.create('div'),
		grades = ['1', '2', '3', 'No Data'],
		// this is something like a subheader
		key5Labels = [],
		from;

	for (var i = 0; i < grades.length; i++) {
		from = ['1', '2', '3', 'No data'];
		
		key5Labels.push(
			'<i style="background:' + getColorHIPEPFAR(grades[i]) + '"></i>' +
			from[i]
		);
	}
					
	var key6div = L.DomUtil.create('div'),
		grades = ['Member','null'],
		// this is something like a subheader
		key6Labels = [],
		from;

	for (var i = 0; i < grades.length; i++) {
		from = ['Member', 'Not a member'];
		
		key6Labels.push(
			'<i style="background:' + getColorHIP(grades[i]) + '"></i>' +
			from[i]
		);
	}
	
	var key7div = L.DomUtil.create('div'),
		grades = ['Member','null'],
		// this is something like a subheader
		key7Labels = [],
		from;

	for (var i = 0; i < grades.length; i++) {
		from = ['Member', 'Not a member'];
		
		key7Labels.push(
			'<i style="background:' + getColorHIT(grades[i]) + '"></i>' +
			from[i]
		);
	}
	
	var keyTitle1 = "<a onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key1Layer + "),allLayersGroupPts.addLayer(" + key1LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">&nbsp;&nbsp;" + key1Subject + "</a>";
	var keyTitle2 = "<a onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key2Layer + "),allLayersGroupPts.addLayer(" + key2LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">&nbsp;&nbsp;" + key2Subject + "</a>";
	var keyTitle3 = "<a onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key3Layer + "),allLayersGroupPts.addLayer(" + key3LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">&nbsp;&nbsp;" + key3Subject + "</a>";
	var keyTitle4 = "<a onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key4Layer + "),allLayersGroupPts.addLayer(" + key4LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">&nbsp;&nbsp;" + key4Subject + "</a>";
	var keyTitle5 = "<a onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key5Layer + "),allLayersGroupPts.addLayer(" + key5LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">&nbsp;&nbsp;" + key5Subject + "</a>";
	var keyTitle6 = "<a onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key6Layer + "),allLayersGroupPts.addLayer(" + key6LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">&nbsp;&nbsp;" + key6Subject + "</a>";
	var keyTitle7 = "<a onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key7Layer + "),allLayersGroupPts.addLayer(" + key7LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">&nbsp;&nbsp;" + key7Subject + "</a>";
	
	var key1 = key1Labels.join('<br>');
	var key2 = key2Labels.join('<br>');
	var key3 = key3Labels.join('<br>');
	var key4 = key4Labels.join('<br>');
	var key5 = key5Labels.join('<br>');
	var key6 = key6Labels.join('<br>');
	var key7 = key7Labels.join('<br>');
	
	var key1panel = "<div class='legend'>" + key1 + "</div>";
	var key2panel = "<div class='legend'>" + key2 + "</div>";
	var key3panel = "<div class='legend'>" + key3 + "</div>";
	var key4panel = "<div class='legend'>" + key4 + "</div>";
	var key5panel = "<div class='legend'>" + key5 + "</div>";
	var key6panel = "<div class='legend'>" + key6 + "</div>";
	var key7panel = "<div class='legend'>" + key7 + "</div>";
	
	var accordionStart = "<div class=\"panel-group\" id=\"accordion\">";
	var categoryAccordionTitle = "<div class=\"panel panel-primary\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapseCategory\">" + categoryName + "</a></h4></div>";
	var catAccordionPanel = "<div id=\"collapseCategory\" class=\"panel-collapse collapse in\"><div class=\"panel-body\">" + categoryDescription + "</div>";
	var key1AccordionTitle = "<div class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse1\" onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key1Layer + "),allLayersGroupPts.addLayer(" + key1LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">" + key1Subject + "</a></h4></div>";
	var key1AccordionPanel = "<div id=\"collapse1\" class=\"panel-collapse collapse\"><div class=\"panel-body\">" + key1Description + "</div>" + key1panel + "</div>";
	var key2AccordionTitle = "<div class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse2\" onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key2Layer + "),allLayersGroupPts.addLayer(" + key2LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">" + key2Subject + "</a></h4></div>";
	var key2AccordionPanel = "<div id=\"collapse2\" class=\"panel-collapse collapse\"><div class=\"panel-body\">" + key2Description + "</div>" + key2panel + "</div>";
	var key3AccordionTitle = "<div class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse3\" onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key3Layer + "),allLayersGroupPts.addLayer(" + key3LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">" + key3Subject + "</a></h4></div>";
	var key3AccordionPanel = "<div id=\"collapse3\" class=\"panel-collapse collapse\"><div class=\"panel-body\">" + key3Description + "</div>" + key3panel + "</div>";
	var key4AccordionTitle = "<div class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse4\" onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key4Layer + "),allLayersGroupPts.addLayer(" + key4LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">" + key4Subject + "</a></h4></div>";
	var key4AccordionPanel = "<div id=\"collapse4\" class=\"panel-collapse collapse\"><div class=\"panel-body\">" + key4Description + "</div>" + key4panel + "</div>";
	var key5AccordionTitle = "<div class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse5\" onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key5Layer + "),allLayersGroupPts.addLayer(" + key5LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">" + key5Subject + "</a></h4></div>";
	var key5AccordionPanel = "<div id=\"collapse5\" class=\"panel-collapse collapse\"><div class=\"panel-body\">" + key5Description + "</div>" + key5panel + "</div>";
	var key6AccordionTitle = "<div class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse6\" onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key6Layer + "),allLayersGroupPts.addLayer(" + key6LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">" + key6Subject + "</a></h4></div>";
	var key6AccordionPanel = "<div id=\"collapse6\" class=\"panel-collapse collapse\"><div class=\"panel-body\">" + key6Description + "</div>" + key6panel + "</div>";
	var key7AccordionTitle = "<div class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse7\" onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key7Layer + "),allLayersGroupPts.addLayer(" + key7LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">" + key7Subject + "</a></h4></div>";
	var key7AccordionPanel = "<div id=\"collapse7\" class=\"panel-collapse collapse\"><div class=\"panel-body\">" + key7Description + "</div>" + key7panel + "</div>";
	
	var accordionEnd = "</div>";
	
	mapKey.innerHTML = accordionStart + categoryAccordionTitle + catAccordionPanel + "</div></div>" + key1AccordionTitle + key1AccordionPanel + "</div></div>" + key2AccordionTitle + key2AccordionPanel + "</div></div>"  + key3AccordionTitle + key3AccordionPanel + "</div></div>"  + key4AccordionTitle + key4AccordionPanel + "</div></div>"  + key5AccordionTitle + key5AccordionPanel + "</div></div>"  + key6AccordionTitle + key6AccordionPanel + "</div></div>" + key7AccordionTitle + key7AccordionPanel + "</div></div>" + accordionEnd + "<br/>";
};

keyNuc = function () {
	currentKey="Nuc";
	var categoryName = "Nuclear Arms Control";
	var categoryDescription = "<div><h7 class='lorem'>While the Cold War threat of nuclear conflict has receded, concerns about controlling nuclear, biological, chemical and conventional weapons and even conventional weapons remain high.  The United States, in seeking ways to make the world safer, has engaged with other countries to extend and enforce the terms of non-proliferation treaties, reduce and secure current arsenals and weapons grade materials, and to contain countries which are developing nuclear capabilities.  A secondary concern is to ensure that nuclear weapons do not reach terrorist organizations.</h7><br><br><h7 class='lorem'>A key element in the effort to control arms around the world has been the Treaty on the Non-Proliferation of Nuclear Weapons (NPT) which opened for signature in 1968 and entered into force in 1970. In Prague on April 5, 2009 President Obama said that the basic bargain at the core of the Treaty is sound: “countries with nuclear weapons will move towards disarmament; countries without nuclear weapons will not acquire them; and all countries can access peaceful nuclear energy.”  Although only nine countries are acknowledged to possess nuclear weapons, not all of them are among the nearly190 nations are party to the treaty.  The Treaty is regarded as the legal and political cornerstone of the nuclear nonproliferation regime, enunciating the three main “pillars” – nuclear nonproliferation, disarmament, and the peaceful use of nuclear energy.</h7><br><br><h7 class='lorem'>The Bureau of Arms Control, Verification and Compliance, coordinating with other national security institutions, develops strategies for the negotiation of arms control and disarmament treaties and creates strong relationships with other nations to cooperate in the implementation of the treaties.  Ultimately, the work of the bureau serves to improve the security of the United States and all the nations of the world.</h7></div>";
	
	var key1Subject = "Nuclear Arms Control - Signed";
	var key2Subject = "Nuclear Arms Control - Deposited";
	var key1Layer = "geoJsonLayerNucSign";
	var key2Layer = "geoJsonLayerNucDepo";
	var key1LayerPts = "geoJsonLayerNucpts";
	var key2LayerPts = "geoJsonLayerNucpts";
	var key1Description = "The Bureau of Arms Control, Verification and Compliance, coordinating with other national security institutions, develops strategies for the negotiation of arms control and disarmament treaties and creates strong relationships with other nations to cooperate in the implementation of the treaties. Ultimately, the work of the bureau serves to improve the security of the United States and all the nations of the world.";
	var key2Description = "The Bureau of Arms Control, Verification and Compliance, coordinating with other national security institutions, develops strategies for the negotiation of arms control and disarmament treaties and creates strong relationships with other nations to cooperate in the implementation of the treaties. Ultimately, the work of the bureau serves to improve the security of the United States and all the nations of the world.";
	
	
	var key1div = L.DomUtil.create('div'),
		grades = ['X'],
		// this is something like a subheader
		key1Labels = [],
		from;

	for (var i = 0; i < grades.length; i++) {
		from = ['Signed'];
		
		key1Labels.push(
			'<i style="background:' + getColorNucSign(grades[i]) + '"></i>' +
			from[i]
		);
	}
	
	var key2div = L.DomUtil.create('div'),
		grades = ['X'],
		// this is something like a subheader
		key2Labels = [],
		from;

	for (var i = 0; i < grades.length; i++) {
		from = ['Deposited'];
		
		key2Labels.push(
			'<i style="background:' + getColorNucDepo(grades[i]) + '"></i>' +
			from[i]
		);
	}

	var keyTitle1 = "<a onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key1Layer + "),allLayersGroupPts.addLayer(" + key1LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">&nbsp;&nbsp;" + key1Subject + "</a>";
	var keyTitle2 = "<a onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key2Layer + "),allLayersGroupPts.addLayer(" + key2LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">&nbsp;&nbsp;" + key2Subject + "</a>";
	
	var key1 = key1Labels.join('<br>');
	var key2 = key2Labels.join('<br>');
	var key1panel = "<div class='legend'>" + key1 + "</div>";
	var key2panel = "<div class='legend'>" + key2 + "</div>";
	var accordionStart = "<div class=\"panel-group\" id=\"accordion\" style=\"height:609px;overflow-y:scroll;margin-bottom:0px;\">";
	var categoryAccordionTitle = "<div class=\"panel panel-primary\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapseCategory\">" + categoryName + "</a></h4></div>";
	var catAccordionPanel = "<div id=\"collapseCategory\" class=\"panel-collapse collapse in\"><div class=\"panel-body\">" + categoryDescription + "</div>";
	var key1AccordionTitle = "<div class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse1\" onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key1Layer + "),allLayersGroupPts.addLayer(" + key1LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">" + key1Subject + "</a></h4></div>";
	var key1AccordionPanel = "<div id=\"collapse1\" class=\"panel-collapse collapse\"><div class=\"panel-body\">" + key1Description + "</div>" + key1panel + "</div>";
	var key2AccordionTitle = "<div class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse2\" onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key2Layer + "),allLayersGroupPts.addLayer(" + key2LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">" + key2Subject + "</a></h4></div>";
	var key2AccordionPanel = "<div id=\"collapse2\" class=\"panel-collapse collapse\"><div class=\"panel-body\">" + key2Description + "</div>" + key2panel + "</div>";
	
	var accordionEnd = "</div>";
	
	mapKey.innerHTML = accordionStart + categoryAccordionTitle + catAccordionPanel + "</div></div>" + key1AccordionTitle + key1AccordionPanel + "</div>" + key2AccordionTitle + key2AccordionPanel + "</div></div></div>" + accordionEnd + "<br/>";
};

keyHT = function () {
	var key1Subject = "Human Trafficking";
	var key1Layer = "geoJsonLayerHT";
	var key1LayerPts = "geoJsonLayerHTpts";
	var key1Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dapibus semper quam vel egestas. Nulla tempus hendrerit justo vel auctor. Pellentesque sollicitudin quis nulla et ornare. Nam rhoncus malesuada neque, a vulputate purus eleifend in.";
	
	var key1div = L.DomUtil.create('div'),
		grades = ['Tier 1', 'Tier 2', 'Tier 2 Watch List', 'Tier 3 Auto-Downgrade', 'Tier 3', 'Special Case'],
		// this is something like a subheader
		key1Labels = [],
		from;

	for (var i = 0; i < grades.length; i++) {
		from = ['Tier 1', 'Tier 2', 'Tier 2 Watch List', 'Tier 3 Auto-Downgrade', 'Tier 3', 'Special Case'];
	
		key1Labels.push(
			'<i style="background:' + getColorHT(grades[i]) + '"></i>' +
			from[i]
		);
	}
	
	//var name = "Nuclear Arms Control";
	var keyTitle1 = "<a onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key1Layer + "),allLayersGroupPts.addLayer(" + key1LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">&nbsp;&nbsp;" + key1Subject + "</a>";
	
	var key1 = key1Labels.join('<br>');
	var key1panel = "<div class='legend'>" + key1 + "</div>";
	var accordionStart = "<div class=\"panel-group\" id=\"accordion\">";
	var key1AccordionTitle = "<div class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse1\" onClick=\"javascript:allLayersGroup.clearLayers(),allLayersGroupPts.clearLayers(),allLayersGroup.addLayer(" + key1Layer + "),allLayersGroupPts.addLayer(" + key1LayerPts + "),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);\">" + key1Subject + "</a></h4></div>";
	var key1AccordionPanel = "<div id=\"collapse1\" class=\"panel-collapse collapse in\"><div class=\"panel-body\">" + key1Description + "</div>" + key1panel + "</div>";
	
	var accordionEnd = "</div>";
	
	mapKey.innerHTML = accordionStart + "</div></div>" + key1AccordionTitle + key1AccordionPanel + "</div></div>" + accordionEnd + "<br/>";
};

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
function zoomToFeature(e) {
	map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
	layer.on({
		//click: highlightFeature,
		//mouseout: resetHighlight
	});
}

var popup = L.popup();

function onEachFeaturePts(feature, layer) {
	layer.on({
	//mouseover: highlightFeature,
	//mouseout: resetHighlight
	//click: zoomToFeature
	});

	var popupContent = "";
	
	// NEW POPUP CODE - In Progress
	// popup for photo and video
	if (feature.properties.PhotoURL !== undefined && feature.properties.VideoURL !== undefined){
		popupContent = "<h4>" + feature.properties.Title + "</h4><h5>" + feature.properties.Country + "</h5><video width='320' height='240' controls><source src='vid/sample_mpeg4.mp4' type='video/mp4'>Your browser does not support the video tag.</video><br><img src='img/usdos-logo-seal.png' alt='photo test' height='42' width='100%'><h5 style='height:140px; overflow-y:scroll'>" + feature.properties.Story + "</h5>";
		layer.bindPopup(popupContent);
	} 
	// popup for photo only
	else if (feature.properties.PhotoURL !== undefined && feature.properties.VideoURL == undefined){
		popupContent = "<h4>" + feature.properties.Title + "</h4><h5>" + feature.properties.Country + "</h5><img src='img/usdos-logo-seal.png' alt='photo test' height='42' width='100%'>< style='height:140px; overflow-y:scroll'h5>" + feature.properties.Story + "</h5>";
		layer.bindPopup(popupContent);
	}
	// popup for video only
	else if (feature.properties.PhotoURL == undefined && feature.properties.VideoURL !== undefined){
		popupContent = "<h4>" + feature.properties.Title + "</h4><h5>" + feature.properties.Country + "</h5><video width='320' height='240' controls><source src='vid/sample_mpeg4.mp4' type='video/mp4'>Your browser does not support the video tag.</video><h5 style='height:140px; overflow-y:scroll'>" + feature.properties.Story + "</h5>";
		layer.bindPopup(popupContent);
	// popup text only
	} else {
		popupContent = "<h3>" + feature.properties.Title + "</h3><h4>" + feature.properties.Country + "</h4><h6 style='height:140px; overflow-y:scroll; font-size: small; font-weight: normal' >" + feature.properties.Story + "</h6>";
		layer.bindPopup(popupContent);
	} 
}
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

keyToggle.onAdd = function (map) {
	this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
	this._div.innerHTML = "<a onClick=\"javascript:openPane();\">Show</a>";
	
	return this._div;
};

// method that we will use to update the control based on feature properties passed

keyToggle.addTo(map);