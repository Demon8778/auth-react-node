const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const User = require('../models/user');
const config = require('../config');

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
	try {
		const user = await User.findById(payload._id);
		if (user) {
			return done(null, user);
		} else {
			return done(null, false);
		}
	} catch (error) {
		return done(error);
	}
});

const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(
	localOptions,
	async (email, password, done) => {
		try {
			const user = await User.findOne({ email });
			console.log(user);
			if (!user) {
				return done(null, false);
			} else {
				const isMatch = await user.comparePassword(password);
				if (!isMatch) return done(null, false);
				return done(null, user);
			}
		} catch (error) {
			return done(error);
		}
	}
);

passport.use(localLogin);
passport.use(jwtLogin);
