'use strict';

let router = require('express').Router();
let co = require('co');
let ShopModel = require('../models/ShopModel');


router.get('/', (req, resp) => {
    co(function*() {
        let categories = yield ShopModel.getAllRecords('categories');

        resp.render('index', {
            categories: categories
        });
    }).catch(e => {
        resp.status(500).send(e);
    });
});

module.exports = router;
