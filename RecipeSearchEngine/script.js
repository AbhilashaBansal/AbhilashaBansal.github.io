
$(document).ready(function() {
	$("#query-form").submit(function(event){
		performSearch(event);
	});
});


// These websites no longer work, but are still returned by the recipe puppy
var defunctDomains = [
  "kraftfoods.com",
  "cookeatshare.com",
  "find.myrecipes.com"
];

// This function checks if a URL returned in results list contains any of the defunctDomains listed above
function isADefunctSite(sampleSite) {

  var found = false;

  defunctDomains.forEach(
    function (item, index) {
      if (sampleSite.includes(item)) { found = true; }
    }
  );

  return found;
}


// This function turns the results that are returned from search, into HTML elements to be displayed on the web page
function formatSearchResults (json_results) {
	var json_obj = JSON.parse(json_results);

	if (json_obj.results.length == 0) { 
		//no matching recipes found
    	setNotFoundMessage(); 
  	} 
  	else {
  		var site_count = 0;
  		$("#search-results-heading").text("Search Results");

  		var formatedText = "";

  		json_obj.results.forEach(
  		 	function(item, index){

  		 		if (isADefunctSite(item.href)) { return; } // Task 5: Part 2
        		site_count++;
  		 		var thumbnail = item.thumbnail;
  		 		if (thumbnail == "") { thumbnail = "generic_dish.jpg"; } 

  		 		const href = item.href;

  		 		formatedText += "<div align='center' class='dish-image-div'><a " + " href='" + href + "' target='_blank'><img class='dish-image' width='80' src='" + thumbnail + "' alt='Recipe picture, link to recipe page'></a></div>";
        		formatedText += "<div align='center' class='dish-title-div'><a href='" + href + "' target='_blank'>" + item.title + "</a></div>";
        		formatedText += "<div align='center' class='dish-ingredients-div'>Main ingredients: " + item.ingredients + "</div><br><br>";
  		 	}
  		);
  		if (site_count > 0) { 
      		$("#results").html(formatedText);
    	} 
    	else { 
      		setNotFoundMessages(); // no active sites found
    	} 
  	}
}


//This fn handles sending of request, and success/ error handling when response in received
function performSearch(event){
	var request;
	//prevents default submittion of query-form
	event.preventDefault();

	//if any request is still pending, abort it
	if(request){
		request.abort();
	}

	var $form = $(this);

	// disabling the inputs and buttons for the duration of this request
  	setFormDisabledProps(true);

  	$("#search-results-heading").text("Searching ...");
  	$("#results").text("");

  	//sending a request
  	// $ -> global object
  	// .ajax -> its method
  	// it accepts an object as a parameter (to send the request)
  	// object has 3 key-value pairs, as mentioned
  	request = $.ajax({
  		url: "https://cors-anywhere.herokuapp.com/" + "http://www.recipepuppy.com/api/", //to prevent cross origin problem, use heroku url
  		type: "GET", 
  		data: { i: $("#ingredients").val(), q: $("#contains").val()}
  	});

  	//callback handling for success
  	request.done(function(response, textStatus, jqXHR){
  		formatSearchResults(response);
  	});

  	//callback handling for error/ failure
  	request.fail(function(response, textStatus, errorThrown){
  		$("#search-results-heading").text("An error occurred! Please try again.");
      	$("#results").text("");
  	});

  	request.always(function () {
      // Reenable the inputs and buttons
      setFormDisabledProps(false);
  	});
}


//This function checks the user input fields for any unacceptable characters, and removes them if found
//brings user entered data into correct format, to send request
function sanitize_inputs(){
	var str = $("#ingredients").val();
  	str = str.replace(/[^a-zA-Z 0-9,]/gim, ""); //dont understand this yet
  	str = str.trim(); //removes whitespaces from front and back
  	$("#ingredients").val(str);

  	var s = $("#contains").val();
  	s = s.replace(/[^a-zA-Z 0-9]/gim, "");
  	s = s.trim();
  	$("#contains").val(s);
}

// This function disables the query-form input text-fields and the two buttons
function setFormDisabledProps(statusToSet) {
    document.getElementById("ingredients").disabled = statusToSet;
    document.getElementById("contains").disabled = statusToSet;
    document.getElementById("resetButton").disabled = statusToSet;
    document.getElementById("searchButton").disabled = statusToSet;
}


// This function sets the result heading to "no recipes found" and clears the existing search results, if any
function setNotFoundMessage() {
  $("#search-results-heading").text("No recipes found! Please change search criteria.");
  $("#results").text("");
}


//Reset button functionality
function resetResults() {
  $("#search-results-heading").text("");
  $("#results").text("");
}