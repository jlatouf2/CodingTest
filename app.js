var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.json());

/*
REFER TO https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
FOR THE MONGOOSE CODE EXPLANATION
*/

app.use(express.static(path.join(__dirname, '/')));


// 1) ADD REQUIRE MONGOOSE:
var mongoose = require('mongoose');

// 2) CONNECT MONGOOSE
MONGOLAB_URI = "mongodb://john:john1@ds025792.mlab.com:25792/blue1254545";



var url = MONGOLAB_URI   || 'mongodb://localhost/social' ;

mongoose.connect(url);

// 3) SIMPLE CHECK TO SEE IF CONNECTED TO DB
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Connected to DB!');
});




// curl -H "Content-Type: application/json" -X POST -d '{"date":"12/10/1993"}' http://localhost:3000/findDate22

//   NOTE: THIS WORKS TO POST A DATE TO DB THEN RETRIEVE THE RELIVENT DATES BACK....

/*
  SO ALL THAT NEED TO BE DONE:
  1) ADD ALL INFO TO THE DATABASE
  2) THEN PASS THE RELIEVENT DATE IN LIKE THIS EXAMPLE WITH CURL (As Seen Below),
  THEN SEND BACK ALL THE DATA FOR THAT PARTICULAR DATE.

  [BTW: THE OBJECT RELATIONAL MAPPING IS ALREADY DONE B/C ITS MONGOOSE]

  [ALSO: EMAIL SAYS TO PROVIDE SAMPLE QUIES WITH ANSWER: JUST NEED TO ACTIVATE
GET REQUEST ON PAGE LOAD.]

  3) I DONT KNOW IF A FRONT-END IS REQUIRED.....

  db.Pupils.find({ "LatestMark": {$gt : 15, $lt : 20}});

db.Pupils.find({ "LatestMark": {$gt : 12/10/1993, $lt : 12/10/1993}});

  age: { $gt: 17, $lt: 66 },

  to make between query work:

  1) have start and end date text boxes
  2)

  curl -H "Content-Type: application/json" -X POST -d '{"date":"12/10/1993"}' http://localhost:3000/findDate23

*/





//  NOTE: ADDS NEW DATABASE SCHEMA

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var getDate =  new Schema({
    date: { type: Date, default: '12/10/1990' },
    money: { type: Number }

});

var User3 = mongoose.model('DataDates', getDate);

// curl -H "Content-Type: application/json" -X POST -d '{"money":"12/10/1993"}' http://localhost:3000/getDate22



//      *************************************
// NOTE THIS WORKS IT GETS JSON VALUES AFTER SPECIFIC DATE
//   ******************************************


app.get('/afterDate', function (req, res, next) {
    //  Post.find({username: 'DeclanProud'}
    //  console.log(req.body.date);
      User3.find({date: {$gt : '2017/01/01'}}, function(err, users) {
    //    User2.find({ "LatestMark": {$gt : '12/10/1993'} function(err, users) {

      if (err) throw err;
      res.send(users); //replace with your data here

      // object of all the users
      console.log("Here are the results that are greater than the date asked for:" + users);
    });
});




//      *************************************
// NOTE THIS WORKS IT GETS JSON VALUES BEFORE SPECIFIC DATE
//   ******************************************


app.get('/beforeDate', function (req, res, next) {
    //  Post.find({username: 'DeclanProud'}
    //  console.log(req.body.date);
      User3.find({date: {$lt : '2017/01/01'}}, function(err, users) {

      if (err) throw err;
      res.send(users);

      // object of all the users
      console.log(users);
    });
});




app.get('/addDate', function (req, res, next) {
  // get all the users
  var addDate = User3({
    date: '2017/01/01'
      });

    addDate.save(function (err, post) {
      if (err) throw err;

        //res.json(201, post);
      console.log(post);

      });

  });


  app.get('/findDates', function (req, res, next) {
    // get all the users
    User3.find({})
    .sort('-date')
      .exec(function(err, posts) {

      if (err) {
        console.log('did not work');
      }

      res.send(posts);

      // object of all the users
      console.log(posts);
    });
  });






// curl -H "Content-Type: application/json" -X POST -d '{"date":"12/10/1993"}' http://localhost:3000/findDate22
//2017/01/01
  app.post('/findDate22', function (req, res, next) {
      //  Post.find({username: 'DeclanProud'}
        console.log(req.body.name);

        User3.find({date: {$lt : req.body.name}})
        // 2017-06-01 T05:00:00.000Z
        .sort('-date')
          .exec(function(err, posts) {

          if (err) {
            console.log('did not work');
          }

          res.send(posts);

          // object of all the users
          console.log(posts);
        });

  });


  app.post('/findDate33', function (req, res, next) {
        console.log(req.body.name);
    User3.find({date: {$gt : req.body.name}})
    // 2017-06-01 T05:00:00.000Z
    .sort('-date')
      .exec(function(err, posts) {

      if (err) {
        console.log('did not work');
      }

      res.send(posts);

      // object of all the users
      console.log(posts);
    });
  });




app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname,  'index.html'));
});


app.listen(app.get('port'), function () {
  console.log('Example app listening on port 5000!');
});
