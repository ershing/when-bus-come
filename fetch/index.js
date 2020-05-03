const qs = require('qs')
const apis = require('./apis')
const fetch = require('node-fetch')

module.exports = (apiName, data) => {
    const api = apis[apiName]
    if (!api) {
        throw new Error(`there is no api name called ${apiName}`)
    }
    return new Promise((resolve, reject) => {
        let { url, method, resBodyType } = api
        let bodyBase = { ...api }
        delete bodyBase.url
        if (method === 'GET') {
            url += '?' + qs.stringify(data)
        } else {
            bodyBase.body = JSON.stringify(data)
        }
        fetch(url, bodyBase).then(res => res[resBodyType]())
            .then(body => resolve(resBodyType === 'text' ? JSON.parse(body) : body))
    })
}