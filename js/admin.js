
$('#issueModal').on('show.bs.modal', function (e) {

	var comboData;
	
	$.ajax(
	{
		type: "POST",
		url: "Combo",
			async: false,
			data: { 
				'type': 'issueCombo'  
			},
			success: function(data)
			{
				comboData = data;
			}
		});

	var issue = document.getElementById("inputIssue");
	issue.innerHTML=comboData;

})

$('#inputIssue').on('change', function(){
	
	var name = $(this).val();
	name = name.trim();
	
	var comboData;

	$.ajax(
	{
   	url: "Combo",
   	type: "POST",
   	async: false,
   	data: { 
   		'type': 'issueText',
   		'name':name  
   	},
   	success: function(data)
   	{
   		comboData = data;
   	}
   });
	
	$('#inputIssueLegend').text(comboData);
});