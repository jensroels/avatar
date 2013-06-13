$(document).ready(function(){

$(".bodyparts img").hide();
$("img.body").show();

	
	$("img").click(function(e){
	var bodypart = "#"+$(this).attr("class");
		$(bodypart).attr("src",$(this).attr("src")); 
	});
	
	
	
	$("li").click(function(e){
	var bodypart = "img."+$(this).attr("class");
	$(".bodyparts img").hide();
		$(bodypart).show();
	});
	
	
	if(document.URL.substring(48).length>1){
		//ajax call maken en poppetje bouwen
		getManneke(document.URL.substring(49));
	}else{
		//user wilt gewoon zelf bouwen 
	}
	
	$("#savebutton").click(function(){
	alert($("#achtergrond").attr("src"));
		//save();
		return false;
	});
	
	function save(){
	$("#savebutton").text("saving");
	console.log($("#achtergrond").attr("src"));
		$.ajax({
				type: "POST",
				url: "save.php",
				data: {
					haar: $("#haar").attr("src"),
					mond: $("#mond").attr("src"),
					bril: $("#bril").attr("src"),
					neus: $("#neus").attr("src"),
					achtergrond: $("#achtergrond").attr("src"),
					body: $("#body").attr("src")
				}
			}).done(function(msg) {
				console.log(msg);
				if(msg.status == "success"){
					console.log("data succesvol gesaved");
					$("#savebutton").text("saved");		
				}else{		
					console.log("data niet gesaved" + msg.message);
				}
			});
	}

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



