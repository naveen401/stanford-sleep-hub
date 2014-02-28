var accountUtils = require('../public/javascripts/utils/accountutils');

(function (exports) {

  "use strict";

  function index(req, res) {
    if(!req.session.user) res.render('index');
    else{
      res.render('about', {"username": req.session.user.username});
    }
  }
  
  function signup(req, res){
    accountUtils.createAccount(req, req.body.username, req.body.email, req.body.phone, req.body.password, 
      function(user){
        res.redirect('/about');
      }, 
      function(errorArray){
        res.render('signupfail', {"errors":errorArray});
      });
  }

  function login(req, res){
    if(!req.session.user) {
      accountUtils.login(req, req.body.username, req.body.password, 
      function(){
        console.log(req.session.session_token);
        console.log(req.session.session_token);
        res.redirect('/about')
      }, 
      function(error){
        res.redirect('/login/fail')
      });
    }
    else{
      res.redirect('about');
    }
  }

  function logout(req, res){
    delete req.session.user;
    res.redirect('/');
  }

  function weeklySleep(req, res){
    res.render('weekly-sleep', {"username": req.session.user.username});
  }

 function weeklyAlert(req, res){
    res.render('weekly-alert', {"username": req.session.user.username});
  }

  function comparison(req, res){
    res.render('comparison', {"username": req.session.user.username});
  }

  function dayData(req, res){
    console.log("THIS IS DAY DATA");
    console.log(req.session.session_token);
    var today = new Date();
    var earliestDate = today.setDate(today.getDate()-7);
    accountUtils.getSleepData(
    function(results){
      res.json(results);
    }, 
    function(error){
      console.log("Fail to get data");
    }, earliestDate, req.session.session_token); 
  }

  function advice(req, res){
    res.render('advice', {"username": req.session.user.username});
  }

  function breakdown(req, res){
    res.render('breakdown', {"username": req.session.user.username});
  }

  function blog(req, res){
    res.render('blog', {"username": req.session.user.username});
  }

  function about(req, res){
    console.log("IN")
    console.log(req.session.user);
    console.log(req.session.session_token);
    res.render('about', {"username": req.session.user.username});
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



