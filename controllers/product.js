import express from "express";
import {
    createProduct,
    deleteProductById,
    getAllProducts,
    getProductById,
    getProductsBySearch,
    updateProductById,
    getProductWithFeature,
    getALLProductsWithFeature
} from "../models/product.js";
import { creatChangelog } from "../models/changelog.js";
import { updateProductWithfeature,createFeature } from "../models/features.js";
import access_control from "../access_control.js";


const productController = express.Router();


productController.get("/product_list", (request, response) => {
    if (request.query.search_term) {
        getProductsBySearch(request.query.search_term).then(([products]) => {
            response.status(200).render("product_list.ejs", { products: products });
        });
    } else {
        getAllProducts().then(([products]) => {
            response.status(200).render("product_list.ejs", { products: products });
        });
    }
});

productController.get("/product_details", (request, response) => {
    if (request.query.id) {
        getProductWithFeature(request.query.id).then(([product_with_features]) => {
            if (product_with_features.length > 0) {
                let product = product_with_features[0];  
                response.render("product_details.ejs", { product: product });
            }
        });
    }
});

productController.get("/product_checkout", (request, response) => {
    if (request.query.id) {
        getProductById(request.query.id).then(([products]) => {
            if (products.length > 0) {
                let product = products[0];  
                response.render("product_checkout.ejs", { product: product });
            }
        });
    }
});

productController.get(
    "/product_admin",
    access_control(["manager", "stock","sales"]),
    (request, response) => {
        getAllProducts().then(([products]) => {
            response.status(200).render("product_admin.ejs", { products: products,
                access_role: request.session.user.access_role, });
        });    
    }
);

productController.get("/product_edit", 
access_control(["manager", "stock","sales"]),
(request, response) => {
    const edit_id = request.query.edit_id;
    if (edit_id){
        getProductWithFeature(edit_id).then(([edit_products]) => {
            if (edit_products.length > 0) {
                let edit_product = edit_products[0];  
                response.render("product_edit.ejs", { edit_product: edit_product,
                    access_role: request.session.user.access_role,});
            }
        });
    }else{
        getALLProductsWithFeature().then(([products]) => {
            response.render("product_edit.ejs",{
                access_role: request.session.user.access_role,
                products:products,
                edit_product:{
                    product_id:0,
                product_name:"",
                product_model: "",
                product_manufacturer:"",
                product_price:0,
                product_stock:0,
                feature_id:0,
                    feature_weight_g:0,
                    feature_height_mm:0,
                    feature_width_mm:0,
                    feature_depth_mm:0,
                    feature_operating_system:"",
                    feature_screen_size:"",
                    feature_screen_resolution:"",
                    feature_cpu:"",
                    feature_ram:"",
                    feature_storage:"",
                    feature_battery:"",
                    feature_rear_camera:"",
                    feature_front_camera:""
                }

            })
            
        })
    }
});
productController.post(
    "/edit_product",
    access_control(["manager", "stock","sales"]),
    (request, response) => {
        const edit_details = request.body;

        if (edit_details.action == "create") {
            createFeature(
                    edit_details.feature_weight_g,
                    edit_details.feature_height_mm,
                    edit_details.feature_width_mm,
                    edit_details.feature_depth_mm,
                    edit_details.feature_operating_system,
                    edit_details.feature_screen_size,
                    edit_details.feature_screen_resolution,
                    edit_details.feature_cpu,
                    edit_details.feature_ram,
                    edit_details.feature_storage,
                    edit_details.feature_battery,
                    edit_details.feature_rear_camera,
                    edit_details.feature_front_camera
            ).then(([result])=>{
                const product_feature_id= result.insertId;

                createProduct(
                    edit_details.product_name,
                    edit_details.product_model,
                    edit_details.product_manufacturer,
                    edit_details.product_price,
                    edit_details.product_stock,
                    product_feature_id
                ).then(([result]) => {
                    response.redirect("/product_admin");
                    const change_description = "Product: " + edit_details.product_name +" has been created";
                    creatChangelog(change_description,
                        request.session.user.staff_id,
                        )
                });

            })
            
        } else if (edit_details.action == "update") {
            updateProductById(
                edit_details.product_id,
                edit_details.product_name,
                edit_details.product_model,
                edit_details.product_manufacturer,
                edit_details.product_price,
                edit_details.product_stock,
            ).then(([result]) => {
                updateProductWithfeature(
                    edit_details.feature_id,
                    edit_details.feature_weight_g,
                    edit_details.feature_height_mm,
                    edit_details.feature_width_mm,
                    edit_details.feature_depth_mm,
                    edit_details.feature_operating_system,
                    edit_details.feature_screen_size,
                    edit_details.feature_screen_resolution,
                    edit_details.feature_cpu,
                    edit_details.feature_ram,
                    edit_details.feature_storage,
                    edit_details.feature_battery,
                    edit_details.feature_rear_camera,
                    edit_details.feature_front_camera
                ).then(([result])=>{
                    response.redirect("/product_edit?edit_id="+ edit_details.product_id);
                    const change_description= "Product: " +edit_details.product_name + " has been updated"
                    creatChangelog(change_description,
                                   request.session.user.staff_id,
                                   edit_details.product_id)});
                
            });
        } else if (edit_details.action == "delete") {
            deleteProductById(edit_details.product_id).then(([result]) => {
                response.redirect("/product_admin");
                const change_description = "Prodcut: "+ edit_details.product_name+" has been deleted";
                creatChangelog(change_description,
                                request.session.user.staff_id,
                                edit_details.product_id)
            });
        }
    }
);

export default productController;