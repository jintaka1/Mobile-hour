import express, { request, response } from "express";
import session from "express-session";
// creat an express application and define a port to listen on
const app=express();
const port= 8080;
// develop website port 8080
//exxpress session middleware automatically manages a session cookie
//that is used to give persistenet state between requests, making the
//application (backend) stateful and thus becoming the stteless nature of HTTP.
app.use(session({
    secret:"secret phrase",
    resave:false,
    saveUninitialized:false,
    cookie:{secure:false},

}));

 // enable the ejs view engine
app.set("view engine", "ejs");
// enable support for url-encoded
app.use(express.urlencoded({extended: true}));


//link up the controller files
import productController from "./controllers/product.js";
app.use(productController);

import changelogController from "./controllers/changelog.js";
app.use(changelogController);

import orderController from "./controllers/order.js"
app.use(orderController);

import staffController from "./controllers/staff.js"
app.use(staffController);
import cartController from "./controllers/cart.js"
app.use(cartController);
// redirect requests to root to the products page
app.get("/",(request,response)=>{
    response.status(301).redirect("/product_list")
}); 

app.get("/contactus",( request,response)=>{
    response.status(200).render("contact_us.ejs")
})
// serve static resources
app.use(express.static("static"));


// Start the backend express server
app.listen(port, () => {
    console.log("CLICK ME! http://localhost:" + port);
});