$(document).ready(function () {

var mannekes = new Array();


getMannekes();



window.setInterval(function(){
  //checkForNew();
  
  getManneke(5,"big");
  
  
}, 1500);
 

/*
window.setInterval(function(){
	$("#container").text("");
  getMannekes();
}, 60000);
*/






function getMannekes()
	{
		$.ajax({
				type: "POST",
				url: "getmannekes.php"
			}).done(function(msg) {
			mannekes = msg;		
			latest = msg[0].id;	
			$.each( msg, function(k, v){
				var div = '<div id="'+msg[k].id+'"class="wrapper big"><div class="ani"><h2 class="naam">'+msg[k].naam+'</h2><img id="bril" src="'+msg[k].bril+'"/><img id="acc" src="'+msg[k].acc+'"/><img id="mond" src="'+msg[k].mond+'"/><img id="neus" src="'+msg[k].neus+'"/><img id="haar" src="'+msg[k].haar+'"/><img id="body" src="'+msg[k].body+'"/><img id="achtergrond" src="'+msg[k].achtergrond+'"/></div></div>';
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
			var div = '<div class="ani new"><h2 class="naam">'+msg[0].naam+'</h2><img id="bril" src="'+msg[0].bril+'"/><img id="acc" src="'+msg[0].acc+'"/><img id="mond" src="'+msg[0].mond+'"/><img id="neus" src="'+msg[0].neus+'"/><img id="haar" src="'+msg[0].haar+'"/><img id="body" src="'+msg[0].body+'"/><img id="achtergrond" src="'+msg[0].achtergrond+'"/></div>';

//nieuwe manneke toevoegen aan nieuwe div

 var numItems = $('.wrapper').length;
 var random = 2 + Math.floor(Math.random() * numItems);
 random = random.toString();
 $("#container div:nth-child("+random+")").append(div);

 
//console.log(aantal);

$("#container div:nth-child("+random+") div:first-child").animate({"left":"-500px"},500);
$("#container div:nth-child("+random+") div:last-child").animate({"left":"0"},500,function(){	
	$("#container div:nth-child("+random+") div:first-child").remove();
});



}	



});

	}
	
	

	
	
	
});



