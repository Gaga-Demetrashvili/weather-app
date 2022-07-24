const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

//Get data from external Server https (native) method

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {

    const query = req.body.cityName;

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=ba0025b86d52f22697df29dd2d77b8e0&units=metric";

    https.get(url, (response) => {
        console.log(response.statusCode);

        response.on('data', (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const object = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

            res.set("Content-Type", "text/html");

            res.write("<h3>The weather is currently " + object + ".</h3>");
            res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius.</h1>");
            res.write("<img src=" + imgURL + ">");
            res.send();
        })

    })
});





app.listen(3000, function () {
    console.log("Server is running on port 3000.");
})