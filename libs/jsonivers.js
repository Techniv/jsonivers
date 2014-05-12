/**
 * Created by Vincent Peybernes on 05/02/14.
 * @module jsonivers
 * @license MIT
 * @author Vincent Peybernes
 * @copyright 2014
 */


module.exports = {
	/**
	 * File system API.
	 * {@link module:jsonivers/fs}
	 */
	fs: require('./fs'),

	/**
	 * HTTP API.
	 * {@link module:jsonivers/http}
	 */
	http: require('./http'),

	/**
	 * JsonBind constructor.
	 * @type JsonBind
	 */
	JsonBind: require('./model/jsonBind')
};

// TYPEDEF

/**
 * Callback for asynchronous data reading.
 * @callback readCallback
 * @param {Error} err Undefined if success.
 * @param {object} data The JSON data converted to object.
 */

/**
 * Callback for asynchronous data writing.
 * @callback writeCallback
 * @param {Error} err Undefined if success.
 */