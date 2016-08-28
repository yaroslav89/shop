'use strict';

/* InfovalutarService Class
 *  Contains method to get response from soap service and update product price by currency
 */


let soap = require('soap');

// Service Url
const url = 'http://infovalutar.ro/curs.asmx?wsdl';

let InfovalutarService = class InfovalutarService {
    /* Method to get service response and calculate new product price
     *  @input currentCurrency string 
     *  @input currentPrice string
     *  @input nextCurrency string 
     *  @output new Product price float
     */
    static convertValue(nextCurrency, currentCurrency, currentPrice) {
        return new Promise((resolve, reject) => {
            soap.createClient(url, (err, client) => {
                if (!err) {
                    let d = new Date();

                    if (d.getHours() < 13) {
                        d.setDate(d.getDate() - 1);
                    }

                    client.getall({ dt: d.toJSON() }, (err, result) => {
                        if (!err) {
                            try {
                                let currencyDataArray = result.getallResult.diffgram.DocumentElement.Currency;
                                let convertFrom = currencyDataArray.find(obj => obj.IDMoneda == currentCurrency).Value;
                                let convertTo = currencyDataArray.find(obj => obj.IDMoneda == nextCurrency).Value;
                                let newPrice = (parseFloat(convertFrom) / parseFloat(convertTo)) * parseFloat(currentPrice);

                                resolve(newPrice.toFixed(2));
                            } catch (e) {
                                reject(e);
                            }
                        } else {
                            reject(err);
                        }
                    });
                } else {
                    reject(err.statusText);
                }
            });
        });
    }
}

module.exports = InfovalutarService;
