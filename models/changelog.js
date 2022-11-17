import { db_conn } from "../database.js";
//creat
export function creatChangelog(
    
    changelog_change_description,
    changelog_staff_id,
){
    return db_conn.query(
        `INSERT INTO changelog
        (changelog_change_date,
            changelog_change_description,
            changelog_staff_id)
            VALUES(NOW(),?,?)`,
            [
                changelog_change_description,
                changelog_staff_id,
                ]
    )
}
//read
export function getAllChangelogwithstaffs(){
    return db_conn.query(
        `SELECT * FROM changelog
        INNER JOIN staff
        ON staff.staff_id = changelog.changelog_staff_id
        `
    )
}

export function getChangelogBySearch(search_term){
    return db_conn.query(
        `SELECT * FROM changelog
        INNER JOIN staff
        ON staff.staff_id = changelog.changelog_staff_id
        WHERE staff.staff_username LIKE ? OR changelog_change_description LIKE ?
        OR changelog_change_date LIKE ?
        `,
        [`%${search_term}%`, `%${search_term}%`,`%${search_term}%`]
    )
}