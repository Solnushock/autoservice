const pug = require('pug');
var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');


//app.use('/', require('./middleware/loadDataTable'));
require('./routes')(app);

app.listen(3000,'localhost', function(){
    console.log('Express server listening on port 3000');
});
/*
var str = "ddd";
str.*/