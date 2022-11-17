import { db_conn } from "../database.js";
//create
export function createFeature(
    feature_weight_g,
    feature_height_mm,
    feature_width_mm,
    feature_depth_mm,
    feature_operating_system,
    feature_screen_size,
    feature_screen_resolution,
    feature_cpu,
    feature_ram,
    feature_storage,
    feature_battery,
    feature_rear_camera,
    feature_front_camera   
){
    return db_conn.query(
        `INSERT INTO features
        (feature_weight_g,
            feature_height_mm,
            feature_width_mm,
            feature_depth_mm,
            feature_operating_system,
            feature_screen_size,
            feature_screen_resolution,
            feature_cpu,
            feature_ram,
            feature_storage,
            feature_battery,
            feature_rear_camera,
            feature_front_camera
        ) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [feature_weight_g,
            feature_height_mm,
            feature_width_mm,
            feature_depth_mm,
            feature_operating_system,
            feature_screen_size,
            feature_screen_resolution,
            feature_cpu,
            feature_ram,
            feature_storage,
            feature_battery,
            feature_rear_camera,
            feature_front_camera]
    )
}

//update
export function updateProductWithfeature(
    feature_id,
    feature_weight_g,
    feature_height_mm,
    feature_width_mm,
    feature_depth_mm,
    feature_operating_system,
    feature_screen_size,
    feature_screen_resolution,
    feature_cpu,
    feature_ram,
    feature_storage,
    feature_battery,
    feature_rear_camera,
    feature_front_camera
){
    return db_conn.query(
        `UPDATE features
        SET feature_weight_g = ?,
        feature_height_mm = ?,
        feature_width_mm = ?,
        feature_depth_mm = ?,
        feature_operating_system = ?,
        feature_screen_size = ?,
        feature_screen_resolution=?,
        feature_cpu = ?,
        feature_ram = ?,
        feature_storage = ?,
        feature_battery = ?,
        feature_rear_camera = ?,
        feature_front_camera = ?
        WHERE feature_id = ?`,
        [
            feature_weight_g,
            feature_height_mm,
            feature_width_mm,
            feature_depth_mm,
            feature_operating_system,
            feature_screen_size,
            feature_screen_resolution,
            feature_cpu,
            feature_ram,
            feature_storage,
            feature_battery,
            feature_rear_camera,
            feature_front_camera,
            feature_id]
    )
}