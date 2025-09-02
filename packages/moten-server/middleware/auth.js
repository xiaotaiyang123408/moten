import { response } from "../utils/response.js";
export const authFailedHandler = (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.json(response.authorizeFailed())
    }
    next()
}