getUser = function(){
	var thisURL = document.URL;	
	var URLArray = thisURL.split("?");
	var user = URLArray[URLArray.length-1];
	return user.substring(5);
}
