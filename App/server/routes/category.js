'use strict';

let router = require('express').Router();
let co = require('co');

let ShopModel = require('../models/ShopModel');

router.get('/:id', (req, resp) => {
    co(function*() {
        let categories = yield ShopModel.getAllRecords('categories');
        let currentCategory = yield ShopModel.getCategoryById(req.params.id);

        resp.render('category', {
            categories: categories,
            currentCategory: currentCategory
        });
    }).catch(e => {
        resp.status(500).send(e);
    });
});

router.get('/:id/:subId', (req, resp) => {
    co(function*() {
        let categories = yield ShopModel.getAllRecords('categories');
        let subCategoryData = yield ShopModel.getSubcategory(req.params.id, req.params.subId);

        resp.render('subcategory', {
            categories: categories,
            subCategory: subCategoryData
        });
    }).catch(e => {
        resp.status(500).send(e);
    });
});

module.exports = router;
