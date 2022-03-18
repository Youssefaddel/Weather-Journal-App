// Setup empty JS object to act as endpoint for all routes
let projectData = {};

/* Setup Packages */
// Require Express to run server and routes
const express = require('express');
// Require Body-Parser package
const bodyParser = require('body-parser');
// Require Cors package
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder تريط بين الكلاينت والباك اند
app.use(express.static('website'));

// Callback function to complete GET '/all'
const getAll = (req, res) => res.send(projectData);
app.get("/all", getAll);

// Post Route
const postData = (req, res) => {
    projectData = req.body;
    console.log(projectData);
    res.send(projectData);
    res.send({ message: "Successfully Post Request" });
}
app.post("/addData", postData);

// Setup Server
const port = 4000;

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/`)
});
