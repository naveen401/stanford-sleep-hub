var express = require('express')
  , http = require('http')
  , routes = require('./routes/routes')
  , sys = require('sys')
  , parseUrl = require('url').parse
  , helmet = require('helmet')
  , flash = require('connect-flash')
  , util = require('util')
  , expressValidator = require('express-validator');

var app = express();

app.configure(function () {
  app.set('port', process.env.PORT || 8000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.cookieParser("ServerSecret6df9d9d054B2F8588ba45a01D56f5d2a"));
  app.use(express.session({ secret: "ServerSecret6df9d9d054B2F8588ba45a01D56f5d2a", cookie: {httpOnly: true},}))//add , secure: true once we have an SSL
  app.use(flash());
  app.use(express.logger('dev'));
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(express.bodyParser());//Apparently insecure, use caution
  app.use(helmet.xframe());
  app.use(helmet.iexss());
  app.use(helmet.contentTypeOptions());
  app.use(helmet.cacheControl());
  app.use(express.methodOverride());

  app.use(express.csrf());
  app.use(function(req, res, next){
    res.locals.csrftoken = req.session._csrf;
    next();
  });

  app.use(app.router);
  app.use(express.static(__dirname + '/public'));

});

app.configure('development', function () {
  app.use(express.errorHandler());
});

routes.init(app);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});

