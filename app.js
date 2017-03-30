const pug = require('pug');
var express = require('express');
var path = require('path');
var config = require('./config');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');


//app.use('/', require('./middleware/loadDataTable'));
require('./routes')(app);

app.listen(config.get('port'),'localhost', function(){
    console.log('Express server listening on port ' + config.get('port'));
});
