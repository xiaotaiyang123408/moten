import { logDao } from "../dao/index.js"
export const operateLogHandler = async (req, res, next) => {
    const obj = {
        user_id: req.auth.id,
        url: req.route.path,
        url_unique: req.body.id,
        body: JSON.stringify(req.body)
    }
    await logDao.create(obj.user_id, obj.url, obj.url_unique, obj.body)
}