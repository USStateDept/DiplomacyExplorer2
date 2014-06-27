/*Initialization of the program.
 *
 *
 */
var baseURL = "http://" + host + "/geoserver/opengeo/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=opengeo%3A*******&outputformat=json";
var generalBaseLayer = "PA_Data_110m"



var allLayersGroup = new L.LayerGroup();
var allLayersGroupPts = new L.LayerGroup();

var currentKey;




var geoJsonList = {}
var geoJsonLayer;
var keysets;
//load the base geoJson layer


var ignite = function(data){
		keysets = {
			"keyTP":{
				'categoryName': "Trade Promotion",
				'categoryDescription': "<div><h7 class='lorem'>The Department of State’s Bureau of Economic, Energy and Business Affairs is devoted to providing technical expertise in regional and bilateral trade negotiations including labor, environment, services, government procurement, trade remedies, and trade capacity building. This bureau helps to oversee programs such as AGOA.</h7></div>",
				'layers':{
					'geoJsonLayerTPAPEC': {
						'subject': "APEC Membership",
						'jsonLayer': new L.geoJson(data, {style: StyleTPAPEC}),
						'ptsLayer': "",
						'description':"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam aliquet fermentum ipsum, id commodo orci dignissim non. Mauris vulputate ultricies leo, et porta orci pretium in. Duis pulvinar iaculis augue, sit amet mollis quam tristique.",
						'labels': {'grades': ['Member','null'], 'from': ['Member', 'Not a member']}
					},
					'geoJsonLayerTPASEAN':{
						'subject': "ASEAN Membership",
						'jsonLayer': new L.geoJson(data, {style: StyleTPASEAN}),
						'ptsLayer': "",
						'description': "ASEAN Membership stuffASEAN Membership stuffASEAN Membership stuffASEAN Membership stuffASEAN Membership stuffASEAN Membership stuffASEAN Membership stuff",
						'labels': {'grades': ['Member','null'], 'from': ['Member', 'Not a member']}
					},
					'geoJsonLayerTPCAFTA':{
						'subject': "CAFTA Membership",
						'jsonLayer': new L.geoJson(data, {style: StyleTPCAFTA}),
						'ptsLayer': "",
						'description': "CAFTA MembershipCAFTA MembershipCAFTA MembershipCAFTA Membership",
						'labels': {'grades': ['Member','null'], 'from': ['Member', 'Not a member']}
					},
					'geoJsonLayerTPCBERA':{
						'subject': "CBERA Membership",
						'jsonLayer': new L.geoJson(data, {style: StyleTPCBERA}),
						'ptsLayer': "",
						'description': "CBERA MembershipCBERA MembershipCBERA MembershipCBERA MembershipCBERA Membership",
						'labels': {'grades': ['Member','null'], 'from': ['Member', 'Not a member']}
					},
					'geoJsonLayerTPNAFTA':{
						'subject': "NAFTA Membership",
						'jsonLayer': new L.geoJson(data, {style: StyleTPNAFTA}),
						'ptsLayer': "",
						'description': "NAFTA MembershipNAFTA MembershipNAFTA MembershipNAFTA MembershipNAFTA Membership",
						'labels': {'grades': ['Member','null'], 'from': ['Member', 'Not a member']}
					},
					'geoJsonLayerTPWTO':{
						'subject': "WTO Membership",
						'jsonLayer': new L.geoJson(data, {style: StyleTPWTO}),
						'ptsLayer': "",
						'description': "WTO MembershipWTO MembershipWTO MembershipWTO MembershipWTO MembershipWTO MembershipWTO Membership",
						'labels': {'grades': ['Member','null'], 'from': ['Member', 'Not a member']}
					}

				}
			},
			"keyMLO":{
				'categoryName': "Multi-Lateral Organizations",
				'categoryDescription': "<div><h7 class='lorem'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam aliquet fermentum ipsum, id commodo orci dignissim non. Mauris vulputate ultricies leo, et porta orci pretium in. Duis pulvinar iaculis augue, sit amet mollis quam tristique.</h7></div>",
				'layers':{
					'geoJsonLayerMLOAU':{
						'subject': "African Union Membership",
						'jsonLayer': new L.geoJson(data, {style: StyleMLOMemberAU}),
						'ptsLayer': "",
						'description': "African Union MembershipAfrican Union MembershipAfrican Union MembershipAfrican Union Membership",
						'labels': {'grades': ['Member', 'Suspended', 'null'], 'from': ['Member', 'Suspended', 'Not a member']}
					},
					'geoJsonLayerMLOEU':{
						'subject': "European Union Membership",
						'jsonLayer': new L.geoJson(data, {style: StyleMLOMemberEU}),
						'ptsLayer': "",
						'description': "European Union MembershipEuropean Union MembershipEuropean Union MembershipEuropean Union MembershipEuropean Union MembershipEuropean Union MembershipEuropean Union Membership",
						'labels': {'grades': ['Member','null'], 'from': ['Member', 'Not a member']}
					},
					'geoJsonLayerMLOFAO':{
						'subject': "Food and Agriculture Organization Membership",
						'jsonLayer': new L.geoJson(data, {style: StyleMLOMemberFAO}),
						'ptsLayer': "",
						'description': "Food and Agriculture Organization MembershipFood and Agriculture Organization MembershipFood and Agriculture Organization MembershipFood and Agriculture Organization MembershipFood and Agriculture Organization MembershipFood and Agriculture Organization Membership",
						'labels': {'grades': ['Member','null'], 'from': ['Member', 'Not a member']}
					},
					'geoJsonLayerMLOICAO':{
						'subject': "International Civil Aviation Organization Membership",
						'jsonLayer': new L.geoJson(data, {style: StyleMLOMemberICAO}),
						'ptsLayer': "",
						'description': "International Civil Aviation Organization MembershipInternational Civil Aviation Organization MembershipInternational Civil Aviation Organization MembershipInternational Civil Aviation Organization MembershipInternational Civil Aviation Organization Membership",
						'labels': {'grades': ['Member','null'], 'from': ['Member', 'Not a member']}
					},
					'geoJsonLayerMLONATO':{
						'subject': "North American Treaty Organization Membership",
						'jsonLayer': new L.geoJson(data, {style: StyleMLOMemberNATO}),
						'ptsLayer': "",
						'description': "North American Treaty Organization MembershipNorth American Treaty Organization MembershipNorth American Treaty Organization Membership",
						'labels': {'grades': ['Member','null'], 'from': ['Member', 'Not a member']}
					},
					'geoJsonLayerMLOOAS':{
						'subject': "Organization of American States Membership",
						'jsonLayer': new L.geoJson(data, {style: StyleMLOMemberOAS}),
						'ptsLayer': "",
						'description': "North American Treaty Organization MembershipNorth American Treaty Organization MembershipNorth American Treaty Organization Membership",
						'labels': {'grades': ['Member','null'], 'from': ['Member', 'Not a member']}
					},
					'geoJsonLayerMLOOECD':{
						'subject': "OECD Membership",
						'jsonLayer': new L.geoJson(data, {style: StyleMLOMemberOECD}),
						'ptsLayer': "",
						'description': "OECD MembershipOECD MembershipOECD MembershipOECD MembershipOECD MembershipOECD MembershipOECD MembershipOECD Membership",
						'labels': {'grades': ['Member','null'], 'from': ['Member', 'Not a member']}
					},
					'geoJsonLayerMLOOSCE':{
						'subject': "OSCE Membership",
						'jsonLayer': new L.geoJson(data, {style: StyleMLOMemberOSCE}),
						'ptsLayer': "",
						'description': "OSCE MembershipOSCE MembershipOSCE MembershipOSCE MembershipOSCE MembershipOSCE Membership",
						'labels': {'grades': ['Member','null'], 'from': ['Member', 'Not a member']}
					},
					'geoJsonLayerMLOUNESCO':{
						'subject': "UNESCO Membership",
						'jsonLayer': new L.geoJson(data, {style: StyleMLOMemberUNESCO}),
						'ptsLayer': "",
						'description': "UNESCO MembershipUNESCO MembershipUNESCO MembershipUNESCO MembershipUNESCO Membership",
						'labels': {'grades': ['Member','null'], 'from': ['Member', 'Not a member']}
					},
					'geoJsonLayerMLOUNHCR':{
						'subject': "UNHCR Membership",
						'jsonLayer': new L.geoJson(data, {style: StyleMLOMemberUNHCR}),
						'ptsLayer': "",
						'description': "UNHCR MembershipUNHCR MembershipUNHCR MembershipUNHCR MembershipUNHCR MembershipUNHCR Membershipp",
						'labels': {'grades': ['Member','null'], 'from': ['Member', 'Not a member']}
					},
					'geoJsonLayerMLOUNGA':{
						'subject': "UNGA Membership",
						'jsonLayer': new L.geoJson(data, {style: StyleMLOMemberUNGA}),
						'ptsLayer': "",
						'description': "UNGA MembershipUNGA MembershipUNGA MembershipUNGA MembershipUNGA MembershipUNGA MembershipUNGA Membership",
						'labels': {'grades': ['Member','null'], 'from': ['Member', 'Not a member']}
					}
				}
			},
			"keyHI":{
				'categoryName': "Health Issues",
				'categoryDescription': "<div><h7 class='lorem'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam aliquet fermentum ipsum, id commodo orci dignissim non. Mauris vulputate ultricies leo, et porta orci pretium in. Duis pulvinar iaculis augue, sit amet mollis quam tristique.</h7></div>",
				'layers':{
					'geoJsonLayerHIGH':{
						'subject': "Global Health",
						'jsonLayer': new L.geoJson(data, {style: StyleHIGH}),
						'ptsLayer': "",
						'description': "Global HealthGlobal HealthGlobal HealthGlobal HealthGlobal HealthGlobal HealthGlobal Health",
						'labels': {'grades': ['1'], 'from': ['Programs']}
					},
					'geoJsonLayerHIAV':{
						'subject': "Avian Flu (tk)",
						'jsonLayer': new L.geoJson(data, {style: StyleHIAV}),
						'ptsLayer': "",
						'description': "Avian Flu (tk)Avian Flu (tk)Avian Flu (tk)Avian Flu (tk)Avian Flu (tk)Avian Flu (tk)",
						'labels': {'grades': ['Member','null'], 'from': ['Member', 'Not a member']}
					},
					'geoJsonLayerHIHIVAIDS':{
						'subject': "HIV / AIDS (tk)",
						'jsonLayer': new L.geoJson(data, {style: StyleHIHIVAIDS}),
						'ptsLayer': "",
						'description': "HIV / AIDS (tk)HIV / AIDS (tk)HIV / AIDS (tk)HIV / AIDS (tk)HIV / AIDS (tk)HIV / AIDS (tk)",
						'labels': {'grades': ['Member','null'], 'from': ['Member', 'Not a member']}
					},
					'geoJsonLayerHIM':{
						'subject': "Malaria (tk)",
						'jsonLayer': new L.geoJson(data, {style: StyleHIM}),
						'ptsLayer': "",
						'description': "Malaria (tk)Malaria (tk)Malaria (tk)Malaria (tk)Malaria (tk)Malaria (tk)Malaria (tk)Malaria (tk)",
						'labels': {'grades': ['Member','null'], 'from': ['Member', 'Not a member']}
					},
					'geoJsonLayerHIMHAC':{
						'subject': "Maternal Health - Access to Care",
						'jsonLayer': new L.geoJson(data, {style: StyleHIMHAC}),
						'ptsLayer': "",
						'description': "Maternal Health - Access to CareMaternal Health - Access to CareMaternal Health - Access to CareMaternal Health - Access to CareMaternal Health - Access to Care",
						'labels': {'grades': ['Excellent', 'Good', 'Fair', 'Poor', 'Unsuitable', 'No data'], 'from': ['Excellent', 'Good', 'Fair', 'Poor', 'Unsuitable', 'No data']}
					},
					'geoJsonLayerHIPEPFAR':{
						'subject': "PEPFAR",
						'jsonLayer': new L.geoJson(data, {style: StyleHIPEPFAR}),
						'ptsLayer': "",//"geoJsonLayerHIPEPFARpts", // probably just add layer
						'description': "PEPFARPEPFARPEPFARPEPFARPEPFARPEPFARPEPFARPEPFARPEPFARPEPFARPEPFAR",
						'labels': {'grades': ['1', '2', '3', 'No Data'], 'from': ['1', '2', '3', 'No data']}
					},
					'geoJsonLayerHIP':{
						'subject': "Polio (tk)",
						'jsonLayer': new L.geoJson(data, {style: StyleHIP}),
						'ptsLayer': "", 
						'description': "Polio (tk)Polio (tk)Polio (tk)Polio (tk)Polio (tk)Polio (tk)",
						'labels': {'grades': ['Member','null'], 'from': ['Member', 'Not a member']}
					},
					'geoJsonLayerHIT':{
						'subject': "Tuberculosis (tk)",
						'jsonLayer': new L.geoJson(data, {style: StyleHIT}),
						'ptsLayer': "", 
						'description': "Tuberculosis (tk)Tuberculosis (tk)Tuberculosis (tk)Tuberculosis (tk)Tuberculosis (tk)",
						'labels': {'grades': ['Member','null'], 'from': ['Member', 'Not a member']}
					}
				}

			},
			"keyNuc":{
				'categoryName': "Nuclear Arms Control",
				'categoryDescription': "<div><h7 class='lorem'>A key element in the effort to control arms around the world has been the Treaty on the Non-Proliferation of Nuclear Weapons (NPT) which entered into force in 1970. The Treaty is regarded as the legal and political cornerstone of the nuclear nonproliferation regime, which establishes three “pillars” – nuclear nonproliferation, disarmament, and the peaceful use of nuclear energy.</h7><br><br><h7 class='lorem'>In Prague on April 5, 2009 President Obama said that the basic bargain at the core of the NPT Treaty is sound: “countries with nuclear weapons will move towards disarmament; countries without nuclear weapons will not acquire them; and all countries can access peaceful nuclear energy.” Although nine countries are acknowledged to possess nuclear weapons, not all of them are among the nearly190 nations that are party to the treaty.</h7><br><br><h7 class='lorem'>The Bureau of Arms Control, Verification and Compliance, coordinating with other national security institutions, develops strategies for the negotiation of arms control and disarmament treaties and creates strong relationships with other countries to implement the treaties. The work of the bureau serves to improve the security of the United States and all nations of the world.</h7><br><br><h7 class='lorem'>Links:</h7><ul><li><a href='http://www.un.org/disarmament/WMD/Nuclear/NPT.shtml'>Treaty on the Non-Proliferation of Nuclear Weapons</a></li><li><a href='http://www.state.gov/t/index.htm'>Under Secretary for Arms Control and International Security</a></li><a href='http://www.state.gov/t/avc/index.htm'>Bureau of Arms Control, Verification and Compliance</a></li><a href='http://www.state.gov/t/isn/index.htm'>Bureau of International Security and Nonproliferation</a></li><a href='http://www.state.gov/t/pm/index.htm'>Bureau of Political-Military Affairs</a></li></ul></div>",
				'layers':{
					'geoJsonLayerNucSign':{
						'subject': "Nuclear Arms Control - Signed",
						'jsonLayer': new L.geoJson(data, {style: StyleNucSign}),
						'ptsLayer': "Nuclear_Pts", //"geoJsonLayerNucpts",
						'description': "The Bureau of Arms Control, Verification and Compliance, coordinating with other national security institutions, develops strategies for the negotiation of arms control and disarmament treaties and creates strong relationships with other nations to cooperate in the implementation of the treaties. Ultimately, the work of the bureau serves to improve the security of the United States and all the nations of the world.",
						'labels': {'grades': ['X'], 'from': ['Signed']}
					},
					'geoJsonLayerNucDepo':{
						'subject': "Nuclear Arms Control - Deposited",
						'jsonLayer': new L.geoJson(data, {style: StyleNucDepo}),
						'ptsLayer': "Nuclear_Pts", //"geoJsonLayerNucpts",
						'description': "The Bureau of Arms Control, Verification and Compliance, coordinating with other national security institutions, develops strategies for the negotiation of arms control and disarmament treaties and creates strong relationships with other nations to cooperate in the implementation of the treaties. Ultimately, the work of the bureau serves to improve the security of the United States and all the nations of the world.",
						'labels': {'grades': ['X'], 'from': ['Deposited']}
					}
				}
			},
			'keyHT':{
				'categoryName': "Human Trafficking",
				'categoryDescription': "<div><h7 class='lorem'>NOT ACTUAL CONTENTA key element in the effort to control arms around the world has been the Treaty on the Non-Proliferation of Nuclear Weapons (NPT) which entered into force in 1970. The Treaty is regarded as the legal and political cornerstone of the nuclear nonproliferation regime, which establishes three “pillars” – nuclear nonproliferation, disarmament, and the peaceful use of nuclear energy.</h7><br><br><h7 class='lorem'>In Prague on April 5, 2009 President Obama said that the basic bargain at the core of the NPT Treaty is sound: “countries with nuclear weapons will move towards disarmament; countries without nuclear weapons will not acquire them; and all countries can access peaceful nuclear energy.” Although nine countries are acknowledged to possess nuclear weapons, not all of them are among the nearly190 nations that are party to the treaty.</h7><br><br><h7 class='lorem'>The Bureau of Arms Control, Verification and Compliance, coordinating with other national security institutions, develops strategies for the negotiation of arms control and disarmament treaties and creates strong relationships with other countries to implement the treaties. The work of the bureau serves to improve the security of the United States and all nations of the world.</h7><br><br><h7 class='lorem'>Links:</h7><ul><li><a href='http://www.un.org/disarmament/WMD/Nuclear/NPT.shtml'>Treaty on the Non-Proliferation of Nuclear Weapons</a></li><li><a href='http://www.state.gov/t/index.htm'>Under Secretary for Arms Control and International Security</a></li><a href='http://www.state.gov/t/avc/index.htm'>Bureau of Arms Control, Verification and Compliance</a></li><a href='http://www.state.gov/t/isn/index.htm'>Bureau of International Security and Nonproliferation</a></li><a href='http://www.state.gov/t/pm/index.htm'>Bureau of Political-Military Affairs</a></li></ul></div>",
				'layers':{
					'geoJsonLayerHT':{
						'subject': "Human Trafficking",
						'jsonLayer': new L.geoJson(data, {style: StyleHT}),
						'ptsLayer': "", //"geoJsonLayerHTpts"
						'description': "Human TraffickingHuman TraffickingHuman TraffickingHuman TraffickingHuman TraffickingHuman Trafficking",
						'labels': {'grades': ['Tier 1', 'Tier 2', 'Tier 2 Watch List', 'Tier 3 Auto-Downgrade', 'Tier 3', 'Special Case'], 'from': ['Tier 1', 'Tier 2', 'Tier 2 Watch List', 'Tier 3 Auto-Downgrade', 'Tier 3', 'Special Case']}
					}
				}
			},
			'keyWatSan':{
				'categoryName': "Water & Sanitation",
				'categoryDescription': " sit amet, consectetur adipiscing elit. Aliquam aliquet fermentum ipsum, id commodo orci dignissim n",
				'layers':{
					'geoJsonLayerWatSan':{
						'subject': "Water & Sanitation",
						'jsonLayer': new L.geoJson(data, {style: StyleWatSan}),
						'ptsLayer': "", //""
						'description': "Water & SanitationWater & SanitationWater & SanitationWater & SanitationWater & SanitationWater & Sanitation",
						'labels': {'grades': ['1'], 'from': ['Programs']}
					}
				}
			},
			'keyDHRA':{
				'categoryName': "Democracy & Human Rights",
				'categoryDescription': "Democracy & Human RightsDemocracy & Human RightsDemocracy & Human RightsDemocracy & Human RightsDemocracy & Human RightsDemocracy & Human Rights",
				'layers':{
					'geoJsonLayerDHRA':{
						'subject': "Democracy & Human Rights",
						'jsonLayer': new L.geoJson(data, {style: StyleDHRA}),
						'ptsLayer': "", //""
						'description': "Democracy & Human RightsDemocracy & Human RightsDemocracy & Human RightsDemocracy & Human RightsDemocracy & Human Rights",
						'labels': {'grades': ['1'], 'from': ['Programs']}
					}
				}
			}
		}



	$(document).one("ajaxStop", function() {
		$("#loading").hide();
	});
}




