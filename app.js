//console.log("Hello world!")

/* Imports */
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var jsonfile = require("jsonfile");

// Read from JSON
var file = "cars.json";
var cars = [];

jsonfile.readFile(file, function(err, obj) {
    if (err) {
        console.log(err);
    } else {
        console.log(obj),
        cars = obj;
    }
});

// Create a new instance of express
var app = express();

/** 
// Example middleware
var logger = function(req, res, next) {
    console.log("Logging...")

    // Call next to exit
    next();
}

// Use the logger
app.use(logger);
*/

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

// Create static search
app.use(express.static(path.join(__dirname, 'public')));

// Create cars
/** 
var cars = [
    {
        id: 1,
        make: "Saab",
        model: "90",
        color: "Red"
    },
    {
        id: 2,
        make: "Opel",
        model: "Corsa",
        color: "Blue"
    },
    {
        id: 3,
        make: "Audi",
        model: "R8",
        color: "Black"
    },
    {
        id: 4,
        make: "Volvo",
        model: "V40",
        color: "Orange"
    }
]
*/

// REST-api for cars

// Send all cars
app.get("/api/cars", function(req, res){    
    res.send(cars);
});

// Add a car
app.post("/api/cars/add", function(req, res) {
    // Get next id
    var newId = getNextId(cars);

    // Create new object
    var newCar = {
        id: newId,
        make: req.body.make,
        model: req.body.model,
        color: req.body.color
    }

    // Add to array
    cars.push(newCar);
    //res.send({"message": "Adding car"});

    // Call saveFile()
    saveFile();

    // Send user to index.html
    res.redirect("/");

});

// Remove car
app.delete("/api/cars/delete/:id", function(req, res) {
    var deleteId = req.params.id;

    for(var i=0; i<cars.length; i++) {
        if (cars[i].id == deleteId) {
            cars.splice(i, 1);
        }
    }

    // Call saveFile()
    saveFile();

    res.send( {"message" : "Deleting car with id" + deleteId});

});

// Helper function for id (get highest)
function getNextId(arr) {
    var max = 0;

    /** 
    for(var i=0; i < arr.lenght; i++) {
        // Get the id and converts it to int
        var current = parseInt(arr[i].id);
        if (current > max) { max = current;}
    }
    */

    for(let car of arr) {
        // Get the id and converts it to int
        var current = parseInt(car.id);
        if (current > max) { max = current;}
    }
    
    return max + 1;
    //return 99;
}

// Save JSON-file
function saveFile() {
    jsonfile.writeFile(file, cars, function(err) {
        console.log(err);
    });
}


// Por for connecting server
var port = 3000;

// Start server
app.listen(port, function() {
    console.log("Server running on port "+port);
});