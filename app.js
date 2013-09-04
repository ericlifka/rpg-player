var pg_url = process.env.DATABASE_URL || "";

var express = require('express');
var http = require('http');
var path = require('path');
var auth = require('./routes/auth');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.post('/auth', auth.authPOST);
app.put('/auth', auth.authPUT);
app.delete('/auth', auth.authDELETE);

app.get('/something', auth.authMiddleware, function (req, res) {
    console.log('/something');
    console.log(req.user);
    res.send(200);
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
