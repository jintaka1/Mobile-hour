import  express, { request, response }  from 'express';
import { getProductById } from '../models/product.js';
const cartController = express.Router;

const Cart = require('../models/cart.js');
const Product = require('../models/product.js');
//cart page
cartController.get("/cart", (request,response)=>{
    if(!req.session.cart) {
        return res.render('/cart', {products: null});
    }
    const cart = new Cart(req.session.cart);
    return res.render('shop/cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
})

cartController.get('/cart/add-to-cart/:id', function (req, res) {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function (err, product) {
        if(err) {
            return res.redirect('/');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/');
    })
});

router.get('/cart/reduce/:id', function (req, res, next) {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/cart');
});

router.get('/cart/remove/:id', function (req, res, next) {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/cart');
});

router.get('/cart', function (req, res, next) {
    
});

module.exports = router;