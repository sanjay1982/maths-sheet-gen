const express = require('express')
const app = express()
const port = 3000
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
app.get('/', (req, res) => {
    let a = [];
    for(let i = 1; i <= 10; i++){
        for(let j = 1; j <= 10; j++){
            a.push(`<div>${i} x ${j} = ___</div>`);
        }
    }
    a=shuffle(a);
    const csss=`
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
      
      #grid > div {
        background-color: lime;
      }
      </style>
      </head>
      <body>
      <div id="grid">${a.join(" ")}</div>
      </body>
      </html>
    `;
  res.send(csss);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})