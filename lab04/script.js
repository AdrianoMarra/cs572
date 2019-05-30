const {Subject} = require('rxjs');
const subject = new Subject();
const http = require("http");
const {fork} = require('child_process');
const url = require('url');


function readFiles({req, res}) {
    const childProcess = fork('childProcess.js');
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    
    childProcess.send(query.url);
    childProcess.on('message', resp => {
        res.write(resp.toString());
    })

    childProcess.on('exit', () => {
        res.end();
    });
};

subject.subscribe(readFiles);

http.createServer((req, res) => {
    
    if (req.url == '/favicon.ico') 
        res.end(); 
    else
        subject.next({ req: req, res: res })

}).listen(4000, () => console.log("Main process listening on 4000 port"));