var express = require("express");
var app = express();

var bodyParser = require('body-parser');
//espress subprot json
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Hello NodeJS');
})

app.listen(3000);
console.log("My Service is listening to port 3000.");
//contrack mongoDB
var MongoClient = require('mongodb').MongoClient;
var dbUrl = "mongodb://127.0.0.1:27017/Test";/*Test name is a database */
var ObjectID = require('mongodb').ObjectID;
//getMany
app.get('/testMongoDB/getMany', function (req, res) {
    MongoClient.connect(dbUrl, function (err, db) {
        if (err) res.send(err);
        db.collection('testMongoDB')
            .find(req.query).toArray(function (err, result) {
                db.close();
                if (err) res.send(err);
                res.send(result);
            });
    });
});
//getData
app.post('/testMongoDB/getData', function (req, res) {
    MongoClient.connect(dbUrl, function (err, db) {
        if (err) res.send(err);
        db.collection('testMongoDB')
            .find(req.body).toArray(function (err, result) {
                db.close();
                if (err) res.send(err);
                res.send(result);
            });
    });
});




//Insert
app.post('/testMongoDB/add', function (req, res) {
    MongoClient.connect(dbUrl, function (err, db) {
        if (err) res.send(err);
        var id = new ObjectID();
        var data = req.body;
        data["_id"] = id.toHexString();
        db.collection('testMongoDB')
            .insertOne(data, function (err, result) {
                db.close();
                if (err) res.send(err);
                res.send(result);
            });
    });
});


//update
app.put('/register/update', function (req, res) {
    MongoClient.connect(dbUrl, function (err, db) {
        if (err) res.send(err);
        var opts = (req.body.opts ? req.body.opts : {});
        db.collection('register')
            .update(req.body.criteria, req.body.data, opts, function (err, result) {
                db.close();
                if (err) res.send(err);
                res.send(result);
            });
    });
})
//delete
app.delete('/register/delete', function (req, res) {
    MongoClient.connect(dbUrl, function (err, db) {
        if (err) res.send(err);
        db.collection('register')
            .remove(req.body, function (err, result) {
                db.close();
                if (err) res.send(err);
                res.send(result);
            });
    });
});