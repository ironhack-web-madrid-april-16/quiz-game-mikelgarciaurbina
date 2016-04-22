function User(name){
	this.name = name;
	this.total_points = 0;
	this.current_question = 0;
	this.record = 0;
	this.data = "";
}

module.exports = User;