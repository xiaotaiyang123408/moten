import { log } from 'zx'
import { response } from '../utils/response.js'
//判断url参数是否合法
export default (rules, key = 'query') => {
    return (req, res, next) => {
        const { error } = rules.validate(req[key])
        if (error) {
            const err = error.details[0].message
            return res.json(response.validateFailed(err))
        }
        next()
    }
}