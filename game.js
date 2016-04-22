var Question = require("./question.js");
var Quiz = require("./quiz.js");
var User = require("./user.js");
var FileManager = require("./file_manager.js");

var fs = require('fs');
var read = require('read');

var fileMng = new FileManager();

var questions_array = [
	new Question(1, "Question 1?", "1", 20),
	new Question(2, "Question 2?", "2", 20),
	new Question(3, "Question 3?", "3", 20)
];

var options = {prompt: "New User? (y,n)\n>" };
read(options, processInput);

function processInput(err, userInput){
	var options = {prompt: "Insert your name:\n>" };
	if(userInput == "y"){
		console.log("Creating new user:");
		read(options, processNewUserNameInput);
	}
	else {
		read(options, processUserNameInput);
	}
}

function processNewUserNameInput(err, userInput){
	var user = new User(userInput);
	fs.readFile('./users.txt', 'utf8', function (err,data) {
		fileMng.users = JSON.parse(data);
		fileMng.addUserInData(user);
		startGame(user);
	});
}

function processUserNameInput(err, userInput){
	var user = new User(userInput);
	fs.readFile('./users.txt', 'utf8', function (err,data) {
		fileMng.users = JSON.parse(data);
		fileMng.getUser(user, startGame);
	});
}

function startGame(user){
	var quiz = new Quiz(questions_array, user, fileMng);
	quiz.presentation();
	fileMng.showClassification();
	quiz.game();
}