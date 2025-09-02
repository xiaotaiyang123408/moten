import CryptoJS from 'crypto-js'
export const md5 = (str) => {
    if (!str) return ''
    return CryptoJS.MD5(str).toString(CryptoJS.enc.Hex)
}