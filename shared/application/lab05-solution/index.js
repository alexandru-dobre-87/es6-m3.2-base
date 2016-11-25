// load Application code
const Application = require('./application').Application;
const co = require('co');

co(function*() {

    // start a new Application
    let application = new Application();
    yield application.start();

    console.log('Application fully loaded');

}, function (err) {

    console.error(err.stack);

});
