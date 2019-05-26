const Authentication = require('./controllers/authentication');

module.exports = app => {
	// app.get('/', (req, res, next) => {
	// 	res.send('Kiran');
	// });

	app.post('/signup', Authentication.signup);
};
