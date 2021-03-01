//dependencies 
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

//set port for heroku usage
const app = express();
const PORT = process.env.PORT || 8080;

app.use(morgan("dev"));

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/Workout',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  );  

//API routes
require("routes/apiRoutes.js")(app);
require("routes/htmlRoutes.js")(app);

//port functionality check 
app.listen(PORT,function(){ 
    console.log(`App listening on Port ${PORT}`);
});

