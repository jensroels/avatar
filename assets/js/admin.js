$(document).ready(function () {

var mannekes = new Array();
var latest = 0;


getMannekes();





window.setInterval(function(){
  checkForNew();
}, 2000);


function checkForNew(){
	
	$.ajax({
				type: "POST",
				url: "getmannekelatestadmin.php"
			}).done(function(msg) {
			console.log(msg[0].id);
			console.log(latest);
			if(msg[0].id>latest){
				console.log("er is ne nieuwe");
				latest++;
				getManneke(latest,"medium");
				
			}else{
				console.log("er is gene nieuwe");
			}
});

	
	
}


function update(id){

idee = "#"+id;
console.log(idee);
	$.ajax({
				type: "POST",
				url: "approve.php",
				data: {
					id: id
				}
			}).done(function(msg) {
			console.log(msg);
			if(msg=="ja"){
				//alert("ja");
				$(idee).addClass('nee');
			}else{
				//alert("nee");
				$(idee).removeClass('nee');
			}
			});

	
	
	
}


function getMannekes()
	{
		$.ajax({
				type: "POST",
				url: "getmannekesadmin.php"
			}).done(function(msg) {
			mannekes = msg;		
			latest = msg[0].id;	
			$.each( msg, function(k, v){
				var div = '<div id="'+msg[k].id+'"class="wrapper medium '+msg[k].zichtbaar+'" data-id="'+msg[k].id+'"><h2 class="naam">'+msg[k].naam+'</h2><img id="bril" src="'+msg[k].bril+'"/><img id="acc" src="'+msg[k].acc+'"/><img id="mond" src="'+msg[k].mond+'"/><img id="neus" src="'+msg[k].neus+'"/><img id="haar" src="'+msg[k].haar+'"/><img id="body" src="'+msg[k].body+'"/><img id="achtergrond" src="'+msg[k].achtergrond+'"/></div>';
				$('#container').append(div);

 });
			
		//$(".wrapper").click(function(){
	



});

	}



	function getManneke(id,size)
	{
		$.ajax({
				type: "POST",
				url: "getmanneke.php",
				data: {
					id: id
				}
			}).done(function(msg) {
			var div = '<div id="'+msg[0].id+'" class="wrapper '+size+' '+msg[0].zichtbaar+'" data-id="'+msg[0].id+'"><h2 class="naam">'+msg[0].naam+'</h2><img id="bril" src="'+msg[0].bril+'"/><img id="acc" src="'+msg[0].acc+'"/><img id="mond" src="'+msg[0].mond+'"/><img id="neus" src="'+msg[0].neus+'"/><img id="haar" src="'+msg[0].haar+'"/><img id="body" src="'+msg[0].body+'"/><img id="achtergrond" src="'+msg[0].achtergrond+'"/></div>';	

$('#container').prepend(div);


});

	


	}
	

$("body").delegate(".wrapper", "click", function() {
	update($(this).data('id'));
});	
	
	
	
});



