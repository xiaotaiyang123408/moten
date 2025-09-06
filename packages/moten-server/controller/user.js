import Joi from "joi"
import validate from "../middleware/validate.js"
import { userDao } from "../dao/index.js"
import { response } from "../utils/response.js"
import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../config/index.js"
export class UserController {
    register() {
        const rules = Joi.object({
            username: Joi.string().min(6).max(32).required(),
            password: Joi.string().min(8).max(32).required()
        })
        const handler = async (req, res) => {
            const { username, password } = req.body
            userDao.register(username, password).then(result => {
                if (result.status) {
                    res.json(response.success(result.result))
                } else {
                    res.json(response.fail(result.message))
                }
            })
        }
        return [validate(rules, 'body'), handler]
    }
    login() {
        const rules = Joi.object({
            username: Joi.string().min(6).max(32).required(),
            password: Joi.string().min(8).max(32).required()
        })
        const handler = async (req, res) => {
            const { username, password } = req.body
            userDao.login(username, password).then(re => {
                const { status, message, result } = re
                if (status) {
                    const [result_data] = result
                    if (result_data.disable === 1) return res.json(response.accessDenied())
                    //添加token
                    if (result_data) {
                        const token = jwt.sign({ id: result_data.user_id }, SECRET_KEY, { expiresIn: '24h' })
                        res.json(response.success({ ...result_data, token }))
                    }
                    else res.json(response.authorizeFailed())
                } else {
                    res.json(response.fail(message))
                }
            })
        }
        return [validate(rules, 'body'), handler]
    }
    findAll() {
        const rules = Joi.object({
            page: Joi.number().min(1).optional(),
            size: Joi.number().min(1).optional()
        })
        const handler = async (req, res) => {
            const { page, size } = req.query
            userDao.findAll(page, size).then(re => {
                const { status, message, result } = re
                if (status) {
                    res.json(response.success(result))
                } else {
                    res.json(response.fail(message))
                }
            })
        }
        return [validate(rules), handler]
    }
    disable() {
        const rules = Joi.object({
            id: Joi.string().min(1).max(10).required(),
            disable: Joi.number().min(0).max(1).required()
        })
        const handler = async (req, res) => {
            const { id, disable } = req.body
            userDao.disable(id, disable).then(re => {
                const { status, message, result } = re
                if (status) {
                    res.json(response.success(result))
                } else {
                    res.json(response.fail(message))
                }
            })
        }
        return [validate(rules, 'body'), handler]
    }
}
