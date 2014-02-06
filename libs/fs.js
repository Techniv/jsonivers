/**
 * Created by vincent.peybernes on 05/02/14.
 */

var fs = require('fs');
var path = require('path');

module.exports = {
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
	}

	/**
	 * Read a JSON file synchronous.
	 * @param filePath
	 * @throws Error
	 */
	, readJsonFileSync: function(filePath){
		filePath = path.resolve(filePath);
		var stat = fs.statSync(filePath);
		if(!stat.isFile()) throw new Error('"'+filePath+'" is not a file.');

		var file = fs.readFileSync(filePath);
		return JSON.parse(file);
	}
}

