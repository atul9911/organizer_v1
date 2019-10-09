const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	  },
	item: {
		type:String,
		required:true},
	date: {
		type: Date,
		default: Date.now
		  }
});

module.exports = mongoose.model('Todo', TodoSchema)