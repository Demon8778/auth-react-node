const User = require('../models/user');
const jwt = require('jsonwebtoken');

const config = require('../config');

const generateToken = user => {
	const token = jwt.sign({ _id: user._id.toString() }, config.secret);
	return token;
};

const signin = async (req, res, next) => {
	res.send({ token: generateToken(req.user) });
};

const signup = async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password)
		return res
			.status(422)
			.send({ error: 'You must provide an email and passoword' });

	try {
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(422).send({ error: 'Email already exists!' });
		}
		const user = new User({
			email,
			password
		});

		try {
			await user.save();
			res.send({ token: generateToken(user) });
		} catch (error) {
			return next(error);
		}
	} catch (error) {
		return next(error);
	}
};

module.exports = {
	signup,
	signin
};
