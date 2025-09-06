import { response } from "../utils/response.js";
import { userDao } from "../dao/index.js";
export const permissionHandler = (roleId = 20) => {
    return (req, res, next) => {
        //再发送请求之前后自动携带id？
        //因为我们采用的是jwt，所以可以直接从req中获取id
        const { id } = req.auth
        if (!id) return res.json(response.fail('missing id'))
        userDao.findOne(id).then(re => {
            const { status, message, result } = re
            if (status) {
                const [{ role_id }] = result
                //允许的角色
                if (role_id && (role_id == roleId)) {
                    next()
                } else {
                    res.json(response.accessDenied())
                }
            } else {
                res.json(response.fail(message))
            }
        })
    }
}

//解析不出id？