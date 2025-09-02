import express from "express";
import cors from "cors";
import 'express-async-errors'
import { pageController, userController } from "./controller/index.js";
import { error404Handler, errorHandler } from "./middleware/error.js";
import { expressjwt } from "express-jwt";
import { SECRET_KEY } from "./config/index.js";
import { authFailedHandler } from "./middleware/auth.js";
const app = express();
app.use(express.json());
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

app.listen(8081, () => {
    console.log("Example app listening on port 8081!");
});
//页面---第一步：验证参数，第二步：查询数据
//使用验证库
app.get('/rest/v1/page', pageController.findAll())
app.get('/rest/v1/page/:id', pageController.findOne())
app.post('/rest/v1/page/create', pageController.create())
app.post('/rest/v1/page/delete', pageController.remove())
app.post('/rest/v1/page/update', pageController.update())

app.post('/rest/v1/user/register', userController.register())
app.post('/rest/v1/user/login', userController.login())
app.get('/rest/v1/user', userController.findAll())
app.post('/rest/v1/user/disable', userController.disable())

app.use(authFailedHandler)
app.use(errorHandler)
app.use('*', error404Handler)