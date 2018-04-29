var express =  require('express');
var app =  express();
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require('fs');
var request = require('request');
 

app.set('veiws',__dirname+'/views');
app.set('view engine', 'ejs');
app.engine('html',require('ejs').renderFile);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());	

var server =  app.listen(3000, () => {
	console.log('server started!!!');
});
var coin = {};  
var router = require('./router/main')(app,fs,coin);

console.log(coin);