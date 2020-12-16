const express = require('express')
const app = express()
const port = 3000
const max=108
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
function multiply(){
  let a = [];
  for(let i = 1; i <= 10; i++){
      for(let j = 1; j <= 10; j++){
          a.push(`<div>${i} x ${j} = ___</div>`);
      }
  }
  a=shuffle(a);
  return a;
}
function add(){
  let a = [];
  for(let i = 1; i <= 100; i++){
      for(let j = 1; j <= 100; j++){
          a.push(`<div>${i} + ${j} = ___</div>`);
      }
  }
  a=shuffle(a);
  return a.slice(0, max);
}
function sub(){
  let a = [];
  for(let i = 1; i <= 100; i++){
      for(let j = 1; j < i; j++){
          a.push(`<div>${i} - ${j} = ___</div>`);
      }
  }
  a=shuffle(a);
  return a.slice(0, max);
}

function misc(){
  const a = [];
  return shuffle(a.concat(add()).concat(sub()).concat(multiply())).slice(0, max);
}
function render(fn){
  
  return `
  <html>
  <head>
  <style>
  #grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-auto-rows: auto;
      gap: 20px;
      grid-auto-flow: dense;
      font-size:xx-large;
    } 
    
    </style>
    </head>
    <body>
    <div id="grid">${fn().join("\n")}</div>
    </body>
    </html>
  `;
}
app.get('/:func', (req, res) => {
  const obj = {mul:multiply, add:add, sub:sub, misc:misc};
  res.send(render(obj[req.params.func]));
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})