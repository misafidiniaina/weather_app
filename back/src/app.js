// here we are going to call all the dependencies
require("dotenv").config();
const express = require("express");
const hbs = require("hbs"); // this is usefull for the template, templating language
const path = require("path");
const cors = require("cors"); //import cors
const fs = require("fs");
const {Trie} = require("./trie");

const app = express();

const weatherData = require("../utils/weatherData"); // miantso anlay fonction ary am utils
const { title } = require("process");
// here we are going to export all the path for the file we just have created
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// and here weare going to tell express w

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicPath));

app.use(cors()); // enable cors for all routes

// we are going to create the route and the port listening to that route
const port = process.env.PORT || 3000; // here the port will depend on the sever we deploy it , unless there is no server it will use 3000


let citiesTrie = new Trie();
let citiesCache = null;

const filePath = path.join(__dirname, '..', 'data', 'cities.json');

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Failed to read cities data', err);
    return;
  }
  const cities = JSON.parse(data);
  cities.forEach(city => citiesTrie.insert(city));
  citiesCache = cities; // Cache the cities data
});

app.get('/cities', (req, res) => {
  const search = req.query.search || '';
  if (citiesCache && citiesCache.length > 0) {
    const results = citiesTrie.search(search.toLowerCase());
    res.json(results);
  } else {
    res.status(500).json({ error: "Cities data not loaded yet" });
  }
});





app.get("/", (req, res) => {
  res.render("index", { title: "weather app" }); // this is going to render the index.hbs and pass the title there
});

//this is another API route that will fetch data from Weatheropen API
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    // this one is verify if the user has enter an address
    return res.send("Address is required");
  }
  // this is going to call the API and print the reut if there is no error
  weatherData(req.query.address, (error, result) => {
    if (error) {
      return res.send(error);
    }
    res.send(result);
  });
});



//this is going to handle if the route entered is not a proper one
app.get("*", (req, res) => {
  res.send("this route doesn't exist");
});
// now creating a callback function for listening port

app.listen(port, () => {
  console.log("server is listening on port " + port);
});
