/**
 * Created by himanshu on 16/2/17.
 */

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var md5 = require('md5');

app.use('/', express.static(__dirname + '/public_html'));

var customer = require('./customer');
var admin  =require('./admin');
//var bookings = require('./bookings');

app.post('/customer/login', function (req, res) {

    //console.log(req);

    var obj = {
        username : req.body.username,
        password : md5(req.body.password)
    };
    console.log("Submit");
    console.log(obj);
    customer.login(obj, function (result, id) {
        console.log("Sending result");
        console.log(result);
        res.send(
            {
                result : result,
                customerId : id
            }
        );
    });
});

app.post('/customer/signup', function (req, res) {
    var obj = {
        username : req.body.username,
        password : md5(req.body.password),
        phone : req.body.phone,
        bookingHistory : {}
              };
    customer.signUp(obj, function (result, id) {
        res.send(
            {
                result : result,
                customerId : id
            }
        );
    });
});


app.listen(5000, function () {

    console.log("Server running on port 5000");

});