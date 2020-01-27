$(document).ready(function() {
    var i=0;
    var cityArr = [];
    var retrievedData = localStorage.getItem("cityArr");

    $(document).on("click", ".listnone", getWeather);

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
        var ul = $("<ul>").attr("class", "listnone");
        var li = $("<li>");
        cityArr.push(currentCity);
        localStorage.setItem("cityArr", JSON.stringify(cityArr));
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
                $(".forecast").text("");
                $(".buttons-view").text("");
                
                var img = "<img src='http://openweathermap.org/img/w/" + response.list[0].weather[0].icon + ".png' >"
                var cityHeader = $("<h2>").text(response.city.name + " (" + moment().format('L') + ")");
                var tempConversion = (((response.list[0].main.temp - 273.15) * 1.80) + 32).toFixed(1);
                var tempDiv = $("<div>").text("Temperature: " + tempConversion + "F°");
                var humidDiv = $("<div>").text("Humidity: " + Math.floor(response.list[0].main.humidity) + "%");
                var windDiv = $("<div>").text("Wind Speed: " + (response.list[0].wind.speed * 2.236936).toFixed(1) + "MPH");
                var lat = response.city.coord.lat;
                var lon = response.city.coord.lon;
                
                $(cityHeader).append(img);
                $(".cityInfoDiv").append(cityHeader);
                $(".cityInfoDiv").append(tempDiv);
                $(".cityInfoDiv").append(humidDiv);
                $(".cityInfoDiv").append(windDiv); 
                               

                queryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=6e7d39e5118ef7d51cd1eac47a719b4b&lat" + "=" + lat + "&lon" + "=" + lon;

                $.ajax({
                    url: queryURL,
                    method: "GET"
                  }).then(function(response) {
                        var uvDiv = $("<div>").text("UV Index: " + (response.value).toFixed(2));
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
            
        var cityName = $(this).text();
        var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "," + "us&apikey=6e7d39e5118ef7d51cd1eac47a719b4b";

        $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {
                for (i = 0; i < response.list.length; i++) {
                    $(".forecastHeader").text("5 Day Forecast:");
                    if (response.list[i].dt_txt.indexOf("09:00:00") > -1) {
                        var buttonDIV = $("<div>").attr("class", "foreButton");
                        var date = $("<li>").attr("class", "foreList");
                        var img = "<img class='foreIMG' src='http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png' >"
                        // $(img).attr("class", "foreIMG");
                        var temp = $("<li>").attr("class", "foreList");
                        var humid = $("<li>").attr("class", "foreList");
                        date.text(" " + moment(response.list[i].dt, "X").format("MM/DD/YYYY"));
                        temp.text("Temp: " + (((response.list[i].main.temp  - 273.15) * 1.80) + 32).toFixed(2) + "F°");
                        humid.text("Humidity: " + response.list[i].main.humidity + "%");

                        $(buttonDIV).append(date);
                        $(buttonDIV).append(img);
                        $(buttonDIV).append(temp);
                        $(buttonDIV).append(humid);
                        $(".buttons-view").append(buttonDIV);
                    }
                }
            })   
    };
})