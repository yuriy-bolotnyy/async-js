log = console.log;


readyValueToState = {
    1: 'OPENED',
    2: 'HEADER_RECEIVED',
    3: 'LOADING',
    4: 'DONE'
}


const classicRequest = (url) => {
    const request = new XMLHttpRequest();

    request.addEventListener('readystatechange', () => {
        log(`Request ${readyValueToState[request.readyState]}`, request)

        if (request.readyState === 4) {
            if (request.status === 200) {
                log('>>> response Text: ', request.responseText)
            } else {
                log(`Can not fetch the data ... return status ${request.status}`)
            }
        } 
    })

    request.open('GET', url);
    request.send();
}

const classicRequestWithCallback = (url, callback) => {
    const request = new XMLHttpRequest();

    request.addEventListener('readystatechange', () => {
        log(`Request ${readyValueToState[request.readyState]}`, request)

        if (request.readyState === 4) {
            if (request.status === 200) {
                // log('>>> response Text: ', request.responseText)
                log(`>>> Firing callback ...`)
                callback(request.responseText);
            } else {
                // log(`Can not fetch the data ... return status ${request.status}`)
                log(`>>> Firing callback ...`)
                callback(`Can not fetch the data ... return status ${request.status}`)
            }
        } 
    })

    request.open('GET', url);
    request.send();
}


var currentdate = new Date(); 
var datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

const printTime = () => {
    var currentdate = new Date();
    log(`current time: ${currentdate.getHours()}h:${currentdate.getMinutes()}m:${currentdate.getSeconds()}s:${currentdate.getMilliseconds()}`)
}  

const time = () => {
    var currentdate = new Date();
    return `${currentdate.getHours()}h:${currentdate.getMinutes()}m:${currentdate.getSeconds()}s:${currentdate.getMilliseconds()}ms`
} 

const timeIt = (fx) => {
    log(`start time: ${time()}`)
    fx();
    log(`end time: ${time()}`)
}

const fet = () => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(json => log(json))
}


log("hello async JS")

log("1st task")

log("2nd task")

log("async task attached")
printTime()
setTimeout(() => {
    log("Callback function fired")
    printTime()
}, 3000)

log("3rd task")

log("4th task")

timeIt(fet)

const parseRequestResults = (txt) => {
    log('Before pasing: ', txt)
    log('Parsed: ', JSON.parse(txt))
}

// classicRequest('https://jsonplaceholder.typicode.com/todos/')

classicRequestWithCallback('https://jsonplaceholder.typicode.com/todos/', parseRequestResults)