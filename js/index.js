$(document).ready(function() {
	var topHeight = $(".top-container .col-md-12").outerHeight();
	var clientHeight = window.innerHeight;
	var bodyLeftHeight = clientHeight - topHeight;
	// $(".body-container .col-md-3").css("min-height",bodyLeftHeight);
    var $bodyContainer = $(".body-container .col-md-3");
    var bodyContainer = $bodyContainer[0];
    bodyContainer.style.minHeight = bodyLeftHeight + "px";
});