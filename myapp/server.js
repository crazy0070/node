var express =  require('express');
var app =  express();

var router = require('./router/main')(app);

app.set('veiws',__dirname+'/views');
app.set('view engine', 'ejs');
app.engine('html',require('ejs').renderFile);

app.set(express.static('public'));

var server =  app.listen(3000, () => {
	console.log('server started!!!');
});

