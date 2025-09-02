import { response } from "../utils/response.js"

//对应404的中间件
export const error404Handler = (req, res, next) => {
    res.json(response.apiNotFound())
}
export const errorHandler = (err, req, res, next) => {
    res.json(response.fail(err.message))
}