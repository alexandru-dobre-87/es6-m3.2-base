const express = require('express');
const co = require('co');
const path = require('path');
const Base = require('./base').Base;
const WEB_SERVER_PORT = 3000;

/**
 * Web server class
 */
class WebServer extends Base {

    /**
     * Class constructor
     */
    constructor() {
        super();
        this._server = express();
    }

    /**
     * Configures the Web server
     */
    configureWebServer() {

        /**
         * Configure the views folder
         */
        this._server.set('view engine', 'pug');
        this._server.set('views', path.join(__dirname, 'views'));

        /**
         * Configure the static ( images, css, js ) folder
         */
        this._server.use('/static', express.static(path.join(__dirname, 'public')));

    }

    /**
     * Set up the routes
     * @param routes {[*]}
     */
    configureRoutes(routes) {

        /**
         * Configure the routes
         */
        for (let {path, callback} of routes) {
            this._server.get(path, (res, req) => {

                var me = this;

                co(function*() {

                    let result = yield callback.call(me.application, res, req);

                }, function (err) {

                    console.error(err.stack);

                });

            });
        }

    }

    /**
     * Start serving requests
     */
    startWebServer() {

        /**
         * Start listening on the configured port
         */
        this._server.listen(WEB_SERVER_PORT, function () {
            console.log(`Web server is up and running on port ${WEB_SERVER_PORT}!`);
        });

    }

    /**
     * Starts the web server
     */
    * start() {
        this.configureWebServer();
        this.configureRoutes(this.application.routes);
        this.startWebServer();
        return "done";
    }
}

/**
 * Exports the WebServer class
 * @type {WebServer}
 */
module.exports.WebServer = WebServer;