import Joi from "joi";
import { response } from "../utils/response.js";
import { logDao } from "../dao/index.js";
import validate from "../middleware/validate.js";
//分为两步，第一步：验证参数，第二步：查询数据
export class LogController {
    findAll() {
        const rules = Joi.object({
            url: Joi.string().required(),
            url_unique: Joi.string().optional(),
            page: Joi.number().min(1).optional(),
            size: Joi.number().min(1).optional()
        })
        const handler = async (req, res) => {
            logDao.findAll(req.query.page, req.query.size, req.query.url, req.query.url_unique).then(result => {
                if (result.status) {
                    res.json(response.success(result.result))
                } else {
                    res.json(response.fail(result.message))
                }
            })
        }
        return [validate(rules), handler]
    }
}