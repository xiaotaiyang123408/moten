import dayjs from 'dayjs'
import { query } from "../common/mysql.js"
import { daoErrorHandler } from "../utils/dao-error.js"
export class LogDAO {
    async create(user_id, url, url_unique, body) {
        const create_time = dayjs().format()
        const sql = `INSERT INTO log (user_id,url,url_unique,body,create_time) VALUES (?,?,?,?,?)`
        const params = [user_id, url, url_unique, body, create_time]
        const result = await daoErrorHandler(() => query(sql, params))
        return result
    }
    async findAll(page = 1, size = 10, url, url_unique) {
        const sql = `SELECT * FROM log WHERE url = ? AND url_unique = ? ORDER BY log_id DESC LIMIT ?, ?`
        //limit排除前(page-1)*size个, 返回size个
        const params = [url, url_unique, ((page - 1) * size).toString(), size.toString()]
        const result = await daoErrorHandler(() => query(sql, params))
        return result
    }
}