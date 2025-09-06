import express from "express";
import cors from "cors";
import 'express-async-errors'
import { pageController, userController, packageController, logController, mediaController } from "./controller/index.js";
import { error404Handler, errorHandler } from "./middleware/error.js";
import { expressjwt } from "express-jwt";
import { SECRET_KEY } from "./config/index.js";
import { authFailedHandler } from "./middleware/auth.js";
import { permissionHandler } from "./middleware/permission.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use(expressjwt({
    secret: SECRET_KEY,
    algorithms: ['HS256']
}).unless({
    path: [
        '/rest/v1/user/login',
        '/rest/v1/user/register'
    ]
}))
//利用unless忽略,这些路径不需要验证

app.listen(3000, () => {
    console.log("Example app listening on port 3000!");
});
//页面---第一步：验证参数，第二步：查询数据
//使用验证库
app.get('/rest/v1/page', pageController.findAll())
app.get('/rest/v1/page/:id', pageController.findOne())
app.post('/rest/v1/page/create', pageController.create())
app.post('/rest/v1/page/delete', pageController.remove())
app.post('/rest/v1/page/update', pageController.update())

app.get('/rest/v1/package', packageController.findAll())
app.get('/rest/v1/package/:id', packageController.findOne())
app.post('/rest/v1/package/create', packageController.create())
app.post('/rest/v1/package/delete', packageController.remove())
app.post('/rest/v1/package/update', [permissionHandler(20)], packageController.update())

app.post('/rest/v1/user/register', userController.register())
app.post('/rest/v1/user/login', userController.login())
app.get('/rest/v1/user', userController.findAll())
app.post('/rest/v1/user/disable', userController.disable())
//日志
app.get('/rest/v1/log', logController.findAll())
//媒体
app.post('/rest/v1/media/upload', mediaController.upload())

app.use(authFailedHandler)
app.use(errorHandler)
app.use('*', error404Handler)