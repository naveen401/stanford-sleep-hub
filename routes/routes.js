var Parse = require('parse').Parse
  , accountUtils = require('../public/javascripts/utils/accountutils');

Parse.initialize("ZHqQZryFmh8BBn4NcikzU22lUKkviTE21K0cb286", "B9nfNyXZtYzGsAlhp6cQlmbufCSvgGB3DfZ0i7Pn");

(function (exports) {

  "use strict";

  function index(req, res) { 
    if(!Parse.User.current()) res.render('index');
    else{
      res.render('about', {"username": Parse.User.current().getUsername()});
    }
  }
  
  function signup(req, res){
    accountUtils.createAccount(req.body.username, req.body.email, req.body.phone, req.body.password,  
      function(){
        res.redirect('/about');
      }, 
      function(errorArray){
        res.render('signupfail', {"errors":errorArray});
      });
  }

  function login(req, res){
    if(!Parse.User.current()) accountUtils.login(req.body.username, req.body.password, function(){res.redirect('/about')}, function(error){res.redirect('/login/fail')});
    else{
      res.redirect('about');
    }
  }

  function logout(req, res){
    Parse.User.logOut();
    res.redirect('/');
  }

  function about(req, res){
    res.render('about', {"username": Parse.User.current().getUsername()});
  }


  function weeklySleep(req, res){
    res.render('weekly-sleep', {"username": Parse.User.current().getUsername()});
  }

 function weeklyAlert(req, res){
    res.render('weekly-alert', {"username": Parse.User.current().getUsername()});
  }

  function comparison(req, res){
    res.render('comparison', {"username": Parse.User.current().getUsername()});
  }

  function dayData(req, res){
    var today = new Date();
    var earliestDate = today.setDate(today.getDate()-7);
    accountUtils.getSleepData(
    function(results){
      res.json(results);
    }, 
    function(error){
      console.log("Fail");
    }, earliestDate); 
  }

  function advice(req, res){
    res.render('advice', {"username": Parse.User.current().getUsername()});
  }

  function breakdown(req, res){
    res.render('breakdown', {"username": Parse.User.current().getUsername()});
  }

  function blog(req, res){
    res.render('blog', {"username": Parse.User.current().getUsername()});
  }

  function about(req, res){
    res.render('about', {"username": Parse.User.current().getUsername()});
  }

  function loginfail(req, res){
    res.render('loginfail');
  }

  exports.init = function (app) {
    app.get('/', index);
    app.get('/logout', logout);
    app.get('/about', about);
    app.get('/analytics/sleep/week', weeklySleep);
    app.get('/analytics/alertness/week', weeklyAlert);
    app.get('/analytics/comparison/week', comparison);
    app.get('/analytics/breakdown/week', breakdown);
    app.get('/advice', advice);
    app.get('/alertness/data', dayData);
    app.get('/sleep/data', dayData);
    app.get('/comparison/data', dayData);
    app.get('/breakdown/data', dayData);
    app.get('/blog', blog);
    app.get('/login/fail', loginfail);
    app.post('/signup', signup);
    app.post('/login', login);
  };



}(exports));



