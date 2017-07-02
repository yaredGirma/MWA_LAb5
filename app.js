var express = require('express');
var fetch = require('node-fetch');
var app = express();
var Rx = require('@reactivex/rxjs');

///////////using using simple operation

// app.get("", function (req, res) {
//   fetch('http://jsonplaceholder.typicode.com/users/')
//   .then(data => {return data.json();})
//   .then(data => {res.render('index.ejs', { person: data });
//   });
// })

///////////using using promise

var jsondata = () => {
  return new Promise((resolve, reject) => {
    fetch('http://jsonplaceholder.typicode.com/users/').then(correct => {
      if (correct.ok) { return correct.json(); }
      else { reject("Data not found"); }
    }).then(data => resolve(data));
  });
}

//////////using using promise

// app.get("", (req, res) => {
//   res.status(200);
//   jsondata().then(data => {
//     res.render('index.ejs', { person: data });
//   }).catch(err => console.log(err));
// });


///////////using observable

app.get('/',function(req,res){
var source = Rx.Observable.fromPromise(jsondata()).subscribe(data => {
    res.render('index.ejs', { person: data });
  })
})


app.listen(3000, function () { console.log('server started'); });
