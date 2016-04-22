function Question(id, text, answer, points){
	this.id = id;
	this.text = text;
	this.answer = answer;
	this.points = points;
}

Question.prototype.correct = function(answer) {
	if (this.answer == answer) {
		return true;
	}
	else {
		this.points -= 5;
		if(this.points < 0) this.points = 0;
		return false;
	}
}

module.exports = Question;