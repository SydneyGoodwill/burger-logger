var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");


router.get('/', function (req, res) {
    burger.all(function(data) {
        var burgObj = {
            burgers: data
        };
        console.log(burgObj);
        res.render("index", burgObj);
    });
});

router.post('/api/burgers', function (req, res) {
        var burger = new Burger({
            id: req.body.id,
            burger_name: req.body.burger_name,
            devoured: req.body.devoured
        });
        burger.save(function (err) {
            if (err) {
                res.send(err);
                return;
            }
            res.json({
                message: 'burger created!'
            });
        });
    });

    
