const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true
	},
	password: {
		type: String,
		required: true
	}
});

//Hooks on user model
userSchema.pre('save', async function(next) {
	const user = this;
	try {
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(user.password, salt);
		user.password = hash;
		next();
	} catch (error) {
		return next(error);
	}
});

userSchema.methods.comparePassword = async function(password) {
	const user = this;
	const isMatch = await bcrypt.compare(password, user.password);

	return isMatch;
};

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
