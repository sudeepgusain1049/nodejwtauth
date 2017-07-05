module.exports = function (app, appRoutes) {
    require('./users.js')(appRoutes);

    appRoutes.get('/', function (req, res, next) {
        next();
        res.send('Welcome to auth api');
    });

    app.use('/api', appRoutes);
};