const fs = require('fs');
const path = require('path');
const tableaux = require('tableaux');


const write = tableaux(
    {name: 'Name', size: 20},
    {name: 'Created', size: 30},
    {name: 'DeviceId', size: 10},
    {name: 'Mode', size: 8},
    {name: 'Links', size: 4},
    {name: 'Size', size: 6},
);

function print(dir) {
    fs.readdirSync(dir)
        .map(file => {
                // console.debug(file);
                // console.debug(dir);
                return {
                    file, dir
                }
            }
        )
        .map(toMeta)
        .forEach(output);
    write.newline();
}


function toMeta({file, dir}) {
    // console.log(file);
    // console.log(dir);
    const stats = fs.statSync(path.join(dir, file));
    let {birthtime, ino, mode, nlink, size} = stats;
    birthtime = birthtime.toUTCString();
    mode = mode.toString(8);
    size += 'B';
    let result = {
        file,
        dir,
        info: [birthtime, ino, mode, nlink, size],
        isDir: stats.isDirectory()
    };
    // console.log(result);

    return result;
}

function output({file, dir, info, isDir}) {
    // console.log(`file: ${file}`);
    // console.log(`dir: ${dir}`);
    // console.log(`write: ${write}`);
    // console.log(`info: ${info}`);
    write(file, ...info);
    if (!isDir) {
        return;
    }

    const p = path.join(dir, file); // ファイルは実際にはディレクトリ名
    // console.log(`p:${p}`);

    write.arrow();
    fs.readdirSync(p).forEach(f => {
        // console.log(`f:${f}`);
        let dirPath = path.join(p, f);
        // console.log(`dirPath:${dirPath}`);
        const stats = fs.statSync(dirPath);
        const style = stats.isDirectory() ? 'bold' : 'dim';
        write[style](f); // boldまたはdimの関数を呼ぶ
    });
    write.newline();
}


/**
 * ファイルが存在する、しないをresolveのexistsプロパティがtrue、falseで表す。
 * ファイルが存在するがアクセス出来ない場合、rejectが実行される。
 * @param file
 * @returns {Promise}
 */
function exists(file) {
    return new Promise((resolve, reject) => {
        fs.access(file, (err) => {
            if (err) {
                // 存在するが、アクセス不可能な状態
                if (err.code !== 'ENOENT') {
                    return reject(err)
                }

                // ファイルが存在しない状態
                return resolve({file, exists: false});
            }
            return resolve({file, exists: true});
        })
    });
}

const filePath = process.argv[2];

exists(filePath).then(({file, exists}) => {
    if (exists) {
        print(filePath);
    } else {
        console.error(`ファイルが存在しません。: ${file}`)
    }
}).catch(console.error);

