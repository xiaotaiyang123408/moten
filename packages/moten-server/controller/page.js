import Joi from "joi";
import { response } from "../utils/response.js";
import { pageDao } from "../dao/index.js";
import validate from "../middleware/validate.js";
import { operateLogHandler } from "../middleware/operatelog.js";
//分为两步，第一步：验证参数，第二步：查询数据
export class PageController {
    findAll() {
        const rules = Joi.object({
            page: Joi.number().min(1).optional(),
            size: Joi.number().min(1).optional(),
            id: Joi.number().optional()
        })
        const handler = async (req, res) => {
            pageDao.findAll(req.query.page, req.query.size, req.query.id).then(result => {
                if (result.status) {
                    res.json(response.success(result.result))
                } else {
                    res.json(response.fail(result.message))
                }
            })
        }
        return [validate(rules), handler]
    }
    findOne() {
        const rules = Joi.object({
            id: Joi.number().required()
        })
        const handler = async (req, res) => {
            pageDao.findOne(req.params.id).then(result => {
                if (result.status) {
                    res.json(response.success(result.result))
                } else {
                    res.json(response.fail(result.message))
                }
            })
        }
        return [validate(rules, 'params'), handler]
    }
    create() {
        const rules = Joi.object({
            name: Joi.string().optional(),
            content: Joi.string().optional(),
        })
        const handler = async (req, res) => {
            const { name, content } = req.body
            pageDao.create(name, content).then(result => {
                if (result.status) {
                    res.json(response.success(result.result))
                } else {
                    res.json(response.fail(result.message))
                }
            })
        }
        return [validate(rules, 'body'), handler]
    }
    update() {
        const rules = Joi.object({
            id: Joi.number().required(),
            name: Joi.string().optional(),
            content: Joi.string().optional(),
        })
        const handler = async (req, res, next) => {
            const { id, name, content } = req.body
            pageDao.update(id, name, content).then(result => {
                if (result.status) {
                    res.json(response.success(result.result))
                } else {
                    res.json(response.fail(result.message))
                }
            })
            next()
        }
        return [validate(rules, 'body'), handler, operateLogHandler]
    }
    remove() {
        const rules = Joi.object({
            id: Joi.number().required()
        })
        const handler = async (req, res) => {
            const { id } = req.body
            pageDao.remove(id).then(result => {
                if (result.status) {
                    res.json(response.success(result.result))
                } else {
                    res.json(response.fail(result.message))
                }
            })
        }
        return [validate(rules, 'body'), handler]
    }
}