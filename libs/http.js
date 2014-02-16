/**
 * Created by Vincent Peybernes on 12/02/14.
 * @module jsonivers/http
 * @license MIT
 * @author Vincent Peybernes
 */

var http = require('http');
var contentTypeRegExp = /([a-z]*\/[a-z]*)(;.*?charset=([a-zA-Z0-9\-]*))?/;
var acceptedMime= [
	"application/json",
	"text/json",
	"text/plain"
];

module.exports = {

	/**
	 * This method get asynchronously a JSON file from an HTTP resource URL and return the data to JavaScript object.
	 * The callback take two parameters : the error object and an object representing the read data.
	 * @param url {string}
	 * @param callback {readCallback} Get two parameters (error, data).
	 */
	get: function(url, callback){
		http.get(url, function(res){
			if(res.statusCode != 200){
				callback(new Error("Bad HTTP status code: "+res.statusCode));
				return;
			}
			var contentType = contentTypeRegExp.exec(res.headers["content-type"]);


			if(contentType == null){
				callback(new Error("Error on response header parsing."));
				return;
			}

			if(acceptedMime.indexOf(contentType[1]) == -1){
				callback(new Error("The response have unaccepted MIME type: "+contentType[1]));
				return;
			}
			res.on('data', function(data){
				try{
					var json = JSON.parse(data);
					callback(undefined, json);
				} catch (e){
					callback(e);
					return;
				}
			});
		}).on("error", function(err){
			callback(err);
		});
	},


	/**
	 * This method get synchronously a JSON file from an HTTP resource URL and return the data to JavaScript object.
	 * Can throw error if fail.
	 * @param url {string}
	 * @return {object} The JSON data.
	 */
	getSync: function(url){
		//TODO Implement
	}
};