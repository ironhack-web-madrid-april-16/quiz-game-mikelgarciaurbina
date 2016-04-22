var read = require('read');

function Quiz(questions, user, fileMng) {
	this.questions = questions;
	this.user = user;
	this.fileMng = fileMng;
}

Quiz.prototype.presentation = function() {
	console.log("\t\t******************************************************");
	console.log("\t\t\t" + this.user.name + " welcome to the game of Quiz");
	console.log("\t\t******************************************************");
	console.log("");
}

Quiz.prototype.game = function() {
	var othis = this;
	var randomnumber = Math.floor(Math.random()*this.questions.length)
	function processUserInput(err, userInput){
		var options = {prompt: "\n>" };
		if(userInput === "none"){
			read(options, processUserInput); 
		} else if(othis.questions[othis.user.current_question].correct(userInput)){
			console.log("Correct answer");
			othis.sumTotalPoints(randomnumber);
			if(othis.questions.length == othis.user.current_question + 1){
				othis.end(randomnumber);
			} else {
				othis.user.current_question += 1;
				othis.showQuestion(randomnumber);
				read(options, processUserInput);
			}
		} else {
			console.log("Wrong answer");
			othis.showQuestion(randomnumber);
			read(options, processUserInput);    
		}	
	}
	
	this.showQuestion(randomnumber);

	processUserInput(null,"none");
}

Quiz.prototype.showQuestion = function(randomnumber) {
	if (randomnumber === this.user.current_question) {
		console.log("********* BONUS QUESTION ***********");
		console.log(this.questions[this.user.current_question].text + " (" + 
			this.questions[this.user.current_question].points * 2 + " points).");
	}
	else {
		console.log(this.questions[this.user.current_question].text + " (" + 
			this.questions[this.user.current_question].points + " points).");
	}
}

Quiz.prototype.end = function() {
	console.log("Congrats " + this.user.name + ", you win!");
	console.log("Your total score is " + this.user.total_points);
	console.log("Your record is " + this.user.record);
	if(this.user.total_points > this.user.record) {
		this.fileMng.addUserRecordInData(this.user);
	}
	this.fileMng.writeInFile();
}

Quiz.prototype.sumTotalPoints = function(randomnumber) {
	var points_to_sum = this.questions[this.user.current_question].points;
	if (randomnumber === this.user.current_question) {
		points_to_sum = points_to_sum * 2;
	}
	this.user.total_points += points_to_sum;
}

module.exports = Quiz;