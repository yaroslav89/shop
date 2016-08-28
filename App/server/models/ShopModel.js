'use strict';

/* Shop Model Class 
*  Contains methods to get data from mongo DB
*/

let dbClient = require('mongodb').MongoClient;
let co = require('co');
// Database link
const url = 'mongodb://localhost:27017/shop';

let ShopModel = class ShopModel {
/* Method to get all records from specified collection
*  @input collection name string 
*  @output collection data array
*/
    static getAllRecords(collection_name) {
        return new Promise((resolve, reject) => {
            co(function*() {
                let db = yield dbClient.connect(url);
                let collection = db.collection(collection_name);
                let data = yield collection.find().toArray();

                resolve(data);
                db.close()

            }).catch((e) => {
                reject(e);
            });
        });
    }
/* Method to get category by its id
* @input category id string
* @outpu category data object
*/
    static getCategoryById(id) {
        return new Promise((resolve, reject) => {
            co(function*() {
                let db = yield dbClient.connect(url);
                let categories = db.collection('categories');
                let data = yield categories.findOne({ id: id });

                resolve(data);
                db.close();

            }).catch((e) => {
                reject(e);
            });
        });
    }
/* Method to get subcategory by category id and its subcategory id
*  @input catgeory id string 
*  @input subcategory id string
*  @subcategory data array
*/
    static getSubcategory(id, subCatId) {
        return new Promise((resolve, reject) => {
            co(function*() {
                let db = yield dbClient.connect(url);
                let categories = db.collection('categories');
                let data = yield categories.findOne({ id: id }, { categories: { $elemMatch: { id: subCatId } } });

                resolve(data);
                db.close();
            }).catch((e) => {
                reject(e);
            });
        });
    }
/* Method to get all products by category id
*  @input category id string
*  @output products array
*/
    static getProductsByCategory(category_id) {
        return new Promise((resolve, reject) => {
            co(function*() {
                let data = {};
                let db = yield dbClient.connect(url);
                let products = db.collection('products');
                let productsList = yield products.find({ primary_category_id: category_id }).toArray();

                resolve(productsList);
                db.close();
            }).catch((e) => {
                reject(e);
            });
        });
    }
/* Method to get product data by product id
*  @input product id string
*  @output product data object
*/
    static getProduct(product_id) {
        return new Promise( (resolve, reject) => {
            co(function*() {
                let db = yield dbClient.connect(url);
                let products = db.collection('products');
                let product = yield products.findOne({id: product_id});

                resolve(product);
            }).catch((e) => {
                reject(e);
            });
        });
    }
};


module.exports = ShopModel;
