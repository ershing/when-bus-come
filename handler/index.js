const fetch = require('../fetch')

module.exports = async busStation => {
    const { retCode, retData } = await fetch('getBusStationId', { name: busStation, requesttime: Math.floor(+new Date() / 1000) })
    if (retCode !== 0) {
        return Promise.reject('服务器异常，请稍后重试')
    }
    const { bus: { station } } = retData
    if (!station.length) {
        return Promise.reject(`查询不到公交站：${busStation}`)
    }
    const busStationId = station[0].i

    let [busAbout, busTime] = await Promise.all([
        fetch('getBusAbout', { stationNameId: busStationId }),
        fetch('getBusTime', { stationNameId: busStationId }),
    ])

    if (busAbout.retCode !== 0 || busTime.retCode !== 0) {
        return Promise.reject('服务器异常，请稍后重试')
    }

    let idTime = {}
    busTime.retData.forEach(ele => {
        idTime[ele.i] = ele.time
    })

    let direcBus = {}
    busAbout.retData.l.forEach(ele => {
        const { dn, rn, rsi } = ele
        let terminal = dn.split('-').pop()
        let ter = direcBus[terminal]

        let itemTime = idTime[rsi]
        if (~itemTime) {
            let addItem = {
                busId: rsi,
                name: rn,
                time: itemTime
            }
            if (ter) {
                ter.push(addItem)
            } else {
                direcBus[terminal] = [addItem]
            }
        }
    })

    let resText = `公交车站：${busStation}\n`
    Object.keys(direcBus).forEach(direct => {
        let busLine = direcBus[direct]
        busLine.sort((pre, next) => pre.time - next.time)
        resText += `\n开往：${direct}\n`
        busLine.forEach(el => {
            resText += `${el.time}分钟后->${el.name}\n`
        })
    })

    return resText
}