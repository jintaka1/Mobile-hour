import { db_conn } from "../database.js";

//create

export function createOrder (
    first_name,
    last_name,
    address,
    email,
    phone,
    order_product_id    
){
    return db_conn.query(
        `
            INSERT INTO orders (order_date, order_status, order_customer_first_name, order_customer_last_name,
                order_customer_address, order_customer_email, order_customer_phone,order_product_id)
                VALUES(NOW(), 'pending', ?, ?, ?, ?, ? ,?)`,
                [ first_name,
                    last_name,
                    address,
                    email,
                    phone,
                    order_product_id  ]

    )
}

// read

export function getAllOrders(){
    return db_conn.query(
        ` SELECT * FROM orders`
    );
}

export function getAllorderBystatusWithProduct(status){
    return db_conn.query(
        `SELECT * FROM orders
        INNER
        JOIN product
        ON orders.order_product_id = product.product_id
        WHERE order_status = ?`,[status]
    )
}
export function getOrderById(order_id){
    return db_conn.query(`SELECT * FROM orders 
                        WHERE order_id = ?`[order_id])
}

export function getOrderWithProductById(order_id){
    return db_conn.query(
        `SELECT * FROM orders
        INNER
        JOIN product
        ON orders.order_product_id = product.product_id
        WHERE order_id = ?`,[order_id]
    )
}

//update

export function updateOrderStatusById(order_id, status) {
    return db_conn.query(
        `UPDATE orders
        SET order_status = ?
        WHERE order_id = ?`,
        [status,order_id]
    )
}