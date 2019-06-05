//Answer question 01:

/**
 * Using Promise(): 
 * */

const dns = require("dns");
const getIpFromDomain = function name(domain) {
    return new Promise(function(resolve, reject) {
        dns.resolve4(domain, (error, addresses) => { 
            if (error) {
                reject(error);
            } else {
                resolve(addresses);
            }
        });
    });
}

async function convertDomain() {
    try {
        const result = await getIpFromDomain("www.mum.edu").then((e) => console.log(e));
    } catch (error) {
        console.log(error);
    }
}
convertDomain();

/**
 * Using util.promisify(): 
 * */
const util = require("util");

const promise = util.promisify(dns.resolve4);

async function myResolve (params) {
    try {
        const result = await promise("www.mum.edu");
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}
myResolve();

//Answer question 02:
const EventEmitter = require('events');

class Gym extends EventEmitter {
    constructor() {
        super();
        this.counter = 0;
    }
}

    const gym = new Gym();
    gym.on("boom", (count) => {
        console.log("Athlete is working out " + count);
        if(count == 5)
            stop();
    });

    const myInterval =  setInterval(() => {
        gym.counter++;
        gym.emit("boom", gym.counter);
    }, 1000);

    const stop = function () {
        clearInterval(myInterval);
    }

//Answer question 03:
const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer(function(req, res) {
    res.writeHead(200, {'Content-type': 'text/plain'});
    readStream();
    readFileSync();
    readFile();
}).listen(4000, () => console.log('Web server is listening on 4000'));

const readFileSync = function () {
    var startFileSync = new Date();
    let resp = fs.readFileSync(path.join(__dirname, 'big.file'), 'utf8');
    var endFileSync = new Date() - startFileSync;
    console.log(`Execution time for readFileSync: ${endFileSync} ms`);
    return resp;
}

const readFile = function (res) {
    var startFileSync = new Date();
    return fs.readFile(path.join(__dirname, 'big.file'), 'utf8', (err, data) => { 
        var endFileSync = new Date() - startFileSync;
        console.log(`Execution time for readFile: ${endFileSync} ms`);
     });
}

const readStream = function () {
    var startFileSync = new Date();
    let readable = fs.createReadStream(path.join(__dirname, 'big.file'), {encoding: 'utf8', highWaterMark: 16 * 1024});
    readable.on('data', function(chunk) {
        // console.log('chunck')
    })
    var endFileSync = new Date() - startFileSync;
    console.log(`Execution time for readStream: ${endFileSync} ms`);

    return readable;
}

/**
 * The average results for the time processing of these 
 * different read file methods are:
 * 
 * Execution time for readStream: 6 ms
 * Execution time for readFileSync: 642 ms
 * Execution time for readFile: 2713 ms
 */