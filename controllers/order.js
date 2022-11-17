import express, { application, request, response } from "express";
import validator from "validator";
import {
  createOrder,
  getOrderWithProductById,
  getAllorderBystatusWithProduct,
  updateOrderStatusById,
} from "../models/order.js";
import { creatChangelog } from "../models/changelog.js";
import { productStockChangeAfterPurchase } from "../models/product.js";
import access_control from "../access_control.js";

const orderController = express.Router();

orderController.post("/create_order", (request, response) => {
  //check if the request has order ddetails in the body
  if (request.body) {
    //access the data in the request body(this is the form data)
    const order_details = request.body;

    // validate each input and send back an error if invalid
    //this if statement will run if the input in invalid
    if (!/^[0-9]{1,}$/.test(order_details.product_id)) {
      response.status(400).render("status.ejs", {
        status: "Invalid product ID",
        message: "Please pick another product",
      });
      return;
    }

    if (!/^[a-zA-Z]{2,}$/.test(order_details.customer_first_name)) {
      response.status(400).render("status.ejs", {
        status: "Invalid first name",
        message: "First name must be letters",
      });
      // important-return early so the end point doesnt run any further
      return;
    }
    if (!/^[a-zA-Z]{2,}$/.test(order_details.customer_last_name)) {
      response.status(400).render("status.ejs", {
        status: "Invalid last name",
        message: "Last name must be letters",
      });
      // important-return early so the end point doesnt run any further
      return;
    }
    if (!/^\s*\S+(?:\s+\S+){2,}$/.test(order_details.customer_address)) {
      response.status(400).render("status.ejs", {
        status: "Invalid Address",
        message: "Address must be a valid format, street number, name and type",
      });
      return;
    }
    if (!/^[+0-9]{10,}$/.test(order_details.customer_phone)) {
      response.status(400).render("status.ejs", {
        status: "Invalid phone number",
        message: "Phone number must be a valid format",
      });
      return;
    }
    if (!/^\S{1,}@\S{1,}[.]\S{1,}$/.test(order_details.customer_email)) {
      // if(!validator.isEmail(order_details.customer_email)){
      response.status(400).render("status.ejs", {
        status: "Invalid email",
        message: "Email must be a valid format",
      });
      return;
    }

    //call the model function to create an order
    // must have the validation
    createOrder(
      validator.escape(order_details.customer_first_name),
      validator.escape(order_details.customer_last_name),
      validator.escape(order_details.customer_address),
      validator.escape(order_details.customer_email),
      validator.escape(order_details.customer_phone),
      order_details.product_id
    ).then(([result]) => {
      //then redirect to the order confirmation page
      response.redirect("/order_confirmation?id=" + result.insertId);
      productStockChangeAfterPurchase(order_details.product_id);
    });
  }

  // then redirect to the order confirmation page
});

orderController.get("/order_confirmation", (request, response) => {
  //access the order ID from the url query string
  let order_id = request.query.id;

  //check that we actually have an order ID
  if (order_id) {
    getOrderWithProductById(order_id).then(([order_with_products]) => {
      if (order_with_products.length > 0) {
        const order_with_product = order_with_products[0];
        //render the order confirmation page with the order/product data
        response.status(200).render("order_confirmation.ejs", {
          //object from view: object from controller
          order_with_product: order_with_product,
        });
      }
    });
  }
});

orderController.get(
  "/order_admin",
  access_control(["manager", "sales"]),
  (request, response) => {
    let order_status = request.query.status;
    if (!order_status) {
      order_status = "pending";
    }

    getAllorderBystatusWithProduct(order_status).then(([orders]) => {
      response.render("order_admin.ejs", {
        orders: orders,
        order_status: order_status,
        access_role: request.session.user.access_role,
      });
    });
  }
);

orderController.post(
  "/order_admin",
  access_control(["manager", "sales"]),
  (request, response) => {
    const edit_details = request.body;
    updateOrderStatusById(edit_details.order_id, edit_details.status).then(
      ([result]) => {
        if (result.affectedRows > 0) {
          response.redirect("/order_admin");
          const change_description =
            "Order ID: " +
            edit_details.order_id +
            " status has been changed to " +
            edit_details.status;
          creatChangelog(change_description, request.session.user.staff_id);
        }
      }
    );
  }
);
export default orderController;
