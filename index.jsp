<!DOCTYPE html>
<%@ page language="java" import="java.sql.*,java.util.*,java.io.*"%>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="initial-scale=1,user-scalable=no,maximum-scale=1,width=device-width">
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="description" content="">
        <meta name="author" content="">
        <title>Diplomacy Explorer 2 - alpha</title>

        <!-- Core CSS -->
        <link href="img/usdos-logo-seal.png" rel="shortcut icon">
		<link href="../lib/bootstrap-3.1.1/dist/css/bootstrap.css" rel="stylesheet" type="text/css">
        <link href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css" rel="stylesheet" type="text/css">
		<link rel="stylesheet" href="../lib/Leaflet-0.7.2/dist/leaflet.css" />
		<link rel="stylesheet" href="css/main.css" />

		<!-- Custom styles for this template -->
        <style>
			html, body, #mainContainer, #map {
				height: 100%;
				width: 100%;
				overflow: hidden;
			}
			body {
				padding-top: 50px;
			}
			.navbar-collapse.in {
				overflow-y: hidden;
			}
		</style>

        <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
            <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
        <![endif]-->
	</head>
	<body>
			<div class="navbar navbar-inverse navbar-fixed-top">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<a class="navbar-brand" href="#">Diplomacy Explorer</a>
				</div>
				<div class="navbar-collapse collapse" id="navbar-collapse">
					<ul class="nav navbar-nav">
						<li class="dropdown">
							<a id="securityDrop" href="#" role="button" class="dropdown-toggle" data-toggle="dropdown">Securing Peace</a>
							<ul class="dropdown-menu" style="padding:10px;">
								<h4><small>Theme description lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tempor augue a dolor sollicitudin semper. Morbi ultrices, sem eu posuere lobortis, dui sem auctor enim.</small></h4>
								<h4><a style="color:#333" class="mainKey" name="keyNuc">Nuclear Arms Control</a></h4>
								<li><h4><a style="color:#333" href="#">Border Security (tk)</a></h4></li>
								<li><h4><a style="color:#333" href="#">Counter-narcotics (tk)</a></h4></li>
								<li><h4><a style="color:#333" href="#">Counter-terrorism (tk)</a></h4></li>
								<li><h4><a style="color:#333" href="#">Securing the Seas/Maritime Piracy (tk)</a></h4></li>
							</ul>
						</li>
						<li class="dropdown">
							<a id="businessDrop" href="#" role="button" class="dropdown-toggle" data-toggle="dropdown">Promoting Prosperity</a>
							<ul class="dropdown-menu">
								<h4><small>Theme description lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tempor augue a dolor sollicitudin semper. Morbi ultrices, sem eu posuere lobortis, dui sem auctor enim.</small></h4>
								<h4><a style="color:#333" class="mainKey" name="keyMLO">Multi-Lateral Organizations</a></h4>
								<h4><a style="color:#333" class="mainKey" name="keyTP">Trade Promotion</a></h4>
								<li><h4><a style="color:#333" href="#">Border Security (tk)</a></h4></li>
								<li><h4><a style="color:#333" href="#">Good Governance (trade legislation) (tk)</a></h4></li>
								<li><h4><a style="color:#333" href="#">Intellectual Property Rights (tk)</a></h4></li>
								<li><h4><a style="color:#333" onClick="javascript:openPane(),changeLayer(),allLayersGroup.addLayer(geoJsonLayerSTI),map.addLayer(allLayersGroup, {insertAtTheBottom: true}),keySTI(),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);">Science & Technology Promotion</a></h4></li>
								<li><h4><a style="color:#333" href="#">Securing the Seas/Maritime Piracy (tk)</a></h4></li>
							</ul>
						</li>
						<li class="dropdown">
							<a id="environmentDrop" href="#" role="button" class="dropdown-toggle" data-toggle="dropdown">Protecting Resources</a>
							<ul class="dropdown-menu">
								<h4><small>Theme description lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tempor augue a dolor sollicitudin semper. Morbi ultrices, sem eu posuere lobortis, dui sem auctor enim.</small></h4>
								<li><a style="color:#333" onClick="javascript:openPane(),changeLayer(),allLayersGroup.addLayer(geoJsonLayerECC),map.addLayer(allLayersGroup, {insertAtTheBottom: true}),keyECC(),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);">Environment and Climate Change</a></li>
								<li><h4><a style="color:#333" href="#">Endangered Species (tk)</a></h4></li>
								<li><h4><a style="color:#333" href="#">Energy Policy (tk)</a></h4></li>
								<li><h4><a style="color:#333" href="#">Environmental Conservation (tk)</a></h4></li>
								<li><a style="color:#333" class="mainKey" name="keyWatSan">Water & Sanitation</a></li>
							</ul>
						</li>
						<li class="dropdown">
							<a id="rightsDrop" href="#" role="button" class="dropdown-toggle" data-toggle="dropdown">Respecting Rights</a>
							<ul class="dropdown-menu">
								<h4><small>Theme description lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tempor augue a dolor sollicitudin semper. Morbi ultrices, sem eu posuere lobortis, dui sem auctor enim.</small></h4>
								<li><h4><a style="color:#333"href="#">&nbsp;&nbsp;Free and Fair Elections (tk)</a></li>
								<li><a style="color:#333" class="mainKey" name="keyDHRA">Human Rights & Governance</a></li>
									<li><a style="color:#333" class="mainKey" name="keyHT">Human Trafficking</a></li>
									<li><h4><a style="color:#333" href="#">Independent Judiciary (tk)</a></h4></li>
								<li><h4><a style="color:#333" href="#">Independent Media (tk)</a></h4></li>
								<li><h4><a style="color:#333" href="#">Internet Freedom (tk)</a></h4></li>
								<li><h4><a style="color:#333" href="#">Minority Rights (tk)</a></h4></li>
								<li><h4><a style="color:#333" href="#">Religious Freedom (tk)</a></h4></li>
								<li><a style="color:#333" onClick="javascript:openPane(),changeLayer(),allLayersGroup.addLayer(geoJsonLayerGEWE),map.addLayer(allLayersGroup, {insertAtTheBottom: true}),keyGEWE(),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);">Gender Equality and Women Empowerment</a></li>
							</ul>
						</li>
						<li class="dropdown">
							<a id="livesDrop" href="#" role="button" class="dropdown-toggle" data-toggle="dropdown">Saving Lives</a>
							<ul class="dropdown-menu">
								<h4><small>Theme description lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tempor augue a dolor sollicitudin semper. Morbi ultrices, sem eu posuere lobortis, dui sem auctor enim.</small></h4>
								<li><a style="color:#333" class="mainKey" name="keyHI" >Health Issues</a></li>
								<li><h4><a style="color:#333" href="#">Counter-narcotics (tk)</a></h4></li>
								<li><a style="color:#333" onClick="javascript:openPane(),changeLayer(),allLayersGroup.addLayer(geoJsonLayerWCC),map.addLayer(allLayersGroup, {insertAtTheBottom: true}),keyWCC(),map.addLayer(allLayersGroup),map.addLayer(allLayersGroupPts);">Working in Crisis and Conflict</a></li>
								<li><h4><a style="color:#333" href="#">Disaster Assistance (tk)</a></h4></li>
								<li><h4><a style="color:#333" href="#">Refugee Assistance (tk)</a></h4></li>
							</ul>
						</li>
						<li class="dropdown">
							<a id="adminDrop" href="#" role="button" class="dropdown-toggle" data-toggle="dropdown">Admin Demo</a>
							<ul class="dropdown-menu">
								<!--<li><a href="#" data-toggle="collapse" data-target=".navbar-collapse.in" onclick="$('#themeModal').modal('show'); return false;">Revise Theme Legend</a></li>-->
								<li><a href="#" data-toggle="collapse" data-target=".navbar-collapse.in" onclick="$('#themeDescripModal').modal('show'); return false;">Revise Theme Description</a></li>
								<li><a href="#" data-toggle="collapse" data-target=".navbar-collapse.in" onclick="$('#issueModal').modal('show'); return false;">Revise Issue Legend</a></li>
								<li><a href="#" data-toggle="collapse" data-target=".navbar-collapse.in" onclick="$('#SubissueModal').modal('show'); return false;">Revise Subissue Description</a></li>
								<li><a href="#" data-toggle="collapse" data-target=".navbar-collapse.in" onclick="$('#storyModal').modal('show'); return false;">Add Issue Story</a></li>
							</ul>
						</li>
						<li><a href="#" data-toggle="collapse" data-target=".navbar-collapse.in" onclick="$('#shareModal').modal('show'); return false;">Share</a></li>
						<li><a href="#" data-toggle="collapse" data-target=".navbar-collapse.in" onclick="$('#aboutModal').modal('show'); return false;">About</a></li>
					</ul>
				</div><!--/.navbar-collapse -->
			</div>

			<div class="container" id="mainContainer">
				<div class="panel panel-default" style="height:100%;">
					<div class="row" id = "rowId" style="height:100%;width:100%">
						<div class="col-lg-3 col-md-3 col-sm-3 closed" id="descPane">
							<div class='panel-body panel-collapse collapse in' id='collapseSide' style='padding: 0px !important;'>
								<div id='mapKey'></div>
							</div>
						</div>
						<div class="" id="mapPane" style="height:100%;">
							<div id="map"></div>
						</div>
					</div>
				</div>
			</div>
			
			<div id="loading" style="display:block;">
				<div class="loading-indicator">
					<div class="progress progress-striped active">
						<div class="progress-bar progress-bar-info" style="width: 100%"></div>
					</div>
				</div>
			</div>

			<div class="modal fade" id="aboutModal">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
							<h4 class="modal-title">Diplomacy Explorer</h4>
						</div>
						<div class="modal-body">
							 <ul id="aboutTabs" class="nav nav-tabs">
								<li class="active">
									<a href="#faqs" data-toggle="tab"><i class="fa fa-question-circle"></i>&nbsp;FAQs</a>
								</li>
								<li>
									<a href="#about" data-toggle="tab"><i class="fa fa-check-square"></i>&nbsp;About the project</a>
								</li>
								<li>
									<a href="#disclaimer" data-toggle="tab"><i class="fa fa-exclamation-circle"></i>&nbsp;Disclaimer</a>
								</li>
								<li>
									<a href="#contact" data-toggle="tab"><i class="fa fa-envelope"></i>&nbsp;Contact us</a>
								</li>
							</ul>
							<div id="aboutTabsContent" class="tab-content" style="padding-top: 10px;">
								<div class="tab-pane fade active in" id="faqs">
									<p>Below are a number of frequently asked questions (FAQs). If an answer to your specific need is not provided, please contact our support team!</p>
									<div class="panel panel-primary">
										<div class="panel-heading">
											Questions
										</div>
										<ul class="list-group">
											<li class="list-group-item">Question 1</li>
											<li class="list-group-item">Question 2</li>
											<li class="list-group-item">Question 3</li>
											<li class="list-group-item">Question 4</li>
											<li class="list-group-item">Question 5</li>
											<li class="list-group-item">Question 6</li>
											<li class="list-group-item">Question 7</li>
											<li class="list-group-item">Question 8</li>
											<li class="list-group-item">Question 9</li>
											<li class="list-group-item">Question 10</li>
										</ul>
									</div>
								</div>
								<div class="tab-pane fade" id="about">
									<p>This is a proof-of-concept for a revamped and updated Diplomacy Explorer web app.</p>
									<div class="panel panel-primary">
										<div class="panel-heading">
											Features
										</div>
										<ul class="list-group">
											<li class="list-group-item">This app is mobile ready!</li>
											<li class="list-group-item">Data citations and downloads</li>
										</ul>
									</div>
								</div>
								<div class="tab-pane fade text-danger" id="disclaimer">
									<p>This tool and the information provided herein are solely a proof-of-concept being developed by the Office of eDiplomacy's Geo|DST, on behalf of Public Affairs. If you are interested in this project, please direct your feedback to eDip and Public Affairs!</p>
								</div>
								<div class="tab-pane fade" id="contact">
									<form id="contact-form">
										<fieldset>
											<div class="form-group">
												<label for="name">Name:</label>
												<input type="text" class="form-control" id="name">
											</div>
											<div class="form-group">
												<label for="email">Email:</label>
												<input type="text" class="form-control" id="email">
											</div>
											<div class="form-group">
												<label for="comment">Comment:</label>
												<textarea class="form-control" rows="3" id="comment"></textarea>
											</div>
											<button type="submit" class="btn btn-primary pull-right" data-dismiss="modal">Submit</button>
										</fieldset>
									</form>
								</div>
							</div>
						</div>
					</div><!-- /.modal-content -->
				</div><!-- /.modal-dialog -->
			</div><!-- /.modal -->

			<div class="modal fade" id="shareModal">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
							<h4 class="modal-title">Share</h4>
						</div>
						<div class="modal-body">
							<div class="tab-pane fade active in" id="shareMethods">
								<p>Please share this map with a friend!</p>
								<div class="panel panel-primary">
									<div class="panel-heading">
										Methods
									</div>
									<ul class="list-group">
										<li class="list-group-item">Facebook</li>
										<li class="list-group-item">Twitter</li>
										<li class="list-group-item">Pintrest</li>
										<li class="list-group-item">Email</li>
										<li class="list-group-item">Social Media Stuff</li>
									</ul>
								</div>
							</div>
						</div>
					</div><!-- /.modal-content -->
				</div><!-- /.modal-dialog -->
			</div><!-- /.modal -->

			<div class="modal fade" id="themeModal">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
							<h4 class="modal-title">Revise Theme Legend</h4>
						</div>
						<div class="modal-body">
							<form>
								<div class="form-group">
									<label for="inputTheme">Theme</label>
									<select class="form-control" id="inputTheme">
										<option>Securing Peace</option>
										<option>Promoting Prosperity</option>
										<option>Protecting Resources</option>
										<option>Respecting Rights</option>
										<option>Saving Lives</option>
									</select>
								</div>
								<div class="form-group">
									<label for="inputThemeLegend">Legend</label>
									<textarea class="form-control" id="inputThemeLegend" rows="10" placeholder="Theme Legend Text"></textarea>
								</div>									
								<button type="submit" class="btn btn-primary btn-block">Submit</button>
							</form>
						</div>
					</div>
				</div>
			</div>
			
			<div class="modal fade" id="themeDescripModal">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
							<h4 class="modal-title">Revise Theme Description</h4>
						</div>
						<div class="modal-body">
							<form name="input" action="http://localhost/DiplomacyExplorer2/Updater" method="post">
							<input type="hidden" name="type" value="0">
								<div class="form-group">
									<label for="inputTheme">Theme</label>
									<select class="form-control" name="inputTheme" id="inputTheme">
										<option>Securing Peace</option>
										<option>Promoting Prosperity</option>
										<option>Protecting Resources</option>
										<option>Respecting Rights</option>
										<option>Saving Lives</option>
									</select>
								</div>
								<div class="form-group">
									<label for="inputThemeDescrip">Description</label>
									<textarea name="inputThemeDescrip" class="form-control"  id="inputThemeDescrip" rows="10" placeholder="Theme Description Text"></textarea>
								</div>									
								<button type="submit" class="btn btn-primary btn-block">Submit</button>
							</form>
						</div>
					</div>
				</div>
			</div>
			
			<div class="modal fade" id="issueModal">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
							<h4 class="modal-title">Revise Issue Legend</h4>
						</div>
						<div class="modal-body">
						<form name="input" action="http://localhost/DiplomacyExplorer2/Updater" method="post">
						<input type="hidden" name="type" value="1">
							<form>
								<div class="form-group">
									<label for="inputIssue">Issue</label>
									<select class="form-control" name="inputIssue" id="inputIssue">
										<%

        									pa.DataAccessor da = new pa.DataAccessor();
        									String[] params = { };

        									ArrayList<String> rows = new ArrayList<String>();

        									String sql = "select \"Name\" from public.\"Issue\"";

        									ResultSet rs = da.select(params, sql);

        									String issue="";

        									while(rs.next())
        									{
        									issue=rs.getString("Name");
        									out.print("<option>"+issue+"</option>" );
        									}

        								%>
									</select>
								</div>
								<div class="form-group">
									<label for="inputIssueLegend">Legend</label>
									<textarea name="inputIssueLegend" class="form-control" id="inputIssueLegend" rows="10" placeholder="Issue Legend Text"></textarea>
								</div>
								<div class="form-group">
									<label for="inputLinkText">Link 1 Text</label>
									<input type="text" class="form-control" name="inputLinkText" id="inputLinkText" placeholder="Text">
								</div>
								<div class="form-group">
									<label for="inputLinkURL">Link 1 URL</label>
									<input type="text" class="form-control" name="inputLinkURL" id="inputLinkURL" placeholder="URL">
								</div>
								<div class="form-group">
									<label for="inputLinkText2">Link 2 Text</label>
									<input type="text" class="form-control" name="inputLinkText2" id="inputLinkText2" placeholder="Text">
								</div>
								<div class="form-group">
									<label for="inputLinkURL2">Link 2 URL</label>
									<input type="text" class="form-control" name="inputLinkURL2" id="inputLinkURL2" placeholder="URL">
								</div>
								<div class="form-group">
									<label for="inputLinkText3">Link 3 Text</label>
									<input type="text" class="form-control" name="inputLinkText3" id="inputLinkText3" placeholder="Text">
								</div>
								<div class="form-group">
									<label for="inputLinkURL3">Link 3 URL</label>
									<input type="text" class="form-control" name="inputLinkURL3" id="inputLinkURL3" placeholder="URL">
								</div>
								<button type="submit" class="btn btn-primary btn-block">Submit</button>
							</form>
						</div>
					</div>
				</div>
			</div>
			
			<div class="modal fade" id="SubissueModal">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
							<h4 class="modal-title">Revise Subissue Text</h4>
						</div>
						<div class="modal-body">
						<form name="input" action="http://localhost/DiplomacyExplorer2/Updater" method="post">
						<input type="hidden" name="type" value="2">
							<form>
								<div class="form-group">
									<label for="inputSubissue">Subissue</label>
									<select class="form-control" name="inputSubissue" id="inputSubissue">
										<option>Nuclear Arms Control - Signed</option>
										<option>Nuclear Arms Control - Deposited</option>
									</select>
								</div>
								<div class="form-group">
									<label for="inputSubissueDescrip">Description</label>
									<textarea name="inputSubissueDescrip" class="form-control" id="inputSubissueDescrip" rows="10" placeholder="Subissue Description Text"></textarea>
								</div>									
								<button type="submit" class="btn btn-primary btn-block">Submit</button>
							</form>
						</div>
					</div>
				</div>
			</div>
			
			<div class="modal fade" id="storyModal">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
							<h4 class="modal-title">Add Issue Story</h4>
						</div>
						<div class="modal-body">
							<form>
								<div class="form-group">
									<label for="inputTheme">Theme</label>
									<select class="form-control" id="inputTheme">
										<option>Securing Peace</option>
										<option>Promoting Prosperity</option>
										<option>Protecting Resources</option>
										<option>Respecting Rights</option>
										<option>Saving Lives</option>
									</select>
								</div>
								<div class="form-group">
									<label for="inputIssue">Issue</label>
									<select class="form-control" id="inputIssue">
										<option>Nuclear Arms</option>
										<option>Border Security</option>
										<option>Counter-narcotics</option>
										<option>Counter-terrorism</option>
										<option>Securing the Seas/Maritime Piracy</option>
									</select>
								</div>
								<div class="form-group">
									<label for="inputTitle">Title</label>
									<input type="text" class="form-control" id="inputTitle" placeholder="Title">
								</div>
								<div class="form-group">
									<label for="inputCountry">Country</label>
									<select class="form-control" id="inputCountry">
										<option>Afghanistan</option>
										<option>Albania</option>
										<option>Algeria</option>
										<option>Andorra</option>
										<option>5</option>
										<option>6</option>
										<option>7</option>
										<option>8</option>
										<option>9</option>
										<option>10</option>
										<option>11</option>
										<option>12</option>
									</select>
								</div>
								<div class="form-group">
									<label for="inputStory">Text</label>
									<textarea class="form-control" id="inputStory" rows="5" placeholder="Text"></textarea>
								</div>									
								<!--<div class="form-group">
									<label for="inputPhoto">Upload Photo</label>
									<input type="file" id="inputPhoto">
								</div>-->
								<div class="form-group">
									<label for="inputPhotoText">Photo Link</label>
									<input type="text" class="form-control" id="inputPhotoText" placeholder="Photo Link">
								</div>
								<!--
								<div class="form-group">
									<label for="inputPhoto2">Photo 2</label>
									<input type="url" class="form-control" id="inputPhoto2" placeholder="Photo URL">
								</div>
								<div class="form-group">
									<label for="inputPhoto2Text">Photo 2 Description</label>
									<input type="text" class="form-control" id="inputPhoto2Text" placeholder="Photo Description">
								</div>
								<div class="form-group">
									<label for="inputPhoto3">Photo 3</label>
									<input type="url" class="form-control" id="inputPhoto3" placeholder="Photo URL">
								</div>
								<div class="form-group">
									<label for="inputPhoto3Text">Photo 3 Description</label>
									<input type="text" class="form-control" id="inputPhoto3Text" placeholder="Photo Description">
								</div>
								<div class="form-group">
									<label for="inputPhoto4">Photo 4</label>
									<input type="url" class="form-control" id="inputPhoto4" placeholder="Photo URL">
								</div>
								<div class="form-group">
									<label for="inputPhoto4Text">Photo 4 Description</label>
									<input type="text" class="form-control" id="inputPhoto4Text" placeholder="Photo Description">
								</div>
								-->
								<!--<div class="form-group">
									<label for="inputVideo">Upload Video</label>
									<input type="file" id="inputVideo">
								</div>-->
								<div class="form-group">
									<label for="inputVideoText">Video Link</label>
									<input type="text" class="form-control" id="inputVideoText" placeholder="Video Link">
								</div>
								<button type="submit" class="btn btn-primary btn-block">Submit</button>
							</form>
						</div>
					</div>
				</div>
			</div>


			<script src="../lib/jquery/jquery-1.11.0.min.js"></script>
			<script src="../lib/bootstrap-3.1.1/dist/js/bootstrap.js"></script>
			<script type="text/javascript" src="js/host.js"></script>
			<script type="text/javascript" src="../lib/Leaflet-0.7.2/dist/leaflet-src.js"></script>
			<script type="text/javascript" src="../lib/leaflet-hash/leaflet-hash.js"></script>
			<script type="text/javascript">
			var ignite = function(data){
				keysets = <%
					pa.LayerInfo li = new pa.LayerInfo();
					out.print(li.getLayerInfo());

				%>;
				//thjis needs to be ehre to enesure that JSON syncs after AJAx
				hash = L.hash(map);
				$(document).one("ajaxStop", function() {
					$("#loading").hide();
				});
			}
			</script>
			<script type="text/javascript" src="js/index.js"></script>
			<script>
				(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
					(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
				m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
				})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
				siteParams();
				ga('create', gaID, host);
				ga('send', 'pageview');
			</script>
		
    </body>
</html>