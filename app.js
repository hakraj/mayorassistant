//getting started
const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const _ = require("lodash");
const https = require("https");
const geoipLite = require("geoip-lite");

const app = express();

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("Public"));


// Database Setup
mongoose.set("strictQuery", false);

const options = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};

mongoose.connect("mongodb+srv://hakraj:14hakeem0203@hak-raj.c1a3l7c.mongodb.net/itemDB", options, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("DB is being set up.");
    };
});

const itemsSchema = new Schema ({
    name: {
        type: String,
        required: [true, "Why no task??"],
    }
});

const Item = mongoose.model("item", itemsSchema);

const item1 = new Item({
    name: "Welcome"
});

const item2 = new Item({
    name: "'+' add new task"
});

const item3 = new Item({
    name: "delete task -->"
});

const items = [item1, item2, item3];

const listSchema = new Schema ({
    name: String,
    items: [itemsSchema]
});

const List = mongoose.model("list", listSchema);


// Documentation
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    if (req.body.form === "signup") {
        res.redirect("/signup");
    } else if(req.body.form === "login") {
        res.redirect("/login");
    } else {
        // console.log(req.body)
    }
})
app.get("/features", (req, res) => {
    res.sendFile(__dirname + "/features.html");
});

app.get("/signup", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/login.html");
});

app.post("/auth", (req, res) => {
    res.redirect("/weather");
})



// Weather
app.get("/weather", (req, res) => {
    res.sendFile(__dirname + "/weather.html");
});

app.post('/api/weather', (req, res) => {
    const geolocation = req.body;
    // console.log(geolocation);

    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;    // const clientIp = requestip.getClientIp(req);
    const geo = geoipLite.lookup(ip)
    // console.log(geo);

    
    const lat = geolocation.lat;
    const long = geolocation.long;
    const apiKey = "032bca0d39936405b7bb1246f52a0e02";
    const units = "metric"

    const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=" + apiKey + "&units=" + units;

    https.get(url, (response) => {

        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const cityName = weatherData.name;

            const dateTime =  new Date(weatherData.dt * 1000);
            const dateTimeHr = (dateTime.toDateString()).slice(0,3) + "," + (dateTime.toDateString()).slice(3, (dateTime.toDateString()).length);

            const icon =  weatherData.weather[0].icon;
            const imgUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

            const description = weatherData.weather[0].description

            const temp = weatherData.main.temp;

            const feelsLike = weatherData.main.feels_like;

            const humidity = weatherData.main.humidity;

            const wind = weatherData.wind.speed;

            const visibility = weatherData.visibility;
            

            const userWeather = {
                cityName,
                dateTimeHr,
                imgUrl,
                description,
                temp,
                feelsLike,
                humidity,
                wind,
                visibility,
                geo
            };

            res.send(userWeather);


        });

    });

});

app.post('/api/forecast', (req, res) => {
    const geolocation = req.body;

    const lat = geolocation.lat;
    const long = geolocation.long;
    const apiKey = "032bca0d39936405b7bb1246f52a0e02";
    const units = "metric"

    const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long + "&appid=" + apiKey + "&units=" + units;

    https.get(forecastUrl, (response) => {
        // console.log(response.statusCode);
        const chunks = [];

        response.on("data", (data) => {

            chunks.push(data);
            }).on('end', function() {
            let data   = Buffer.concat(chunks);
            let forecastData = JSON.parse(data);

            const day1 = forecastData.list[7];
            const day2 = forecastData.list[15];
            const day3 = forecastData.list[23];
            const day4 = forecastData.list[31];
            const day5 = forecastData.list[39];

            function getDate (day) {
                const dateTime =  new Date(day * 1000);
                const dateTimeHr = dateTime.toDateString();
                const dateHr = dateTimeHr.slice(0,3) + dateTimeHr.slice(7,10)
                
                return dateHr;
            }

            userForecast = [
                {
                    time: getDate(day1.dt),
                    iconUrl: "https://openweathermap.org/img/wn/" + day1.weather[0].icon + "@2x.png",
                    temp: day1.main.temp
                },
                {
                    time: getDate(day2.dt),
                    iconUrl: "https://openweathermap.org/img/wn/" + day2.weather[0].icon + "@2x.png",
                    temp: day2.main.temp
                },
                {
                    time: getDate(day3.dt),
                    iconUrl: "https://openweathermap.org/img/wn/" + day3.weather[0].icon + "@2x.png",
                    temp: day3.main.temp
                },
                {
                    time: getDate(day4.dt),
                    iconUrl: "https://openweathermap.org/img/wn/" + day4.weather[0].icon + "@2x.png",
                    temp: day4.main.temp
                },
                {
                    time: getDate(day5.dt),
                    iconUrl: "https://openweathermap.org/img/wn/" + day5.weather[0].icon + "@2x.png",
                    temp: day5.main.temp
                },
            ];


            res.send(userForecast);

        });


    });

});


//To-do
app.get("/to-do", (req, res) => {

     

    Item.find({}, (err, foundItems) => {

        if (foundItems.length === 0) {
            Item.insertMany(items, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    // console.log("succesfully added default items");
                }
            });

            res.redirect("/to-do");
        } else {
            res.render("to-do", {listTitle : "Today", listItems: foundItems});
        }

    
    });


});

app.post("/to-do", (req, res) => {

    // console.log(req.body)

    const listTitle = req.body.title;

    const newItem = new Item({
        name: req.body.newItem
    });

    if (listTitle === "Today") {
        newItem.save();

        res.redirect("/to-do");
    } else {
        List.findOne({name: listTitle}, (err, foundList) => {
            foundList.items.push(newItem);
            foundList.save();

            res.redirect("/to-do/" + listTitle);
        });
    }


});

app.post("/delete", (req, res) => {

    const deleteId = req.body.delete;
    const listTitle = req.body.title

    if (listTitle === "Today") {
        Item.deleteOne({_id: deleteId}, err => {
            if (err) {
                console.log(err)
            } else {
                // console.log("succesfully deleted");
                res.redirect("/to-do");
            }
        });
    } else {
        List.findOneAndUpdate({name: listTitle}, {$pull : {items: {_id: deleteId}}}, (err, foundList) => {
            if (!err) {
                res.redirect("/to-do/" + listTitle);
            }
        });
    }



    

})

app.get("/to-do/:customList", (req, res) => {
    // console.log(req.params.customList);
    const customList = _.capitalize(req.params.customList);

    List.findOne({name: customList}, (err, foundItems) => {

        if (foundItems === null) {
            const list = new List({
                name: customList,
                items: items
            });
        
            list.save();

            res.redirect("/to-do/" + customList);      
        } else {
            res.render("to-do", {listTitle : customList, listItems: foundItems.items});
        };

    });


    

});




const PORT = process.env.PORT || 3000
app.set("trust proxy", true);

app.listen(PORT, () => {
    console.log("hak_raj, Roger that!");
});