'use strict';

let router = require('express').Router();
let co = require('co');

let ShopModel = require('../models/ShopModel');


router.get('/:catId', (req, resp) => {
    co(function*() {
        let categories = yield ShopModel.getAllRecords('categories');
        let data = yield ShopModel.getProductsByCategory(req.params.catId);

        resp.render('productgrid', {
            categories: categories,
            products: data
        });
    }).catch(e => {
        resp.status(500).send(e);
    });
});

router.get('/:catId/:productId', (req, resp) => {
    co(function*() {
        let categories = yield ShopModel.getAllRecords('categories');
        let product = yield ShopModel.getProduct(req.params.productId);

        resp.render('pdp', {
            product: product,
            categories: categories
        });
    }).catch(e => {
        resp.status(500).send(e);
    });
});

module.exports = router;
