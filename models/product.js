import { db_conn } from "../database.js";

// creat
export function createProduct(
  name,
  model,
  manufacturer,
  price,
  stock,
  feature_id
) {
  return db_conn.query(
    `
        INSERT INTO product
        (product_name, product_model, product_manufacturer, product_price, product_stock, product_feature_id,product_picture,product_exist)
        VALUES(?, ?, ?, ?, ?, ?,'default-phone-pic',1)
        `,
    [name, model, manufacturer, price, stock, feature_id]
  );
}

// read

export function getAllProducts() {
  return db_conn.query(
    `
        SELECT * FROM product
        WHERE product_exist = 1
        `
  );
}

export function getProductById(product_id) {
  return db_conn.query(
    `SELECT * FROM product 
        WHERE product_id = ?`,
    [product_id]
  );
}

export function getProductsBySearch(search_term) {
  return db_conn.query(
    ` SELECT * FROM product
        WHERE product_name LIKE ? OR product_model LIKE ? OR product_manufacturer LIKE ?`,
    [`%${search_term}%`, `%${search_term}%`, `%${search_term}%`]
  );
}

export function getProductWithFeature(product_id) {
  return db_conn.query(
    ` SELECT * FROM product
        INNER JOIN features
        ON features.feature_id = product.product_feature_id
        WHERE product_id = ?`,
    [product_id]
  );
}
export function getProductWithChangelog() {
  return db_conn.query(
    `SELECT* FROM product
        INNER JOIN changelog
        ON changelog_product_id = product.product_id`
  );
}
export function getALLProductsWithFeature() {
  return db_conn.query(
    ` SELECT * FROM product
        INNER JOIN features
        ON features.feature_id = product.product_feature_id`
  );
}

//update

export function updateProductById(
  product_id,
  name,
  model,
  manufacturer,
  price,
  stock
) {
  return db_conn.query(
    `
    UPDATE product
    SET product_name = ?, product_model = ?, product_manufacturer = ?, product_price = ?, product_stock = ?
    WHERE product_id = ?
    `,
    [name, model, manufacturer, price, stock, product_id]
  );
}

export function productStockChangeAfterPurchase(product_id) {
  return db_conn.query(
    `
    UPDATE product
    SET product_stock= product_stock-1
    WHERE product_id =?
    `,
    [product_id]
  );
}

//delete

export function deleteProductById(product_id) {
  return db_conn.query(
    `UPDATE product
    SET product_exist = 0
    WHERE product_id = ?`,
    [product_id]
  );
}
