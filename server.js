//dependencies
const express = require("express");
const mongoose = require("mongoose");

//set port so it can be accessed by heroku
var PORT = process.env.PORT || 8080;
var db = require("./Models");

var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//API routes 
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

//connect to mongoose 
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/custommethoddb",
  { useNewUrlParser: true }
);

//run app
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});