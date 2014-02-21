/**
 * Created by Vincent Peybernes on 21/02/14.
 */

var fs = require("../fs");

/**
 * @param {FSAdapterOptions} options
 * @augments JsonAdapter
 * @constructor
 */
function JsonAdapterFS(options){
	if(typeof options.path != "string") throw new Error("FS adapter need a path.");

	Object.defineProperty(this, "options", {value: options});
}

JsonAdapterFS.prototype.get = function(callback){
	fs.readJsonFile(this.options.path, callback);
}

JsonAdapterFS.prototype.save = function(data, callback){
	fs.writeJsonFile(this.options.path, data, callback);
}

module.exports = JsonAdapterFS;


/**
 * @typedef {object} FSAdapterOptions
 * @property {string} path
 */
