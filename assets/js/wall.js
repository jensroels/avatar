$(document).ready(function () {

var mannekes = new Array();
var latest = 0;


getMannekes();



window.setInterval(function(){
  checkForNew();
}, 20000);


window.setInterval(function(){
	$("#container").text("");
  getMannekes();
}, 60000);


function checkForNew(){
	
	$.ajax({
				type: "POST",
				url: "getmannekelatest.php"
			}).done(function(msg) {
			console.log(msg[0].id);
			console.log(latest);
			if(msg[0].id>latest){
				console.log("er is ne nieuwe");
				latest++;
				getManneke(latest,"big");
				
			}else{
				console.log("er is gene nieuwe");
			}
});

	
	
}





function getMannekes()
	{
		$.ajax({
				type: "POST",
				url: "getmannekes.php"
			}).done(function(msg) {
			mannekes = msg;		
			latest = msg[0].id;	
			$.each( msg, function(k, v){
				var div = '<div class="wrapper big"><h2 class="naam">'+msg[k].naam+'</h2><img id="bril" src="'+msg[k].bril+'"/><img id="acc" src="'+msg[k].acc+'"/><img id="mond" src="'+msg[k].mond+'"/><img id="neus" src="'+msg[k].neus+'"/><img id="haar" src="'+msg[k].haar+'"/><img id="body" src="'+msg[k].body+'"/><img id="achtergrond" src="'+msg[k].achtergrond+'"/></div>';
				$('#container').append(div);

 });
			
				



});

	}


	//haalt een manneke op uit de database en voegt dit toe aan de #container div 
	function getManneke(id,size)
	{
		$.ajax({
				type: "POST",
				url: "getmanneke.php",
				data: {
					id: id
				}
			}).done(function(msg) {
			if(msg[0].zichtbaar==="ja"){
			var div = '<div class="wrapper '+size+'"><h2 class="naam">'+msg[0].naam+'</h2><img id="bril" src="'+msg[0].bril+'"/><img id="acc" src="'+msg[0].acc+'"/><img id="mond" src="'+msg[0].mond+'"/><img id="neus" src="'+msg[0].neus+'"/><img id="haar" src="'+msg[0].haar+'"/><img id="body" src="'+msg[0].body+'"/><img id="achtergrond" src="'+msg[0].achtergrond+'"/></div>';

$('#container').prepend(div);
}	



});

	}
	
	

	
	
	
});



