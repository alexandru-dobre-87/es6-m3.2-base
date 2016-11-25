/**
 * Base class
 * All classes that will be included in the Application should inherit this class
 */
class Base {

    /**
     * Class constructor
     */
    constructor() {
        // empty application
        this.application = null;
    }

    /**
     * Sets the base application
     * @param application {Application}
     */
    set application(application) {
        this._application = application;
    }

    /**
     * Gets the base application
     * @return {Application}
     */
    get application() {
        return this._application;
    }

}

/**
 * Exports the Base class
 * @type {Base}
 */
module.exports.Base = Base;