$.ajax({
	url: baseURL.replace("*******", generalBaseLayer),
	dataType: 'json',
	success: function(data){ignite(data);} 
	/*function(data) {
		//load layer to be styled later
		
		//geoJsonLayerICAO = new L.geoJson(data, {style: StyleMLOMemberICAO, onEachFeature: onEachFeature});
		geoJsonLayerTPAPEC = new L.geoJson(data, {style: StyleTPAPEC});
		geoJsonLayerTPNAFTA = new L.geoJson(data, {style: StyleTPNAFTA});
		geoJsonLayerTPWTO = new L.geoJson(data, {style: StyleTPWTO});
		geoJsonLayerTPASEAN = new L.geoJson(data, {style: StyleTPASEAN});
		geoJsonLayerTPCBERA = new L.geoJson(data, {style: StyleTPCBERA});
		geoJsonLayerTPCAFTA = new L.geoJson(data, {style: StyleTPCAFTA});
		geoJsonLayerSTI = new L.geoJson(data, {style: StyleSTI});
		geoJsonLayerECC = new L.geoJson(data, {style: StyleECC});
		geoJsonLayerGEWE = new L.geoJson(data, {style: StyleGEWE});
		geoJsonLayerWCC = new L.geoJson(data, {style: StyleWCC});

	}*/
});











