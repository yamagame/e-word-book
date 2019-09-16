var n = 0;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function goNextWord() {
  var word = document.getElementById("word");
  word.innerHTML = words[n];
  word.setAttribute("href", "https://www.google.com/search?q="+encodeURI(word.innerHTML+' 意味'));
  // word.setAttribute("href", "https://www.google.com/search?q="+encodeURI('define:'+word.innerHTML));
  n ++;
  if (n >= word.length) n = 0;
}

for (var i=0;i<words.length;i++) {
  const a = getRandomInt(i);
  const b = getRandomInt(i);
  const c = words[a];
  words[a] = words[b];
  words[b] = c;
}
