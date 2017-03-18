'use strict';


const express = require('express');
const cookieparser = require('cookie-parser');
const app = express();
app.use(express.static('public'))
app.use(cookieparser());

function randomCookieValue(){
  let cookievalues = ['a','b'];
  console.log(cookievalues[Math.floor(Math.random() * 2)])
  return cookievalues[Math.floor(Math.random() * 2)]
}


app.get('/', (req, res) => {
  if (!('a-b-test' in req.cookies)) {
  
    res.sendFile(__dirname + '/views/index.html');
    res.cookie('a-b-test', randomCookieValue());
  }  else {
   res.sendFile(__dirname + '/views/index.html') 
  }      
})

// listen for requests :)
app.listen(process.env.PORT || 8080, () => console.log(
  `Your app is listening on port ${process.env.PORT || 8080 }`));
