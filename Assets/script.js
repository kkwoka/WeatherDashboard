$(document).ready(function() {
    var i=0;
    var cityArr = [];

    $(document).on("click", ".listnone", getWeather);

    var retrievedData = localStorage.getItem("cityArr");
    console.log(retrievedData)
    if (retrievedData !=null) {
        var cityArr2 = JSON.parse(retrievedData);
        if (cityArr.length >= 0) {
            for (i = 0; i < cityArr2.length; i++) {
                var ul = $("<ul>").attr("class", "listnone");
                var li = $("<li>");
                li.append(cityArr2[i]);
                ul.append(li);
                $(".cityList").append(ul);
            }
        }
    }
    

    $("#search").click(function updateCityList() {
        var currentCity = $(".cityInput").val();
        cityArr.push(currentCity);
        localStorage.setItem("cityArr", JSON.stringify(cityArr));

        var ul = $("<ul>").attr("class", "listnone");
        var li = $("<li>");
        li.append(currentCity);
        ul.append(li);
        $(".cityList").prepend(ul);
        localStorage.getItem("cityArr", cityArr);
    })
    

    function getWeather() {
        var cityName = $(this).text();
        var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "," + "us&apikey=6e7d39e5118ef7d51cd1eac47a719b4b";

        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
                $(".cityInfoDiv").text("");
                var cityHeader = $("<h2>").text(response.city.name);
                $(".cityInfoDiv").append(cityHeader);
                var tempDiv = $("<div>").text("Temperature: " + response.list[0].main.temp);
                var humidDiv = $("<div>").text("Humidity: " + response.list[0].main.humidity);
                var windDiv = $("<div>").text("Wind Speed: " + response.list[0].wind.speed);
                var lat = response.city.coord.lat;
                var lon = response.city.coord.lon;

                $(".cityInfoDiv").append(tempDiv);
                $(".cityInfoDiv").append(humidDiv);
                $(".cityInfoDiv").append(windDiv);

                queryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=6e7d39e5118ef7d51cd1eac47a719b4b&lat" + "=" + lat + "&lon" + "=" + lon;

                $.ajax({
                    url: queryURL,
                    method: "GET"
                  }).then(function(response) {
                        var uvDiv = $("<div>").text("UV Index: " + response.value);
                        $(".cityInfoDiv").append(uvDiv);
                        if (response.value < 3) {
                            uvDiv.attr("class", "greenUV");
                        } else if (response.value < 7 && response.value >= 3){
                            uvDiv.attr("class", "yellowUV");
                        } else {
                            uvDiv.attr("class", "redUV");
                        }
                  })

            })            
                
    };

})



// api.openweathermap.org/data/2.5/forecast?q={city name},{country code}
// api.openweathermap.org/data/2.5/forecast?id={city ID}

