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
            if (t.length > 1) {
              retval.push({ word: t[0].trim().replace("'","\\'"), literal: t[1].split(' ') });
            } else {
              retval.push({ word: t[0].trim().replace("'","\\'"), literal: [] });
            }
          }
        }
    });

    rd.on('close', function() {
        resolve(retval);
    })

  });
}

function writeWords(filename, words, variable) {
  return new Promise(resolve => {
    let writeStream = fs.createWriteStream(filename);
    writeStream.on('finish', () => {
      resolve();
    });
    writeStream.write( `var ${variable}=[\n` );
    const t = {}
    words.forEach( v => {
      if (t[v.word]) {
        console.log(`dup ${v.word}`);
      }
      t[v.word] = true;
    })
    Object.keys(t).forEach( v => {
      writeStream.write( `\t'${v}',\n` );
    })
    writeStream.write( `]\n` );
    writeStream.end();
  });
}

async function main() {
  const words1 = await readWords(path.join(__dirname, 'e-word-data.txt'), {});
  await writeWords(path.join(__dirname, 'docs' ,'e-word-data.js'), words1, 'wordsData');
  const words2 = await readWords(path.join(__dirname, 'e-word-highschool.txt'), {});
  await writeWords(path.join(__dirname, 'docs' ,'e-word-highschool.js'), words2, 'wordsHighschool');
}

main();
