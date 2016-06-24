// save as 4menu.js
// Change the loading of our city JSON, let's use AJAX after the user has clicked on the city link
// Future ask is to fade in the display transition
console.log('hello')
function displayCityMenu() {
	$.ajax({
		"url": "city.json",
		"success": function (response) {
			$("#menuCities").html("<li>" + response.result.cities.join("</li><li>") + "</li>");
		}
	});
}

$("head").append("<link href='menu.css' rel='stylesheet'>");

$.ajax({
	"url": "menu.html",
	"success": function (response) {
		$("#menu").html(response);

		$("#menuCities").parent().click(displayCityMenu);
	}
});
