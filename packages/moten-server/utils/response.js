const SUCCESS = { code: 200, message: 'success' }
const FAILED = { code: 500, message: 'fail' }
const VALIDATE_FAILED = { code: 400, message: 'validate failed' }
const API_NOT_FOUND = { code: 404, message: 'api not found' }
const AUTHORIZE_FAILED = { code: 401, message: 'authorize failed' }
const ACCED_DENIED = { code: 403, message: 'acced denied' }
class Response {
    /**
     * 返回code
     */
    code
    /**
     * 返回信息
     */
    message
    /**
     * 返回数据
     */
    data
    /**
     * 
     * @param {number} code 返回code
     * @param {string} message  返回信息
     * @param {any} data  返回数据
     */
    constructor(code, message, data) {
        this.code = code
        this.message = message || ''
        this.data = data || null
    }
    /**
     * 返回成功
     */
    static success(data) {
        return new Response(SUCCESS.code, SUCCESS.message, data)
    }
    /**
     * 返回失败
     */
    static fail(message = '') {
        return new Response(FAILED.code, FAILED.message + message)
    }
    /**
     * 参数校验失败
     */
    static validateFailed(keys) {
        return new Response(
            VALIDATE_FAILED.code,
            VALIDATE_FAILED.message + `${keys ? ':' + keys : ''}`
        )
    }
    /**
     * 权限验证失败
     */
    static authorizeFailed() {
        return new Response(
            AUTHORIZE_FAILED.code,
            AUTHORIZE_FAILED.message
        )
    }
    /**
     * 禁止用户，访问不被允许
     */
    static accessDenied() {
        return new Response(
            ACCED_DENIED.code,
            ACCED_DENIED.message
        )
    }
    /**
     * 接口不存在
     */
    static apiNotFound() {
        return new Response(API_NOT_FOUND.code, API_NOT_FOUND.message)
    }
}

export const response = Response