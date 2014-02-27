var Parse = require('parse').Parse;

Parse.initialize("ZHqQZryFmh8BBn4NcikzU22lUKkviTE21K0cb286", "B9nfNyXZtYzGsAlhp6cQlmbufCSvgGB3DfZ0i7Pn");

exports.createAccount = function createAccount(username, email, password, successFunction, errorFunction){
	var user = new Parse.User();
	user.set("username", username);
	user.set("password", password);
	user.set("email", email);
	user.signUp(null, {
		success: function(user){
			successFunction();
		},
		error: function(user, error) {
            errorFunction(error);
        }
	});
}

exports.login = function (username, password, successFunction, errorFunction){
	Parse.User.logIn(username, password, {
		success: function(user){
			successFunction(user);
		},
		error: function(user, error) {
            errorFunction(error);
        }
	});
}

exports.getAlertnessData = function(successFunction, errorFunction){
	var LOAQuery = new Parse.Query("LOA");
	LOAQuery.equalTo("sleeper", Parse.User.current());
	LOAQuery.find({
		success: function(results){
			successFunction(results);
		},
		error: function(error){
			errorFunction(error);	
		}
	});
}

exports.getSleepData = function(successFunction, errorFunction){
	var DayQuery = new Parse.Query("Day");
	DayQuery.equalTo("sleeper", Parse.User.current());
	DayQuery.find({
		success: function(results){
			successFunction(results);
		},
		error: function(error){
			errorFunction(error);	
		}
	});
}
