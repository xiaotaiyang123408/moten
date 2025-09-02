import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'localhost', //主机地址
    user: 'root',
    password: 'zhu123456',
    port: 3306,
    database: 'moten',
    connectionLimit: 1000, //最大连接数
    queueLimit: 0,    //排队等待连接的最大请求数量, 0 表示不限制
    waitForConnections: true, // 当达到最大连接数时,是否等待可用连接
    charset: 'UTF8MB4_GENERAL_CI',    //字符集
});

// 封装执行函数---使用预处理
export const query = (sql, params) => {
    return new Promise(async (resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err instanceof Error) {
                reject(err);
                return
            }
            connection.execute(sql, params, function (err, results) {
                if (err) {
                    reject(err)
                } else {
                    resolve(results)
                }
                pool.releaseConnection(connection);
            })
        });

    });
}