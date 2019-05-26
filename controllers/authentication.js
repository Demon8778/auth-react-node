const User = require('../models/user');

const signup = async (req, res, next) => {
	const { email, password } = req.body;

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
			res.send({ success: true });
		} catch (error) {
			return next(error);
		}
	} catch (error) {
		return next(error);
	}
};

module.exports = {
	signup
};
