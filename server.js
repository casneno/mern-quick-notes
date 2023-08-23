const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

//Always require and configure near the top
require('dotenv').config();

//Connect to the Database
require('./config/database');

const app = express();

app.use(logger('dev'));
app.use(express.json());

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico'))); //looks for teh buidl directory and serves the content from there. Useful in the deployment
app.use(express.static(path.join(__dirname, 'build')));

//Middleware to check and verify a JWT and assign the user object from teh JWT to req.user
app.use(require('./config/checkToken'))

// Put API routes here, before the "catch all" route
// Example API:
// app.get('/order/:id', function(req,res) {
  // return JSON
// })
app.use('/api/users', require('./routes/api/users'));
app.use('/api/notes', require('./routes/api/notes'));


// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests. This way, is a user types sei.com/dashboard by mistake, it will be redirected to the index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 5000; //'if there is no environemntal variable telling em to use a port, then use port 5000 by default

app.listen(port, function() {
  console.log(`Express app running on port ${port}`)
})