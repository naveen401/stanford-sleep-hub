var Parse = require('parse').Parse
  , accountUtils = require('../public/javascripts/utils/accountutils');

Parse.initialize("ZHqQZryFmh8BBn4NcikzU22lUKkviTE21K0cb286", "B9nfNyXZtYzGsAlhp6cQlmbufCSvgGB3DfZ0i7Pn");

(function (exports) {

  "use strict";

  function index(req, res) { 
    if(!Parse.User.current()) res.render('index');
    else{
      res.render('home', {"username": Parse.User.current().getUsername()});
    }
  }
  
  function signup(req, res){
    accountUtils.createAccount(req.body.username, req.body.email, req.body.password,  function(){res.redirect('home')}, function(error){console.log("Fail!!!!")});
  }

  function login(req, res){
    if(!Parse.User.current()) accountUtils.login(req.body.username, req.body.password, function(){res.redirect('home')}, function(error){console.log("Fail!!!!")});
    else{
      res.redirect('home');
    }
  }

  function home(req, res){
    res.render('home', {"username": Parse.User.current().getUsername()});
  }

  function logout(req, res){
    Parse.User.logOut();
    res.redirect('/');
  }

  function about(req, res){
    res.render('about', {"username": Parse.User.current().getUsername()});
  }

  function analytics(req, res){
    res.render('analytics', {"username": Parse.User.current().getUsername()});
  }

  function alertnessData(req, res){
  }

  function sleepData(req, res){
    console.log("REQUEST MADE IT HERE");
    accountUtils.getSleepData(
    function(results){
      res.json(results);
    }, 
    function(error){
      console.log("Fail");
    }); 
  }

  function advice(req, res){
    res.render('advice', {"username": Parse.User.current().getUsername()});
  }



  exports.init = function (app) {
    app.get('/', index);
    app.get('/home', home);
    app.get('/logout', logout);
    app.get('/about', about);
    app.get('/analytics', analytics);
    app.get('/advice', advice);
    app.get('/alertness/data', alertnessData);
    app.get('/sleep/data', sleepData);
    app.post('/signup', signup);
    app.post('/login', login);
  };



}(exports));



