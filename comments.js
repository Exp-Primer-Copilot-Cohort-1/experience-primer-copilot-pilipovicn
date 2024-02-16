// Create web server
// http://localhost:3000/
var http = require('http');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Comment = require('./models/comment');

// Connect to database
mongoose.connect('mongodb://localhost/comment');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('Connection to database is established');
});

// Use body-parser
app.use(bodyParser.json());

// Web server
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/comments', function (req, res) {
  Comment.find(function (err, comments) {
    if (err) return console.error(err);
    res.json(comments);
  });
});

app.post('/comments', function (req, res) {
  var comment = new Comment(req.body);
  comment.save(function (err, comment) {
    if (err) return console.error(err);
    res.json(comment);
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});