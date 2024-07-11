var myAjax = function (method, url, data) {
    return new Promise((resolve, reject) => {
        var xml = new XMLHttpRequest()
        xml.open(method, url, true)
        xml.send(JSON.stringify(data))
        xml.onreadystatechange = function () {
            if (xml.readyState == 4 && xml.status == 200) {
                
                resolve(JSON.parse(xml.response))
            }
        }
    })
}