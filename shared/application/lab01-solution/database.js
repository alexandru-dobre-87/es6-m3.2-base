const Base = require('./base').Base;
const MongoClient = require('mongodb').MongoClient;

const CONFIG_DATABASE_SERVER = Symbol("database:server");
const CONFIG_DATABASE_NAME = Symbol("database:name");
const DATABASE_SERVER = "localhost:27017";
const DATABASE_NAME = "sensors";
const DATABASE_TEMPERATURES = "temperatures";

/**
 * Database access class
 */
class Database extends Base {

    /**
     * Class constructor
     */
    constructor() {
        super();
        this.server = null;

        this._connectionOptions = new Map();
        this._connectionOptions.set(CONFIG_DATABASE_SERVER, DATABASE_SERVER);
        this._connectionOptions.set(CONFIG_DATABASE_NAME, DATABASE_NAME);

    }

    /**
     * Sets the server connection
     * @param serverConnection {MongoClient}
     */
    set server(serverConnection) {
        this._server = serverConnection;
    }

    /**
     * Gets the server connection
     * @return {MongoClient}
     */
    get server() {
        return this._server;
    }

    /**
     * Gets the connection string
     * @returns {string}
     */
    get connectionString() {
        let server = this._connectionOptions.get(CONFIG_DATABASE_SERVER);
        let databaseName = this._connectionOptions.get(CONFIG_DATABASE_NAME);
        return `mongodb://${server}/${databaseName}`;
    }

    /**
     * Returns a reference to the Temperatures collection
     * @returns {*|Collection}
     */
    get temperatures() {

        if (this.server) {
            return this.server.collection(DATABASE_TEMPERATURES);
        }

        throw "Database not ready yet";

    }

    /**
     * Starts the web server
     */
    start() {
        MongoClient.connect(this.connectionString, (err, server) => {
            if (!err) {
                this.server = server;
            }
        });
    }

}

/**
 * Exports the Database class
 * @type {Database}
 */
module.exports.Database = Database;