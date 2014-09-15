//var host = "54.197.226.119";  //var host = "10.10.30.52";
var host = "localhost:80";
//var proxy = "proxy?url=";
//if not on 10.10.30.52 launch chrome --disable-web-security for cross domain restriction lift.  (Don't use this browser for other activity)
//var loc = window.location.pathname;
//var site = loc.substring(0, loc.lastIndexOf('/')) + '/';

function siteParams() {
	gaID = "";
	formSite = "";
	
	if (host === 'dev.edip-maps.net') {
		formSite = host;
		gaID = "UA-42151027-5";
	} else {
		formSite = '10.47.115.214:8080';
		gaID = "UA-42151027-5";
	}
}
