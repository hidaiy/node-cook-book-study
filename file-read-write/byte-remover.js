// setInterval(()=> process.stdout.write('.'), 10).unref();
setInterval(() => console.log('.'), 10).unref();

const fs = require('fs');
const path = require('path');
const cwd = process.cwd();
const sbs = require('strip-bytes-stream');


fs.createReadStream(path.join(cwd, 'file.dat'))
    .pipe(sbs((n) => n))
    .on('end', function () { log(this.total) })
    .pipe(fs.createWriteStream(path.join(cwd, 'clean.dat'))
    );

function log(total) {
    let message = `${new Date()} ${total} bytes removed.`;
    fs.appendFile(path.join(cwd, 'log.txt'), message, (err) => {
        if (err) return process.exit(1);
    });
}

