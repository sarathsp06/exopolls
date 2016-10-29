// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var polls = {};

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/exotel/dtmf", function (request, response) {
  if (typeof request.query.digits == "undefined") {
    response.json({success : false,error: "Mandatory parameter missing :: digits missing"});
  } else {
    polls[request.query.digits] = ( polls[request.query.digits] || 0) + 1;
    response.json(request.query);
  }
});

app.get("/exotel/polls", function (request, response) {
  response.json(polls);
});

app.delete("/exotel/polls", function (request, response) {
  polls = {}
  response.json(polls);
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});