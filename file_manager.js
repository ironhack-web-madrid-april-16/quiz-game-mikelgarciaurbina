var fs = require('fs');

function FileManager(){
	this.users = [];
}

FileManager.prototype.getUser = function(user, callback){
	for(var i = 0; i < this.users.length; i++) {
		if(this.users[i].name == user.name) {
			console.log("Login");
			console.log("Name: " + this.users[i].name);
			console.log("Record: " + this.users[i].record);
			user.record = this.users[i].record;
			callback(user);
		}
	}
}

FileManager.prototype.addUserRecordInData = function(user) {
	for(var i = 0; i < this.users.length; i++) {
		if(this.users[i].name == user.name) {
			this.users[i].record = user.total_points;
		}
	}
}

FileManager.prototype.addUserInData = function(user) {
	this.users.push({"name":user.name,"record":user.record});
};

FileManager.prototype.writeInFile = function() {
	fs.writeFile('./users.txt', JSON.stringify(this.users), 'utf8');
}

FileManager.prototype.showClassification = function() {
	console.log("\t\t******************* Classification *******************");
	this.users.sort(function(a,b){
		if (a.record < b.record)
			return 1;
		else if (a.record > b.record)
			return -1;
		else 
			return 0;
	});
	for(var i = 0; i < this.users.length; i++) {
		console.log("\t\t\t\t" + this.users[i].name + " - "
			+ this.users[i].record);
	}
}

module.exports = FileManager;