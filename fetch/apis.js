const apis = {
    getBusStationId: {
        url: 'https://rycxapi.ruyuechuxing.com/xxt-min-api/wxxt-api/system/search/getByName',
        method: 'POST',
        resBodyType: 'text',
        headers: { 'Content-Type': 'application/json' }
    },
    getBusAbout: {
        url: 'https://rycxapi.ruyuechuxing.com/xxt-min-api/bus2/routeStation/getByStation.do',
        resBodyType: 'text'
    },
    getBusTime: {
        url: 'https://rycxapi.ruyuechuxing.com/xxt-min-api/bus2/runbus/getByStation',
        resBodyType: 'text'
    }
}

for (let apiName in apis) {
    if (!apis[apiName].method) {
        apis[apiName].method = 'GET'
    }
    if (!apis[apiName].resBodyType) {
        apis[apiName].resBodyType = 'json'
    }
}

module.exports = apis