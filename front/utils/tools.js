// 下载npm i moment -S
const moment = require('moment')
export const filterHtml = (val) => {
    return val.replace(/<.>/g, '')
}
export const setFormat = (val) => {
    return moment(val * 1000).format('yyyy-MM-DD HH:mm:ss')
}