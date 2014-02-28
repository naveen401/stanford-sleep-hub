var Parse = require('parse').Parse;

Parse.initialize("ZHqQZryFmh8BBn4NcikzU22lUKkviTE21K0cb286", "B9nfNyXZtYzGsAlhp6cQlmbufCSvgGB3DfZ0i7Pn");

exports.createAccount = function createAccount(req, username, email, phone, password, successFunction, errorFunction){
	var user = new Parse.User();
	var phoneNumber = parseInt(phone);
	user.set("username", username);
	user.set("password", password);
	user.set("email", email);
	user.set("phone", phoneNumber);
	errorsArray = [];
	user.signUp(null, {
		success: function(user){
			if(username == ""){
				errorsArray.push("Invalid username. Please enter a valid username.");
			}
			if(password == ""){
				errorsArray.push("Invalid password. Please enter a valid password.");
			}
			if(email == ""){
				errorsArray.push("Invalid email address. Please enter a valid email address.");
			}
			if(phone == "" || isNaN(phoneNumber)){
				errorsArray.push("Invalid phone number. Please enter a valid phone number");
			}
			if(errorsArray.length == 0){
				req.session.user = Parse.User.current();
				req.session.session_token = Parse.User.current()._sessionToken;
				successFunction();
			}
			else{
				errorFunction(errorsArray);
			}
		},
		error: function(user, error) {
			errorsArray.push("Invalid user information. Try again.");
            errorFunction(errorsArray);
        }
	});
}

exports.login = function (req, username, password, successFunction, errorFunction){
	Parse.User.logIn(username, password, {
		success: function(user){
			req.session.user = Parse.User.current();
			req.session.session_token = Parse.User.current()._sessionToken;
			successFunction();
		},
		error: function(user, error) {
            errorFunction(error);
        }
	});
}

exports.getAlertnessData = function(successFunction, errorFunction, user){
	var LOAQuery = new Parse.Query("Day");
	LOAQuery.equalTo("sleeper", user);
	LOAQuery.find({
		success: function(results){
			successFunction(results);
		},
		error: function(error){
			errorFunction(error);
		}
	});
}

exports.getSleepData = function(successFunction, errorFunction, earliestDate, session_token){
	var DayQuery = new Parse.Query("Day");
	Parse.User.become(session_token, {
		success: function(){
			DayQuery.equalTo("sleeper", Parse.User.current()); 
			DayQuery.find({
				success: function(results){
					successFunction(results);
				},
				error: function(error){
					errorFunction(error);	
				}
			});
		},
		error: function(){
			errorFunction(error);	
		}
	});
}
