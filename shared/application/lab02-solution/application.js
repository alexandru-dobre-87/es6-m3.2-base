const WebServer = require('./webserver.js').WebServer;
const Database = require('./database.js').Database;

/**
 * Application class
 */
class Application {

    /**
     * Class constructor
     */
    constructor() {
        this._server = new WebServer();
        this._database = new Database();
    }

    get routesList() {
        return [
            './routes/index.js',
            './routes/temperatures.js'
        ]
    }

    /**
     * Loads routes
     * @returns {[*]}
     */
    get routes() {
        return this.routesList.map(function (script) {
            return require(script);
        });
    }

    get pages() {
        return this.routesList.map(function (script) {
            let {name, path} = require(script);
            return {name, path};
        });
    }

    /**
     * @returns {Database}
     */
    get database() {
        return this._database;
    }

    /**
     * @returns {WebServer}
     */
    get server() {
        return this._server;
    };

    /**
     * Start the application
     */
    *start() {

        // initiate the web server
        this.server.application = this;
        yield this.server.start();

        // initiate connections to the database
        this.database.application = this;
        yield this.database.start();

    }

}

/**
 * Exports the Application class
 * @type {Application}
 */
module.exports.Application = Application;