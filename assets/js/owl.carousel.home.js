// events jquery carousel
$(document).ready(function() {
	$("#owl-demo").owlCarousel({
	    jsonPath : '/assets/js/json/eventsdata.json',
	    jsonSuccess : customDataSuccess
	});

	function customDataSuccess(data) {
	    var content = "";
	    for(var i in data["items"]) {

	        var img = data["items"][i].img;
	        var alt = data["items"][i].alt;
	        var title = data["items"][i].title;
	        var description = data["items"][i].description;

	        var eventstart = data["items"][i].eventstart;
	        var eventend = data["items"][i].eventend;
	        var location = data["items"][i].location;
	        
	        content += "<div class='items-wrapper'>" + "<img src=\"" +img+ "\" alt=\"" +alt+ "\">" + "<h2>" + title + "</h2>" + "<p>" + description + "</p>" + "</div>"
	    }
	    $("#owl-demo").html(content);
	}
});