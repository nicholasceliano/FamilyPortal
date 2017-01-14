//C:\git\FamilyProject

var express = require('express')
var app = express()

//Routes
app.get('/', function (req, res) {
  res.sendFile('home.html', {root: __dirname })
})

//App Start
app.listen(3000, function () {
  console.log('App listening on port 3000')
})