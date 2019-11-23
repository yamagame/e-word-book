var n = 0;
var a = 0;
var f = false;
var tim = 0;

function initApp() {
  goEnglishWord();
}

function goMissWord() {
  var wordContainer = document.getElementById("word-container");
  var missContainer = document.getElementById("miss-container");
  wordContainer.style.display="none";
  missContainer.style.display="flex";
}

function goEnglishWord() {
  var wordContainer = document.getElementById("word-container");
  var missContainer = document.getElementById("miss-container");
  wordContainer.style.display="flex";
  missContainer.style.display="none";
}

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
  var word = document.getElementById("word");
  if (type === 'YES') {
    a ++;
  } else {
    var miss = document.getElementById("miss");
    var node = document.createElement("p");
    var anode = document.createElement("a");
    anode.setAttribute("href", "https://www.google.com/search?q="+encodeURI(word.innerHTML+' 英語翻訳'));
    anode.setAttribute("target", "english-word-book");
    node.appendChild(anode);
    anode.appendChild(document.createTextNode(word.innerHTML));
    miss.appendChild(node);
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
