const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 6060;

const app = express();


app.use(logger("dev"));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static("public"));

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/Workout',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  );  


require('./routes/api-routes')(app)
require('./routes/html-routes')(app)


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}..`);
})
