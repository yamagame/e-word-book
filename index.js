const fs = require('fs');
const path = require('path');
const readline = require('readline');

function readWords(filename, easywords) {
  return new Promise(resolve => {

    const retval = [];

    var rd = readline.createInterface({
        input: fs.createReadStream(filename),
        output: null,
        console: false
    });

    rd.on('line', function(line) {
        if (line.trim().indexOf('-') !== 0) {
          const t = line.trim().split('|');
          if (!easywords[t[0]]) {
            retval.push({ word: t[0], literal: t[1].split(' ') });
          }
        }
    });

    rd.on('close', function() {
        resolve(retval);
    })

  });
}

function writeWords(filename, words) {
  return new Promise(resolve => {
    let writeStream = fs.createWriteStream(filename);
    writeStream.on('finish', () => {
      resolve();
    });
    writeStream.write( `var words=[\n` );
    words.forEach( v => {
      writeStream.write( `\t'${v.word}',\n` );
    })
    writeStream.write( `]\n` );
    writeStream.end();
  });
}

async function main() {
  const words = await readWords(path.join(__dirname, 'e-word-data.txt'), {});
  await writeWords(path.join(__dirname, 'docs' ,'e-word-data.js'), words);
}

main();