var cmAttr = "<a href='mailto:dittemoremb@state.gov'>eDiplomacy Geo|DST</a>"
//cmAttr = 'Data: <a href="http://www.eia.gov/countries/data.cfm" title="U.S. Energy Information Administration">EIA</a>, <a href="http://www.openstreetmap.org/" title="&copy; OpenStreetMap contributors">OpenStreetMap</a>, <a href="http://www.cloudmade.com/" title="&copy; 2011 CloudMade">CloudMade</a>, <a href="http://www.stamen.com/" title="Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA.">Stamen Design</a>',


var map = new L.Map('map', {
	zoomControl: false,
	center: [20, 10],
	zoom: 2
});

var hash = L.hash(map);


L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
	maxZoom: 18,
	id: 'examples.map-20v6611k'
}).addTo(map);

new L.Control.Zoom({ position: 'topright' }).addTo(map);










$(".mainKey").click(function(){
	//clear all layers on this
	currentKey="TP";
	clearLayers();
	var keyname = $(this).attr("name");
	currentKey = keyname;
	map.addLayer(allLayersGroup, {insertAtTheBottom: true});
	//add all layers as part of this key
	$.each(keysets[keyname]['layers'], function(index, valueset){
		console.log("loading the layers");
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
		var templayerobj = keysets[currentKey]['layers'][layername];

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
	})

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

function getColorHIGH(d) {
	if (d == '1') {
		return	'#FC4E2A'
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

function StyleJson(feature) {
	switch (feature.properties.party) {
            case 'Republican': return {color: "#ff0000"};
            case 'Democrat':   return {color: "#0000ff"};
        }
	return {
		weight: 1,
		opacity: 1,
		color: 'white',
		fillOpacity: 0.7,
		fillColor: getColorHT(feature.properties.Human_Trafficking)
	};
}

function StyleHT(feature) {
	return {
		weight: 1,
		opacity: 1,
		color: 'white',
		fillOpacity: 0.7,
		fillColor: getColorHT(feature.properties.Human_Trafficking)
	};
}

function StyleHIGH(feature) {
	return {
		weight: 1,
		opacity: 1,
		color: 'white',
		fillOpacity: 0.7,
		fillColor: getColorHIGH(feature.properties.Global_Health)
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

function StyleWatSan(feature) {
	return {
		weight: 1,
		opacity: 1,
		color: 'white',
		fillOpacity: 0.7,
		fillColor: getColorWatSan(feature.properties.Wat_San)
	};
}

function StyleDHRA(feature) {
	return {
		weight: 1,
		opacity: 1,
		color: 'white',
		fillOpacity: 0.7,
		fillColor: getColorDHRA(feature.properties.DHRA)
	};
}

function StyleSTI(feature) {
	return {
		weight: 1,
		opacity: 1,
		color: 'white',
		fillOpacity: 0.7,
		fillColor: getColorSTI(feature.properties.Science)
	};
}

function StyleECC(feature) {
	return {
		weight: 1,
		opacity: 1,
		color: 'white',
		fillOpacity: 0.7,
		fillColor: getColorECC(feature.properties.Env_Climate)
	};
}

function StyleGEWE(feature) {
	return {
		weight: 1,
		opacity: 1,
		color: 'white',
		fillOpacity: 0.7,
		fillColor: getColorGEWE(feature.properties.Gender_Women)
	};
}

function StyleWCC(feature) {
	return {
		weight: 1,
		opacity: 1,
		color: 'white',
		fillOpacity: 0.7,
		fillColor: getColorGEWE(feature.properties.Crisis_Conflict)
	};
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

