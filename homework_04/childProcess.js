const fs = require('fs');
const path = require('path');

process.on('message', (filePath) => {
    let readable = fs.createReadStream(path.join(__dirname, filePath), { encoding: 'utf8', highWaterMark: 16 * 1024 });
    readable.on('data', function (chunk) {
        process.send(chunk);
    })

    readable.on('end', (data) => {
        process.exit(0);
    });
});
