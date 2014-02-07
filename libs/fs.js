/**
 * Created by vincent.peybernes on 05/02/14.
 * @module jsonivers/fs
 */

var fs = require('fs');
var path = require('path');

module.exports = {

	/**
	 * Read a JSON file
	 * @param filePath {string}
	 * @param callback {function} take two arguments : (error, data)
	 */
	readJsonFile: function readJsonFile(filePath, callback){
		path.resolve(filePath);
		fs.stat(filePath, function(err, stat){
			if(err){
				callback(err);
				return;
			}

			if(!stat.isFile()){
				callback(new Error('"'+filePath+'" is not a file.'));
				return;
			}

			fs.readFile(filePath, function(err, file){
				if(err){
					callback(err);
					return;
				}

				var json;
				try{
					json = JSON.parse(file);
				} catch (e){
					callback(e);
					return;
				}
				callback(undefined, json);
			});

		});
	},

	/**
	 * Read a JSON file synchronous.
	 * @param filePath {string}
	 * @return {object}
	 * @throws {Error}
	 */
	readJsonFileSync: function(filePath){
		filePath = path.resolve(filePath);
		var stat = fs.statSync(filePath);
		if(!stat.isFile()) throw new Error('"'+filePath+'" is not a file.');

		var file = fs.readFileSync(filePath);
		return JSON.parse(file);
	},

	/**
	 * Serialize an object into a JSON file.
	 * @param filePath {string}
	 * @param data {object}
	 * @param callback {function} take one arguments : (error)
	 */
	writeJsonFile: function writeJsonFile(filePath, data, callback){
		filePath = path.resolve(filePath);
		fs.stat(filePath, function(err, stat){
			if(err || stat.isFile()){
				var json;
				try{
					json = JSON.stringify(data);
				} catch (e){
					callback(e);
					return;
				}

				fs.writeFile(filePath, json, function(err){
					callback(err);
				});

			} else {
				callback(new Error('"'+filePath+'" is not a valid target to write.'));
				return;
			}
		});
	},

	/**
	 * Synchronous serialize an object into a JSON file.
	 * @param filePath {string}
	 * @param data {object}
	 * @throws {Error}
	 */
	writeJsonFileSync: function writeJsonFileSync(filePath, data){
		filePath = path.resolve(filePath);
		if(fs.existsSync(filePath)){
			var stat = fs.statSync(filePath);
			if(!stat.isFile()) throw new Error('"'+filePath+'" is not a valid target to write.');
		}

		var json = JSON.stringify(data);
		fs.writeFileSync(filePath, json);
	}
}

