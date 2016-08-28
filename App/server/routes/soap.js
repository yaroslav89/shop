'use strict';

let soap = require('soap');
let router = require('express').Router();
let co = require('co');
let InfovalutarService = require('../models/InfovalutarServiceModel');

const url = 'http://infovalutar.ro/curs.asmx?wsdl';

router.post('/soap', (req, resp) => {
    co(function*() {
        if (req.body) {
            let nextCurrency = req.body.nextCurrency;
            let currentCurrency = req.body.currentCurrency;
            let currentPrice = req.body.currentPrice;
            let newPrice = yield InfovalutarService.convertValue(nextCurrency, currentCurrency, currentPrice);

            resp.send(newPrice.toString());
        } else {
            resp.status(400).send('Missing data object');
        }
    }).catch(e => {
        resp.status(503).send(e);
    });
});

module.exports = router;
