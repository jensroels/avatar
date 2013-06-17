$(document).ready(function () {










/*
setInterval(function(){
  aantalsec++;
  console.log(aantalsec);
  if(aantalsec>30){	  	
	  $("div.overlay").animate({"top":"0"},500);
  }
}, 500);


$(document).click(function(){
	aantalsec=0;
	 $("div.overlay").animate({"top":"-1014"},500);
})
*/

//alle bodyparts images hiden
$(".bodyparts img").hide();




//om te beginnen laten we alleen maar de images zien van de body's
$("img.body").show();


//als dit een url is van een bestaand manneke dit mannetje bouwen dus ophalen van database
	if(document.URL.substring(48).length>1){
		//ajax call maken en poppetje bouwen
		getManneke(document.URL.substring(49));
	}else{
		//user wilt gewoon zelf bouwen 
	}


//een array van alle background images zodat we hier later een random achtergrond kunnen selecteren zodat niet iedereen een groene achtergrond neemt omdat 
// deze de standaard is
var backgrounds = Array("assets/img/achtergrond/beige.jpg","assets/img/achtergrond/dgroen.jpg","assets/img/achtergrond/geel.jpg","assets/img/achtergrond/groen.jpg","assets/img/achtergrond/oranje.jpg","assets/img/achtergrond/zwart.jpg");

//random background image (kleur) selecteren en als background zetten
var backgroundimg = backgrounds[Math.floor(Math.random()*backgrounds.length)];
$("#achtergrond").attr("src",backgroundimg);

var scroll = 0;
	
	
	
	//Als er geklikt wordt op een image uit de navigatie wordt dit src attribuut toegewezen aan de img van het ventje zelf
	$("img").click(function(event){
		var bodypart = "#"+$(this).attr("class");
		$(bodypart).attr("src",$(this).attr("src")); 
		//alert($(this).data("zin"));
	});
	
	//Bij een klik op het next pijltje verschuiven de mannekes naar links
	$(".next").click(function(event){
	  var leftPos = $('.bodypartswrapper').scrollLeft();
    console.log(leftPos); 
    $(".bodypartswrapper").animate({
        scrollLeft: leftPos + 768
    }, 100);
	});
	
	//Bij het klikken op vorige knop verschuiven de mannekes naar rechts
	$(".prev").click(function(event){
	
	 var leftPos = $('.bodypartswrapper').scrollLeft();
    console.log(leftPos);    
    $(".bodypartswrapper").animate({
        scrollLeft: leftPos - 768
    }, 100);
	
	
	});
	
	//Als er op de navigatie van de verschillende bodyparts wordt geklikt verschijnen de bijhorende bodyparts images
	$("li").click(function(event){
		var bodypart = "img."+$(this).attr("class");
		$(".bodyparts img").hide();
		$(bodypart).show();
		$(".bodypartswrapper").animate({
        scrollLeft: 0
    }, 10);

		console.log($(".bodyparts").position().left);
		res();
	});
		
	
	function res(){
		$(".bodypartswrapper").css( "left", "0px" );
	}
	
	
	//als er op de eerste savebutton geklikt wordt schijf het formulier naar beneden om de naam in te vullen
	$("#savebutton").click(function(event){
		$(".feedback").animate({"top":"250"}, 500);
		//$("#naam").focus();
		return false;
	});
	
	//hierbij verschuift het formulier terug naarboven en dus onzichtbaar
	//error worden ook terug leeg gemaakt moest er 1 zijn
	$("#closebutton").click(function(event){
		$(".feedback").animate({"top":"-290"}, 300);
		$(".error h2").text("");
	});
	
	
	//reset functie wordt opgeroepen bij het drukken op de knop reset
	$("#resetbutton").click(function(event){
		reset();
		console.log("reset");
		return false;
	});
	
	//Als er op de savebutton wordt gekklikt bij het formulier voor de naam in te geven
	$("#submitbutton").click(function(event){
		//als het naam veld leeg is een error laten zien en dus niet opslagen
		if(isEmtpy($("#naam").val())){
			$(".error").slideUp();
			save();
		}else{
			feedback("Come on, I know you got a better name than this!");
		}
	});
	
	
	//feedback laten zien in het forumlier, string als property meegeven
	function feedback(bericht){
		$(".error h2").text(bericht);
		$(".error").slideDown();
	}
	
	//functie om alles te resetten random achtergrond en de mannen body wordt geset
	// naam wordt terug leeg gemaakt uit input field
	function reset(){
		$("#body").attr("src","assets/img/body/1.png"); 
			$("#haar").attr("src","assets/img/emty.png");
			$("#neus").attr("src","assets/img/emty.png"); 
			$("#bril").attr("src","assets/img/emty.png");
			$("#mond").attr("src","assets/img/emty.png");
			$("#acc").attr("src","assets/img/emty.png");  
			var backgroundimg = backgrounds[Math.floor(Math.random()*backgrounds.length)];	
			$("#achtergrond").attr("src",backgroundimg);
			$("#submitbutton").text("save");
			$("#savebutton").text("save");
			$("#naam").val("");
	}
	
	//alles attr src worden opgehaald en opgeslagen in de database via ajax
	function save(){
		$("#submitbutton").text("saving");
		$.ajax({
				type: "POST",
				url: "save.php",
				data: {
					naam: $("#naam").val(),
					haar: $("#haar").attr("src"),
					mond: $("#mond").attr("src"),
					bril: $("#bril").attr("src"),
					neus: $("#neus").attr("src"),
					achtergrond: $("#achtergrond").attr("src"),
					acc: $("#acc").attr("src"),
					body: $("#body").attr("src")
				}
			}).done(function(msg) {
				//als het een succes is laten we feedback zien bovenaan het scherm en voeren we een reset uit
				console.log(msg);
				if(msg.status == "success"){
					$("#submitbutton").text("saved");
					$("#savebutton").text("saved");	
					$(".feedback").animate({"top":"-290"}, 300);
					$(".succes").delay(350).animate({"top":"0"}, 400).delay(4000).animate({"top":"-200px"}, 400);
					reset();	
				}else{
					//nog feedback laten zien dat het niet gelukt is 		
					console.log("data niet gesaved" + msg.message);
				}
			});
	}

	//checken of een value leeg
	//als val leeg is return false als ze langer is dan 1 true terug geven
	function isEmtpy(val){
		if(val.length>1){
			return true;
		}else{
			return false;
		}
	}


	//roept een manneke op uit de databasia via een doorgegeven id 
	function getManneke(id)
	{
		$.ajax({
				type: "POST",
				url: "getmanneke.php",
				data: {
					id: id
				}
			}).done(function(msg) {
			$("#body").attr("src",msg[0].body); 
			$("#haar").attr("src",msg[0].haar);
			$("#neus").attr("src",msg[0].neus); 
			$("#bril").attr("src",msg[0].bril);
			$("#mond").attr("src",msg[0].mond);
			$("#actergrond").attr("src",msg[0].achtergrond);
			});

	}
	
	
});



