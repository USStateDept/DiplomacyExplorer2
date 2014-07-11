

(function ( $ ) { 
	 $(document).ready(function($) {
		$(".field-geometry").hide();
		$(".field-geometry").after('Location: <input type="text" id="us2-address" style="width: 400px"/><button type="button" class="geolocateField" aria-hidden="true">Find Location</button><br/><div id="mapselector" style="background-color:black;width: 500px; height: 400px;"></div>');
		$(".geolocateField").click(function(ev){
			var event = new CustomEvent("name-of-event", { "detail": "Example of an event" });
			ev.preventDefault();
			return false;
		});
		//google.maps.event.addListener(gmapContext.autocomplete, 'place_changed', function() {
		var locvalue = {latitude: 10, longitude: 10};
		var zoomval = 1;
		console.log($("#id_geometry").val());
		var temploc = $.parseJSON($("#id_geometry").val());
		if (temploc.length){
			locvalue['longitude'] = temploc[0];
			locvalue['latitude'] = temploc[1];
			console.log("still hittin ghere");
			zoomval = 3;
		}


		$('#mapselector').locationpicker({'radius':0, 
											location:locvalue,
											inputBinding: {locationNameInput: $('#us2-address')},
											onchanged: function(currentLocation, radius, isMarkerDropped) {
												$("#id_geometry").val("[" + currentLocation.longitude + "," + currentLocation.latitude + "]");
											},
											enableAutocomplete: true,
											zoom:zoomval
										});
	});
    // put all that "wl_alert" code here   

}( django.jQuery ));