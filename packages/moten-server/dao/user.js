import dayjs from "dayjs"
import { daoErrorHandler } from "../utils/dao-error.js"
import { query } from "../common/mysql.js"
import { customAlphabet } from "nanoid"
import { md5 } from "../utils/md5.js"
export class UserDAO {
    async register(username, password) {
        const create_time = dayjs().format()
        //const password_md5 = md5(password)
        const password_md5 = password
        const id = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 10)()
        const sql = `INSERT INTO user (user_id,username,password,create_time,disable,role_id) VALUES (?,?,?,?,?,?)`
        const params = [id, username, password_md5, create_time, 0, 10]
        const result = await daoErrorHandler(() => query(sql, params))
        return result
    }
    async login(username, password) {
        //const password_md5 = md5(password)
        const password_md5 = password
        const sql = `SELECT u.user_id,u.username,u.create_time,u.disable,r.role_id FROM user AS u JOIN role AS r ON u.role_id = r.role_id WHERE u.username = ? AND u.password = ? LIMIT 1`
        const params = [username, password_md5]
        const result = await daoErrorHandler(() => query(sql, params))
        return result
    }
    async findAll(page = 1, size = 10) {
        const sql = `SELECT u.user_id,u.username,u.create_time,u.disable,r.role FROM user AS u JOIN role AS r ON u.role_id = r.role_id ORDER BY create_time DESC LIMIT ?, ?`
        const params = [((page - 1) * size).toString(), size.toString()]
        const result = await daoErrorHandler(() => query(sql, params))
        return result
    }
    async findOne(id) {
        const sql = `SELECT u.role_id FROM user AS u WHERE u.user_id = ?  LIMIT 1`
        const params = [id]
        const result = await daoErrorHandler(() => query(sql, params))
        return result
    }
    //disable为1时禁用，为0时启用
    async disable(id, disable = 1) {
        const sql = `UPDATE user SET disable = ? WHERE user_id = ? LIMIT 1`
        const params = [disable, id].map(String)
        const result = await daoErrorHandler(() => query(sql, params))
        return result
    }
}