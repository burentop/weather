


var lat;
var long;


$(document).ready(function() {
	if (navigator.geolocation) {
	  var timeoutVal = 10 * 1000 * 1000;
	  navigator.geolocation.getCurrentPosition(
	    getPosition, 
	    displayError,
	    { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
	  );
	}
	else {
	  alert("Geolocation is not supported by this browser");
	}
	
});

function getWeather() {
	$.ajax({
	  dataType: 'jsonp',
	  url: 'https://api.darksky.net/forecast/354a3c600fb639cddc3bb7e8ab3458a6/' + lat + ',' + long,
	  success: function(data){
	  	var temp = data['currently']['temperature'];
	  	var sky = data['currently']['cloudCover'];
	  	var wind = data['currently']['windSpeed'];
	    $("#temp").html(Math.round(temp) + " F");
	    $("#sky").html(getCloud(sky));
	    $("#wind").html(Math.round(wind) + " mph");
	  }
	});
}

function getPosition(position) {
  lat = position.coords.latitude;
  long = position.coords.longitude;
  getWeather();
}

function displayError(error) {
  var errors = { 
    1: 'Permission denied',
    2: 'Position unavailable',
    3: 'Request timeout'
  };
  alert("Error: " + errors[error.code]);
}

function getCloud(num) {
	if (num < 0.2) {
		return "Sunny";
	} else if (num < 0.4) {
		return "Mostly Sunny";
	} else if (num < 0.7) {
		return "Partly Cloudy";
	} else if (num < 0.9) {
		return "Mostly Cloudy";
	} else {
		return "Cloudy";
	}
}

function displayLocation(latitude,longitude){
  var request = new XMLHttpRequest();

  var method = 'GET';
  var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&sensor=true';
  var async = true;

  request.open(method, url, async);
  request.onreadystatechange = function(){
  if(request.readyState == 4 && request.status == 200){
    var data = JSON.parse(request.responseText);
    alert(request.responseText); // check under which type your city is stored, later comment this line
    var addressComponents = data.results[0].address_components;
    for(i=0;i<addressComponents.length;i++){
      var types = addressComponents[i].types
        //alert(types);
      if(types=="locality,political"){
        alert(addressComponents[i].long_name); // this should be your city, depending on where you are
       }
      }
    return address.city.short_name;
	  }
	}
}