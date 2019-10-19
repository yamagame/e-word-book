var n = 0;
var a = 0;
var f = false;
var tim = 0;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function setWord(w) {
  var word = document.getElementById("word");
  word.innerHTML = w;
  word.setAttribute("href", "https://www.google.com/search?q="+encodeURI(word.innerHTML+' 英語翻訳'));
  var count = document.getElementById("count");
  count.innerHTML = a+'/'+n;
}

function goNextWord(type) {
  if (type === 'YES') {
    a ++;
  }
  const w = words[n];
  n ++;
  if (n >= words.length) n = 0;
  setWord(w);
  if (!f) {
    setInterval(() => {
      tim ++;
      var time = document.getElementById("time");
      if (tim >= 60*60) {
        time.innerHTML = ('00'+parseInt((tim/(60*60)) % 60)).slice(-2)+':'+('00'+parseInt((tim/60) % 60)).slice(-2)+':'+('00'+(tim % 60)).slice(-2);
      } else {
        time.innerHTML = ('00'+parseInt((tim/60) % 60)).slice(-2)+':'+('00'+(tim % 60)).slice(-2);
      }
    }, 1000);
    f = true;
  }
}

for (var i=0;i<words.length*3;i++) {
  const a = getRandomInt(words.length);
  const b = getRandomInt(words.length);
  const c = words[a];
  words[a] = words[b];
  words[b] = c;
}
