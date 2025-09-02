import dayjs from 'dayjs'
import { query } from "../common/mysql.js"
import { daoErrorHandler } from "../utils/dao-error.js"
export class PageDAO {
    async findAll(page = 1, size = 10, id) {
        const sql = id
            ? `SELECT * FROM page WHERE page_id < ? ORDER BY page_id DESC LIMIT ?`
            : `SELECT * FROM page ORDER BY page_id DESC LIMIT ?, ?`
        //limit排除前(page-1)*size个, 返回size个
        const params = id ? [id.toString(), size.toString()] : [((page - 1) * size).toString(), size.toString()]
        const result = await daoErrorHandler(() => query(sql, params))
        return result
    }
    async findOne(id) {
        const sql = `SELECT * FROM page WHERE page_id = ?`
        const params = [id.toString()]
        const result = await daoErrorHandler(() => query(sql, params))
        return result
    }
    async create(name, content) {
        const create_time = dayjs().format()
        const update_time = dayjs().format()
        const sql = `INSERT INTO page (name,content,create_time,update_time) VALUES (?,?,?,?)`
        const params = [name, content, create_time, update_time]
        const result = await daoErrorHandler(() => query(sql, params))
        return result
    }
    async update(id, name, content) {
        const update_time = dayjs().format()
        const sql = `UPDATE page SET name = ?,content = ?,update_time = ? WHERE page_id = ? LIMIT 1`
        const params = [name, content, update_time, id]
        const result = await daoErrorHandler(() => query(sql, params))
        return result
    }
    async remove(id) {
        const sql = `DELETE FROM page WHERE page_id = ? LIMIT 1`
        const params = [id]
        const result = await daoErrorHandler(() => query(sql, params))
        return result
    }
}